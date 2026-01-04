'use client';

import { useState } from 'react';
import Link from 'next/link';
// IMPORTUJEMY DANE Z PLIKU ZEWNĘTRZNEGO
import { BOOKMAKERS } from '@/data/bookmakers';

interface RankingProps {
  currentDate?: string;
}

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

        <div className="space-y-6"> {/* Zwiększony odstęp między kartami (space-y-4 -> space-y-6) */}
          {BOOKMAKERS.map((bookie, index) => (
            <div key={bookie.id} className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 relative group">
              
              {/* Badge TOP 3 (nieco większy) */}
              {index < 3 && (
                  <div className={`absolute top-0 left-0 text-white text-xs font-bold px-4 py-1.5 rounded-br-lg z-10 ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}>
                      #{index + 1}
                  </div>
              )}

              {/* Zwiększony padding wewnętrzny (p-4 -> p-6) */}
              <div className="p-6 flex flex-col md:flex-row items-center gap-6"> 
                
                {/* Logo & Rating (Większa sekcja) */}
                <div className="flex flex-col items-center justify-center w-full md:w-36 shrink-0"> {/* md:w-32 -> md:w-36 */}
                    <div className="w-28 h-12 relative mb-2 flex items-center justify-center"> {/* w-24 h-10 -> w-28 h-12 */}
                        <img 
                            src={bookie.logo} 
                            alt={`Kod promocyjny ${bookie.name}`} 
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x50?text=LOGO'; }}
                        />
                    </div>
                    <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold mb-3"> {/* text-xs -> text-sm */}
                        <i className="fas fa-star"></i>
                        <span className="text-slate-700">{bookie.rating}/5.0</span>
                    </div>
                    
                    {/* PRZYCISK SZCZEGÓŁY (Zielony) */}
                    <button 
                        onClick={() => toggleBonuses(bookie.id)}
                        className={`w-full py-2.5 px-3 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-2 border shadow-sm 
                        ${expandedBookie === bookie.id 
                            ? 'bg-green-800 text-white border-green-900 shadow-inner' 
                            : 'bg-green-600 text-white border-green-700 hover:bg-green-500 hover:border-green-600'
                        }`}
                    >
                        <span>{expandedBookie === bookie.id ? 'Ukryj' : 'Szczegóły'}</span>
                        <i className={`fas fa-chevron-down text-[10px] transition-transform duration-300 ${expandedBookie === bookie.id ? 'rotate-180' : ''}`}></i>
                    </button>

                </div>

                {/* Content */}
                <div className="flex-grow text-center md:text-left border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 w-full"> {/* Większe odstępy */}
                    <Link href={`/poradnik/${bookie.slug}`} className="text-xl font-black text-slate-800 mb-2 hover:text-blue-600 transition-colors flex items-center justify-center md:justify-start gap-2"> {/* text-lg -> text-xl */}
                        {bookie.name}
                        <i className="fas fa-info-circle text-slate-300 text-sm"></i>
                    </Link>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4"> {/* gap-1.5 -> gap-2 */}
                        {bookie.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="bg-slate-50 text-slate-600 text-[10px] font-bold px-2 py-1 rounded border border-slate-200"> {/* text-slate-500 -> text-slate-600, większy padding */}
                                {feature}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-3">
                        <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Pakiet:</span>
                        <span className={`text-2xl font-black ${index === 0 ? 'text-red-600' : 'text-slate-900'}`}> {/* text-xl -> text-2xl */}
                            {bookie.bonus}
                        </span>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="w-full md:w-48 shrink-0 flex items-center justify-center"> {/* md:w-44 -> md:w-48 */}
                    
                    <a 
                        href={bookie.link} 
                        target="_blank" 
                        rel="nofollow noreferrer"
                        className={`block w-full text-center text-white rounded-lg shadow-md transition-all transform hover:-translate-y-1 hover:shadow-xl ${bookie.bgColor} hover:brightness-110 p-1 group`}
                    >
                        <div className="py-3 px-1"> {/* py-2.5 -> py-3 */}
                            <span className="block font-black text-base uppercase tracking-wide leading-none"> {/* text-sm -> text-base */}
                                Odbierz Bonus
                            </span>
                        </div>
                        
                        <div className="bg-black/20 rounded mx-0.5 py-2 flex items-center justify-center gap-1.5 border border-white/10 group-hover:bg-black/30 transition-colors mb-0.5"> {/* py-1.5 -> py-2 */}
                            <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Kod:</span>
                            <span className="font-black text-white tracking-wider text-sm">BUKBONUS</span>
                        </div>
                    </a>

                </div>
              </div>

              {/* Expanded Details */}
              <div className={`bg-slate-50 border-t border-slate-100 transition-all duration-300 ease-in-out overflow-hidden ${expandedBookie === bookie.id ? 'max-h-96 opacity-100 p-6' : 'max-h-0 opacity-0 p-0'}`}> {/* p-4 -> p-6 */}
                  <div className="grid md:grid-cols-2 gap-6"> {/* gap-4 -> gap-6 */}
                      <div>
                          <h4 className="font-bold text-slate-700 mb-3 text-sm flex items-center gap-2"> {/* text-xs -> text-sm */}
                              <i className="fas fa-gift text-green-600"></i> Co zawiera pakiet powitalny?
                          </h4>
                          <ul className="space-y-2"> {/* space-y-1.5 -> space-y-2 */}
                              {bookie.bonuses.map((bonusLine, idx) => (
                                  <li key={idx} className="text-sm text-slate-600 flex items-start gap-2"> {/* text-xs -> text-sm */}
                                      <i className="fas fa-check text-green-500 mt-1 shrink-0 text-xs"></i>
                                      <span>{bonusLine}</span>
                                  </li>
                              ))}
                          </ul>
                      </div>
                      <div className="flex items-center justify-center border-l border-slate-200 pl-6"> {/* pl-4 -> pl-6 */}
                           <div className="text-center flex flex-col gap-3"> {/* gap-2 -> gap-3 */}
                               <p className="text-xs text-slate-400">Rejestracja zajmuje 2 minuty</p> {/* text-[10px] -> text-xs */}
                               <a href={bookie.link} className="text-blue-600 font-bold text-sm hover:underline flex items-center justify-center gap-1"> {/* text-xs -> text-sm */}
                                   Przejdź do strony <i className="fas fa-external-link-alt text-xs"></i>
                               </a>
                               {/* ZÓŁTY LINK DO INSTRUKCJI */}
                               <Link href={`/poradnik/${bookie.slug}`} className="text-yellow-500 font-bold text-sm hover:text-yellow-600 flex items-center justify-center gap-1"> {/* text-xs -> text-sm */}
                                   Zobacz pełną instrukcję odbioru bonusu: <i className="fas fa-arrow-right text-xs"></i>
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