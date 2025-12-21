'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // <--- Import Footera

interface Match {
  id: string;
  sport_key: string;
  commence_time: string;
  home_team: string;
  away_team: string;
  league_label?: string;
  bookmakers: {
    key: string;
    markets: {
      key: string;
      outcomes: { name: string; price: number }[];
    }[];
  }[];
}

export default function TypyDniaPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        // Teraz pytamy NASZ serwer, a nie zewnętrzne API
        const res = await fetch('/api/odds', {
            // Wyłączamy cache przeglądarki, bo polegamy na cache serwera
            cache: 'no-store' 
        });

        if (!res.ok) throw new Error('Błąd pobierania z serwera');
        
        const data = await res.json();

        if (Array.isArray(data)) {
            setMatches(data);
        } else {
            console.error("Otrzymano nieprawidłowe dane:", data);
            setErrorMsg("Błąd danych serwera.");
        }

      } catch (error) {
        console.error('Błąd:', error);
        setErrorMsg("Nie udało się pobrać kursów.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  const formatMatchDate = (isoDate: string) => {
    const matchDate = new Date(isoDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const timeStr = matchDate.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    const isToday = matchDate.getDate() === today.getDate() && matchDate.getMonth() === today.getMonth();
    const isTomorrow = matchDate.getDate() === tomorrow.getDate() && matchDate.getMonth() === tomorrow.getMonth();

    if (isToday) return `Dziś, ${timeStr}`;
    if (isTomorrow) return `Jutro, ${timeStr}`;
    const dayName = matchDate.toLocaleDateString('pl-PL', { weekday: 'short' });
    return `${dayName}, ${timeStr}`;
  };

  return (
    // Dodałem 'flex flex-col', aby footer był zawsze na dole
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      {/* Dodałem 'flex-grow', aby treść wypychała footer w dół */}
      <div className="container mx-auto px-4 max-w-4xl mt-8 flex-grow pb-10">
        <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Typy Dnia</h1>
            <p className="text-slate-500">
                Najlepsze (Uśrednione kursy od róznych bukmacherów) na hity z 5 najsilniejszych lig (Premier League, La Liga, Serie A, Bundesliga, Ligue 1).
            </p>
        </div>

        {errorMsg ? (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <i className="fas fa-exclamation-triangle text-3xl text-red-500 mb-3"></i>
                <h3 className="text-red-700 font-bold text-lg">Błąd</h3>
                <p className="text-red-600 text-sm mt-1">{errorMsg}</p>
            </div>
        ) : loading ? (
             <div className="space-y-4">
                 {[1,2,3,4,5].map(i => <div key={i} className="h-32 bg-white rounded-xl shadow-sm animate-pulse"></div>)}
             </div>
        ) : matches.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
                <i className="far fa-calendar-check text-4xl text-slate-300 mb-3 block"></i>
                <span className="text-slate-500 font-medium">Aktualnie brak pewnych typów.</span>
                <p className="text-xs text-slate-400 mt-2">
                    Sprawdź ponownie jutro rano. Dane są aktualizowane automatycznie co 12 godzin.
                </p>
            </div>
        ) : (
            <div className="space-y-4">
              {matches.map((match) => {
                const bookmaker = match.bookmakers[0];
                const odds = bookmaker?.markets[0]?.outcomes;
                
                const homeOdd = odds?.find(o => o.name === match.home_team)?.price.toFixed(2) || '-';
                const drawOdd = odds?.find(o => o.name === 'Draw')?.price.toFixed(2) || '-';
                const awayOdd = odds?.find(o => o.name === match.away_team)?.price.toFixed(2) || '-';

                return (
                  <div key={match.id} className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-md transition group">
                    <div className="flex justify-between items-center mb-4 border-b border-slate-50 pb-4">
                        <div className="flex items-center gap-2">
                           <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                           <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                              {formatMatchDate(match.commence_time)}
                           </span>
                        </div>
                        <div className="text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-tight border border-slate-200">
                           {match.league_label}
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 items-center">
                        <div className="flex flex-col gap-2">
                            <div className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition">{match.home_team}</div>
                            <div className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition">{match.away_team}</div>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">
                                Średnie Kursy Rynkowe
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col items-center bg-white border border-slate-200 rounded py-2 shadow-sm hover:border-blue-300 transition cursor-default">
                                    <span className="text-[10px] text-slate-400 font-bold">1</span>
                                    <span className="text-base font-black text-slate-900">{homeOdd}</span>
                                </div>
                                <div className="flex flex-col items-center bg-white border border-slate-200 rounded py-2 shadow-sm hover:border-blue-300 transition cursor-default">
                                    <span className="text-[10px] text-slate-400 font-bold">X</span>
                                    <span className="text-base font-black text-slate-900">{drawOdd}</span>
                                </div>
                                <div className="flex flex-col items-center bg-white border border-slate-200 rounded py-2 shadow-sm hover:border-blue-300 transition cursor-default">
                                    <span className="text-[10px] text-slate-400 font-bold">2</span>
                                    <span className="text-base font-black text-slate-900">{awayOdd}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
        )}
      </div>

      <Footer />
    </main>
  );
}