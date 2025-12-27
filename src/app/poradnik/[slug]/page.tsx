import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// --- BAZA DANYCH Z NOWĄ SEKCJĄ "RULES" (REGULAMIN) ---
const GUIDES_DATA: Record<string, any> = {
  superbet: {
    name: 'Superbet',
    color: 'text-red-600',
    bg: 'bg-red-600',
    bonusValue: '3754 PLN',
    intro: 'Superbet oferuje rewolucyjny "Tydzień bez ryzyka", ale **UWAGA**: Ta oferta jest ekskluzywna i działa TYLKO z kodem promocyjnym **BUKBONUS**. Jeśli nie wpiszesz tego kodu przy rejestracji, stracisz prawo do najwyższego pakietu powitalnego. Poniżej instrukcja, jak nie popełnić błędu.',
    steps: [
      {
        title: 'Krok 1: Przejdź przez nasz link (Ważne!)',
        desc: 'Aby kod **BUKBONUS** zadziałał poprawnie, musisz wejść na stronę bukmachera przez przycisk na dole tej strony. Formularz Superbet jest skrócony – założysz konto w 45 sekund bez dowodu.',
        highlight: 'Użyj linku partnerskiego, aby aktywować kod BUKBONUS.'
      },
      {
        title: 'Krok 2: Wpisz kod BUKBONUS (Kluczowy moment)',
        desc: 'W formularzu rejestracyjnym znajdziesz pole "Kod promocyjny". **MUSISZ tam wpisać: BUKBONUS**. Dodatkowo zaznacz zgody marketingowe – bez kodu BUKBONUS i zgód nie otrzymasz darmowych środków!',
        code: 'BUKBONUS',
        warning: 'Brak kodu BUKBONUS = Przepadek bonusu VIP!'
      },
      {
        title: 'Krok 3: Pierwsza wpłata',
        desc: 'Po rejestracji z kodem **BUKBONUS** wpłać min. 50 PLN. To aktywuje wszystkie bonusy z naszego pakietu.',
      },
      {
        title: 'Krok 4: Tydzień bez ryzyka z kodem BUKBONUS',
        desc: 'Dzięki rejestracji z naszym kodem, Twój pierwszy tydzień jest chroniony. Jeśli przegrasz, Superbet zwróci Ci do 3500 PLN. Pamiętaj: ta kwota jest dostępna tylko dla graczy z kodem **BUKBONUS**.',
      },
      {
        title: 'Krok 5: Bonus za aplikację',
        desc: 'Pobierz aplikację mobilną. Jako użytkownik z kodem **BUKBONUS**, otrzymasz dodatkowe 20 PLN freebetu za pierwsze logowanie w apce.',
      }
    ],
    wagering: {
        title: 'Jak wypłacić bonus (Warunki)?',
        text: 'Bonus uzyskany dzięki kodowi BUKBONUS (cashback) musisz obrócić 2 razy (x2) na kuponach z kursem min. 1.80.'
    },
    verification: {
        title: 'Weryfikacja Konta',
        text: 'Aby wypłacić wygrane, dokończ weryfikację w profilu. Pamiętaj, że konto założone z kodem BUKBONUS ma te same proste zasady weryfikacji co standardowe.'
    },
    // NOWA SEKCJA - SZTYWNE ZASADY
    rules: [
        "Otrzymany bonus (Zwrot za Tydzień bez ryzyka) należy obrócić 2-krotnie (x2).",
        "Do obrotu zaliczają się tylko kupony z kursem minimalnym 1.80.",
        "Na wykonanie obrotu masz 10 dni od momentu przyznania środków bonusowych.",
        "Kupony anulowane lub rozliczone jako zwrot (kurs 1.00) nie wliczają się do obrotu.",
        "Freebet za aplikację nie wymaga obrotu – ewentualna wygrana (pomniejszona o stawkę) trafia od razu na konto depozytowe.",
        "Wpłata depozytu musi nastąpić w ciągu 14 dni od rejestracji, aby aktywować promocję.",
        "Wypłata środków możliwa jest wyłącznie po pełnej weryfikacji konta (przesłanie dowodu lub MojeID)."
    ]
  },
  sts: {
    name: 'STS',
    color: 'text-blue-600',
    bg: 'bg-blue-600',
    bonusValue: '760 PLN',
    intro: 'STS to lider rynku, ale standardowa oferta jest niższa niż nasza. Aby odebrać pełne 760 PLN, **niezbędne jest użycie kodu BUKBONUS** podczas zakładania konta. Bez tego kodu ominie Cię zakład bez ryzyka na start!',
    steps: [
      {
        title: 'Krok 1: Rejestracja',
        desc: 'Wypełnij szybki formularz. Pamiętaj, że wchodząc z naszego linku, przygotowujesz konto pod kod **BUKBONUS**.',
      },
      {
        title: 'Krok 2: Kod promocyjny BUKBONUS',
        desc: 'W drugim kroku formularza zobaczysz pole na kod. **WPISZ TUTAJ: BUKBONUS**. To gwarancja, że Twój pierwszy zakład będzie ubezpieczony do 100 PLN. Nie zostawiaj tego pola pustego!',
        code: 'BUKBONUS',
        warning: 'Puste pole kodu = Brak zakładu bez ryzyka!'
      },
      {
        title: 'Krok 3: Zakład Bez Ryzyka (Tylko z kodem)',
        desc: 'Wpłać depozyt i postaw kupon. Dzięki kodowi **BUKBONUS**, jeśli przegrasz, kasa do 100 zł wróci do Ciebie.',
      },
      {
        title: 'Krok 4: Misje i Zadania',
        desc: 'Po wpisaniu kodu **BUKBONUS** i wpłatach, otrzymasz dostęp do zadań o wartości 600 PLN.',
      }
    ],
    wagering: {
        title: 'Warunki obrotu',
        text: 'Środki bonusowe w STS należy obrócić 2x (kurs min. 1.91). Kod BUKBONUS nie zmienia warunków obrotu na trudniejsze – są one standardowe.'
    },
    verification: {
        title: 'Weryfikacja',
        text: 'Skorzystaj z MojeID dla błyskawicznej weryfikacji.'
    },
    rules: [
        "Bonusy za zadania oraz bonusy od wpłat wymagają 2-krotnego obrotu (x2).",
        "Do obrotu zaliczają się tylko wygrane kupony.",
        "Kurs całkowity kuponu zaliczanego do obrotu musi wynosić min. 1.91.",
        "Zwrot za pierwszy zakład (Zakład bez Ryzyka) trafia na konto bonusowe (chyba że regulamin promocji okresowej stanowi inaczej) i wymaga obrotu 2x.",
        "Na obrót bonusem masz zazwyczaj 30 dni (w przypadku bonusów od wpłaty).",
        "Zakłady z oferty 'Hit Dnia' oraz kupony bezpieczne nie wliczają się do obrotu.",
        "Wypłata środków możliwa jest dopiero po przeniesieniu ich z salda bonusowego na saldo depozytowe."
    ]
  },
  fortuna: {
    name: 'Fortuna',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500',
    bonusValue: '330 PLN',
    intro: 'Fortuna daje zwrot w GOTÓWCE, ale żeby skorzystać z pełnego pakietu (3 zakłady bez ryzyka + freebet), **musisz użyć kodu BUKBONUS**. To ten kod aktywuje pakiet VIP. Nie zapomnij o nim!',
    steps: [
      {
        title: 'Krok 1: Rejestracja z kodem BUKBONUS',
        desc: 'Wypełniając formularz, upewnij się, że w polu "Kod Promocyjny" widnieje napis **BUKBONUS**. Czasami trzeba go wpisać ręcznie.',
        code: 'BUKBONUS'
      },
      {
        title: 'Krok 2: Weryfikacja (Konieczna!)',
        desc: 'Aby kod **BUKBONUS** zadziałał w 100% i dał Ci darmowe 20 PLN, musisz zweryfikować konto (dowód lub bank).',
        warning: 'Bez weryfikacji kod BUKBONUS nie da Ci darmowej kasy.'
      },
      {
        title: 'Krok 3: Trzy Zakłady Bez Ryzyka',
        desc: 'Dzięki rejestracji z kodem **BUKBONUS**, Twoje trzy pierwsze kluczowe kupony są ubezpieczone do 100 PLN każdy.',
      }
    ],
    wagering: {
        title: 'Zwrot w gotówce!',
        text: 'Największa zaleta kodu BUKBONUS w Fortunie? Zwroty trafiają na konto główne. Możesz je wypłacić od razu!'
    },
    verification: {
        title: 'Punkty FKP',
        text: 'Bonus za kod BUKBONUS może przyjść w punktach. Pamiętaj, by zaznaczyć "Płać punktami" na kuponie.'
    },
    rules: [
        "Zwroty za 3 Zakłady Bez Ryzyka trafiają bezpośrednio na konto depozytowe (gotówka).",
        "Środków ze zwrotu NIE TRZEBA obracać – można je od razu wypłacić lub grać dalej.",
        "Freebet 20 PLN (2800 pkt FKP) wymaga jednokrotnego zagrania dowolnego kuponu (obrót x1).",
        "Aby otrzymać Freebet bez depozytu, konieczna jest pełna weryfikacja konta (stałe konto).",
        "Zakłady bez ryzyka muszą zostać postawione w określonym czasie: 1. zakład po rejestracji, kolejne co 72h.",
        "Wygrane z kuponów opłaconych punktami FKP są wypłacane w gotówce.",
        "Maksymalna kwota zwrotu dla każdego z trzech zakładów wynosi 100 PLN."
    ]
  },
  betclic: {
    name: 'Betclic',
    color: 'text-red-700',
    bg: 'bg-red-700',
    bonusValue: '50 PLN + Bez Podatku',
    intro: 'W Betclic grasz bez podatku, ale Zakład Bez Ryzyka na start jest dostępny **wyłącznie z kodem BUKBONUS**. Jeśli zarejestrujesz się bez kodu, tracisz ubezpieczenie pierwszego kuponu!',
    steps: [
      {
        title: 'Krok 1: Rejestracja z kodem',
        desc: 'Podczas zakładania konta, w 3. kroku formularza, wpisz kod **BUKBONUS**. To jedyny sposób na aktywację cashbacku.',
        code: 'BUKBONUS',
        warning: 'Brak kodu BUKBONUS = Brak zwrotu za przegrany kupon!'
      },
      {
        title: 'Krok 2: Zakład Bez Ryzyka (z kodem BUKBONUS)',
        desc: 'Postaw pierwszy zakład. Dzięki kodowi **BUKBONUS**, jeśli przegrasz, otrzymasz zwrot do 50 PLN we freebecie.',
      },
      {
        title: 'Krok 3: Gra Bez Podatku',
        desc: 'Kod **BUKBONUS** gwarantuje też dostęp do gry bez podatku na wszystko, na zawsze.',
      }
    ],
    wagering: {
        title: 'Obrót freebetem',
        text: 'Zwrot z kodu BUKBONUS (freebet) postaw po kursie 2.14. Wygrana (minus stawka) jest Twoja.'
    },
    verification: {
        title: 'Dokumenty',
        text: 'Wyślij zdjęcie dowodu, aby móc wypłacić kasę z bonusu.'
    },
    rules: [
        "Zwrot za przegrany zakład przyznawany jest w formie Freebetu.",
        "Freebetem nie można wypłacić – trzeba nim zagrać.",
        "Minimalny kurs łączny kuponu granego za Freebet wynosi 2.14.",
        "Freebet można wykorzystać na jednym kuponie lub podzielić na kilka mniejszych.",
        "Wygrana z kuponu postawionego za Freebet to: (Wygrana całkowita - Stawka Freebetu) = Zysk netto na konto główne.",
        "Zysk netto z Freebetu nie wymaga dalszego obrotu i można go wypłacić.",
        "Czas na wykorzystanie Freebetu jest nieograniczony (do momentu usunięcia konta)."
    ]
  },
  lvbet: {
    name: 'LVBET',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400',
    bonusValue: '2000 PLN',
    intro: 'LVBET ma ogromny pakiet powitalny, ale uwaga: **Freebet 20 PLN jest dostępny TYLKO dla graczy z kodem BUKBONUS**. Bez kodu dostaniesz tylko bonus od wpłaty. Wpisz kod, żeby zgarnąć wszystko.',
    steps: [
      {
        title: 'Krok 1: Rejestracja (Wpisz kod!)',
        desc: 'W formularzu zaznacz "Chcę Bonus" i wpisz kod **BUKBONUS**. To warunek konieczny do otrzymania darmowych 20 PLN.',
        code: 'BUKBONUS'
      },
      {
        title: 'Krok 2: Freebet 20 PLN (Dzięki kodowi)',
        desc: 'Po weryfikacji konta, jako użytkownik z kodem **BUKBONUS**, otrzymasz 20 PLN za darmo.',
      },
      {
        title: 'Krok 3: Bonusy od wpłat',
        desc: 'Kod **BUKBONUS** uprawnia Cię też do bonusów od trzech pierwszych wpłat do łącznej kwoty 2000 PLN.',
      }
    ],
    wagering: {
        title: 'Mnożnik kursu',
        text: 'Bonusy LVBET działają na zasadzie mnożnika. Kod BUKBONUS nie zmienia tych zasad.'
    },
    verification: {
        title: 'Rapid Pay',
        text: 'Wypłaty w LVBET są błyskawiczne.'
    },
    rules: [
        "Bonus od wpłaty działa jako 'Bonus z mnożnikiem' (kurs x100).",
        "Aby użyć bonusu, musisz zbudować kupon kombi z minimum 3 zdarzeniami.",
        "Kurs łączny kuponu musi wynosić minimum 2.50.",
        "Kurs pojedynczego zdarzenia na kuponie musi wynosić minimum 1.25.",
        "Wygrana z takiego kuponu trafia na saldo bonusowe i wymaga dalszego obrotu (zazwyczaj 4x po kursie 2.00).",
        "Freebet 20 PLN za kod BUKBONUS wymaga 1-krotnego obrotu kuponem kombi (min. 3 zdarzenia, kurs łączny 2.50).",
        "Na aktywację i wykorzystanie bonusów masz 30 dni od momentu ich przyznania."
    ]
  },
  betfan: {
    name: 'Betfan',
    color: 'text-green-500',
    bg: 'bg-green-500',
    bonusValue: '400 PLN (200%)',
    intro: 'Chcesz potroić wpłatę? Oferta 200% od wpłaty w Betfan działa najlepiej z kodem **BUKBONUS**. Wpisz go przy rejestracji, aby mieć pewność, że bonus zostanie przypisany do Twojego konta.',
    steps: [
      {
        title: 'Krok 1: Rejestracja z kodem BUKBONUS',
        desc: 'Szybka rejestracja. W polu "Kod promocyjny" wpisz **BUKBONUS**. To Twój klucz do potrojenia depozytu.',
        code: 'BUKBONUS',
        warning: 'Upewnij się, że wpisałeś BUKBONUS!'
      },
      {
        title: 'Krok 2: Wpłata 200 PLN',
        desc: 'Z kodem **BUKBONUS** wpłać 200 zł, a otrzymasz maksymalny bonus 400 zł.',
      },
      {
        title: 'Krok 3: Odblokowanie',
        desc: 'Zagraj za depozyt, aby uwolnić bonusowe środki uzyskane dzięki kodowi **BUKBONUS**.',
      }
    ],
    wagering: {
        title: 'Prosty obrót',
        text: 'Obróć bonusem raz (1x) na kuponie AKO. Wygrana trafia na konto główne.'
    },
    verification: {
        title: 'Metody',
        text: 'MojeID lub skan dowodu.'
    },
    rules: [
        "Aby odblokować bonus, musisz najpierw zagrać za 100% kwoty wpłaconego depozytu.",
        "Środki bonusowe (400 PLN) wymagają tylko 1-krotnego obrotu (x1).",
        "Kupon zaliczany do obrotu musi być kuponem AKO (akumulowanym).",
        "Minimalna liczba zdarzeń na kuponie: 2.",
        "Minimalny kurs łączny kuponu: 3.0.",
        "Po wygraniu kuponu za środki bonusowe, cała wygrana przechodzi na saldo główne i można ją wypłacić.",
        "Czas na wykonanie obrotu to 14 dni."
    ]
  },
  totalbet: {
    name: 'Totalbet',
    color: 'text-green-700',
    bg: 'bg-green-700',
    bonusValue: '333 PLN',
    intro: 'Totalbet daje 3 zakłady bez ryzyka. Aby mieć pewność, że system zakwalifikuje Cię do promocji, **użyj kodu BUKBONUS** w formularzu rejestracyjnym.',
    steps: [
      {
        title: 'Krok 1: Rejestracja (Kod BUKBONUS)',
        desc: 'Wypełnij dane i wpisz kod **BUKBONUS**. Pamiętaj o zaznaczeniu zgód marketingowych!',
        code: 'BUKBONUS'
      },
      {
        title: 'Krok 2: Weryfikacja w 48h',
        desc: 'Masz 48h na weryfikację. Z kodem **BUKBONUS** po weryfikacji aktywują się 3 zakłady bez ryzyka.',
        warning: 'Brak weryfikacji = utrata bonusów z kodu BUKBONUS!'
      },
      {
        title: 'Krok 3: Trzy kupony bez ryzyka',
        desc: 'Postaw 3 kupony. Jeśli przegrasz, dzięki kodowi **BUKBONUS** otrzymasz zwrot w gotówce.',
      }
    ],
    wagering: {
        title: 'Zwrot w gotówce',
        text: 'Zwroty z kodu BUKBONUS są bez obrotu. Możesz je wypłacić.'
    },
    verification: {
        title: 'Karty',
        text: 'Sprawdź też gry karciane w Totalbet.'
    },
    rules: [
        "Promocja obejmuje trzy pierwsze kupony postawione po założeniu konta (w ciągu 48h).",
        "Każdy z trzech kuponów musi być kuponem AKO (min. 2 zdarzenia).",
        "Maksymalny zwrot za jeden kupon to 111 PLN.",
        "Zwrot następuje w GOTÓWCE na konto depozytowe.",
        "Otrzymany zwrot nie wymaga żadnego obrotu – można go od razu wypłacić.",
        "Warunkiem koniecznym jest pełna weryfikacja konta w ciągu 48h od rejestracji.",
        "Zakłady systemowe nie biorą udziału w promocji."
    ]
  },
  etoto: {
    name: 'Etoto',
    color: 'text-blue-800',
    bg: 'bg-blue-800',
    bonusValue: '777 PLN',
    intro: 'W Etoto kod **BUKBONUS** otwiera drogę do bonusów od depozytu oraz specjalnego freebetu za aplikację. Nie pomiń wpisania kodu!',
    steps: [
      {
        title: 'Krok 1: Rejestracja z kodem',
        desc: 'Wpisz **BUKBONUS** przy rejestracji. To sygnał dla Etoto, że jesteś naszym czytelnikiem.',
        code: 'BUKBONUS'
      },
      {
        title: 'Krok 2: Freebet za aplikację',
        desc: 'Pobierz apkę. Użytkownicy z kodem **BUKBONUS** otrzymują dodatkowe korzyści.',
      },
      {
        title: 'Krok 3: Bonusy od wpłat',
        desc: 'Odbierz bonusy 100% od trzech pierwszych wpłat.',
      }
    ],
    wagering: {
        title: 'Obrót',
        text: 'Bonusy wymagają obrotu. Sprawdź szczegóły w regulaminie.'
    },
    verification: {
        title: 'Mixbet',
        text: 'Łącz zakłady na jednym kuponie.'
    },
    rules: [
        "Bonusy od wpłaty wymagają obrotu przed wypłatą.",
        "Zazwyczaj wymagany jest 3-krotny obrót kwotą bonusu (x3).",
        "Kupony zaliczane do obrotu muszą mieć kurs minimalny 2.00 (dla kuponów SOLO) lub 1.20 na zdarzenie (dla AKO).",
        "Freebet 77 PLN za aplikację nie wymaga obrotu – wygrana netto trafia na konto główne.",
        "Bonusy przyznawane są kolejno po 1., 2. i 3. wpłacie.",
        "Aby odebrać bonus, minimalna wpłata wynosi 50 PLN."
    ]
  },
  fuksiarz: {
    name: 'Fuksiarz',
    color: 'text-red-500',
    bg: 'bg-red-500',
    bonusValue: '500 PLN',
    intro: 'Fuksiarz to zwrot bez obrotu, ale **tylko z kodem BUKBONUS** masz pewność otrzymania najlepszych warunków na start. Wpisz kod w formularzu!',
    steps: [
      {
        title: 'Krok 1: Rejestracja (Wpisz BUKBONUS)',
        desc: 'Załóż konto. W polu kod promocyjny wpisz **BUKBONUS**.',
        code: 'BUKBONUS'
      },
      {
        title: 'Krok 2: Pierwszy zakład',
        desc: 'Postaw kupon AKO za min. 50 zł. Z kodem **BUKBONUS** jest on ubezpieczony.',
        warning: 'Pamiętaj: Kupon SOLO nie działa!'
      },
      {
        title: 'Krok 3: Zwrot 50% (Gotówka)',
        desc: 'Przegrałeś? Dzięki kodowi **BUKBONUS** połowa stawki wraca do Ciebie jako gotówka do wypłaty.',
      }
    ],
    wagering: {
        title: 'Brak obrotu',
        text: 'Zwrot z kodu BUKBONUS wypłacasz od razu.'
    },
    verification: {
        title: 'Early Payout',
        text: 'Wygrywaj przy prowadzeniu 2 bramkami.'
    },
    rules: [
        "Zwrot wynosi 50% stawki przegranego zakładu (do 500 PLN).",
        "Zwrócone środki są GOTÓWKĄ – nie podlegają żadnemu obrotowi.",
        "Możesz je od razu wypłacić na konto bankowe.",
        "Warunek konieczny: Pierwszy kupon musi być kuponem AKO (min. 2 zdarzenia).",
        "Minimalny kurs pojedynczego zdarzenia na kuponie to 1.24.",
        "Minimalna stawka kuponu to 50 PLN.",
        "Zakłady wirtualne i gry karciane nie biorą udziału w promocji."
    ]
  },
  forbet: {
    name: 'Forbet',
    color: 'text-green-600',
    bg: 'bg-green-600',
    bonusValue: '3000 PLN',
    intro: 'Pakiet 3000 PLN w Forbet wymaga aktywacji. Kluczem jest kod **BUKBONUS**. Wpisz go, aby odebrać zakład bez ryzyka do 1000 PLN.',
    steps: [
      {
        title: 'Krok 1: Rejestracja z kodem',
        desc: 'Wypełnij formularz i wpisz kod **BUKBONUS**. To podstawa pakietu powitalnego.',
        code: 'BUKBONUS'
      },
      {
        title: 'Krok 2: Zakład bez ryzyka',
        desc: 'Twój pierwszy kupon jest bezpieczny do 1000 zł dzięki kodowi **BUKBONUS**.',
      },
      {
        title: 'Krok 3: Bonusy i Gra bez podatku',
        desc: 'Kod **BUKBONUS** aktywuje też grę bez podatku przez 30 dni.',
      }
    ],
    wagering: {
        title: 'Obrót',
        text: 'Wymagany obrót bonusem na kuponach AKO.'
    },
    verification: {
        title: 'BetArchitekt',
        text: 'Twórz własne zakłady w Forbet.'
    },
    rules: [
        "Bonus Zakład bez Ryzyka (do 1000 PLN) wymaga 1-krotnego obrotu całą kwotą zwrotu.",
        "Bonus od drugiej wpłaty (do 2000 PLN) wymaga 2-krotnego obrotu.",
        "Kupony zaliczane do obrotu muszą posiadać min. 3 zdarzenia (AKO).",
        "Kurs pojedynczego zdarzenia na kuponie obrotowym to min. 1.30.",
        "Kurs całkowity kuponu obrotowego to min. 2.50.",
        "Gra bez podatku obowiązuje przez 30 dni na kuponach z min. 3 zdarzeniami (kurs poj. 1.30).",
        "Czas na obrót bonusem wynosi zazwyczaj 14 dni."
    ]
  }
};

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

  return (
    <div className="bg-slate-50 font-sans pb-20">
      <Navbar />

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-4xl text-center">
            
            {/* AGRESYWNY BANER Z KODEM NA SAMEJ GÓRZE */}
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

        {/* STARA SEKCJA WAGERING/VERIFICATION (SKRÓCONA) */}
        {(guide.wagering || guide.verification) && (
            <div className="mt-20 grid md:grid-cols-2 gap-8">
                {guide.wagering && (
                    <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm mb-4 text-xl">
                            <i className="fas fa-sync-alt"></i>
                        </div>
                        <h4 className="font-bold text-xl text-slate-900 mb-3">{guide.wagering.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{guide.wagering.text}</p>
                    </div>
                )}
                {guide.verification && (
                    <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-700 shadow-sm mb-4 text-xl">
                            <i className="fas fa-id-card"></i>
                        </div>
                        <h4 className="font-bold text-xl text-slate-900 mb-3">{guide.verification.title}</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{guide.verification.text}</p>
                    </div>
                )}
            </div>
        )}

        {/* --- NOWA SEKCJA: SZTYWNY REGULAMIN I WARUNKI (NA SAMYM DOLE) --- */}
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
                Klikając w przycisk, zostaniesz bezpiecznie przekierowany na oficjalną stronę bukmachera. Pamiętaj, aby ręcznie wpisać kod <strong>BUKBONUS</strong> w formularzu, jeśli nie uzupełni się automatycznie. Hazard wiąże się z ryzykiem. Graj odpowiedzialnie. 18+
             </p>
        </div>

      </div>

      <Footer />
    </div>
  );
}