'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface MatchPageProps {
  params: Promise<{ id: string }>;
}

export default function MatchPage({ params }: MatchPageProps) {
  const { id } = use(params);
  const [match, setMatch] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/agent/match/${id}`)
      .then(res => res.json())
      .then(data => {
        setMatch(data);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
            <div className="text-center">
                <i className="fas fa-circle-notch fa-spin text-4xl text-blue-600 mb-4"></i>
                <p className="text-slate-500 font-bold">Pobieranie aktualnych statystyk...</p>
            </div>
        </div>
    );
  }

  if (!match || match.error) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
           <div className="text-center p-10">
             <h2 className="text-xl font-bold text-slate-700 mb-2">Brak danych</h2>
             <Link href="/wiadomosci" className="text-blue-600 font-bold mt-4 inline-block hover:underline">
               Wróć do listy
             </Link>
           </div>
        </div>
        <Footer />
      </div>
    );
  }

  const getFormColor = (result: string) => {
      if (result === 'Z') return 'bg-green-600 text-white border-green-700'; 
      if (result === 'R') return 'bg-yellow-400 text-yellow-900 border-yellow-500'; 
      if (result === 'P') return 'bg-red-600 text-white border-red-700';
      return 'bg-gray-200 text-gray-500';
  };

  const tHome = match.analysis.tableData?.home;
  const tAway = match.analysis.tableData?.away;

  const tableRows = tHome && tAway ? [
    { ...tHome, name: match.homeTeam, borderColor: 'border-l-blue-500', textColor: 'text-blue-600' },
    { ...tAway, name: match.awayTeam, borderColor: 'border-l-red-500', textColor: 'text-red-600' }
  ] : [];

  tableRows.sort((a, b) => a.position - b.position);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      {/* HERO SECTION */}
      <div className="relative h-[500px] w-full bg-slate-900 overflow-hidden shadow-2xl">
         <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm scale-105"
            style={{ backgroundImage: `url(${match.image})` }}
         ></div>
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
         
         <div className="absolute bottom-0 left-0 w-full p-4 pb-16 z-10 flex flex-col items-center justify-center h-full pt-20">
            <span className="bg-blue-600 text-white text-[10px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest mb-8 shadow-lg shadow-blue-500/30 border border-blue-400/30">
                {match.competition}
            </span>

            <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 w-full max-w-5xl">
                {/* Gospodarz */}
                <div className="flex items-center gap-4 md:gap-6 text-right">
                    <h1 className="text-3xl md:text-6xl font-black text-white drop-shadow-2xl tracking-tighter hidden md:block">{match.homeTeam}</h1>
                    <div className="w-20 h-20 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-full p-4 flex items-center justify-center border border-white/20 shadow-2xl">
                        <img src={match.homeTeamCrest} alt={match.homeTeam} className="w-full h-full object-contain drop-shadow-lg" />
                    </div>
                    <h1 className="text-3xl font-black text-white drop-shadow-2xl tracking-tighter md:hidden">{match.homeTeam}</h1>
                </div>

                <span className="text-blue-500 font-light text-4xl md:text-6xl mx-2">vs</span>

                {/* Gość */}
                <div className="flex items-center gap-4 md:gap-6 text-left flex-row-reverse md:flex-row">
                    <h1 className="text-3xl md:text-6xl font-black text-white drop-shadow-2xl tracking-tighter hidden md:block">{match.awayTeam}</h1>
                    <div className="w-20 h-20 md:w-32 md:h-32 bg-white/10 backdrop-blur-md rounded-full p-4 flex items-center justify-center border border-white/20 shadow-2xl">
                        <img src={match.awayTeamCrest} alt={match.awayTeam} className="w-full h-full object-contain drop-shadow-lg" />
                    </div>
                    <h1 className="text-3xl font-black text-white drop-shadow-2xl tracking-tighter md:hidden">{match.awayTeam}</h1>
                </div>
            </div>

            <div className="mt-8 text-slate-200 font-bold text-sm md:text-base uppercase tracking-widest flex items-center justify-center gap-8 bg-black/40 backdrop-blur-md py-3 px-8 rounded-full border border-white/10 shadow-xl">
                <span className="flex items-center"><i className="far fa-calendar-alt mr-2 text-blue-400"></i>{match.date}</span>
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span className="flex items-center"><i className="far fa-clock mr-2 text-blue-400"></i>{match.time}</span>
            </div>
         </div>
      </div>

      {/* GŁÓWNA TREŚĆ */}
      <div className="container mx-auto px-4 -mt-10 relative z-20 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
            
            {/* LEWA KOLUMNA */}
            <div className="lg:col-span-2 space-y-8">
                
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><i className="fas fa-search"></i></div>
                        Analiza Przedmeczowa
                    </h2>
                    <p className="text-slate-600 leading-relaxed text-lg text-justify font-medium mb-6">
                        {match.analysis.preview}
                    </p>

                    {/* --- NOWOŚĆ: INTERNAL LINKING BOX --- */}
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                        <p className="text-sm text-yellow-800 font-bold flex items-center gap-2">
                            <i className="fas fa-lightbulb text-yellow-600"></i>
                            Pro Tip:
                        </p>
                        <p className="text-sm text-slate-700 mt-1">
                            Chcesz obstawić ten mecz bez ryzyka? Nowi gracze w 
                            <Link href="/poradnik/superbet" className="font-bold text-blue-600 hover:underline mx-1">
                                Superbet
                            </Link> 
                            otrzymują zwrot do 3500 PLN za pierwszy tydzień gry! 
                            <Link href="/#ranking" className="font-bold text-blue-600 hover:underline ml-1">
                                Sprawdź ranking bukmacherów.
                            </Link>
                        </p>
                    </div>
                    {/* ------------------------------------- */}
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600"><i className="fas fa-chart-line"></i></div>
                        Ostatnie 5 meczów (Oficjalne)
                    </h2>
                    
                    <div className="grid md:grid-cols-2 gap-10">
                        {/* Gospodarze */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                            <div className="flex flex-col items-center mb-4">
                                <img src={match.homeTeamCrest} className="w-12 h-12 mb-2 object-contain grayscale opacity-80" />
                                <h3 className="font-black text-slate-800 text-lg">{match.homeTeam}</h3>
                            </div>
                            
                            <div className="flex justify-between px-2 mb-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest w-full max-w-[240px] mx-auto">
                                <span className="flex items-center gap-1 text-blue-600"><i className="fas fa-arrow-left"></i> Najnowszy</span>
                                <span>Starsze</span>
                            </div>

                            <div className="flex gap-2 justify-center mb-2">
                                {match.analysis.homeFormCodes?.length > 0 ? match.analysis.homeFormCodes.map((code: string, idx: number) => (
                                    <div key={idx} className={`w-10 h-10 flex items-center justify-center rounded-lg font-black text-sm border-b-4 shadow-sm ${getFormColor(code)}`}>
                                        {code}
                                    </div>
                                )) : <span className="text-xs text-gray-400">Brak danych</span>}
                            </div>
                        </div>

                        {/* Goście */}
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                            <div className="flex flex-col items-center mb-4">
                                <img src={match.awayTeamCrest} className="w-12 h-12 mb-2 object-contain grayscale opacity-80" />
                                <h3 className="font-black text-slate-800 text-lg">{match.awayTeam}</h3>
                            </div>

                            <div className="flex justify-between px-2 mb-2 text-[9px] font-bold text-slate-400 uppercase tracking-widest w-full max-w-[240px] mx-auto">
                                <span className="flex items-center gap-1 text-blue-600"><i className="fas fa-arrow-left"></i> Najnowszy</span>
                                <span>Starsze</span>
                            </div>

                            <div className="flex gap-2 justify-center mb-2">
                                {match.analysis.awayFormCodes?.length > 0 ? match.analysis.awayFormCodes.map((code: string, idx: number) => (
                                    <div key={idx} className={`w-10 h-10 flex items-center justify-center rounded-lg font-black text-sm border-b-4 shadow-sm ${getFormColor(code)}`}>
                                        {code}
                                    </div>
                                )) : <span className="text-xs text-gray-400">Brak danych</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-4 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600"><i className="fas fa-list-ol"></i></div>
                        Sytuacja w Tabeli
                    </h2>
                    <p className="text-slate-600 mb-6 text-sm">
                        {match.analysis.statsReport}
                    </p>

                    {tableRows.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="text-xs text-gray-500 uppercase bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3">Poz.</th>
                                        <th className="px-4 py-3">Drużyna</th>
                                        <th className="px-4 py-3">Mecze</th>
                                        <th className="px-4 py-3">Pkt</th>
                                        <th className="px-4 py-3">Bramki</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableRows.map((row) => (
                                        <tr 
                                            key={row.name} 
                                            className={`bg-white border-b hover:bg-slate-50 font-bold text-slate-900 border-l-4 ${row.borderColor}`}
                                        >
                                            <td className="px-4 py-3">{row.position}.</td>
                                            <td className="px-4 py-3 flex items-center gap-2">
                                                <img src={row.name === match.homeTeam ? match.homeTeamCrest : match.awayTeamCrest} className="w-5 h-5 object-contain" />
                                                {row.name}
                                            </td>
                                            <td className="px-4 py-3">{row.playedGames}</td>
                                            <td className={`px-4 py-3 text-base ${row.textColor}`}>{row.points}</td>
                                            <td className="px-4 py-3 text-gray-500">{row.goalsFor}:{row.goalsAgainst}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-xs text-gray-400 italic">Szczegółowa tabela niedostępna dla tych rozgrywek.</p>
                    )}
                </div>

            </div>

            {/* PRAWA KOLUMNA */}
            <div className="lg:col-span-1 space-y-6">
                
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-1 rounded-2xl shadow-2xl sticky top-24">
                    <div className="bg-slate-900 rounded-xl p-6 relative overflow-hidden">
                        
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600 rounded-full opacity-10 blur-3xl"></div>

                        <div className="relative z-10 text-center">
                            <h3 className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4 flex items-center justify-center gap-2 border-b border-white/10 pb-4">
                                <i className="fas fa-brain"></i> Propozycja Eksperta
                            </h3>
                            
                            <div className="py-4">
                                <div className="text-2xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300 mb-2">
                                    {match.analysis.verdict}
                                </div>
                                <div className="inline-block bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded border border-green-500/30">
                                    ANALIZA DANYCH LIVE
                                </div>
                            </div>

                            <div className="mt-6 space-y-3">
                                <Link 
                                    href="/#ranking"
                                    className="block w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] flex items-center justify-center gap-2"
                                >
                                    <span>Graj ten typ</span> 
                                    <i className="fas fa-ticket-alt"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}