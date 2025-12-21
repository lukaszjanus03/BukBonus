import { NextResponse } from 'next/server';

// --- ZABEZPIECZENIE: Pobieranie kluczy z pliku .env.local ---
const API_KEY = process.env.FOOTBALL_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;

const API_URL = 'https://api.football-data.org/v4/matches';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80';

const LEAGUE_WEIGHTS: Record<string, number> = {
    'CL': 100, 'PL': 90, 'PD': 85, 'BL1': 85, 'SA': 80, 'FL1': 70, 'PPL': 60, 'DED': 50, 'WC': 100, 'EC': 100
};

const BIG_TEAMS = [
    'Real Madrid', 'Barcelona', 'Manchester City', 'Arsenal', 'Liverpool', 'Bayern', 'Dortmund', 'Leverkusen',
    'Juventus', 'Milan', 'Inter', 'PSG', 'Legia', 'Lech', 'Raków', 'Chelsea', 'Manchester United', 'Napoli', 'Atletico',
    'Newcastle', 'Tottenham', 'Aston Villa'
];

// --- WYSZUKIWANIE ZDJĘĆ ---
async function getDynamicMatchImage(teamName: string) {
    // Sprawdzamy, czy klucz istnieje w zmiennych środowiskowych
    if (!UNSPLASH_KEY) return DEFAULT_IMAGE;

    try {
        const query = encodeURIComponent(`${teamName} football soccer stadium fans`);
        // Używamy zmiennej UNSPLASH_KEY zamiast wpisanego klucza
        const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${UNSPLASH_KEY}&per_page=1&orientation=landscape&order_by=relevant`;
        
        const res = await fetch(url, { next: { revalidate: 3600 } }); 
        
        if (!res.ok) throw new Error(`Unsplash error: ${res.status}`);
        
        const data = await res.json();
        
        if (data.results && data.results.length > 0) {
            return data.results[0].urls.regular;
        } else {
            return DEFAULT_IMAGE;
        }
    } catch (error) {
        console.error("Błąd Unsplash:", error);
        return DEFAULT_IMAGE;
    }
}

// --- OGROMNA BAZA OPISÓW (80+ WARIANTÓW) ---
function generateDynamicContent(home: string, away: string, competition: string, time: string, isToday: boolean, leagueCode: string) {
    const t = time; // krótszy alias
    const d = isToday ? "Już dzisiaj" : "Wkrótce";

    // 1. OGÓLNE / NEUTRALNE (30 wariantów)
    const general = [
        `${d} czeka nas fascynujące widowisko. ${home} podejmuje ${away}. Faworyt nie jest oczywisty. Start o ${t}.`,
        `Kibice zgromadzeni na stadionie oczekują zwycięstwa. ${home} vs ${away}. Początek meczu o godzinie ${t}.`,
        `Walka o ligowe punkty wkracza w decydującą fazę. ${home} zmierzy się z ${away}. Pierwszy gwizdek o ${t}.`,
        `Czy ${home} wykorzysta atut własnego boiska? Ich rywalem jest ${away}. Zapowiada się zacięty bój. Start: ${t}.`,
        `Obie drużyny potrzebują punktów jak tlenu. ${home} kontra ${away}. To może być mecz kolejki. Oglądaj od ${t}.`,
        `Analitycy spodziewają się otwartego spotkania. ${home} - ${away}. Kto okaże się skuteczniejszy? Godzina ${t}.`,
        `Wielkie emocje gwarantowane! ${home} podejmuje ${away}. Statystyki H2H sugerują wyrównany mecz. Start o ${t}.`,
        `Starcie dwóch różnych stylów gry. ${home} vs ${away}. Kto narzuci swoje warunki? Początek o ${t}.`,
        `Defensywa gości zostanie poddana próbie. ${home} kontra ${away}. Mecz rozpocznie się o ${t}.`,
        `Czy zobaczymy festiwal bramek? ${home} gra z ${away}. Ofensywne nastawienie obu ekip to zapowiedź emocji. Start: ${t}.`,
        `Dla takich meczów kocha się futbol. ${home} vs ${away}. Napięcie rośnie z minuty na minutę. Start o ${t}.`,
        `Punkty muszą zostać u gospodarzy? ${home} podejmuje ${away}. Goście mają jednak inne plany. Godzina ${t}.`,
        `Kluczowy moment sezonu dla obu ekip. ${home} mierzy się z ${away}. Margines błędu jest zerowy. Start o ${t}.`,
        `Pojedynek taktyczny trenerów. ${home} vs ${away}. Jeden błąd może zdecydować o wyniku. Start: ${t}.`,
        `Wszyscy oczekują fajerwerków. ${home} kontra ${away}. Czy gwiazdy staną na wysokości zadania? Mecz o ${t}.`,
        `Forma gospodarzy to niewiadoma. ${home} vs ${away}. Goście liczą na przełamanie. Start o ${t}.`,
        `Twierdza gospodarzy zagrożona? ${home} podejmuje ${away}. Trybuny poniosą ich do walki. Godzina ${t}.`,
        `Mecz o "sześć punktów". ${home} kontra ${away}. Stawka spotkania jest ogromna. Początek o ${t}.`,
        `Elektryzujące starcie w ${competition}. ${home} vs ${away}. Bukmacherzy zacierają ręce. Start o ${t}.`,
        `Piłkarskie święto na stadionie gospodarzy. ${home} gra z ${away}. Atmosfera będzie gorąca. Mecz o ${t}.`,
        `Czy goście sprawią niespodziankę? ${home} vs ${away}. Historia spotkań przemawia za gospodarzami. Start: ${t}.`,
        `Bezkompromisowa walka od pierwszej minuty. ${home} - ${away}. Sędzia gwizdnie po raz pierwszy o ${t}.`,
        `Kto zdominuje środek pola? ${home} vs ${away}. To tam rozstrzygną się losy meczu. Godzina ${t}.`,
        `Napastnicy obu drużyn są w formie. ${home} kontra ${away}. Szykujcie się na gole! Start o ${t}.`,
        `Presja spoczywa na gospodarzach. ${home} podejmuje ${away}. Czy udźwigną ciężar faworyta? Mecz o ${t}.`,
        `Goście przyjeżdżają po pełną pulę. ${home} vs ${away}. Zapowiada się ofensywna wymiana ciosów. Start: ${t}.`,
        `Ważny sprawdzian dla defensywy. ${home} kontra ${away}. Kto zachowa czyste konto? Początek o ${t}.`,
        `Mecz, który może namieszać w tabeli. ${home} vs ${away}. Oczy wszystkich zwrócone na to starcie. Godzina ${t}.`,
        `Gwizdek sędziego rozpocznie spektakl. ${home} - ${away}. Bądźcie z nami od ${t}.`,
        `Futbol na najwyższym poziomie. ${home} podejmuje ${away}. Nie możesz tego przegapić. Start o ${t}.`
    ];

    // 2. PREMIER LEAGUE
    const eng = [
        `Bitwa o Anglię! ${home} podejmuje na własnym terenie ${away}. Tempo w Premier League jest zabójcze. Start o ${t}.`,
        `Fizyczna walka przez 90 minut. ${home} vs ${away}. Na Wyspach nie ma łatwych meczów. Godzina ${t}.`,
        `Angielska elita w akcji. ${home} kontra ${away}. Czy goście wywiozą punkty z trudnego terenu? Start: ${t}.`,
        `Deszcz, wślizgi i walka o każdą piłkę. ${home} - ${away}. To esencja Premier League. Mecz o ${t}.`,
        `Oczy całego świata na Premier League. ${home} vs ${away}. Gwiazdy światowego formatu w akcji. Start o ${t}.`,
        `Mecz na szczycie najlepszej ligi świata. ${home} podejmuje ${away}. Tutaj każdy błąd kosztuje gola. Godzina ${t}.`,
        `Londyn, Manchester czy Liverpool - gdziekolwiek grają, są emocje. ${home} vs ${away}. Start o ${t}.`,
        `Kick and rush? Nie tym razem. ${home} i ${away} grają nowoczesny futbol. Premier League o ${t}.`,
        `Stadiony w Anglii żyją meczem. ${home} kontra ${away}. Doping poniesie piłkarzy. Początek o ${t}.`,
        `Szybkie kontry i stałe fragmenty. ${home} vs ${away}. Klasyk angielskiej piłki. Start: ${t}.`
    ];

    // 3. BUNDESLIGA
    const ger = [
        `Niemiecka maszyna rusza! ${home} kontra ${away}. W Bundeslidze bramek nigdy nie brakuje. Start o ${t}.`,
        `Gegenpressing w wykonaniu mistrzów. ${home} vs ${away}. Intensywność tego meczu będzie ogromna. Godzina ${t}.`,
        `Żółta ściana czy trybuny w Monachium? ${home} podejmuje ${away}. Atmosfera w Niemczech to unikat. Start: ${t}.`,
        `Precyzja i dyscyplina taktyczna. ${home} - ${away}. Bundesliga gwarantuje wysoki poziom. Mecz o ${t}.`,
        `Festiwal strzelecki? ${home} vs ${away}. Statystyki w Niemczech wskazują na over bramkowy. Start o ${t}.`,
        `Młode talenty kontra doświadczenie. ${home} podejmuje ${away}. Bundesliga promuje gwiazdy jutra. Godzina ${t}.`,
        `Walka o mistrzostwo Niemiec. ${home} vs ${away}. Każdy punkt jest na wagę złota. Start: ${t}.`,
        `Ofensywny futbol bez kalkulacji. ${home} kontra ${away}. To lubimy w Bundeslidze najbardziej. Mecz o ${t}.`
    ];

    // 4. LA LIGA
    const esp = [
        `Techniczna wirtuozeria na murawie. ${home} podejmuje ${away}. La Liga to dom dla artystów futbolu. Start o ${t}.`,
        `Hiszpański temperament! ${home} vs ${away}. Kartki, gole i emocje gwarantowane. Godzina ${t}.`,
        `Tiki-taka czy szybki atak? ${home} zmierzy się z ${away}. Starcie dwóch filozofii gry. Start: ${t}.`,
        `Wieczór z hiszpańską piłką. ${home} kontra ${away}. Słońce, pasja i futbol. Mecz o ${t}.`,
        `Elita Półwyspu Iberyjskiego. ${home} vs ${away}. Technika użytkowa na najwyższym poziomie. Start o ${t}.`,
        `Walka o dominację w Hiszpanii. ${home} podejmuje ${away}. Kto okaże się lepszy? Godzina ${t}.`,
        `Magia La Ligi. ${home} - ${away}. Czy zobaczymy gola kolejki? Początek o ${t}.`
    ];

    // 5. SERIE A
    const ita = [
        `Włoska robota. ${home} podejmuje ${away}. Taktyczne szachy na najwyższym poziomie. Start o ${t}.`,
        `Catenaccio to przeszłość, ale obrona wciąż jest kluczem. ${home} vs ${away}. Serie A nie wybacza błędów. Godzina ${t}.`,
        `Starcie gigantów Calcio. ${home} kontra ${away}. Historia i tradycja na boisku. Start: ${t}.`,
        `Emocje na Półwyspie Apenińskim. ${home} vs ${away}. Tifosi stworzą piekło na trybunach. Mecz o ${t}.`,
        `Walka o Scudetto? ${home} zmierzy się z ${away}. Każdy mecz to finał. Start o ${t}.`,
        `Taktyczny majstersztyk. ${home} - ${away}. Kto lepiej rozpracował rywala? Godzina ${t}.`
    ];

    // 6. LIGA MISTRZÓW
    const cl = [
        `Hymn Ligi Mistrzów zabrzmi dziś dla nich. ${home} vs ${away}. Europejska elita w akcji. Start o ${t}.`,
        `Droga do finału wiedzie przez ten mecz. ${home} podejmuje ${away}. Tutaj rodzą się legendy. Godzina ${t}.`,
        `Wieczór mistrzów! ${home} kontra ${away}. Najlepsze kluby, najlepsi piłkarze. Start: ${t}.`,
        `Prestiż i wielkie pieniądze. ${home} vs ${away}. Champions League to inny wymiar futbolu. Mecz o ${t}.`,
        `Starcie tytanów Europy. ${home} - ${away}. Cały piłkarski świat patrzy na ten mecz. Start o ${t}.`
    ];

    // --- LOGIKA MIESZANIA ---
    let pool = [...general]; 

    if (leagueCode === 'PL') pool = [...pool, ...eng, ...eng, ...eng]; 
    if (leagueCode === 'BL1') pool = [...pool, ...ger, ...ger, ...ger];
    if (leagueCode === 'PD') pool = [...pool, ...esp, ...esp, ...esp];
    if (leagueCode === 'SA') pool = [...pool, ...ita, ...ita, ...ita];
    if (leagueCode === 'CL') pool = [...pool, ...cl, ...cl, ...cl];

    return pool[Math.floor(Math.random() * pool.length)];
}

export async function GET() {
  // Bezpiecznik: jeśli klucze nie są załadowane z .env, przerywamy działanie
  if (!API_KEY || !UNSPLASH_KEY) {
      console.error("BRAK KLUCZY API w zmiennych środowiskowych (.env.local)");
      return NextResponse.json({ error: 'Błąd konfiguracji serwera: brak kluczy API.' }, { status: 500 });
  }

  try {
    const today = new Date();
    const next3Days = new Date();
    next3Days.setDate(today.getDate() + 3);

    const dateFrom = today.toISOString().split('T')[0];
    const dateTo = next3Days.toISOString().split('T')[0];
    
    // Używamy zmiennej API_KEY zamiast wpisanego klucza
    const res = await fetch(`${API_URL}?competitions=PL,BL1,SA,PD,FL1,PPL,CL,DED&dateFrom=${dateFrom}&dateTo=${dateTo}`, {
      headers: { 'X-Auth-Token': API_KEY },
      next: { revalidate: 3600 } 
    });
    
    const data = await res.json();
    let matches = data.matches || [];

    const rankedMatches = matches.map((m: any) => {
        let score = 0;
        score += LEAGUE_WEIGHTS[m.competition.code] || 10;
        
        const homeName = m.homeTeam.name; 
        const awayName = m.awayTeam.name;
        
        if (BIG_TEAMS.some(t => homeName.includes(t) || awayName.includes(t))) {
            score += 50;
        }

        const matchDate = new Date(m.utcDate).toLocaleDateString('pl-PL');
        const todayDate = new Date().toLocaleDateString('pl-PL');
        if (matchDate === todayDate) score += 15;

        return { ...m, rankingScore: score };
    });

    rankedMatches.sort((a: any, b: any) => b.rankingScore - a.rankingScore);
    const topMatches = rankedMatches.slice(0, 3);

    let finalArticles = await Promise.all(topMatches.map(async (m: any) => {
        const homeFull = m.homeTeam.name;
        const homeShort = m.homeTeam.shortName || m.homeTeam.name;
        const awayShort = m.awayTeam.shortName || m.awayTeam.name;

        const matchDate = new Date(m.utcDate);
        const time = matchDate.toLocaleTimeString('pl-PL', {hour: '2-digit', minute:'2-digit'});
        
        const isToday = matchDate.toDateString() === new Date().toDateString();
        const isTomorrow = new Date(new Date().setDate(new Date().getDate() + 1)).toDateString() === matchDate.toDateString();
        
        let dateLabel = matchDate.toLocaleDateString('pl-PL', {weekday: 'long'});
        if (isToday) dateLabel = "DZISIAJ";
        if (isTomorrow) dateLabel = "JUTRO";

        // Szukamy zdjęcia GOSPODARZA
        const imageUrl = await getDynamicMatchImage(homeFull);

        return {
            id: m.id,
            title: isToday ? `${homeShort} vs ${awayShort}` : `${dateLabel.toUpperCase()}: ${homeShort} vs ${awayShort}`,
            category: m.competition.name === 'Primeira Liga' ? 'Liga Portugalska' : m.competition.name,
            date: dateLabel,
            time: time,
            // Przekazujemy kod ligi, żeby tekst był dopasowany
            content: generateDynamicContent(homeShort, awayShort, m.competition.name, time, isToday, m.competition.code),
            image: imageUrl 
        };
    }));

    if (finalArticles.length === 0) {
        return NextResponse.json({ 
            articles: [
                {
                    id: 0,
                    title: "Chwilowa przerwa w rozgrywkach",
                    category: "INFO",
                    time: "--:--",
                    content: "W najbliższych 3 dniach nie ma zaplanowanych hitów w głównych ligach europejskich.",
                    image: DEFAULT_IMAGE,
                    date: "INFO"
                }
            ] 
        });
    }

    return NextResponse.json({ articles: finalArticles });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ articles: [] }, { status: 500 });
  }
}