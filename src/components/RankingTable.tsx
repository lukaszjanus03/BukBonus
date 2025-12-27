'use client';

import { useState } from 'react';
import Link from 'next/link'; // Import Link

interface RankingProps {
  currentDate?: string;
}

// ... (Interface Bookmaker i CONST BOOKMAKERS bez zmian - skopiuj ze starego pliku lub zostaw jak masz)
// WAŻNE: W tablicy BOOKMAKERS upewnij się, że nazwy (name) to 'Superbet', 'STS', 'Fortuna' itd.,
// bo na ich podstawie budujemy link do poradnika (toLowerCase).

interface Bookmaker {
  id: number;
  name: string;
  logo: string;
  rating: number;
  bonus: string;
  link: string;
  bgColor: string;
  features: string[];
  bonuses: string[];
}

const BOOKMAKERS: Bookmaker[] = [
  // ... Twoja tablica z danymi (skopiuj ją z poprzedniego pliku, nie zmieniaj jej) ...
  // Dla pewności wklejam 3 pierwsze przykłady, resztę zostaw jak masz
  {
    id: 1,
    name: 'Superbet',
    logo: 'https://play-lh.googleusercontent.com/0ygX2EFB7ZOfe7cA0EgZ4KBqHf942ShCQPzJJwoo41Y8gqAvDJAQzTzJ-zMj2ejgLI0=w240-h480-rw', 
    rating: 4.9,
    bonus: '3754 PLN',
    link: 'https://superbet.pl', 
    bgColor: 'bg-red-600',
    features: ['Najlepsza aplikacja', 'SuperPrzewaga', 'Gry karciane'],
    bonuses: [
        '3500 PLN - Tydzień gry bez ryzyka (Cashback)',
        '200 PLN - Bonus od pierwszej wpłaty',
        '34 PLN - Freebet za pobranie aplikacji',
        '20 PLN - Extra Freebet za rejestrację'
    ]
  },
  {
    id: 2,
    name: 'STS',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZR0K8gIc1a6Yx33pUR3Op8lK0VFxStZiwww&s',
    rating: 4.8,
    bonus: '760 PLN',
    link: 'https://www.sts.pl', 
    bgColor: 'bg-blue-600',
    features: ['Największy bukmacher', 'Wizja TV', 'Szeroka oferta'],
    bonuses: [
        '600 PLN - Bonusy od trzech pierwszych wpłat',
        '100 PLN - Zakład bez ryzyka (Cashback)',
        '60 PLN - Bonusy za wykonanie zadań'
    ]
  },
  // ... reszta bukmacherów ...
  // UWAGA: Skopiuj tu resztę tablicy BOOKMAKERS z Twojego obecnego pliku, żeby nic nie zginęło!
  {
    id: 3,
    name: 'Fortuna',
    logo: 'https://i1.sndcdn.com/avatars-000330081863-yuozc1-original.jpg',
    rating: 4.7,
    bonus: '330 PLN',
    link: 'https://www.efortuna.pl', 
    bgColor: 'bg-yellow-500',
    features: ['Gra bez podatku', 'Transmisje live', 'Szybkie wypłaty'],
    bonuses: [
        '100 PLN - Zakład bez ryzyka nr 1',
        '100 PLN - Zakład bez ryzyka nr 2',
        '100 PLN - Zakład bez ryzyka nr 3',
        '20 PLN - Freebet bez depozytu za weryfikację',
        '10 PLN - Freebet za pierwszą wpłatę'
    ]
  },
    {
    id: 4,
    name: 'Betclic',
    logo: 'https://dam.begmedia.com/front/native-apps/app-sports.png',
    rating: 4.6,
    bonus: '50 PLN',
    link: 'https://www.betclic.pl', 
    bgColor: 'bg-red-700',
    features: ['Gra BEZ PODATKU (zawsze)', 'Edytuj zakład', 'Multi+'],
    bonuses: [
        'Gra bez podatku na wszystko (zwiększa wygrane o 14%)',
        '50 PLN - Zakład bez ryzyka (zwrot we freebecie)',
        'Nielimitowana ilość kuponów bez podatku'
    ]
  },
  {
    id: 5,
    name: 'LVBET',
    logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/lv-bet-logo.jpg',
    rating: 4.5,
    bonus: '2000 PLN',
    link: 'https://lvbet.pl', 
    bgColor: 'bg-yellow-400',
    features: ['Wysokie kursy', 'LV Kombi', 'Sporty wirtualne'],
    bonuses: [
        '500 PLN - Bonus od pierwszego depozytu',
        '600 PLN - Bonus od drugiego depozytu',
        '900 PLN - Bonus od trzeciego depozytu',
        '20 PLN - Freebet bez depozytu',
        'Gry i Sporty Wirtualne bez podatku'
    ]
  },
  {
    id: 6,
    name: 'Betfan',
    logo: 'https://pewniaczki.pl/wp-content/uploads/2021/03/betfan.png',
    rating: 4.4,
    bonus: '400 PLN',
    link: 'https://betfan.pl',
    bgColor: 'bg-green-500',
    features: ['Bonus 200%', 'My Bet (Własne zakłady)', 'Cashout'],
    bonuses: [
        '400 PLN - Bonus 200% od wpłaty (Wpłacasz 200, grasz za 600)',
        'Gra bez podatku na wszystko',
        'Freebet urodzinowy'
    ]
  },
  {
    id: 7,
    name: 'Totalbet',
    logo: 'https://surebety.pl/wp-content/uploads/2020/12/totalbet-pl-zaklady-bukmacherskie-logo.jpg',
    rating: 4.3,
    bonus: '333 PLN',
    link: 'https://totalbet.pl',
    bgColor: 'bg-green-700',
    features: ['Zakład bez ryzyka', 'Szybkie wypłaty', 'Gry karciane'],
    bonuses: [
        '333 PLN - Trzy zakłady bez ryzyka po 111 PLN',
        'Cashout w dowolnym momencie',
        'Gra bez podatku na kuponach AKO'
    ]
  },
  {
    id: 8,
    name: 'Etoto',
    logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/etoto-logo.jpg',
    rating: 4.2,
    bonus: '777 PLN',
    link: 'https://etoto.pl',
    bgColor: 'bg-blue-800',
    features: ['Misja Futbol', 'Bonusy dla stałych graczy', 'Aplikacja mobilna'],
    bonuses: [
        'Bonusy od 3 pierwszych wpłat (łącznie do 700 PLN)',
        '77 PLN - Freebet za rejestrację w aplikacji',
        'Mixbet - łączenie zakładów'
    ]
  },
  {
    id: 9,
    name: 'Fuksiarz',
    logo: 'https://surebety.pl/wp-content/uploads/2021/04/fuksiarz-logo-bialo-czerwone-400x400-1.png',
    rating: 4.2,
    bonus: '500 PLN',
    link: 'https://fuksiarz.pl',
    bgColor: 'bg-red-500',
    features: ['Cashback bez obrotu', 'Krzysztof Stanowski', 'Early Payout'],
    bonuses: [
        '50% zwrotu stawki do 500 PLN (Bez obrotu!)',
        'Early Payout - wygrana przy prowadzeniu 2 bramkami',
        'Cashback na sporty wirtualne'
    ]
  },
  {
    id: 10,
    name: 'Forbet',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Forbetlogo.png/250px-Forbetlogo.png',
    rating: 4.1,
    bonus: '3000 PLN',
    link: 'https://iforbet.pl',
    bgColor: 'bg-green-600',
    features: ['Bonus Powitalny', 'MaxiZysk', 'BetArchitekt'],
    bonuses: [
        '2000 PLN - Bonus od depozytu',
        '1000 PLN - Zakład bez ryzyka',
        '30 dni gry bez podatku'
    ]
  }
];

export default function Ranking({ currentDate }: RankingProps) {
  const [expandedBookie, setExpandedBookie] = useState<number | null>(null);
  const displayDate = currentDate || '2026';

  const toggleBonuses = (id: number) => {
      setExpandedBookie(expandedBookie === id ? null : id);
  };

  return (
    <section id="ranking" className="py-8 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
                Ranking Bukmacherów <span className="text-blue-600">{displayDate}</span>
            </h2>
            <p className="text-slate-500 text-base">
                Aktualne pakiety powitalne. Wybierz najlepszą ofertę dla siebie.
            </p>
        </div>

        <div className="space-y-4">
          {BOOKMAKERS.map((bookie, index) => (
            <div key={bookie.id} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
              
              {/* Badge TOP 3 */}
              {index < 3 && (
                  <div className={`absolute top-0 left-0 text-white text-[10px] font-bold px-3 py-1 rounded-br-lg z-10 ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}>
                      #{index + 1}
                  </div>
              )}

              <div className="p-4 flex flex-col md:flex-row items-center gap-4">
                
                {/* Logo & Rating */}
                <div className="flex flex-col items-center justify-center w-full md:w-32 shrink-0">
                    <div className="w-24 h-10 relative mb-1 flex items-center justify-center">
                        <img 
                            src={bookie.logo} 
                            alt={`Kod promocyjny ${bookie.name}`} 
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x50?text=LOGO'; }}
                        />
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold mb-2">
                        <i className="fas fa-star"></i>
                        <span className="text-slate-700">{bookie.rating}/5.0</span>
                    </div>
                    <button 
                        onClick={() => toggleBonuses(bookie.id)}
                        className={`w-full py-2 px-2 text-[11px] font-bold rounded-md transition-all flex items-center justify-center gap-1 border shadow-sm ${expandedBookie === bookie.id ? 'bg-green-100 text-green-800 border-green-200' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-green-50'}`}
                    >
                        <span>{expandedBookie === bookie.id ? 'Ukryj' : 'Szczegóły'}</span>
                        <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${expandedBookie === bookie.id ? 'rotate-180' : ''}`}></i>
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow text-center md:text-left border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-4 w-full">
                    {/* ZROBIŁEM NAZWĘ KLIKALNĄ DO PORADNIKA */}
                    <Link href={`/poradnik/${bookie.name.toLowerCase()}`} className="text-lg font-black text-slate-800 mb-1 hover:text-blue-600 transition-colors flex items-center justify-center md:justify-start gap-2">
                        {bookie.name}
                        <i className="fas fa-info-circle text-slate-300 text-xs"></i>
                    </Link>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-1.5 mb-3">
                        {bookie.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="bg-slate-50 text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded border border-slate-200">
                                {feature}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-2">
                        <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Pakiet:</span>
                        <span className={`text-xl font-black ${index === 0 ? 'text-red-600' : 'text-slate-900'}`}>
                            {bookie.bonus}
                        </span>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="w-full md:w-auto shrink-0 flex flex-col gap-1.5">
                    <a 
                        href={bookie.link} 
                        target="_blank" 
                        rel="nofollow noreferrer"
                        className={`block w-full md:w-44 text-center text-white font-bold py-3 rounded-lg shadow-md transition transform hover:-translate-y-0.5 ${bookie.bgColor} hover:brightness-110 text-sm`}
                    >
                        Odbierz Bonus
                    </a>
                    
                    {/* NOWY LINK: INSTRUKCJA */}
                    <Link 
                        href={`/poradnik/${bookie.name.toLowerCase()}`}
                        className="block w-full md:w-44 text-center text-slate-500 font-bold py-1.5 text-[10px] hover:text-blue-600 transition-colors border border-transparent hover:border-blue-100 rounded"
                    >
                        <i className="fas fa-book-open mr-1"></i> Jak odebrać?
                    </Link>

                    <div className="text-[10px] text-center text-slate-400">
                        Kod: <span className="font-bold text-slate-700 select-all cursor-pointer">BUKBONUS</span>
                    </div>
                </div>
              </div>

              {/* Expanded Details */}
              <div className={`bg-slate-50 border-t border-slate-100 transition-all duration-300 ease-in-out overflow-hidden ${expandedBookie === bookie.id ? 'max-h-96 opacity-100 p-4' : 'max-h-0 opacity-0 p-0'}`}>
                  <div className="grid md:grid-cols-2 gap-4">
                      <div>
                          <h4 className="font-bold text-slate-700 mb-2 text-xs flex items-center gap-1.5">
                              <i className="fas fa-gift text-green-600"></i> Co zawiera pakiet powitalny?
                          </h4>
                          <ul className="space-y-1.5">
                              {bookie.bonuses.map((bonusLine, idx) => (
                                  <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                                      <i className="fas fa-check text-green-500 mt-0.5 shrink-0 text-[10px]"></i>
                                      <span>{bonusLine}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div className="flex items-center justify-center border-l border-slate-200 pl-4">
                           <div className="text-center flex flex-col gap-2">
                               <p className="text-[10px] text-slate-400">Rejestracja zajmuje 2 minuty</p>
                               <a href={bookie.link} className="text-blue-600 font-bold text-xs hover:underline flex items-center justify-center gap-1">
                                   Przejdź do strony <i className="fas fa-external-link-alt text-[10px]"></i>
                               </a>
                               {/* DODATKOWY LINK W SZCZEGÓŁACH */}
                               <Link href={`/poradnik/${bookie.name.toLowerCase()}`} className="text-slate-500 font-bold text-xs hover:text-slate-800 flex items-center justify-center gap-1">
                                   Zobacz pełną instrukcję <i className="fas fa-arrow-right text-[10px]"></i>
                               </Link>
                           </div>
                      </div>
                  </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}