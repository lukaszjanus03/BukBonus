'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  content: string;
  image: string;
  // Dodajemy nowe pola
  team1Logo: string;
  team2Logo: string;
}

export default function Wiadomosci() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  const today = new Date().toLocaleDateString('pl-PL', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  useEffect(() => {
    fetch('/api/agent/news')
      .then(res => res.json())
      .then(data => {
        if (data && data.articles) {
          setNews(data.articles);
        } else {
          setNews([]); 
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Błąd pobierania newsów:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <header className="bg-white border-b border-gray-200 py-6 px-4 text-center shadow-sm">
        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase mb-3 inline-block tracking-wider">
            <i className="far fa-newspaper mr-2"></i>Wydanie Dnia:
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 capitalize tracking-tight">
            {today}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-xs md:text-sm">
            3 najważniejsze wydarzenia sportowe wybrane przez naszą redakcję.
        </p>
      </header>

      <div className="container mx-auto px-4 py-8 flex-grow">
        
        {loading ? (
            <div className="text-center py-20 opacity-60">
                <i className="fas fa-circle-notch fa-spin text-4xl text-blue-600 mb-4"></i>
                <p className="font-medium text-slate-600">Ładowanie dzisiejszych hitów...</p>
            </div>
        ) : news.length === 0 ? (
            <div className="text-center p-10">Brak newsów.</div>
        ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {news.map((item, index) => {
                    // Nie używamy już funkcji zgadującej. Mamy dane prosto z API!
                    const isVersus = item.category !== 'INFO'; // Zakładamy, że to mecz jeśli nie jest to INFO

                    return (
                        <article 
                            key={item.id} 
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full flex flex-col"
                        >
                            <div className="absolute top-0 right-0 p-4 z-10 opacity-30 font-black text-6xl text-white pointer-events-none drop-shadow-lg">
                                {index + 1}
                            </div>

                            <Link href={item.id !== 0 ? `/mecz/${item.id}` : '#'} className={`block h-52 relative overflow-hidden ${item.id === 0 ? 'cursor-default' : ''} bg-slate-900`}>
                                {/* TŁO: Ciemny gradient + subtelny wzór */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"></div>
                                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
                                
                                {/* WIDOK LOGO VS LOGO (TERAZ Z PRAWDZIWYMI DANYMI) */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 px-4 pb-8">
                                    {isVersus ? (
                                        <>
                                            {/* Drużyna 1 */}
                                            <div className="flex flex-col items-center gap-2 w-1/3">
                                                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm shadow-lg w-20 h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                                    <img src={item.team1Logo} alt="Team 1" className="w-14 h-14 object-contain" />
                                                </div>
                                            </div>

                                            {/* VS */}
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="text-yellow-400 font-black text-2xl italic tracking-tighter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                    VS
                                                </span>
                                            </div>

                                            {/* Drużyna 2 */}
                                            <div className="flex flex-col items-center gap-2 w-1/3">
                                                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm shadow-lg w-20 h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                                    <img src={item.team2Logo} alt="Team 2" className="w-14 h-14 object-contain" />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        // Fallback dla newsów nie-meczowych (INFO)
                                        <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                            <i className="far fa-calendar-times text-4xl text-white opacity-80"></i>
                                        </div>
                                    )}
                                </div>
                                
                                {/* Etykieta Ligi/Kategorii */}
                                <div className="absolute bottom-0 left-0 p-4 z-20 w-full bg-gradient-to-t from-slate-900 to-transparent pt-12">
                                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm mb-1 inline-block">
                                        {item.category}
                                    </span>
                                    <h2 className="font-bold text-lg leading-tight text-white drop-shadow-md pr-6 line-clamp-2">
                                        {item.title}
                                    </h2>
                                </div>
                            </Link>
                            
                            <div className="p-6 flex flex-col flex-grow relative">
                                <div className="flex items-center text-xs text-blue-700 mb-4 font-bold uppercase tracking-wide bg-blue-50 w-fit px-2.5 py-1 rounded border border-blue-100">
                                    <i className="far fa-clock mr-2"></i> {item.time}
                                </div>
                                
                                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                    {item.content}
                                </p>
                                
                                {item.id !== 0 && (
                                    <Link 
                                        href={`/mecz/${item.id}`} 
                                        className="w-full mt-auto bg-slate-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-blue-600 transition shadow-lg shadow-slate-900/10 group-hover:shadow-blue-600/20 flex items-center justify-center gap-2"
                                    >
                                        Zobacz Analizę i Składy <i className="fas fa-arrow-right text-xs opacity-70 group-hover:translate-x-1 transition-transform"></i>
                                    </Link>
                                )}
                            </div>
                        </article>
                    );
                })}
            </div>
        )}
      </div>

      <Footer />
    </main>
  );
}