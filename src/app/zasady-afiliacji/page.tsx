import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // <--- DODANO IMPORT

export default function AffiliatePrinciplesPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 max-w-4xl mt-10 mb-16 flex-grow">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            Transparentność, Zasady Afiliacji i Reklama
          </h1>
          
          <div className="prose prose-slate max-w-none text-slate-700">
            <p className="lead text-lg font-medium text-slate-600 mb-8">
              W serwisie BukBonus.pl stawiamy na pełną uczciwość wobec naszych czytelników. 
              Zgodnie z obowiązującymi przepisami prawa (w tym Aktem o Usługach Cyfrowych - DSA oraz wytycznymi Prezesa UOKiK), 
              poniżej przedstawiamy szczegółowe informacje dotyczące modelu biznesowego naszej strony, 
              współpracy reklamowej oraz sposobu prezentowania treści komercyjnych.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Nasz Model Biznesowy – Jak zarabiamy?</h2>
            <p>
              BukBonus.pl jest portalem darmowym dla użytkowników. Nie pobieramy opłat za dostęp do treści, analiz, typów bukmacherskich czy rankingów. 
              Aby móc utrzymywać serwery, opłacać redakcję i rozwijać jakość naszych materiałów, korzystamy z <strong>marketingu afiliacyjnego</strong>.
            </p>
            <p>
              Oznacza to, że w treściach publikowanych na stronie znajdują się tzw. <strong>linki afiliacyjne</strong>. 
              Są to odnośniki prowadzące do stron naszych Partnerów (legalnych bukmacherów).
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>
                <strong>Brak kosztów dla Ciebie:</strong> Kliknięcie w link afiliacyjny lub rejestracja u bukmachera za jego pośrednictwem 
                nie wiąże się dla Ciebie z żadnymi dodatkowymi kosztami. Często wręcz przeciwnie – korzystając z naszych linków, 
                możesz otrzymać dedykowane, wyższe bonusy powitalne, niedostępne w standardowej ofercie.
              </li>
              <li>
                <strong>Prowizja:</strong> Jeśli klikniesz w link afiliacyjny i dokonasz określonej akcji (np. założysz konto gracza lub wpłacisz depozyt), 
                my jako Wydawca możemy otrzymać prowizję od Partnera.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Oznaczanie treści reklamowych (Zgodność z UOKiK)</h2>
            <p>
              Każda treść o charakterze komercyjnym w naszym serwisie jest odpowiednio oznaczona, abyś nie miał wątpliwości, 
              kiedy masz do czynienia z materiałem redakcyjnym, a kiedy z przekazem reklamowym.
            </p>
            <p>Stosujemy następujące oznaczenia:</p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Gwiazdka (*) lub adnotacja "Link partnerski":</strong> Przy przyciskach i linkach prowadzących do ofert bukmacherów.</li>
              <li><strong>Sekcje sponsorowane:</strong> Rankingi bukmacherów oraz listy bonusów są zestawieniami o charakterze reklamowym.</li>
              <li><strong>Banery reklamowe:</strong> Graficzne elementy promujące konkretne marki.</li>
            </ul>


            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Parametry Targetowania Reklam (DSA)</h2>
            <p>
              Zgodnie z Aktem o Usługach Cyfrowych (DSA), informujemy o głównych parametrach, które decydują o tym, jakie reklamy są Ci wyświetlane:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>
                <strong>Kontekst strony:</strong> Reklamy są ściśle powiązane z tematyką serwisu (sport, zakłady bukmacherskie). 
                Nie wyświetlamy reklam niepowiązanych tematycznie (np. AGD, odzież).
              </li>
              <li>
                <strong>Lokalizacja:</strong> Treści reklamowe są kierowane wyłącznie do użytkowników przebywających na terytorium Polski, 
                ze względu na regulacje Ustawy Hazardowej.
              </li>
              <li>
                <strong>Brak profilowania wrażliwego:</strong> Nie wykorzystujemy Twoich danych wrażliwych (wyznanie, orientacja, poglądy polityczne) 
                do targetowania reklam.
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Obiektywizm a Współpraca</h2>
            <p>
              Mimo komercyjnego charakteru współpracy, dokładamy starań, aby nasze recenzje i rankingi były merytoryczne. 
              Oceniamy bukmacherów pod kątem wysokości kursów, jakości aplikacji mobilnej, szybkości wypłat i oferty zakładów. 
              Niemniej jednak, fakt współpracy partnerskiej może mieć wpływ na:
            </p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li>Kolejność prezentowania podmiotów w rankingach.</li>
              <li>Ekspozycję graficzną danej marki (np. "Bukmacher Miesiąca").</li>
              <li>Dostępność dedykowanych kodów promocyjnych.</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mt-8 rounded-r-lg">
              <h3 className="font-bold text-blue-900 text-lg mb-2">Masz pytania?</h3>
              <p className="text-blue-800">
                Jeśli masz jakiekolwiek wątpliwości dotyczące sposobu oznaczania reklam lub naszej współpracy z partnerami, 
                skontaktuj się z nami: <strong>bukbonuskontakt@gmail.com</strong>.
              </p>
            </div>

          </div>
        </div>
      </div>
      
      <Footer /> 
    </main>
  );
}