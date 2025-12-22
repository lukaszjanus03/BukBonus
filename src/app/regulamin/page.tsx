import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 max-w-4xl mt-10 mb-16 flex-grow">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            Regulamin Serwisu BukBonus.pl
          </h1>
          
          <div className="prose prose-slate max-w-none text-slate-700">
            <p className="text-sm text-slate-500 mb-8">Ostatnia aktualizacja: {new Date().toLocaleDateString('pl-PL')}</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">§1. Postanowienia Ogólne</h2>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li>Niniejszy Regulamin określa zasady korzystania z serwisu internetowego dostępnego pod adresem www.bukbonus.pl (dalej: "Serwis").</li>
              <li>Właścicielem i Administratorem Serwisu jest: <strong>Redakcja BukBonus.pl</strong> (dalej: "Administrator").</li>
              <li>Kontakt z Administratorem możliwy jest drogą elektroniczną pod adresem e-mail: <strong>bukbonuskontakt@gmail.com</strong>.</li>
              <li>Korzystanie z Serwisu jest dobrowolne i bezpłatne dla wszystkich użytkowników sieci Internet.</li>
              <li>Rozpoczęcie korzystania z Serwisu jest równoznaczne z zapoznaniem się, zaakceptowaniem i przestrzeganiem postanowień niniejszego Regulaminu.</li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">§2. Charakter Serwisu i Ostrzeżenie o Ryzyku</h2>
            <div className="bg-red-50 border border-red-100 p-6 rounded-xl my-4">
               <h3 className="font-bold text-red-700 mb-2 uppercase tracking-wide text-sm">Ważne Ostrzeżenie Prawne</h3>
               <p className="text-red-800 text-sm leading-relaxed">
                 Serwis ma charakter wyłącznie informacyjno-publicystyczny. <strong>Administrator nie jest bukmacherem, nie organizuje gier hazardowych, 
                 nie przyjmuje zakładów wzajemnych ani nie pośredniczy w płatnościach.</strong>
               </p>
            </div>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li>Prezentowane w Serwisie treści dotyczące zakładów bukmacherskich, w tym analizy sportowe, typy dnia oraz rankingi, stanowią subiektywną opinię autorów i nie mogą być traktowane jako gwarancja wygranej.</li>
              <li>Hazard wiąże się z ryzykiem utraty środków finansowych. Uczestnictwo w nielegalnych grach hazardowych jest przestępstwem skarbowym.</li>
              <li>Serwis promuje wyłącznie podmioty posiadające zezwolenie Ministerstwa Finansów na urządzanie zakładów wzajemnych w Polsce.</li>
              <li>Serwis przeznaczony jest <strong>wyłącznie dla osób pełnoletnich (18+)</strong>. Osoby niepełnoletnie mają zakaz korzystania z Serwisu w zakresie treści dotyczących hazardu.</li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">§3. Wyłączenie Odpowiedzialności</h2>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li>Administrator nie ponosi odpowiedzialności za:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Decyzje finansowe podejmowane przez Użytkowników na podstawie treści zawartych w Serwisie.</li>
                  <li>Ewentualne straty finansowe poniesione przez Użytkowników w grach hazardowych.</li>
                  <li>Szkody wynikłe z korzystania z treści zawartych w Serwisie.</li>
                </ul>
              </li>
              {/* NOWY PUNKT O PROMOCJACH */}
              <li>
                <strong>Aktualność ofert i promocji:</strong> Administrator dokłada wszelkich starań, aby publikowane treści były rzetelne. Zastrzegamy jednak, że opisy promocji i bonusów prezentowane w Serwisie mogą różnić się od aktualnej oferty bukmacherów, ponieważ oferty te są dynamicznie zmieniane przez operatorów. W celu upewnienia się co do warunków danej promocji, Użytkownik zobowiązany jest do sprawdzenia aktualnej oferty bezpośrednio na stronie internetowej danego bukmachera.
              </li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">§4. Prawa Autorskie</h2>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li>Wszelkie materiały udostępniane w Serwisie (teksty, grafiki, logotypy, układ rankingów, kod źródłowy) stanowią własność Administratora i są chronione prawem autorskim.</li>
              <li>Kopiowanie, rozpowszechnianie lub wykorzystywanie treści Serwisu w celach komercyjnych bez pisemnej zgody Administratora jest zabronione.</li>
              <li>Dopuszczalne jest cytowanie fragmentów treści Serwisu pod warunkiem podania źródła (linku do Serwisu).</li>
            </ol>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">§5. Polityka Prywatności i Cookies</h2>
            <p>Zasady przetwarzania danych osobowych oraz wykorzystywania plików cookies opisane są w <a href="/polityka-prywatnosci" className="text-blue-600 hover:underline font-bold">Polityce Prywatności</a>.</p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">§6. Postanowienia Końcowe</h2>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li>Administrator zastrzega sobie prawo do zmiany niniejszego Regulaminu w dowolnym czasie.</li>
              <li>W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają przepisy prawa polskiego.</li>
              <li>Graj odpowiedzialnie. Jeśli zauważysz u siebie objawy uzależnienia, skontaktuj się z instytucjami oferującymi pomoc, takimi jak Anonimowi Hazardziści.</li>
            </ol>

          </div>
        </div>
      </div>

      <Footer /> 
    </main>
  );
}