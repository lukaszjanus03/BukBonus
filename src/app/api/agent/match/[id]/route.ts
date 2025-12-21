import { NextRequest, NextResponse } from 'next/server';

// ZABEZPIECZENIE: Pobieramy klucze z pliku .env.local
const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY;
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

const API_URL = 'https://api.football-data.org/v4';
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80';

// Pobieranie zdjęcia (Unsplash)
async function getDynamicMatchImage(teamName: string) {
    if (!UNSPLASH_ACCESS_KEY) return DEFAULT_IMAGE;
    try {
        const query = encodeURIComponent(`${teamName} football soccer stadium fans`);
        // Używamy zmiennej z env
        const url = `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1&orientation=landscape&order_by=relevant`;
        const res = await fetch(url, { next: { revalidate: 3600 } });
        const data = await res.json();
        return data.results?.[0]?.urls?.regular || DEFAULT_IMAGE;
    } catch (e) { return DEFAULT_IMAGE; }
}

async function getRealTeamForm(teamId: number) {
    // Zabezpieczenie przed brakiem klucza
    if (!FOOTBALL_API_KEY) return ['-', '-', '-', '-', '-'];

    try {
        const res = await fetch(`${API_URL}/teams/${teamId}/matches?status=FINISHED&limit=5`, {
            headers: { 'X-Auth-Token': FOOTBALL_API_KEY },
            next: { revalidate: 300 } 
        });
        
        const data = await res.json();
        const matches = data.matches || [];

        return matches.reverse().map((m: any) => {
            const isHome = m.homeTeam.id === teamId;
            const winner = m.score.winner; 

            if (winner === 'DRAW') return 'R';
            if (isHome && winner === 'HOME_TEAM') return 'Z';
            if (!isHome && winner === 'AWAY_TEAM') return 'Z';
            return 'P';
        });
    } catch (error) {
        return ['-', '-', '-', '-', '-']; 
    }
}

async function getStandings(competitionId: number, homeId: number, awayId: number) {
    if (!FOOTBALL_API_KEY) return { homeStats: null, awayStats: null };

    try {
        const res = await fetch(`${API_URL}/competitions/${competitionId}/standings`, {
            headers: { 'X-Auth-Token': FOOTBALL_API_KEY },
            next: { revalidate: 3600 }
        });
        const data = await res.json();
        const table = data.standings?.[0]?.table || [];

        const homeStats = table.find((t: any) => t.team.id === homeId);
        const awayStats = table.find((t: any) => t.team.id === awayId);

        return { homeStats, awayStats };
    } catch (error) {
        return { homeStats: null, awayStats: null };
    }
}

function generateRealAnalysis(homeName: string, awayName: string, competition: string, homeStats: any, awayStats: any, homeForm: string[], awayForm: string[]) {
    const homePos = homeStats?.position || '?';
    const awayPos = awayStats?.position || '?';
    const homePts = homeStats?.points || 0;
    const awayPts = awayStats?.points || 0;

    let formComment = "";
    const homeWins = homeForm.filter(x => x === 'Z').length;
    const awayWins = awayForm.filter(x => x === 'Z').length;

    if (homeWins >= 3 && awayWins < 2) {
        formComment = `Gospodarze są w wyraźnym gazie, wygrywając ${homeWins} z ostatnich 5 spotkań.`;
    } else if (homeWins < 2 && awayWins >= 3) {
        formComment = `To goście przyjeżdżają w roli faworyta, notując świetną serię wyników.`;
    } else {
        formComment = `Obie drużyny prezentują zbliżony poziom formy.`;
    }

    let verdict = `Powyżej 1.5 gola w meczu.`;
    if (homeStats && awayStats) {
        if (homePts > awayPts + 10) verdict = `Zwycięstwo ${homeName} (Kursy faworyzują gospodarzy).`;
        else if (awayPts > homePts + 10) verdict = `Zwycięstwo ${awayName} lub X2.`;
        else if (homeStats.goalsFor > 1.5 * homeStats.playedGames) verdict = `Obie drużyny strzelą (BTTS).`;
    }

    return {
        preview: `Starcie w ramach ${competition}. ${homeName} (miejsce ${homePos}.) podejmuje ${awayName} (miejsce ${awayPos}.). Dzieli ich w tabeli ${Math.abs(homePts - awayPts)} pkt. ${formComment}`,
        statsReport: `Sytuacja w tabeli: ${homeName} zajmuje ${homePos}. lokatę z dorobkiem ${homePts} punktów (Bramki: ${homeStats?.goalsFor || 0}:${homeStats?.goalsAgainst || 0}). ${awayName} jest na ${awayPos}. miejscu (${awayPts} pkt).`,
        verdict: verdict
    };
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Sprawdzamy czy mamy klucze zanim zaczniemy
    if (!FOOTBALL_API_KEY) {
        return NextResponse.json({ error: 'Błąd konfiguracji serwera: brak klucza API.' }, { status: 500 });
    }

    try {
        const res = await fetch(`${API_URL}/matches/${id}`, {
            headers: { 'X-Auth-Token': FOOTBALL_API_KEY },
            next: { revalidate: 3600 }
        });

        if (!res.ok) throw new Error('Mecz nie znaleziony');
        const data = await res.json();

        const home = data.homeTeam.shortName || data.homeTeam.name;
        const away = data.awayTeam.shortName || data.awayTeam.name;
        const homeId = data.homeTeam.id;
        const awayId = data.awayTeam.id;
        
        const homeCrest = data.homeTeam.crest;
        const awayCrest = data.awayTeam.crest;

        const competition = data.competition.name;
        const competitionId = data.competition.id;
        const date = new Date(data.utcDate);

        const [image, homeForm, awayForm, standings] = await Promise.all([
            getDynamicMatchImage(data.homeTeam.name),
            getRealTeamForm(homeId),
            getRealTeamForm(awayId),
            getStandings(competitionId, homeId, awayId)
        ]);

        const analysis = generateRealAnalysis(home, away, competition, standings.homeStats, standings.awayStats, homeForm, awayForm);

        return NextResponse.json({
            id: data.id,
            homeTeam: home,
            awayTeam: away,
            homeTeamCrest: homeCrest,
            awayTeamCrest: awayCrest,
            competition: competition,
            date: date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' }),
            time: date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
            image: image,
            analysis: {
                ...analysis,
                homeFormCodes: homeForm,
                awayFormCodes: awayForm,
                tableData: {
                    home: standings.homeStats,
                    away: standings.awayStats
                }
            }
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Błąd pobierania danych' }, { status: 500 });
    }
}