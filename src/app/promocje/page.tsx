'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PROMOTIONS = [
  {
    id: 'superbet',
    name: 'Superbet',
    logo: 'https://play-lh.googleusercontent.com/0ygX2EFB7ZOfe7cA0EgZ4KBqHf942ShCQPzJJwoo41Y8gqAvDJAQzTzJ-zMj2ejgLI0=w240-h480-rw',
    bonusTitle: 'Pakiet Powitalny 3754 PLN',
    color: 'bg-red-600',
    lightColor: 'bg-red-50',
    steps: [
      'Kliknij przycisk "Odbierz Bonus" poniżej.',
      'W formularzu rejestracyjnym upewnij się, że kod "BUKBONUS" jest wpisany.',
      'Zaznacz zgody marketingowe (to warunek konieczny!).',
      'Wpłać pierwszy depozyt (min. 50 PLN, aby otrzymać wszystkie bonusy).',
    ],
    details: [
      { title: 'Tydzień bez ryzyka (3500 PLN)', desc: 'Grasz przez 7 dni. Jeśli po tygodniu jesteś na minusie, Superbet zwraca Ci przegraną kwotę (pomniejszoną o podatek) w formie bonusu.' },
      { title: 'Bonus od depozytu (200 PLN)', desc: 'Otrzymasz 100% od swojej pierwszej wpłaty.' },
      { title: 'Freebet za aplikację (20 PLN)', desc: 'Pobierz aplikację mobilną w ciągu 7 dni od wpłaty.' },
      { title: 'Extra Freebet (34 PLN)', desc: 'Bonus specjalny za rejestrację z naszym kodem.' }
    ],
    link: 'https://superbet.pl'
  },
  {
    id: 'sts',
    name: 'STS',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZR0K8gIc1a6Yx33pUR3Op8lK0VFxStZiwww&s',
    bonusTitle: 'Pakiet na Start 760 PLN',
    color: 'bg-blue-600',
    lightColor: 'bg-blue-50',
    steps: [
      'Przejdź do STS klikając "Odbierz Bonus".',
      'Zarejestruj konto z kodem "BUKBONUS".',
      'Dokonaj trzech pierwszych wpłat, aby odblokować kolejne etapy bonusu.',
      'Wykonuj proste zadania (np. postaw kupon AKO), aby otrzymać dodatkowe 60 PLN.'
    ],
    details: [
      { title: 'Bonusy od wpłat (600 PLN)', desc: 'Premie za 1., 2. i 3. depozyt.' },
      { title: 'Zakład bez ryzyka (100 PLN)', desc: 'Postaw pierwszy zakład. Jeśli przegrasz, otrzymasz zwrot stawki (do 100 zł) na konto główne - możesz to od razu wypłacić!' },
      { title: 'Zadania (60 PLN)', desc: 'Dodatkowa gotówka za aktywność w pierwszych dniach.' }
    ],
    link: 'https://www.sts.pl'
  },
  {
    id: 'fortuna',
    name: 'Fortuna',
    logo: 'https://i1.sndcdn.com/avatars-000330081863-yuozc1-original.jpg',
    bonusTitle: 'Trzy Zakłady Bez Ryzyka (330 PLN)',
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    steps: [
      'Zarejestruj się w Fortunie przez nasz link.',
      'Koniecznie zweryfikuj konto (prześlij skan dowodu lub użyj mojeID).',
      'Twój pierwszy kupon, drugi i trzeci są ubezpieczone.',
    ],
    details: [
      { title: '3x Zakład bez ryzyka (do 100 PLN każdy)', desc: 'Grasz trzy kupony. Jeśli przegrasz, kasa wraca do Ciebie. Co ważne: zwrot jest w GOTÓWCE, możesz go od razu wypłacić!' },
      { title: 'Freebet bez depozytu (20 PLN)', desc: 'Za samą pełną rejestrację dostajesz punkty FKP, które wymienisz na zakład za 20 zł.' },
      { title: 'Freebet za wpłatę (10 PLN)', desc: 'Dodatek do pierwszej wpłaty.' }
    ],
    link: 'https://www.efortuna.pl'
  },
  {
    id: 'betclic',
    name: 'Betclic',
    logo: 'https://dam.begmedia.com/front/native-apps/app-sports.png',
    bonusTitle: 'Zakład Bez Ryzyka 50 PLN + Gra Bez Podatku',
    color: 'bg-red-700',
    lightColor: 'bg-red-50',
    steps: [
      'Kliknij i załóż konto w Betclic.',
      'Kod promocyjny "BUKBONUS" powinien być wpisany.',
      'Wpłać depozyt i postaw pierwszy kupon (kurs min. 1.14).',
    ],
    details: [
      { title: 'Gra BEZ PODATKU', desc: 'To największy atut. W Betclic grasz zawsze bez podatku 12%. Wygrane są wyższe o 14% niż u konkurencji.' },
      { title: 'Cashback (50 PLN)', desc: 'Jeśli Twój pierwszy zakład okaże się przegrany, otrzymasz zwrot stawki we freebecie.' }
    ],
    link: 'https://www.betclic.pl'
  },
  {
    id: 'lvbet',
    name: 'LVBET',
    logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/lv-bet-logo.jpg',
    bonusTitle: 'Pakiet Powitalny 2000 PLN',
    color: 'bg-yellow-400',
    lightColor: 'bg-yellow-50',
    steps: [
      'Zarejestruj konto w LVBET.',
      'Pakiet jest rozłożony na trzy pierwsze depozyty.',
      'Odbierz darmowe 20 PLN za pełną weryfikację konta.'
    ],
    details: [
      { title: 'Bonusy od wpłat', desc: '500 zł od 1. wpłaty, 600 zł od 2. wpłaty i 900 zł od 3. wpłaty.' },
      { title: 'Freebet za weryfikację (20 PLN)', desc: 'Darmowe środki na start bez wpłacania pieniędzy.' },
      { title: 'Gra bez podatku', desc: 'Dostępna po rejestracji przez 33 dni.' }
    ],
    link: 'https://lvbet.pl'
  },
  {
    id: 'betfan',
    name: 'Betfan',
    logo: 'https://pewniaczki.pl/wp-content/uploads/2021/03/betfan.png',
    bonusTitle: 'Bonus 200% do 400 PLN',
    color: 'bg-green-500',
    lightColor: 'bg-green-50',
    steps: [
      'Otwórz konto w Betfan z kodem BUKBONUS.',
      'Wpłać dokładnie 200 PLN (sugerowane dla max bonusu).',
      'Otrzymasz od razu 400 PLN bonusu.',
      'Masz łącznie 600 PLN na grę.'
    ],
    details: [
      { title: 'Potrojenie wpłaty', desc: 'Wpłacasz 200 zł, grasz za 600 zł. Proste zasady.' },
      { title: 'Bez podatku', desc: 'Betfan oferuje grę bez podatku na kuponach AKO z min. 3 zdarzeniami.' }
    ],
    link: 'https://betfan.pl'
  },
  {
    id: 'totalbet',
    name: 'Totalbet',
    logo: 'https://surebety.pl/wp-content/uploads/2020/12/totalbet-pl-zaklady-bukmacherskie-logo.jpg',
    bonusTitle: '333 PLN w Zakładach Bez Ryzyka',
    color: 'bg-green-700',
    lightColor: 'bg-green-50',
    steps: [
      'Zarejestruj się w Totalbet.',
      'Masz 48h na postawienie pierwszego zakładu bez ryzyka.',
      'Możesz skorzystać z 3 takich zakładów.'
    ],
    details: [
      { title: '3x 111 PLN Bez Ryzyka', desc: 'Trzy pierwsze kupony postawione w Totalbet są ubezpieczone do kwoty 111 zł każdy. Zwrot w gotówce!' },
      { title: 'Brak obrotu', desc: 'Zwroty trafiają na konto główne, możesz je wypłacić.' }
    ],
    link: 'https://totalbet.pl'
  },
  {
    id: 'etoto',
    name: 'Etoto',
    logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/etoto-logo.jpg',
    bonusTitle: 'Pakiet 777 PLN',
    color: 'bg-blue-800',
    lightColor: 'bg-blue-50',
    steps: [
      'Załóż konto w aplikacji mobilnej Etoto (ważne!).',
      'Dokonuj kolejnych wpłat, aby odblokowywać bonusy.',
    ],
    details: [
      { title: 'Freebet w aplikacji (77 PLN)', desc: 'Specjalny bonus tylko dla użytkowników apki.' },
      { title: 'Bonusy od wpłat (700 PLN)', desc: 'Premie dodawane do trzech pierwszych depozytów.' }
    ],
    link: 'https://etoto.pl'
  },
  {
    id: 'fuksiarz',
    name: 'Fuksiarz',
    logo: 'https://surebety.pl/wp-content/uploads/2021/04/fuksiarz-logo-bialo-czerwone-400x400-1.png',
    bonusTitle: 'Zakład Bez Ryzyka 500 PLN (Bez obrotu)',
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    steps: [
      'Zarejestruj się.',
      'Postaw pierwszy kupon za min. 50 zł.',
      'Musi zawierać min. 2 zdarzenia z kursem min. 1.60 każde.',
    ],
    details: [
      { title: 'Zwrot 50% stawki', desc: 'Jeśli przegrasz, dostajesz zwrot 50% stawki do 500 zł.' },
      { title: 'ZERO OBROTU', desc: 'To wyróżnia Fuksiarza. Zwrot możesz od razu wypłacić na konto bankowe.' }
    ],
    link: 'https://fuksiarz.pl'
  },
  {
    id: 'forbet',
    name: 'Forbet',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Forbetlogo.png/250px-Forbetlogo.png',
    bonusTitle: 'Pakiet 3000 PLN',
    color: 'bg-green-600',
    lightColor: 'bg-green-50',
    steps: [
      'Otwórz konto w Forbet.',
      'Postaw pierwszy kupon - jest on zakładem bez ryzyka do 1000 zł.',
      'Dokonaj drugiej wpłaty, aby odebrać bonus 100% do 2000 zł.'
    ],
    details: [
      { title: 'Zakład bez ryzyka (1000 PLN)', desc: 'Zwrot w formie bonusu w razie porażki.' },
      { title: '30 dni bez podatku', desc: 'Promocja na start dla nowych graczy.' }
    ],
    link: 'https://iforbet.pl'
  }
];

export default function PromocjePage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 py-12 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Bonusy i Promocje <span className="text-blue-600">Bukmacherskie</span>
          </h1>
          <p className="text-lg text-slate-600">
            Kompletny przewodnik "krok po kroku". Wybierz bukmachera z menu lub przewiń w dół, aby dowiedzieć się jak odebrać darmową kasę na start.
          </p>
        </div>
      </header>

      {/* LISTA PROMOCJI */}
      <div className="container mx-auto px-4 py-12 max-w-4xl space-y-16">
        {PROMOTIONS.map((bookie, index) => (
          <section 
            key={bookie.id} 
            id={bookie.id} 
            className="scroll-mt-24 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden"
          >
            {/* Nagłówek Bukmachera */}
            <div className={`${bookie.color} text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6`}>
              <div className="flex items-center gap-4">
                 <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center p-2 shadow-lg">
                    <img src={bookie.logo} alt={bookie.name} className="max-w-full max-h-full object-contain" />
                 </div>
                 <div>
                    <div className="text-xs font-bold uppercase opacity-80 mb-1">Bukmacher #{index + 1}</div>
                    <h2 className="text-3xl font-black">{bookie.name}</h2>
                 </div>
              </div>
              <div className="text-center md:text-right">
                 <div className="text-sm font-medium opacity-90 mb-1">Maksymalny bonus:</div>
                 <div className="text-3xl md:text-4xl font-black bg-white/20 px-4 py-1 rounded-lg backdrop-blur-sm">
                    {bookie.bonusTitle.split(' ').slice(-2).join(' ')}
                 </div>
              </div>
            </div>

            {/* Treść Poradnika */}
            <div className="p-6 md:p-10">
                
                {/* 1. KROKI - JAK ODEBRAĆ */}
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <i className="fas fa-list-ol text-blue-600"></i> Instrukcja aktywacji (Krok po kroku)
                    </h3>
                    <div className="grid gap-4">
                        {bookie.steps.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full ${bookie.color} text-white flex items-center justify-center font-bold text-sm shadow-md`}>
                                    {idx + 1}
                                </div>
                                <p className="text-slate-700 font-medium mt-1">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. SZCZEGÓŁY BONUSÓW */}
                <div className="mb-10">
                    <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                        <i className="fas fa-gift text-green-600"></i> Co dokładnie otrzymasz?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        {bookie.details.map((detail, idx) => (
                            <div key={idx} className={`${bookie.lightColor} p-5 rounded-xl border-l-4 ${bookie.color.replace('bg-', 'border-')}`}>
                                <h4 className="font-bold text-slate-900 mb-2">{detail.title}</h4>
                                <p className="text-sm text-slate-600 leading-relaxed">{detail.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. CTA */}
                <div className="bg-slate-900 rounded-2xl p-6 md:p-8 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="text-white text-xl font-bold mb-2">Gotowy na grę w {bookie.name}?</h3>
                        <p className="text-slate-400 mb-6 text-sm">Pamiętaj o kodzie promocyjnym: <span className="text-yellow-400 font-bold text-lg">BUKBONUS</span></p>
                        
                        <a 
                            href={bookie.link} 
                            target="_blank" 
                            rel="nofollow noreferrer"
                            className={`inline-block px-10 py-4 ${bookie.color} hover:brightness-110 text-white font-black text-lg rounded-xl shadow-lg shadow-white/10 transition transform hover:-translate-y-1`}
                        >
                            Odbierz Pakiet {bookie.name}
                        </a>
                    </div>
                </div>

            </div>
          </section>
        ))}
      </div>

      <Footer />
    </main>
  );
}