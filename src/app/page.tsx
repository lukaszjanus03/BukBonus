import RankingTable from '@/components/RankingTable';
import Footer from '@/components/Footer';
import NewsWidget from '@/components/NewsWidget';
import Link from 'next/link';

export default function Home() {
  const date = new Date();
  const monthName = new Intl.DateTimeFormat('pl-PL', { month: 'long' }).format(date);
  const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1);
  const currentYear = date.getFullYear();
  const dynamicDateString = `${capitalizedMonth} ${currentYear}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BukBonus.pl",
    "url": "https://bukbonus.pl",
    "description": `Ranking najlepszych bonusów bukmacherskich w Polsce na ${dynamicDateString}.`,
    "publisher": {
        "@type": "Organization",
        "name": "BukBonus",
        "logo": {
            "@type": "ImageObject",
            "url": "https://bukbonus.pl/logo.png"
        }
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Jaki jest najlepszy bonus bukmacherski na start?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Obecnie jednym z najpopularniejszych bonusów jest 'Tydzień bez ryzyka' w Superbet oraz zakład bez ryzyka w STS. Oferują one zwrot stawki w przypadku przegranej, co jest najbezpieczniejszą opcją dla nowych graczy."
        }
      },
      {
        "@type": "Question",
        "name": "Czy bonusy bez depozytu są darmowe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tak, bonus bez depozytu (freebet) to darmowe środki przyznawane za samą rejestrację konta, bez konieczności wpłacania własnych pieniędzy. Wymagają jednak zazwyczaj obrotu przed wypłatą."
        }
      },
      {
        "@type": "Question",
        "name": "Co to jest obrót bonusem?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Obrót bonusem to wymóg postawienia otrzymanych środków określoną liczbę razy (np. x3) po określonym kursie, zanim będzie można je wypłacić na konto bankowe."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <header className="bg-white py-12 border-b border-gray-200 text-center px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-green-400 to-blue-500"></div>
        
        {/* H1 - Najważniejszy nagłówek (Bez zmian) */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Ranking Bukmacherów i Bonusy na Start <span className="text-blue-600 block md:inline mt-2 md:mt-0">{dynamicDateString}</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-6 leading-relaxed">
            Sprawdź oficjalny ranking <strong>legalnych bukmacherów</strong> zaktualizowany na {monthName} {currentYear}. Odbierz pakiety VIP, darmowe freebety i graj bezpiecznie.
        </p>
        
        <div className="flex flex-wrap justify-center gap-3 md:gap-6 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-6">
            <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                <i className="fas fa-check-circle text-green-500 mr-1.5"></i>
                Aktualizacja: {monthName} {currentYear}
            </span>
            <span className="flex items-center bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                <span className="text-red-500 font-extrabold mr-1.5">18+</span>
                Odpowiedzialna Gra
            </span>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-4 px-2">
                {/* --- ZMIANA: Zdegradowaliśmy to do H3 (mniejszy priorytet SEO) --- */}
                <h3 className="text-xl md:text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <i className="fas fa-trophy text-yellow-500"></i> Legalni Bukmacherzy w Polsce – Ranking {currentYear}
                </h3>
                <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold uppercase tracking-wide border border-green-200">
                    {monthName} {currentYear}
                </span>
            </div>
            
            <RankingTable currentDate={dynamicDateString} />
        </div>
        
        <aside className="lg:col-span-4 space-y-8">
            <NewsWidget />
            
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg text-white text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-yellow-400 opacity-10 rounded-full blur-2xl"></div>
                <i className="fas fa-user-shield text-yellow-400 text-3xl mb-3 relative z-10"></i>
                <h4 className="font-bold mb-2 relative z-10">Strefa Bezpieczeństwa</h4>
                <p className="text-xs text-slate-400 leading-relaxed relative z-10">
                    Wszystkie firmy w naszym rankingu posiadają zezwolenie Ministerstwa Finansów. Gra u nielegalnych bukmacherów jest surowo karana. Hazard wiąże się z ryzykiem uzależnienia.
                </p>
            </div>
        </aside>
      </div>

      <section className="bg-white border-t border-gray-200 py-16 mt-8">
        <div className="container mx-auto px-4 max-w-4xl">
            
            <div className="text-center mb-14">
                <h2 className="text-3xl font-black text-slate-900 mb-4 flex items-center justify-center gap-3">
                    Bonusy Bukmacherskie bez tajemnic <i className="fas fa-search text-blue-600"></i>
                </h2>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Musisz to wiedzieć przed wybraniem bonusu. Przewodnik dla początkujących graczy na {currentYear} rok.
                </p>
            </div>

            <div className="mb-12">
                {/* --- ZMIANA KLUCZOWA: Awansowaliśmy to do H2 (wysoki priorytet SEO dla frazy "Darmowe Bonusy") --- */}
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-l-4 border-blue-500 pl-4">
                    Darmowe Bonusy Bukmacherskie (Bez Depozytu) – Jak je odebrać?
                </h2>
                <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                    <p className="mb-4">
                        Oferty powitalne, a w szczególności <strong>bonusy bez depozytu</strong> i inne formy zachęty bez dwóch zdań działają na wyobraźnię początkujących graczy. Trzeba jednak pamiętać, że oferowany przez bukmachera bonus jest jedynie częścią jego strategii pozyskiwania nowych klientów. To właśnie dlatego warunki go dotyczące, np. te mówiące o wymaganym obrocie, pisane są często tzw. „drobnym druczkiem”.
                    </p>
                    <p>
                        Zazwyczaj bukmacherzy kierują <strong>darmowe bonusy (freebety)</strong>, cashbacki i inne promocje do nowych klientów, niezarejestrowanych wcześniej na danej stronie. Zdarzają się również bonusy dla stałych klientów – jak np. freebet urodzinowy w Betfan czy programy lojalnościowe.
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                    <h4 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                        <i className="fas fa-exclamation-circle text-orange-500"></i> Na co uważać przy wyborze bonusu?
                    </h4>
                    <ul className="space-y-4 text-sm text-slate-700">
                        <li className="flex items-start gap-3">
                            <span className="mt-1 text-orange-400">●</span>
                            <span>
                                <strong>Warunki wypłaty (Obrót).</strong> Pieniądze z bonusu rzadko można wypłacić od razu. Zawsze sprawdź regulamin, który definiuje, ile razy musisz obrócić kwotą (np. zagrać za jej 3-krotność).
                            </span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="mt-1 text-orange-400">●</span>
                            <span>
                                <strong>Kody Promocyjne.</strong> Często najwyższy bonus dostępny jest tylko po wpisaniu specjalnego kodu (np. BUKBONUS) podczas rejestracji.
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                    <h4 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2">
                        <i className="fas fa-info-circle text-blue-500"></i> Rodzaje promocji bukmacherskich
                    </h4>
                    <ul className="space-y-3">
                         <li className="bg-white p-3 rounded-lg shadow-sm">
                            <span className="block font-bold text-slate-900 text-sm mb-1">Zakład Bez Ryzyka (Cashback)</span>
                            <span className="text-xs text-slate-500">Jeśli przegrasz pierwszy zakład, bukmacher zwraca Ci stawkę na konto.</span>
                        </li>
                        <li className="bg-white p-3 rounded-lg shadow-sm">
                            <span className="block font-bold text-slate-900 text-sm mb-1">Freebet (Darmowy Zakład)</span>
                            <span className="text-xs text-slate-500">Otrzymujesz darmowe środki na grę za samą rejestrację lub wpłatę.</span>
                        </li>
                        <li className="bg-white p-3 rounded-lg shadow-sm">
                            <span className="block font-bold text-slate-900 text-sm mb-1">Bonus od Depozytu</span>
                            <span className="text-xs text-slate-500">Bukmacher podwaja Twoją pierwszą wpłatę (np. 100% do 1000 PLN).</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="mt-16">
                <h3 className="text-2xl font-black text-center mb-8">Często Zadawane Pytania (FAQ) - Bonusy</h3>
                <div className="space-y-4">
                    <div className="bg-slate-50 rounded-xl p-5 cursor-pointer hover:bg-slate-100 transition">
                        <h4 className="font-bold text-slate-800 mb-2">❓ Jaki jest najlepszy bonus bukmacherski na start?</h4>
                        <p className="text-sm text-slate-600">
                            Zdecydowanie polecamy <strong>Zakład Bez Ryzyka (Cashback)</strong>. Oferuje go m.in. STS i Fortuna. Dzięki temu, jeśli Twój pierwszy kupon okaże się przegrany, otrzymasz zwrot pieniędzy.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5 cursor-pointer hover:bg-slate-100 transition">
                        <h4 className="font-bold text-slate-800 mb-2">❓ Czy trzeba wpisywać kod promocyjny?</h4>
                        <p className="text-sm text-slate-600">
                            Tak, użycie kodu <strong>BUKBONUS</strong> podczas rejestracji gwarantuje wyższy pakiet powitalny (tzw. oferta VIP), często niedostępny dla standardowych użytkowników.
                        </p>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5 cursor-pointer hover:bg-slate-100 transition">
                        <h4 className="font-bold text-slate-800 mb-2">❓ Czy bukmacherzy są w Polsce legalni?</h4>
                        <p className="text-sm text-slate-600">
                            W naszym rankingu prezentujemy wyłącznie firmy posiadające <strong>zezwolenie Ministerstwa Finansów</strong>. Gra u nich jest w 100% legalna i bezpieczna.
                        </p>
                    </div>
                </div>
            </div>

        </div>
      </section>

      <Footer />
    </>
  );
}