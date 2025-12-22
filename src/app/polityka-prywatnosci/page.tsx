import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 max-w-4xl mt-10 mb-16 flex-grow">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2">
            Polityka Prywatności i Plików Cookies
          </h1>
          <p className="text-slate-500 mb-8 border-b border-slate-100 pb-6">
            Obowiązuje od dnia: {new Date().toLocaleDateString('pl-PL')}
          </p>
          
          <div className="prose prose-slate max-w-none text-slate-700 text-sm md:text-base leading-relaxed">
            
            <p className="lead font-medium text-slate-900">
              Szanujemy prywatność Użytkowników odwiedzających serwis <strong>BukBonus.pl</strong>. 
              Poniższy dokument szczegółowo opisuje zasady gromadzenia, przetwarzania i wykorzystywania danych osobowych 
              oraz plików cookies, zgodnie z Rozporządzeniem Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO).
            </p>

            {/* §1 */}
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-l-4 border-green-500 pl-4">
              §1. Administrator Danych Osobowych
            </h2>
            <p>
              1. Administratorem danych osobowych Użytkowników serwisu BukBonus.pl (zwanego dalej "Serwisem") jest: 
              <strong> Redakcja BukBonus.pl</strong> (dalej: "Administrator").<br />
              2. Kontakt z Administratorem w sprawach ochrony danych osobowych możliwy jest pod adresem e-mail: 
              <a href="mailto:bukbonuskontakt@gmail.com" className="text-blue-600 font-bold ml-1 hover:underline">bukbonuskontakt@gmail.com</a>.
            </p>

            {/* §2 */}
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-l-4 border-green-500 pl-4">
              §2. Cele i Podstawy Prawne Przetwarzania Danych
            </h2>
            <p>Administrator przetwarza dane osobowe w następujących celach i na następujących podstawach prawnych:</p>
            <ul className="list-disc pl-6 space-y-3 my-4">
              <li>
                <strong>Świadczenie usług drogą elektroniczną</strong> – w celu udostępniania treści w Serwisie (podstawa prawna: art. 6 ust. 1 lit. b RODO – niezbędność do wykonania umowy o świadczenie usług drogą elektroniczną).
              </li>
              <li>
                <strong>Kontakt z Użytkownikiem</strong> – w przypadku przesłania zapytania mailowego, dane (adres e-mail, imię) przetwarzane są w celu udzielenia odpowiedzi (podstawa prawna: art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes Administratora polegający na budowaniu relacji z użytkownikami).
              </li>
              <li>
                <strong>Cele analityczne i statystyczne</strong> – w celu badania aktywności Użytkowników na stronie, tworzenia statystyk oglądalności, co pozwala ulepszać strukturę i zawartość Serwisu (podstawa prawna: art. 6 ust. 1 lit. f RODO – prawnie uzasadniony interes Administratora).
              </li>
              <li>
                <strong>Cele marketingowe</strong> – w tym marketing afiliacyjny, polegający na prezentowaniu ofert partnerów handlowych (legalnych bukmacherów) (podstawa prawna: art. 6 ust. 1 lit. f RODO).
              </li>
              <li>
                <strong>Zapewnienie bezpieczeństwa</strong> – w tym wykrywanie nadużyć i ochrona przed atakami typu DDoS (podstawa prawna: art. 6 ust. 1 lit. f RODO).
              </li>
            </ul>

            {/* §3 */}
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-l-4 border-green-500 pl-4">
              §3. Odbiorcy Danych
            </h2>
            <p>
              Dane osobowe Użytkowników mogą być przekazywane podmiotom współpracującym z Administratorem wyłącznie w zakresie niezbędnym do realizacji celów opisanych w §2, w szczególności:
            </p>
            <ol className="list-decimal pl-6 space-y-2 my-4">
              <li><strong>Dostawcom usług hostingowych i technicznych</strong> – firmom zapewniającym miejsce na serwerze (np. Seohost, Netlify) oraz obsługę domeny.</li>
              <li><strong>Dostawcom narzędzi analitycznych</strong> – np. Google Ireland Limited (w ramach usługi Google Analytics).</li>
              <li><strong>Organom państwowym</strong> – w przypadkach przewidzianych przez prawo (np. na żądanie policji lub prokuratury).</li>
            </ol>
            <p className="bg-yellow-50 p-4 rounded-lg text-sm border border-yellow-200">
              <strong>Ważne:</strong> Administrator nie sprzedaje danych osobowych Użytkowników podmiotom trzecim. Serwis zawiera linki afiliacyjne kierujące do stron bukmacherów. Po kliknięciu w taki link, Użytkownik przechodzi na stronę zewnętrzną, gdzie obowiązuje polityka prywatności danego bukmachera.
            </p>

            {/* §4 */}
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-l-4 border-green-500 pl-4">
              §4. Pliki Cookies (Ciasteczka) i Logi Systemowe
            </h2>
            <p>
              1. Serwis wykorzystuje pliki <strong>cookies</strong>. Są to niewielkie pliki tekstowe wysyłane przez serwer www i przechowywane przez oprogramowanie komputera przeglądarki. Kiedy przeglądarka ponownie połączy się ze stroną, witryna rozpoznaje rodzaj urządzenia, z którego łączy się użytkownik.
            </p>
            <p className="mt-2">2. Serwis stosuje dwa zasadnicze rodzaje plików cookies:</p>
            <ul className="list-disc pl-6 space-y-2 my-2">
              <li><strong>Cookies sesyjne:</strong> są plikami tymczasowymi, przechowywanymi w urządzeniu końcowym Użytkownika do czasu wylogowania, opuszczenia strony internetowej lub wyłączenia oprogramowania (przeglądarki internetowej).</li>
              <li><strong>Cookies stałe:</strong> przechowywane są w urządzeniu końcowym Użytkownika przez czas określony w parametrach plików cookies lub do czasu ich usunięcia przez Użytkownika.</li>
            </ul>

            <h3 className="font-bold text-slate-800 mt-4 mb-2">Rodzaje wykorzystywanych cookies:</h3>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li><strong>Niezbędne:</strong> umożliwiające korzystanie z usług dostępnych w ramach Serwisu, np. zapewniające bezpieczeństwo.</li>
              <li><strong>Analityczne (Google Analytics):</strong> umożliwiające zbieranie informacji o sposobie korzystania ze stron internetowych Serwisu, co pomaga w ich ulepszaniu. Informacje te są anonimizowane (np. maskowanie adresu IP).</li>
              <li><strong>Afiliacyjne:</strong> pliki umożliwiające weryfikację, czy Użytkownik przeszedł na stronę Partnera (bukmachera) z naszego Serwisu. Jest to niezbędne do rozliczeń partnerskich, ale nie wiąże się z przekazywaniem danych osobowych Użytkownika.</li>
            </ul>

            <h3 className="font-bold text-slate-800 mt-4 mb-2">Zarządzanie plikami cookies:</h3>
            <p>
              Użytkownik ma prawo zadecydowania w zakresie dostępu plików cookies do swojego komputera poprzez ich uprzedni wybór w oknie swojej przeglądarki. Szczegółowe informacje o możliwości i sposobach obsługi plików cookies dostępne są w ustawieniach oprogramowania (przeglądarki internetowej). 
              Ograniczenie stosowania plików cookies może wpłynąć na niektóre funkcjonalności dostępne na stronie internetowej Serwisu.
            </p>

            <h3 className="font-bold text-slate-800 mt-4 mb-2">Logi serwera:</h3>
            <p>
              Informacje o niektórych zachowaniach Użytkowników podlegają logowaniu w warstwie serwerowej. Dane te obejmują m.in. adres IP, datę i czas serwera, informacje o przeglądarce i systemie operacyjnym. Dane te są wykorzystywane wyłącznie w celu administrowania serwisem oraz w celu zapewnienia jak najbardziej sprawnej obsługi świadczonych usług hostingowych.
            </p>

            {/* §5 */}
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-l-4 border-green-500 pl-4">
              §5. Prawa Użytkownika
            </h2>
            <p>Zgodnie z przepisami RODO, Użytkownikowi przysługują następujące prawa w związku z przetwarzaniem jego danych osobowych:</p>
            <ul className="list-disc pl-6 space-y-2 my-4">
              <li><strong>Prawo dostępu do danych</strong> – uzyskania informacji o przetwarzanych danych oraz otrzymania ich kopii.</li>
              <li><strong>Prawo do sprostowania danych</strong> – żądania poprawienia danych, które są nieprawidłowe lub uzupełnienia niekompletnych danych.</li>
              <li><strong>Prawo do usunięcia danych ("prawo do bycia zapomnianym")</strong> – żądania usunięcia danych, jeżeli nie ma podstaw prawnych do ich dalszego przetwarzania.</li>
              <li><strong>Prawo do ograniczenia przetwarzania</strong> – w przypadkach określonych w art. 18 RODO.</li>
              <li><strong>Prawo do przenoszenia danych</strong> – otrzymania danych w ustrukturyzowanym formacie.</li>
              <li><strong>Prawo do sprzeciwu</strong> – wobec przetwarzania danych w celach marketingowych lub ze względu na szczególną sytuację Użytkownika.</li>
              <li><strong>Prawo wniesienia skargi</strong> do organu nadzorczego – Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa), jeśli Użytkownik uzna, że przetwarzanie danych narusza przepisy RODO.</li>
            </ul>

            {/* §6 */}
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-l-4 border-green-500 pl-4">
              §6. Google Analytics i Narzędzia Analityczne
            </h2>
            <p>
              1. Serwis korzysta z Google Analytics, internetowej usługi analitycznej świadczonej przez Google Ireland Limited. <br />
              2. Google Analytics wykorzystuje pliki cookies w celu analizy korzystania z witryny. Informacje generowane przez cookie na temat korzystania z witryny są zazwyczaj przesyłane na serwer Google i tam przechowywane.<br />
              3. W ramach Serwisu aktywowana została <strong>anonimizacja adresów IP</strong>. Oznacza to, że adres IP Użytkownika zostanie skrócony przez Google w obrębie państw członkowskich Unii Europejskiej przed przesłaniem do USA.<br />
              4. Użytkownik może zapobiec gromadzeniu danych przez Google Analytics, instalując wtyczkę do przeglądarki dostępną pod adresem: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="nofollow noreferrer" className="text-blue-600 hover:underline">https://tools.google.com/dlpage/gaoptout</a>.
            </p>

            {/* §7 */}
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-l-4 border-green-500 pl-4">
              §7. Odpowiedzialność i Linki Zewnętrzne
            </h2>
            <p>
              W Serwisie mogą pojawiać się linki do innych stron internetowych (w szczególności stron legalnych bukmacherów). Takie strony internetowe działają niezależnie od Serwisu i nie są w żaden sposób nadzorowane przez serwis BukBonus.pl. Strony te mogą posiadać własne polityki dotyczące prywatności oraz regulaminy, z którymi zalecamy się zapoznać. Administrator nie ponosi odpowiedzialności za zasady postępowania z danymi w ramach tych stron.
            </p>

            {/* §8 */}
            <h2 className="text-xl font-bold text-slate-900 mt-8 mb-4 border-l-4 border-green-500 pl-4">
              §8. Zmiany Polityki Prywatności
            </h2>
            <p>
              Administrator zastrzega sobie prawo do zmiany w polityce ochrony prywatności Serwisu, na co może wpłynąć rozwój technologii internetowej, ewentualne zmiany prawa w zakresie ochrony danych osobowych oraz rozwój samego Serwisu. O wszelkich zmianach będziemy informować w sposób widoczny i zrozumiały.
            </p>

          </div>
        </div>
      </div>

      <Footer /> 
    </main>
  );
}