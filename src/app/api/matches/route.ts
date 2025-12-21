import { NextResponse } from 'next/server';

// ZABEZPIECZENIE: Pobieramy klucz z pliku .env.local
// (To ten sam klucz co w newsach: FOOTBALL_API_KEY)
const API_KEY = process.env.FOOTBALL_API_KEY;
const API_URL = 'https://api.football-data.org/v4/matches';

export async function GET() {
  // Sprawdzenie czy klucz istnieje
  if (!API_KEY) {
      return NextResponse.json({ error: 'Brak klucza API (FOOTBALL_API_KEY)' }, { status: 500 });
  }

  try {
    // Pobieramy ligi: Anglia(PL), Niemcy(BL1), Włochy(SA), Francja(FL1), Polska(PPL)
    const response = await fetch(`${API_URL}?competitions=PL,BL1,SA,FL1,PPL`, {
      headers: {
        'X-Auth-Token': API_KEY,
      },
      next: { revalidate: 60 } // Odświeżaj dane co 60 sekund
    });

    if (!response.ok) {
      throw new Error(`Błąd API: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Błąd pobierania meczów:', error);
    return NextResponse.json({ matches: [] }, { status: 500 });
  }
}