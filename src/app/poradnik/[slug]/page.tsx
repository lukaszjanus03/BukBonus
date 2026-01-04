import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs'; // <--- IMPORTUJEMY KOMPONENT
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// --- BAZA DANYCH Z FAQ (Skrócona dla czytelności kodu - wklej tu swoją pełną wersję z poprzedniego kroku) ---
// UWAGA: Upewnij się, że masz tu pełną zawartość GUIDES_DATA z poprzedniego kroku!
const GUIDES_DATA: Record<string, any> = {
  superbet: {
    name: 'Superbet',
    slug: 'superbet',
    logo: 'https://play-lh.googleusercontent.com/0ygX2EFB7ZOfe7cA0EgZ4KBqHf942ShCQPzJJwoo41Y8gqAvDJAQzTzJ-zMj2ejgLI0=w240-h480-rw',
    rating: '4.9',
    color: 'text-red-600',
    bg: 'bg-red-600',
    bonusValue: '3754 PLN',
    intro: 'Superbet oferuje rewolucyjny "Tydzień bez ryzyka", ale **UWAGA**: Ta oferta jest ekskluzywna i działa TYLKO z kodem promocyjnym **BUKBONUS**. Jeśli nie wpiszesz tego kodu przy rejestracji, stracisz prawo do najwyższego pakietu powitalnego.',
    steps: [
      {
        title: 'Krok 1: Przejdź przez nasz link',
        desc: 'Aby kod **BUKBONUS** zadziałał poprawnie, musisz wejść na stronę bukmachera przez przycisk na dole tej strony.',
        highlight: 'Użyj linku partnerskiego, aby aktywować kod BUKBONUS.'
      },
      {
        title: 'Krok 2: Wpisz kod BUKBONUS',
        desc: 'W formularzu rejestracyjnym znajdziesz pole "Kod promocyjny". **MUSISZ tam wpisać: BUKBONUS**. Bez tego nie otrzymasz darmowych środków!',
        code: 'BUKBONUS',
        warning: 'Brak kodu BUKBONUS = Przepadek bonusu VIP!'
      },
      {
        title: 'Krok 3: Tydzień bez ryzyka',
        desc: 'Dzięki rejestracji z naszym kodem, Twój pierwszy tydzień jest chroniony. Jeśli przegrasz, Superbet zwróci Ci do 3500 PLN.',
      }
    ],
    rules: [
        "Otrzymany bonus (Zwrot za Tydzień bez ryzyka) należy obrócić 2-krotnie (x2).",
        "Do obrotu zaliczają się tylko kupony z kursem minimalnym 1.80.",
        "Na wykonanie obrotu masz 10 dni od momentu przyznania środków bonusowych.",
        "Freebet za aplikację nie wymaga obrotu."
    ],
    faq: [
        { q: "Jaki jest kod promocyjny do Superbet?", a: "Aktualny kod promocyjny to BUKBONUS. Należy go wpisać w formularzu rejestracyjnym, aby odebrać powiększony pakiet powitalny 3754 PLN." },
        { q: "Jak odebrać freebet za aplikację?", a: "Wystarczy pobrać aplikację mobilną Superbet po rejestracji z kodem BUKBONUS i zalogować się w niej. Bonus 20 PLN zostanie przypisany automatycznie." },
        { q: "Jak działa tydzień bez ryzyka?", a: "Przez pierwsze 7 dni grasz bez stresu. Jeśli po tygodniu będziesz na minusie, Superbet zwróci Ci przegraną kwotę (do 3500 PLN) w formie bonusu." }
    ]
  },
  sts: {
    name: 'STS',
    slug: 'sts',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZR0K8gIc1a6Yx33pUR3Op8lK0VFxStZiwww&s',
    rating: '4.8',
    color: 'text-blue-600',
    bg: 'bg-blue-600',
    bonusValue: '760 PLN',
    intro: 'STS to lider rynku. Aby odebrać pełne 760 PLN, **niezbędne jest użycie kodu BUKBONUS** podczas zakładania konta. Bez tego kodu ominie Cię zakład bez ryzyka na start!',
    steps: [
      { title: 'Krok 1: Rejestracja', desc: 'Wypełnij szybki formularz. Pamiętaj, że wchodząc z naszego linku, przygotowujesz konto pod kod **BUKBONUS**.' },
      { title: 'Krok 2: Kod promocyjny BUKBONUS', desc: 'W drugim kroku formularza zobaczysz pole na kod. **WPISZ TUTAJ: BUKBONUS**. To gwarancja, że Twój pierwszy zakład będzie ubezpieczony.', code: 'BUKBONUS' },
      { title: 'Krok 3: Zakład Bez Ryzyka', desc: 'Wpłać depozyt i postaw kupon. Dzięki kodowi **BUKBONUS**, jeśli przegrasz, kasa do 100 zł wróci do Ciebie.' }
    ],
    rules: [ "Bonusy za zadania oraz bonusy od wpłat wymagają 2-krotnego obrotu (x2).", "Kurs całkowity kuponu zaliczanego do obrotu musi wynosić min. 1.91." ],
    faq: [
        { q: "Jaki jest kod do STS?", a: "Kod promocyjny STS to BUKBONUS. Gwarantuje on zakład bez ryzyka 100 PLN oraz bonusy od wpłat i za zadania." },
        { q: "Czy STS jest legalny?", a: "Tak, STS posiada zezwolenie Ministerstwa Finansów i jest w pełni legalnym polskim bukmacherem." },
        { q: "Jak wypłacić bonus w STS?", a: "Bonus należy obrócić dwukrotnie na wygranych kuponach z kursem min. 1.91." }
    ]
  },
  fortuna: {
    name: 'Fortuna',
    slug: 'fortuna',
    logo: 'https://i1.sndcdn.com/avatars-000330081863-yuozc1-original.jpg',
    rating: '4.7',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500',
    bonusValue: '330 PLN',
    intro: 'Fortuna daje zwrot w GOTÓWCE, ale żeby skorzystać z pełnego pakietu, **musisz użyć kodu BUKBONUS**. To ten kod aktywuje pakiet VIP.',
    steps: [
      { title: 'Krok 1: Rejestracja z kodem', desc: 'Wypełniając formularz, upewnij się, że w polu "Kod Promocyjny" widnieje napis **BUKBONUS**.', code: 'BUKBONUS' },
      { title: 'Krok 2: Weryfikacja', desc: 'Aby kod **BUKBONUS** zadziałał w 100% i dał Ci darmowe 20 PLN, musisz zweryfikować konto.' },
      { title: 'Krok 3: Trzy Zakłady Bez Ryzyka', desc: 'Dzięki rejestracji z kodem **BUKBONUS**, Twoje trzy pierwsze kluczowe kupony są ubezpieczone.' }
    ],
    rules: [ "Zwroty za 3 Zakłady Bez Ryzyka trafiają bezpośrednio na konto depozytowe (gotówka).", "Środków ze zwrotu NIE TRZEBA obracać." ],
    faq: [
        { q: "Czy Fortuna ma bonus bez depozytu?", a: "Tak, Fortuna oferuje 20 PLN w punktach FKP (Freebet) za pełną rejestrację i weryfikację konta z kodem BUKBONUS." },
        { q: "Jaki jest kod promocyjny Fortuna?", a: "Kod to BUKBONUS. Uprawnia on do odbioru 3 zakładów bez ryzyka oraz freebetu bez depozytu." },
        { q: "Czy zwrot w Fortunie trzeba obracać?", a: "Nie! Fortuna jako jeden z nielicznych bukmacherów zwraca środki w gotówce, którą można od razu wypłacić." }
    ]
  },
  betclic: {
    name: 'Betclic',
    slug: 'betclic',
    logo: 'https://dam.begmedia.com/front/native-apps/app-sports.png',
    rating: '4.6',
    color: 'text-red-700',
    bg: 'bg-red-700',
    bonusValue: '50 PLN + Bez Podatku',
    intro: 'W Betclic grasz bez podatku, ale Zakład Bez Ryzyka na start jest dostępny **wyłącznie z kodem BUKBONUS**.',
    steps: [
      { title: 'Krok 1: Rejestracja', desc: 'Wpisz kod **BUKBONUS** w formularzu.', code: 'BUKBONUS' },
      { title: 'Krok 2: Pierwszy Zakład', desc: 'Postaw kupon. Jeśli przegrasz, otrzymasz zwrot (freebet) do 50 PLN.' }
    ],
    rules: [ "Zwrot przyznawany jest we freebecie.", "Minimalny kurs kuponu granego za freebet to 2.14." ],
    faq: [
        { q: "Jaki jest kod do Betclic?", a: "Kod promocyjny Betclic to BUKBONUS. Aktywuje on zakład bez ryzyka do 50 PLN." },
        { q: "Czy w Betclic gra się bez podatku?", a: "Tak, Betclic oferuje grę bez podatku na wszystkie kupony, nie tylko dla nowych graczy." },
        { q: "Jak obrócić bonus w Betclic?", a: "Zwrot (freebet) należy postawić na kuponie z kursem min. 2.14. Wygrana netto trafia od razu na konto główne." }
    ]
  },
  lvbet: {
    name: 'LVBET',
    slug: 'lvbet',
    logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/lv-bet-logo.jpg',
    rating: '4.5',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400',
    bonusValue: '2000 PLN',
    intro: 'LVBET ma ogromny pakiet powitalny. **Freebet 20 PLN jest dostępny TYLKO dla graczy z kodem BUKBONUS**.',
    steps: [
      { title: 'Krok 1: Rejestracja', desc: 'Wpisz kod **BUKBONUS**.', code: 'BUKBONUS' },
      { title: 'Krok 2: Freebet', desc: 'Po weryfikacji otrzymasz 20 PLN za darmo.' }
    ],
    rules: ["Freebet 20 PLN wymaga obrotu na kuponie kombi (min. 3 zdarzenia, kurs 2.50)."],
    faq: [
        { q: "Jaki jest kod do LVBET?", a: "Kod to BUKBONUS. Tylko z nim otrzymasz darmowe 20 PLN bez depozytu." },
        { q: "Czy LVBET daje darmowe pieniądze?", a: "Tak, po rejestracji z kodem i weryfikacji otrzymujesz 20 PLN freebetu." },
        { q: "Jak odebrać bonus od wpłaty?", a: "Bonusy od wpłat (do 2000 PLN) są przyznawane automatycznie po dokonaniu depozytu z kodem." }
    ]
  },
  betfan: {
    name: 'Betfan',
    slug: 'betfan',
    logo: 'https://pewniaczki.pl/wp-content/uploads/2021/03/betfan.png',
    rating: '4.4',
    color: 'text-green-500',
    bg: 'bg-green-500',
    bonusValue: '400 PLN (200%)',
    intro: 'Chcesz potroić wpłatę? Oferta 200% od wpłaty w Betfan działa najlepiej z kodem **BUKBONUS**.',
    steps: [
      { title: 'Krok 1: Rejestracja', desc: 'Wpisz kod **BUKBONUS**.', code: 'BUKBONUS' },
      { title: 'Krok 2: Wpłata', desc: 'Wpłać 200 zł, odbierz 400 zł bonusu.' }
    ],
    rules: ["Środki bonusowe wymagają 1-krotnego obrotu na kuponie AKO."],
    faq: [
        { q: "Jaki jest kod promocyjny Betfan?", a: "Kod to BUKBONUS. Pozwala on na potrojenie pierwszej wpłaty (200% do 400 PLN)." },
        { q: "Ile trzeba wpłacić do Betfan?", a: "Aby maksymalnie wykorzystać bonus, wpłać 200 PLN. Otrzymasz wtedy dodatkowe 400 PLN na grę." },
        { q: "Czy Betfan ma grę bez podatku?", a: "Tak, Betfan oferuje grę bez podatku na kuponach spełniających proste warunki." }
    ]
  },
  totalbet: {
    name: 'Totalbet',
    slug: 'totalbet',
    logo: 'https://surebety.pl/wp-content/uploads/2020/12/totalbet-pl-zaklady-bukmacherskie-logo.jpg',
    rating: '4.3',
    color: 'text-green-700',
    bg: 'bg-green-700',
    bonusValue: '333 PLN',
    intro: 'Totalbet daje 3 zakłady bez ryzyka. **Użyj kodu BUKBONUS** w formularzu rejestracyjnym.',
    steps: [
      { title: 'Krok 1: Rejestracja', desc: 'Wpisz kod **BUKBONUS**.', code: 'BUKBONUS' },
      { title: 'Krok 2: Zakłady', desc: 'Postaw 3 kupony bez ryzyka w ciągu 48h.' }
    ],
    rules: ["Zwroty są w GOTÓWCE, bez obrotu."],
    faq: [
        { q: "Jaki jest kod do Totalbet?", a: "Kod promocyjny to BUKBONUS. Uprawnia do 3 zakładów bez ryzyka." },
        { q: "Czy zwrot w Totalbet trzeba obracać?", a: "Nie, Totalbet zwraca pieniądze na konto główne z możliwością wypłaty." },
        { q: "Ile czasu na zakłady bez ryzyka?", a: "Masz 48 godzin od rejestracji na postawienie ubezpieczonych kuponów." }
    ]
  },
  etoto: {
    name: 'Etoto',
    slug: 'etoto',
    logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/etoto-logo.jpg',
    rating: '4.2',
    color: 'text-blue-800',
    bg: 'bg-blue-800',
    bonusValue: '777 PLN',
    intro: 'W Etoto kod **BUKBONUS** otwiera drogę do bonusów od depozytu oraz freebetu za aplikację.',
    steps: [
      { title: 'Krok 1: Rejestracja', desc: 'Wpisz **BUKBONUS**.', code: 'BUKBONUS' },
      { title: 'Krok 2: Bonusy', desc: 'Odbierz bonusy od wpłat i za aplikację.' }
    ],
    rules: ["Bonusy wymagają obrotu przed wypłatą."],
    faq: [
        { q: "Jaki jest kod do Etoto?", a: "Kod to BUKBONUS." },
        { q: "Czy Etoto ma aplikację?", a: "Tak, i za jej pobranie otrzymasz dodatkowy freebet." }
    ]
  },
  fuksiarz: {
    name: 'Fuksiarz',
    slug: 'fuksiarz',
    logo: 'https://surebety.pl/wp-content/uploads/2021/04/fuksiarz-logo-bialo-czerwone-400x400-1.png',
    rating: '4.2',
    color: 'text-red-500',
    bg: 'bg-red-500',
    bonusValue: '500 PLN',
    intro: 'Fuksiarz to zwrot bez obrotu. Wpisz kod **BUKBONUS** w formularzu!',
    steps: [
      { title: 'Krok 1: Rejestracja', desc: 'Wpisz kod **BUKBONUS**.', code: 'BUKBONUS' },
      { title: 'Krok 2: Zakład', desc: 'Postaw kupon AKO. Jeśli przegrasz - zwrot 50%.' }
    ],
    rules: ["Zwrot 50% jest w gotówce, bez obrotu."],
    faq: [
        { q: "Jaki kod do Fuksiarz?", a: "Kod promocyjny to BUKBONUS." },
        { q: "Czy zwrot trzeba obracać?", a: "Nie, w Fuksiarzu zwrot jest w gotówce." }
    ]
  },
  forbet: {
    name: 'Forbet',
    slug: 'forbet',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Forbetlogo.png/250px-Forbetlogo.png',
    rating: '4.1',
    color: 'text-green-600',
    bg: 'bg-green-600',
    bonusValue: '3000 PLN',
    intro: 'Pakiet 3000 PLN w Forbet wymaga aktywacji kodem **BUKBONUS**.',
    steps: [
      { title: 'Krok 1: Rejestracja', desc: 'Wpisz kod **BUKBONUS**.', code: 'BUKBONUS' },
      { title: 'Krok 2: Bonus', desc: 'Odbierz zakład bez ryzyka do 1000 PLN.' }
    ],
    rules: ["Bonus wymaga obrotu."],
    faq: [
        { q: "Jaki jest kod do Forbet?", a: "Kod to BUKBONUS." },
        { q: "Ile wynosi zakład bez ryzyka?", a: "Z kodem możesz otrzymać zwrot do 1000 PLN." }
    ]
  }
};
// ----------------------------------------------------------------------

export async function generateStaticParams() {
  const slugs = Object.keys(GUIDES_DATA);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES_DATA[slug] || { name: 'Bukmachera' };
  
  return {
    title: `Kod Promocyjny ${guide.name} - Jak odebrać bonus z kodem BUKBONUS?`,
    description: `Instrukcja odbioru bonusu ${guide.bonusValue} w ${guide.name}. Pamiętaj o kodzie BUKBONUS przy rejestracji!`,
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = GUIDES_DATA[slug];

  if (!guide) {
      return notFound();
  }

  // --- DANE STRUKTURALNE SCHEMA.ORG ---
  const reviewSchema = {
    "@context": "https://schema.org/",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "name": guide.name,
      "image": guide.logo
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": guide.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "BukBonus.pl"
    },
    "reviewBody": `Szczegółowa analiza oferty powitalnej ${guide.name}. Sprawdź jak odebrać bonus ${guide.bonusValue}.`
  };

  const faqSchema = guide.faq ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faq.map((item: any) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  } : null;

  return (
    <div className="bg-slate-50 font-sans pb-20">
      <Navbar />

      {/* WSTRZYKNIĘCIE DANYCH STRUKTURALNYCH */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      {faqSchema && (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-left md:text-center">
            
            {/* --- ZMIANA: DODANO BREADCRUMBS --- */}
            <div className="flex justify-center mb-6">
                <Breadcrumbs 
                    items={[
                        { label: 'Strona Główna', href: '/' },
                        { label: 'Bonusy i Kody Promocyjne', href: '/' },
                        { label: `${guide.name} - Kod Promocyjny`, href: `/poradnik/${guide.slug}` }
                    ]} 
                />
            </div>
            {/* ---------------------------------- */}

            <div className="bg-yellow-400 text-slate-900 font-black text-center py-4 px-4 rounded-xl mb-10 border-4 border-yellow-200 shadow-xl animate-pulse text-lg md:text-xl transform md:scale-110">
                ⚠️ WAŻNE: ABY ODEBRAĆ BONUS, WPISZ KOD: <span className="bg-red-600 text-white px-3 py-1 rounded ml-2 inline-block tracking-widest">BUKBONUS</span>
            </div>

            <div className="inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-blue-100">
                Oficjalny Poradnik 2026
            </div>
            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                Jak odebrać bonus w <span className={guide.color}>{guide.name}</span>?
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Kompletna instrukcja "od A do Z". Pamiętaj, że warunkiem odbioru bonusu jest wpisanie kodu <strong className="bg-yellow-300 px-2 py-0.5 rounded shadow-sm">BUKBONUS</strong> w formularzu rejestracyjnym.
            </p>
        </div>
      </header>

      {/* GŁÓWNA TREŚĆ */}
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        
        {/* INFO BOX Z WARTOŚCIĄ */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm mb-12 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className={`absolute top-0 left-0 w-2 h-full ${guide.bg}`}></div>
            <div className={`w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center text-4xl shrink-0 ${guide.color} shadow-inner`}>
                <i className="fas fa-gift"></i>
            </div>
            <div className="flex-grow text-center md:text-left">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Pakiet VIP: <span className={guide.color}>{guide.bonusValue}</span></h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4 md:mb-0" dangerouslySetInnerHTML={{ __html: guide.intro.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
            </div>
            <div className="shrink-0">
                 <Link href="/" className={`inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-bold text-sm shadow-lg transition transform hover:-translate-y-1 ${guide.bg}`}>
                    Odbierz z kodem BUKBONUS
                 </Link>
            </div>
        </div>

        {/* LISTA KROKÓW (TIMELINE) */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-slate-200 before:via-slate-300 before:to-transparent">
            {guide.steps.map((step: any, index: number) => (
                <div key={index} className="relative flex flex-col md:flex-row items-start group">
                    <div className={`absolute left-0 md:left-1/2 md:-ml-6 h-12 w-12 flex items-center justify-center rounded-full bg-white border-4 border-slate-100 shadow-md z-10 font-black text-slate-400 group-hover:border-blue-500 group-hover:text-blue-600 transition-colors duration-300`}>
                        {index + 1}
                    </div>
                    
                    <div className={`hidden md:block w-1/2 ${index % 2 === 0 ? 'pr-16 text-right' : 'pl-16 order-last text-left'}`}>
                        <div className="sticky top-40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                             <span className="text-6xl font-black text-slate-100 select-none">KROK {index + 1}</span>
                        </div>
                    </div>

                    <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 text-right md:text-left'}`}>
                        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow duration-300 relative">
                            <div className={`hidden md:block absolute top-6 w-4 h-4 bg-white border-t border-l border-slate-100 transform rotate-45 ${index % 2 === 0 ? '-left-2.5' : '-right-2.5 border-t-0 border-l-0 border-b border-r'}`}></div>

                            <h3 className="text-xl font-bold text-slate-900 mb-3">
                                {step.title}
                            </h3>
                            <p className="text-slate-600 leading-relaxed mb-4 text-sm md:text-base" dangerouslySetInnerHTML={{ __html: step.desc.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900 bg-yellow-100 px-1">$1</strong>') }}>
                            </p>

                            {step.code && (
                                <div className="my-6 p-6 bg-slate-900 rounded-xl text-center relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer border-2 border-yellow-400 shadow-[0_0_20px_rgba(250,204,21,0.3)]">
                                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-16 h-16 bg-yellow-400 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                    <p className="text-yellow-400 text-xs font-bold uppercase mb-2 tracking-widest">⚠️ Wymagany Kod Promocyjny:</p>
                                    <div className="text-4xl font-black text-white tracking-widest font-mono select-all">
                                        {step.code}
                                    </div>
                                    <p className="text-[10px] text-slate-400 mt-2">Kliknij, aby skopiować kod</p>
                                </div>
                            )}

                            {step.warning && (
                                <div className="bg-red-50 text-red-800 p-3 rounded-lg border border-red-100 flex items-start gap-3 text-sm font-bold">
                                    <i className="fas fa-exclamation-triangle mt-1 shrink-0"></i>
                                    <span>{step.warning}</span>
                                </div>
                            )}

                            {step.highlight && (
                                <div className="bg-green-50 text-green-800 p-3 rounded-lg border border-green-100 flex items-start gap-3 text-sm font-bold">
                                    <i className="fas fa-check-circle mt-1 shrink-0"></i>
                                    <span>{step.highlight}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>

        {/* --- SZTYWNY REGULAMIN I WARUNKI --- */}
        {guide.rules && (
            <div className="mt-16 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center gap-3">
                    <i className="fas fa-file-contract text-yellow-400 text-xl"></i>
                    <h3 className="text-white font-bold text-lg uppercase tracking-wide">
                        📋 Regulamin: Jak uwolnić i wypłacić bonus?
                    </h3>
                </div>
                <div className="p-8">
                    <ul className="space-y-4">
                        {guide.rules.map((rule: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3 text-slate-700 text-sm leading-relaxed border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                                <span className="bg-slate-100 text-slate-500 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5">{idx + 1}</span>
                                <span>{rule}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        )}

        {/* --- SEKCJA FAQ --- */}
        {guide.faq && (
            <div className="mt-16">
                <h3 className="text-2xl font-black text-slate-900 mb-8 text-center">
                    Często zadawane pytania (FAQ) - {guide.name}
                </h3>
                <div className="space-y-4">
                    {guide.faq.map((item: any, idx: number) => (
                        <div key={idx} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
                            <h4 className="font-bold text-slate-800 text-lg mb-2 flex items-start gap-3">
                                <span className="text-blue-500">?</span>
                                {item.q}
                            </h4>
                            <p className="text-slate-600 text-sm leading-relaxed pl-6">
                                {item.a}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {/* CTA SECTION */}
        <div className="mt-24 text-center">
             <div className="relative inline-block group">
                 <div className={`absolute -inset-1 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 ${guide.bg}`}></div>
                 <a 
                    href={`https://${guide.name.toLowerCase()}.pl`} 
                    target="_blank"
                    rel="nofollow noreferrer"
                    className={`relative flex items-center gap-3 bg-slate-900 text-white font-black py-5 px-12 rounded-full text-xl shadow-2xl hover:bg-slate-800 transition-all transform hover:-translate-y-1`}
                 >
                    <span>Odbierz Bonus z kodem BUKBONUS</span>
                    <i className="fas fa-arrow-right"></i>
                 </a>
             </div>
             <p className="text-xs text-slate-400 mt-6 max-w-lg mx-auto">
                Klikając w przycisk, zostaniesz bezpiecznie przekierowany na oficjalną stronę bukmachera.
             </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}