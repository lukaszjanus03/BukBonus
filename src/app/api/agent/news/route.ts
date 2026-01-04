import { NextResponse } from 'next/server';

// --- ZABEZPIECZENIE: Pobieranie kluczy z pliku .env.local ---
const API_KEY = process.env.FOOTBALL_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;

const API_URL = 'https://api.football-data.org/v4/matches';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80';
// Logo domyślne, gdyby API nie zwróciło herbu
const DEFAULT_CREST = 'https://cdn-icons-png.flaticon.com/512/16649/16649265.png';

const LEAGUE_WEIGHTS: Record<string, number> = {
    'CL': 100, 'PL': 90, 'PD': 85, 'BL1': 85, 'SA': 80, 'FL1': 70, 'PPL': 60, 'DED': 50, 'WC': 100, 'EC': 100
};

const BIG_TEAMS = [
    'Real Madrid', 'Barcelona', 'Manchester City', 'Arsenal', 'Liverpool', 'Bayern', 'Dortmund', 'Leverkusen',
    'Juventus', 'Milan', 'Inter', 'PSG', 'Legia', 'Lech', 'Raków', 'Chelsea', 'Manchester United', 'Napoli', 'Atletico',
    'Newcastle', 'Tottenham', 'Aston Villa', 'Benfica', 'Porto', 'Sporting', 'Marseille', 'Lyon'
];

// --- LISTA WEZWAŃ DO DZIAŁANIA (INTERNAL LINKING SEO) ---
const CTAS = [
    " Chcesz obstawić ten mecz bez ryzyka? Sprawdź nasz Ranking Bukmacherów.",
    " Zagraj ten typ w Superbet i odbierz tydzień gry bez ryzyka.",
    " Szukasz pewniaka? Zobacz Typy Dnia na naszej stronie.",
    " Obstawiaj w Fortunie i zgarnij zakład bez ryzyka na start.",
    " Sprawdź aktualne kursy i bonusy bukmacherskie na 2026 rok.",
    " Zarejestruj się z kodem BUKBONUS, aby powiększyć wygraną.",
    " Nie masz konta w STS? Odbierz bonus powitalny przed pierwszym gwizdkiem."
];

// --- WYSZUKIWANIE ZDJĘĆ ---
async function getDynamicMatchImage(teamName: string) {
    if (!UNSPLASH_KEY) return DEFAULT_IMAGE;

    try {
        const query = encodeURIComponent(`${teamName} football soccer stadium fans`);
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

// --- GENEROWANIE OPISÓW ---
function generateDynamicContent(home: string, away: string, competition: string, time: string, isToday: boolean, leagueCode: string) {
    const t = time; 
    const d = isToday ? "Dzisiaj" : "Wkrótce";

    // 1. OGÓLNE
    const general = [
        `${d} czeka nas fascynujące widowisko. ${home} podejmuje ${away}. Faworyt nie jest oczywisty. Start o ${t}.`,
        `Kibice zgromadzeni na stadionie oczekują zwycięstwa. ${home} vs ${away}. Początek meczu o godzinie ${t}.`,
        `Walka o ligowe punkty wkracza w decydującą fazę. ${home} zmierzy się z ${away}. Pierwszy gwizdek o ${t}.`,
        `Czy ${home} wykorzysta atut własnego boiska? Ich rywalem jest ${away}. Zapowiada się zacięty bój. Start: ${t}.`,
        `Obie drużyny potrzebują punktów jak tlenu. ${home} kontra ${away}. To może być mecz kolejki. Oglądaj od ${t}.`,
        `Analitycy spodziewają się otwartego spotkania. ${home} - ${away}. Kto okaże się skuteczniejszy? Godzina ${t}.`
    ];
    
    // (Tutaj możesz zostawić całą swoją dużą listę specyficznych opisów ligowych, którą miałeś wcześniej)
    // Dla czytelności skracam listę w tym przykładzie, ale Twój kod może mieć te 150 wariantów.
    
    let pool = [...general, ...general];
    // if (leagueCode === 'PL') pool = [...pool, ...eng]; itd...

    const selectedDesc = pool[Math.floor(Math.random() * pool.length)];
    const selectedCTA = CTAS[Math.floor(Math.random() * CTAS.length)];

    // ZWRACAMY OPIS + CTA
    return selectedDesc + selectedCTA;
}

export async function GET() {
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

        const imageUrl = await getDynamicMatchImage(homeFull);

        return {
            id: m.id,
            title: isToday ? `${homeShort} vs ${awayShort}` : `${dateLabel.toUpperCase()}: ${homeShort} vs ${awayShort}`,
            category: m.competition.name === 'Primeira Liga' ? 'Liga Portugalska' : m.competition.name,
            date: dateLabel,
            time: time,
            content: generateDynamicContent(homeShort, awayShort, m.competition.name, time, isToday, m.competition.code),
            image: imageUrl,
            team1Logo: m.homeTeam.crest || DEFAULT_CREST,
            team2Logo: m.awayTeam.crest || DEFAULT_CREST
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
                    content: "W najbliższych 3 dniach nie ma zaplanowanych hitów w głównych ligach europejskich. Sprawdź nasz ranking bukmacherów, aby odebrać bonusy na start.",
                    image: DEFAULT_IMAGE,
                    date: "INFO",
                    team1Logo: DEFAULT_CREST,
                    team2Logo: DEFAULT_CREST
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