import { NextResponse } from 'next/server';

const ODDS_API_KEY = process.env.NEXT_PUBLIC_ODDS_API_KEY;

// Lista lig
const LEAGUES = [
  { key: 'soccer_epl', label: 'Premier League' },
  { key: 'soccer_germany_bundesliga', label: 'Bundesliga' },
  { key: 'soccer_italy_serie_a', label: 'Serie A' },
  { key: 'soccer_spain_la_liga', label: 'La Liga' },
  { key: 'soccer_france_ligue_one', label: 'Ligue 1' }
];

// Czas cachowania: 12 godzin (w sekundach) = 43200
// Dzięki temu pobierzemy dane tylko 2 razy na dobę dla każdej ligi.
const REVALIDATE_TIME = 43200; 

export async function GET() {
  if (!ODDS_API_KEY) {
    return NextResponse.json({ error: 'Brak klucza API' }, { status: 500 });
  }

  try {
    const fetchPromises = LEAGUES.map(league => 
      fetch(
        `https://api.the-odds-api.com/v4/sports/${league.key}/odds/?apiKey=${ODDS_API_KEY}&regions=eu,uk&markets=h2h&oddsFormat=decimal&daysFrom=3`,
        {
          // TO JEST KLUCZOWE: next: { revalidate: ... }
          // To sprawia, że Next.js zapamięta odpowiedź na 12h na serwerze.
          next: { revalidate: REVALIDATE_TIME }
        }
      )
      .then(async (res) => {
        if (!res.ok) {
           console.error(`Błąd API dla ${league.key}:`, res.status);
           return [];
        }
        const data = await res.json();
        if (!Array.isArray(data)) return [];
        
        // Filtrowanie (backendowe) - tylko przyszłe mecze
        const currentDate = new Date();
        // Odrzucamy mecze, które zaczęły się dawniej niż 2h temu
        const activeMatches = data.filter((m: any) => new Date(m.commence_time) > new Date(Date.now() - 2 * 60 * 60 * 1000));
        
        // Sortowanie i limit 2 na ligę
        activeMatches.sort((a: any, b: any) => new Date(a.commence_time).getTime() - new Date(b.commence_time).getTime());
        const top2 = activeMatches.slice(0, 2);
        
        return top2.map((m: any) => ({ ...m, league_label: league.label }));
      })
      .catch(err => {
        console.error(`Błąd fetch dla ${league.key}:`, err);
        return [];
      })
    );

    const results = await Promise.all(fetchPromises);
    const allMatches = results.flat();

    // Sortujemy globalnie po czasie
    allMatches.sort((a: any, b: any) => new Date(a.commence_time).getTime() - new Date(b.commence_time).getTime());

    return NextResponse.json(allMatches);

  } catch (error) {
    console.error('Błąd w API odds:', error);
    return NextResponse.json({ error: 'Błąd serwera' }, { status: 500 });
  }
}