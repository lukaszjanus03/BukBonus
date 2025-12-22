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
    // ZMIANA 1: Tło na bg-slate-900 (ciemny granat), border na ciemniejszy
    <nav className="bg-slate-900 shadow-sm border-b border-slate-800 sticky top-14 z-40 font-sans">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        
        {/* --- 1. LOGO --- */}
        <Link href="/" className="flex items-center gap-3 cursor-pointer group shrink-0">
          <div className="relative w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-blue-900/50 group-hover:scale-105 transition-transform duration-300">
             <i className="far fa-futbol absolute -right-2 -bottom-2 text-[28px] text-blue-400/40 transform rotate-[-15deg]"></i>
             <span className="text-white font-black text-2xl leading-none relative z-10 tracking-tighter drop-shadow-sm">B</span>
             <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/10 to-transparent"></div>
          </div>
          <div className="flex flex-col">
             {/* ZMIANA 2: Kolor tekstu logo na biały, "Bonus" na jaśniejszy niebieski (blue-500) dla kontrastu */}
             <span className="text-xl font-extrabold tracking-tighter leading-none text-white">
               Buk<span className="text-blue-500">Bonus</span>.pl
             </span>
          </div>
        </Link>
        
        {/* --- 2. MENU DESKTOPOWE --- */}
        <div className="hidden md:flex gap-8 text-sm font-bold absolute left-1/2 transform -translate-x-1/2 h-full items-center">
            
            {/* ZMIANA 3: Kolor linków Ranking/Promocje na red-500 (jaśniejszy czerwony) */}
            <Link href="/#ranking" className="text-red-500 hover:text-red-400 transition py-2 font-extrabold flex items-center gap-1.5">
                <i className="fas fa-fire"></i> Ranking
            </Link>
            
            {/* Dropdown Promocje */}
            <div className="relative group h-full flex items-center">
                <Link href="/promocje" className="text-red-500 hover:text-red-400 transition py-2 font-extrabold flex items-center gap-1">
                    Promocje <i className="fas fa-chevron-down text-[10px] opacity-50 group-hover:opacity-100 transition-opacity mt-0.5 ml-0.5"></i>
                </Link>
                {/* Dropdown zostaje biały w środku dla czytelności */}
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
                        <div className="border-t border-slate-100 mt-1 pt-2">
                            <Link href="/promocje" className="block text-center text-xs font-bold text-blue-600 hover:underline">
                                Zobacz wszystkie instrukcje
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ZMIANA 4: Zwykłe linki na szary/biały (slate-300 -> white) */}
            <Link href="/wiadomosci" className="text-slate-300 hover:text-white transition py-2">
                Wiadomości Sportowe
            </Link>
            
            <Link href="/typy-dnia" className="text-slate-300 hover:text-white transition py-2 flex items-center gap-1.5">
                <i className="far fa-futbol"></i> Typy Dnia
            </Link>
        </div>

        {/* --- 3. PRZYCISK HAMBURGER --- */}
        {/* ZMIANA 5: Tło przycisku na ciemne (slate-800), ikona jasna */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center text-slate-300 bg-slate-800 rounded-lg active:scale-95 transition hover:bg-slate-700"
        >
          {isOpen ? <i className="fas fa-times text-lg"></i> : <i className="fas fa-bars text-lg"></i>}
        </button>

      </div>

      {/* --- 4. MENU MOBILNE --- */}
      {/* Menu mobilne zostawiamy białe, bo wysuwa się jako osobna warstwa, ale zmieniamy obramowanie na górze */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-800 absolute w-full left-0 top-16 shadow-xl animate-in slide-in-from-top-2 overflow-y-auto max-h-[80vh]">
          <div className="flex flex-col p-4 space-y-2">
            
            <Link href="/#ranking" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl bg-red-50 text-red-600 font-black flex items-center gap-2">
                <i className="fas fa-fire"></i> Ranking Bukmacherów
            </Link>
            
            <Link href="/typy-dnia" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-700 font-bold hover:bg-slate-50 flex items-center gap-2">
                <i className="far fa-futbol"></i> Typy Dnia
            </Link>

            <Link href="/wiadomosci" onClick={() => setIsOpen(false)} className="px-4 py-3 rounded-xl text-slate-700 font-bold hover:bg-slate-50">
                Wiadomości Sportowe
            </Link>
            
            {/* Sekcja Promocje w menu mobilnym */}
            <div className="pt-2 border-t border-gray-100 mt-2">
                <p className="px-4 text-xs font-bold text-slate-400 uppercase mb-2">Promocje Bukmacherskie</p>
                <div className="grid grid-cols-2 gap-2 px-2">
                    {BOOKMAKERS_LIST.map((bookie) => (
                        <Link 
                            key={bookie.slug}
                            href={`/promocje#${bookie.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100"
                        >
                            <img src={bookie.logo} alt={bookie.name} className="w-5 h-5 object-contain" />
                            <span className="text-xs font-bold text-slate-700">{bookie.name}</span>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="pt-4 mt-2 border-t border-gray-100">
               <Link href="/zasady-afiliacji" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-900">
                  Zasady Afiliacji
               </Link>
               <a href="mailto:bukbonuskontakt@gmail.com" className="block px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-900">
                  Kontakt
               </a>
            </div>

          </div>
        </div>
      )}
    </nav>
  )
}