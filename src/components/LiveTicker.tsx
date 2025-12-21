'use client';

import { useEffect, useState } from 'react';


const ODDS_API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY;

interface InternalMatch {
  id: number;
  utcDate: string;
  status: string;
  competition: { code: string };
  homeTeam: { shortName: string; name: string; crest: string };
  awayTeam: { shortName: string; name: string; crest: string };
  score: { 
      fullTime: { home: number | null; away: number | null };
      halfTime: { home: number | null; away: number | null };
  };
}

interface ExternalMatch {
    id: string;
    home_team: string;
    away_team: string;
    scores?: { name: string; score: string }[];
    completed: boolean;
}

const LEAGUE_MAP: Record<string, string> = {
  'PL': 'ENG', 'BL1': 'GER', 'SA': 'ITA', 'PD': 'ESP', 
  'FL1': 'FRA', 'PPL': 'POR', 'DED': 'NED', 'CL': 'EUR',
};

const cleanName = (name: string) => {
    return name.toLowerCase()
        .replace(/fc|cf|sc|borussia|vfl|bayer|real|united|city|sporting|inter|ac/g, '')
        .replace(/[^a-z0-9]/g, '')
        .trim();
};

export default function LiveTicker() {
  const [internalMatches, setInternalMatches] = useState<InternalMatch[]>([]);
  const [externalMatches, setExternalMatches] = useState<ExternalMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [ticker, setTicker] = useState(0); 

  const fetchAllData = async () => {
      // Zabezpieczenie: jeśli nie ma klucza, nie robimy zapytań do zewnętrznego API
      if (!ODDS_API_KEY) {
          console.warn("Brak klucza API (NEXT_PUBLIC_ODDS_API_KEY)");
          // Kontynuujemy, żeby pobrać chociaż wewnętrzne mecze, ale external będzie pusty
      }

      try {
        const resInternal = await fetch(`/api/matches?t=${Date.now()}`);
        const dataInternal = await resInternal.json();
        
        const sports = ['soccer_epl', 'soccer_germany_bundesliga'];
        let extData: ExternalMatch[] = [];
        
        if (ODDS_API_KEY) {
            const extPromises = sports.map(sport => 
                fetch(`https://api.the-odds-api.com/v4/sports/${sport}/scores/?apiKey=${ODDS_API_KEY}&daysFrom=1`)
                    .then(r => r.json())
                    .catch(() => [])
            );
            
            const extResults = await Promise.all(extPromises);
            extResults.forEach(r => { if(Array.isArray(r)) extData.push(...r); });
        }

        if (dataInternal.matches) {
            const sorted = dataInternal.matches.sort((a: InternalMatch, b: InternalMatch) => {
                const now = new Date().getTime();
                const timeA = new Date(a.utcDate).getTime();
                const timeB = new Date(b.utcDate).getTime();
                const liveA = (timeA < now && a.status !== 'FINISHED');
                const liveB = (timeB < now && b.status !== 'FINISHED');
                if (liveA && !liveB) return -1;
                if (!liveA && liveB) return 1;
                return timeA - timeB;
            });
            setInternalMatches(sorted);
        }
        setExternalMatches(extData);

      } catch (error) {
        console.error('Błąd:', error);
      } finally {
        setLoading(false);
      }
  };

  useEffect(() => {
    fetchAllData();
    const interval = setInterval(() => {
        fetchAllData();
        setTicker(prev => prev + 1);
    }, 60000); 
    return () => clearInterval(interval);
  }, []);

  const getLiveScore = (match: InternalMatch) => {
      let home = match.score.fullTime.home ?? match.score.halfTime.home ?? 0;
      let away = match.score.fullTime.away ?? match.score.halfTime.away ?? 0;

      const intHomeClean = cleanName(match.homeTeam.shortName || match.homeTeam.name);
      const intAwayClean = cleanName(match.awayTeam.shortName || match.awayTeam.name);
      
      const foundExternal = externalMatches.find(ext => {
          const extHomeClean = cleanName(ext.home_team);
          const extAwayClean = cleanName(ext.away_team);
          const homeMatch = extHomeClean.includes(intHomeClean) || intHomeClean.includes(extHomeClean);
          const awayMatch = extAwayClean.includes(intAwayClean) || intAwayClean.includes(extAwayClean);
          return homeMatch || awayMatch;
      });

      if (foundExternal && foundExternal.scores) {
          const extHomeScore = foundExternal.scores.find(s => cleanName(s.name) === cleanName(foundExternal.home_team) || s.name === foundExternal.home_team)?.score;
          const extAwayScore = foundExternal.scores.find(s => cleanName(s.name) === cleanName(foundExternal.away_team) || s.name === foundExternal.away_team)?.score;
          if (extHomeScore) home = parseInt(extHomeScore);
          if (extAwayScore) away = parseInt(extAwayScore);
      }

      return { home, away };
  };

  const calculateLiveTime = (utcDate: string, status: string) => {
    const now = new Date();
    const start = new Date(utcDate);
    
    if (status === 'FINISHED') return { text: 'FT', isLive: false, isHT: false };
    if (start > now) return { text: start.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }), isLive: false, isHT: false };

    const diffMins = Math.floor((now.getTime() - start.getTime()) / 60000);

    if (diffMins <= 45) return { text: `${diffMins}'`, isLive: true, isHT: false };
    if (diffMins <= 48) return { text: `45+${diffMins - 45}'`, isLive: true, isHT: false };
    if (diffMins > 48 && diffMins <= 67) return { text: 'HT', isLive: true, isHT: true };

    const secondHalfMinute = diffMins - 22;
    if (secondHalfMinute <= 90) return { text: `${secondHalfMinute}'`, isLive: true, isHT: false };
    if (secondHalfMinute <= 95) return { text: `90+${secondHalfMinute - 90}'`, isLive: true, isHT: false };

    return { text: 'FT', isLive: false, isHT: false };
  };

  return (
    <div className="sticky top-0 w-full h-14 bg-[#0f172a] text-white border-b border-slate-700 z-[100] flex shadow-lg font-sans select-none overflow-hidden">
      
      <div className="bg-[#dc2626] px-3 flex items-center justify-center shrink-0 min-w-[100px] relative z-20">
         <div className="flex items-center gap-2">
            <i className="fas fa-satellite-dish text-[10px] animate-pulse"></i>
            <span className="font-extrabold text-xs leading-none uppercase tracking-widest">NA ŻYWO</span>
         </div>
      </div>
      
      <div className="flex overflow-x-auto items-center w-full no-scrollbar divide-x divide-slate-700/60 cursor-grab active:cursor-grabbing">
        {loading ? (
            <div className="px-5 text-xs text-slate-400 italic flex items-center h-full">Ładowanie...</div>
        ) : internalMatches.length === 0 ? (
            <div className="px-5 text-xs text-slate-400">Brak meczów.</div>
        ) : (
            internalMatches.map((match) => {
            const { text, isLive, isHT } = calculateLiveTime(match.utcDate, match.status);
            const { home, away } = getLiveScore(match);
            const showScore = isLive || match.status === 'FINISHED' || text === 'FT' || text === 'HT';
            const leagueLabel = LEAGUE_MAP[match.competition.code] || match.competition.code;
            
            return (
              <div key={match.id} className="flex items-center px-4 h-full min-w-max hover:bg-slate-800/50 transition gap-4 group">
                <div className="text-[10px] font-bold text-slate-500 w-6 text-center shrink-0 uppercase tracking-tight">{leagueLabel}</div>
                <div className="flex flex-col justify-center gap-[4px] w-[140px]">
                    <div className="flex items-center justify-between w-full h-3.5">
                        <div className="flex items-center truncate pr-2 overflow-hidden">
                            <img src={match.homeTeam.crest} className="w-3.5 h-3.5 mr-2 object-contain" alt=""/>
                            <span className="text-slate-200 group-hover:text-white truncate font-medium text-xs leading-none">
                                {match.homeTeam.shortName || match.homeTeam.name}
                            </span>
                        </div>
                        <span className={`font-bold text-xs leading-none w-5 text-center tabular-nums ${isLive || text === 'FT' ? 'text-white' : 'text-slate-300'}`}>
                            {showScore ? home : '-'}
                        </span>
                    </div>
                    <div className="flex items-center justify-between w-full h-3.5">
                        <div className="flex items-center truncate pr-2 overflow-hidden">
                            <img src={match.awayTeam.crest} className="w-3.5 h-3.5 mr-2 object-contain" alt=""/>
                            <span className="text-slate-200 group-hover:text-white truncate font-medium text-xs leading-none">
                                {match.awayTeam.shortName || match.awayTeam.name}
                            </span>
                        </div>
                        <span className={`font-bold text-xs leading-none w-5 text-center tabular-nums ${isLive || text === 'FT' ? 'text-white' : 'text-slate-300'}`}>
                            {showScore ? away : '-'}
                        </span>
                    </div>
                </div>
                <div className="flex flex-col items-end justify-center min-w-[35px] text-[10px] font-bold pl-2 border-l border-slate-800/50 h-8">
                    {isLive ? (
                        <>
                            <span className="text-green-500 text-[8px] animate-pulse mb-0.5">● LIVE</span>
                            <span className={`${isHT ? 'text-yellow-400' : 'text-green-400'} text-xs`}>{text}</span>
                        </>
                    ) : (
                        <span className={`${text === 'FT' ? 'text-slate-400' : 'text-slate-500'}`}>{text}</span>
                    )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}