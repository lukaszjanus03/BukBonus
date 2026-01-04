export interface Bookmaker {
  id: number;
  name: string;
  slug: string; // Dodane dla Navbar (linki)
  logo: string;
  rating: number;
  bonus: string;
  link: string;
  bgColor: string; // Kolor przycisku
  features: string[];
  bonuses: string[];
}

export const BOOKMAKERS: Bookmaker[] = [
  {
    id: 1,
    name: 'Superbet',
    slug: 'superbet',
    logo: 'https://play-lh.googleusercontent.com/0ygX2EFB7ZOfe7cA0EgZ4KBqHf942ShCQPzJJwoo41Y8gqAvDJAQzTzJ-zMj2ejgLI0=w240-h480-rw', 
    rating: 4.9,
    bonus: '3754 PLN',
    link: 'https://superbet.pl', 
    bgColor: 'bg-red-600',
    features: ['Najlepsza aplikacja', 'SuperPrzewaga', 'Gry karciane'],
    bonuses: [
        '3500 PLN - Tydzień gry bez ryzyka (Cashback)',
        '200 PLN - Bonus od pierwszej wpłaty',
        '34 PLN - Freebet za pobranie aplikacji',
        '20 PLN - Extra Freebet za rejestrację'
    ]
  },
  {
    id: 2,
    name: 'STS',
    slug: 'sts',
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZR0K8gIc1a6Yx33pUR3Op8lK0VFxStZiwww&s',
    rating: 4.8,
    bonus: '760 PLN',
    link: 'https://www.sts.pl', 
    bgColor: 'bg-blue-600',
    features: ['Największy bukmacher', 'Wizja TV', 'Szeroka oferta'],
    bonuses: [
        '600 PLN - Bonusy od trzech pierwszych wpłat',
        '100 PLN - Zakład bez ryzyka (Cashback)',
        '60 PLN - Bonusy za wykonanie zadań'
    ]
  },
  {
    id: 3,
    name: 'Fortuna',
    slug: 'fortuna',
    logo: 'https://i1.sndcdn.com/avatars-000330081863-yuozc1-original.jpg',
    rating: 4.7,
    bonus: '330 PLN',
    link: 'https://www.efortuna.pl', 
    bgColor: 'bg-yellow-500',
    features: ['Gra bez podatku', 'Transmisje live', 'Szybkie wypłaty'],
    bonuses: [
        '100 PLN - Zakład bez ryzyka nr 1',
        '100 PLN - Zakład bez ryzyka nr 2',
        '100 PLN - Zakład bez ryzyka nr 3',
        '20 PLN - Freebet bez depozytu za weryfikację',
        '10 PLN - Freebet za pierwszą wpłatę'
    ]
  },
  {
    id: 4,
    name: 'Betclic',
    slug: 'betclic',
    logo: 'https://dam.begmedia.com/front/native-apps/app-sports.png',
    rating: 4.6,
    bonus: '50 PLN',
    link: 'https://www.betclic.pl', 
    bgColor: 'bg-red-700',
    features: ['Gra BEZ PODATKU (zawsze)', 'Edytuj zakład', 'Multi+'],
    bonuses: [
        'Gra bez podatku na wszystko (zwiększa wygrane o 14%)',
        '50 PLN - Zakład bez ryzyka (zwrot we freebecie)',
        'Nielimitowana ilość kuponów bez podatku'
    ]
  },
  {
    id: 5,
    name: 'LVBET',
    slug: 'lvbet',
    logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/lv-bet-logo.jpg',
    rating: 4.5,
    bonus: '2000 PLN',
    link: 'https://lvbet.pl', 
    bgColor: 'bg-yellow-400',
    features: ['Wysokie kursy', 'LV Kombi', 'Sporty wirtualne'],
    bonuses: [
        '500 PLN - Bonus od pierwszego depozytu',
        '600 PLN - Bonus od drugiego depozytu',
        '900 PLN - Bonus od trzeciego depozytu',
        '20 PLN - Freebet bez depozytu',
        'Gry i Sporty Wirtualne bez podatku'
    ]
  },
  {
    id: 6,
    name: 'Betfan',
    slug: 'betfan',
    logo: 'https://pewniaczki.pl/wp-content/uploads/2021/03/betfan.png',
    rating: 4.4,
    bonus: '400 PLN',
    link: 'https://betfan.pl',
    bgColor: 'bg-green-500',
    features: ['Bonus 200%', 'My Bet (Własne zakłady)', 'Cashout'],
    bonuses: [
        '400 PLN - Bonus 200% od wpłaty (Wpłacasz 200, grasz za 600)',
        'Gra bez podatku na wszystko',
        'Freebet urodzinowy'
    ]
  },
  {
    id: 7,
    name: 'Totalbet',
    slug: 'totalbet',
    logo: 'https://surebety.pl/wp-content/uploads/2020/12/totalbet-pl-zaklady-bukmacherskie-logo.jpg',
    rating: 4.3,
    bonus: '333 PLN',
    link: 'https://totalbet.pl',
    bgColor: 'bg-green-700',
    features: ['Zakład bez ryzyka', 'Szybkie wypłaty', 'Gry karciane'],
    bonuses: [
        '333 PLN - Trzy zakłady bez ryzyka po 111 PLN',
        'Cashout w dowolnym momencie',
        'Gra bez podatku na kuponach AKO'
    ]
  },
  {
    id: 8,
    name: 'Etoto',
    slug: 'etoto',
    logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/etoto-logo.jpg',
    rating: 4.2,
    bonus: '777 PLN',
    link: 'https://etoto.pl',
    bgColor: 'bg-blue-800',
    features: ['Misja Futbol', 'Bonusy dla stałych graczy', 'Aplikacja mobilna'],
    bonuses: [
        'Bonusy od 3 pierwszych wpłat (łącznie do 700 PLN)',
        '77 PLN - Freebet za rejestrację w aplikacji',
        'Mixbet - łączenie zakładów'
    ]
  },
  {
    id: 9,
    name: 'Fuksiarz',
    slug: 'fuksiarz',
    logo: 'https://surebety.pl/wp-content/uploads/2021/04/fuksiarz-logo-bialo-czerwone-400x400-1.png',
    rating: 4.2,
    bonus: '500 PLN',
    link: 'https://fuksiarz.pl',
    bgColor: 'bg-red-500',
    features: ['Cashback bez obrotu', 'Krzysztof Stanowski', 'Early Payout'],
    bonuses: [
        '50% zwrotu stawki do 500 PLN (Bez obrotu!)',
        'Early Payout - wygrana przy prowadzeniu 2 bramkami',
        'Cashback na sporty wirtualne'
    ]
  },
  {
    id: 10,
    name: 'Forbet',
    slug: 'forbet',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Forbetlogo.png/250px-Forbetlogo.png',
    rating: 4.1,
    bonus: '3000 PLN',
    link: 'https://iforbet.pl',
    bgColor: 'bg-green-600',
    features: ['Bonus Powitalny', 'MaxiZysk', 'BetArchitekt'],
    bonuses: [
        '2000 PLN - Bonus od depozytu',
        '1000 PLN - Zakład bez ryzyka',
        '30 dni gry bez podatku'
    ]
  }
];