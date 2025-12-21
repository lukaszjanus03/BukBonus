import RankingTable from '@/components/RankingTable';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';
import Navbar from '@/components/Navbar';
import NewsWidget from '@/components/NewsWidget';

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col">
      
      {/* 1. Navbar */}
      <Navbar />

      {/* 2. Hero Header */}
      <header className="bg-white py-12 border-b border-gray-200 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Najlepsze Bonusy <span className="text-blue-600">Bukmacherskie</span>
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
                {/* ZMIANA TUTAJ: Zamiast ikonek fa-1 i fa-8, jest zwykły tekst 18+ */}
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
                    Ranking Bukmacherów 2025
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

      <Footer />
      <CookieConsent />

    </main>
  );
}