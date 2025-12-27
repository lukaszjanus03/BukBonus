'use client';

import Link from 'next/link';
import { useState } from 'react';

// Lista bukmacherów do dropdowna
const BOOKMAKERS_LIST = [
  { name: 'Superbet', slug: 'superbet', logo: 'https://play-lh.googleusercontent.com/0ygX2EFB7ZOfe7cA0EgZ4KBqHf942ShCQPzJJwoo41Y8gqAvDJAQzTzJ-zMj2ejgLI0=w240-h480-rw' },
  { name: 'STS', slug: 'sts', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZR0K8gIc1a6Yx33pUR3Op8lK0VFxStZiwww&s' },
  { name: 'Fortuna', slug: 'fortuna', logo: 'https://i1.sndcdn.com/avatars-000330081863-yuozc1-original.jpg' },
  { name: 'Betclic', slug: 'betclic', logo: 'https://dam.begmedia.com/front/native-apps/app-sports.png' },
  { name: 'LVBET', slug: 'lvbet', logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/lv-bet-logo.jpg' },
  { name: 'Betfan', slug: 'betfan', logo: 'https://pewniaczki.pl/wp-content/uploads/2021/03/betfan.png' },
  { name: 'Totalbet', slug: 'totalbet', logo: 'https://surebety.pl/wp-content/uploads/2020/12/totalbet-pl-zaklady-bukmacherskie-logo.jpg' },
  { name: 'Etoto', slug: 'etoto', logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/etoto-logo.jpg' },
  { name: 'Fuksiarz', slug: 'fuksiarz', logo: 'https://surebety.pl/wp-content/uploads/2021/04/fuksiarz-logo-bialo-czerwone-400x400-1.png' },
  { name: 'Forbet', slug: 'forbet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Forbetlogo.png/250px-Forbetlogo.png' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // ZMIANA: fixed top-14 (pod LiveTickerem)
    <nav className="bg-slate-900 shadow-xl border-b border-slate-800 fixed top-14 left-0 w-full h-16 z-40 font-sans transition-all duration-300">
      <div className="container mx-auto px-4 h-full flex items-center justify-between relative">
        
        {/* --- 1. LOGO --- */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group shrink-0">
          <div className="relative w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-blue-900/50 group-hover:scale-105 transition-transform duration-300">
             <i className="far fa-futbol absolute -right-2 -bottom-2 text-[28px] text-blue-400/40 transform rotate-[-15deg]"></i>
             <span className="text-white font-black text-2xl leading-none relative z-10 tracking-tighter drop-shadow-sm">B</span>
             <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
          </div>
          <div className="flex flex-col">
             <span className="text-xl font-extrabold tracking-tighter leading-none text-white">
               Buk<span className="text-blue-500">Bonus</span>.pl
             </span>
          </div>
        </Link>
        
        {/* --- 2. MENU DESKTOPOWE --- */}
        <div className="hidden lg:flex gap-6 text-sm font-bold absolute left-1/2 transform -translate-x-1/2 h-full items-center whitespace-nowrap">
            
            <Link href="/#ranking" className="text-red-500 hover:text-red-400 transition py-2 font-extrabold flex items-center gap-1.5">
                <i className="fas fa-fire"></i> Ranking
            </Link>
            
            {/* Promocje */}
            <div className="relative group h-full flex items-center">
                <Link href="/promocje" className="text-red-500 hover:text-red-400 transition py-2 font-extrabold flex items-center gap-1">
                    Promocje <i className="fas fa-chevron-down text-[10px] opacity-50 group-hover:opacity-100 transition-opacity mt-0.5 ml-0.5"></i>
                </Link>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden">
                    <div className="p-2 grid gap-1">
                        {BOOKMAKERS_LIST.map((bookie) => (
                            <Link 
                                key={bookie.slug} 
                                href={`/promocje#${bookie.slug}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition"
                            >
                                <img src={bookie.logo} alt={bookie.name} className="w-6 h-6 object-contain" />
                                <span className="text-slate-700 text-sm font-bold">{bookie.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- ZAKŁADKA: INSTRUKCJA (DODANA) --- */}
            <div className="relative group h-full flex items-center">
                <Link 
                    href="/jak-odebrac-bonus" 
                    className="text-yellow-400 hover:text-yellow-300 transition py-2 font-extrabold flex items-center gap-1.5 drop-shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                >
                    <i className="fas fa-star animate-pulse"></i> Instrukcja jak odebrać bonus <i className="fas fa-chevron-down text-[10px] opacity-50 group-hover:opacity-100 transition-opacity mt-0.5"></i>
                </Link>
                
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 overflow-hidden">
                    <div className="bg-yellow-50 px-3 py-2 border-b border-yellow-100">
                        <p className="text-[10px] font-bold text-yellow-700 uppercase tracking-wider text-center">Wybierz bukmachera</p>
                    </div>
                    <div className="p-2 grid gap-1">
                        {BOOKMAKERS_LIST.map((bookie) => (
                            <Link 
                                key={bookie.slug} 
                                // TO JEST LINK, KTÓRY NIE DZIAŁAŁ - TERAZ BĘDZIE OK
                                href={`/poradnik/${bookie.slug}`}
                                className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition group/item"
                            >
                                <img src={bookie.logo} alt={bookie.name} className="w-6 h-6 object-contain" />
                                <span className="text-slate-700 text-sm font-bold group-hover/item:text-blue-600 transition-colors">Jak odebrać w {bookie.name}?</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            <Link href="/wiadomosci" className="text-slate-300 hover:text-white transition py-2">
                Wiadomości
            </Link>
            
            <Link href="/typy-dnia" className="text-slate-300 hover:text-white transition py-2 flex items-center gap-1.5">
                <i className="far fa-futbol"></i> Typy Dnia
            </Link>

        </div>

        {/* --- 3. HAMBURGER (MOBILNY) --- */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 flex items-center justify-center text-slate-300 bg-slate-800 rounded-lg active:scale-95 transition hover:bg-slate-700"
        >
          {isOpen ? <i className="fas fa-times text-lg"></i> : <i className="fas fa-bars text-lg"></i>}
        </button>

      </div>

      {/* --- 4. MENU MOBILNE --- */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-slate-800 absolute w-full left-0 top-16 shadow-xl animate-in slide-in-from-top-2 overflow-y-auto max-h-[80vh] pb-8">
          <div className="flex flex-col p-4 space-y-2">
            
            <Link href="/#ranking" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl bg-red-50 text-red-600 font-black flex items-center gap-2">
                <i className="fas fa-fire"></i> Ranking Bukmacherów
            </Link>

            {/* SEKCJA INSTRUKCJE (MOBILNA) */}
            <div className="border border-yellow-200 bg-yellow-50 rounded-xl overflow-hidden mb-2 mt-4">
                 <div className="px-4 py-3 font-bold text-yellow-700 flex items-center gap-2 bg-yellow-100/50">
                    <i className="fas fa-star"></i> Instrukcja: Jak odebrać bonus?
                 </div>
                 <div className="px-4 py-2 grid grid-cols-2 gap-2">
                    {BOOKMAKERS_LIST.slice(0, 6).map((bookie) => (
                        <Link 
                            key={bookie.slug}
                            href={`/poradnik/${bookie.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="text-xs font-bold text-slate-600 py-1.5 px-2 bg-white rounded border border-yellow-100 text-center truncate"
                        >
                            {bookie.name}
                        </Link>
                    ))}
                 </div>
            </div>

            <Link href="/typy-dnia" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-700 font-bold hover:bg-slate-50 flex items-center gap-2">
                <i className="far fa-futbol"></i> Typy Dnia
            </Link>

            <Link href="/wiadomosci" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-700 font-bold hover:bg-slate-50">
                Wiadomości Sportowe
            </Link>

          </div>
        </div>
      )}
    </nav>
  );
}