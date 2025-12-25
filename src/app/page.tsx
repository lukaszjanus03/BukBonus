import RankingTable from '@/components/RankingTable';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import Navbar from '@/components/Navbar';
import NewsWidget from '@/components/NewsWidget';

export default function Home() {
  // DANE STRUKTURALNE (SCHEMA.ORG) - To "karmi" Google informacjami
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BukBonus.pl",
    "url": "https://bukbonus.pl",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://bukbonus.pl/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "description": "Ranking najlepszych bonusów bukmacherskich w Polsce.",
    "publisher": {
        "@type": "Organization",
        "name": "BukBonus",
        "logo": {
            "@type": "ImageObject",
            "url": "https://bukbonus.pl/logo.png"
        }
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      
      {/* Wstrzyknięcie danych strukturalnych dla Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Header */}
      <header className="bg-white py-12 border-b border-gray-200 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Najlepsze Bonusy <span className="text-blue-600">Bukmacherskie 2026</span>
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-lg mb-6">
            Sprawdź oficjalny ranking legalnych bukmacherów. Odbierz pakiety VIP i graj bezpiecznie.
        </p>
        <div className="flex justify-center gap-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest">
            <span className="flex items-center">
                <i className="fas fa-user-check text-green-500 mr-1.5"></i>
                Weryfikacja
            </span>
            <span className="flex items-center">
                <span className="text-green-500 font-extrabold text-sm mr-1.5">18+</span>
                Odpowiedzialna Gra
            </span>
        </div>
      </header>

      {/* 3. Główna treść */}
      <div className="container mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Lewa kolumna: Ranking */}
        <div className="lg:col-span-8">
            <div className="flex items-center justify-between mb-6">
                <h2 id="ranking" className="text-2xl font-bold text-slate-800 scroll-mt-36">
                    Ranking Bonusów 2026
                </h2>
                <span className="text-[10px] bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold uppercase tracking-wide">Zweryfikowane</span>
            </div>
            <RankingTable />
        </div>
        
        {/* Prawa kolumna: Sidebar */}
        <aside className="lg:col-span-4 space-y-8">
            <NewsWidget />
            <div className="bg-slate-800 p-6 rounded-2xl shadow-lg text-white text-center">
                <i className="fas fa-exclamation-triangle text-yellow-400 text-3xl mb-3"></i>
                <h4 className="font-bold mb-2">Graj Odpowiedzialnie</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                    Hazard może uzależniać. Jeśli czujesz, że tracisz kontrolę, skontaktuj się z instytucjami pomocowymi.
                </p>
            </div>
        </aside>
      </div>

      {/* 4. NOWA SEKCJA SEO - CONTENT NA DÓŁ STRONY */}
      {/* To jest kluczowe dla pozycjonowania - dużo tekstu z frazami kluczowymi */}
      <section className="bg-white border-t border-gray-200 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-black text-slate-900 mb-4">Rodzaje Bonusów Bukmacherskich – Słownik Gracza</h2>
                <p className="text-slate-600">Nie wiesz co wybrać? Wyjaśniamy najpopularniejsze promocje dostępne na polskim rynku.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-left">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                        <i className="fas fa-shield-alt text-blue-600"></i> Zakład Bez Ryzyka (Cashback)
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        To najbezpieczniejsza opcja na start. Bukmacher ubezpiecza Twój pierwszy kupon. Jeśli przegrasz, stawka wraca na Twoje konto (często jako gotówka do wypłaty!). Idealne rozwiązanie dla nowych graczy, którzy nie chcą ryzykować własnych środków na początku przygody.
                    </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                        <i className="fas fa-coins text-yellow-500"></i> Freebet (Darmowy Zakład)
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Otrzymujesz darmowe środki na grę, często bez konieczności wpłacania depozytu (tzw. freebet bez depozytu). Możesz postawić kupon, a jeśli wygrasz – czysty zysk trafia do Ciebie. To najlepszy sposób na przetestowanie oferty bukmachera za darmo.
                    </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                        <i className="fas fa-wallet text-green-600"></i> Bonus od Depozytu
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Klasyczna promocja: wpłacasz np. 100 PLN, a bukmacher dokłada drugie tyle. Dzięki temu masz 200 PLN na grę. Wymaga to zazwyczaj kilkukrotnego obrotu bonusem, ale pozwala grać za znacznie wyższe stawki.
                    </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h3 className="font-bold text-xl mb-3 flex items-center gap-2">
                        <i className="fas fa-percent text-red-500"></i> Gra Bez Podatku
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Legalni bukmacherzy w Polsce pobierają 12% podatku. Niektórzy (jak Betclic czy Fortuna w określonych godzinach) biorą ten koszt na siebie. Dzięki temu Twoje wygrane są o 14% wyższe niż standardowo.
                    </p>
                </div>
            </div>
        </div>
      </section>

      <Footer />
      <CookieConsent />

    </main>
  );
}