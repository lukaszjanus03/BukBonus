import { NextResponse } from 'next/server';

// ZABEZPIECZENIE: Pobieramy klucz z pliku .env.local
const API_KEY = process.env.FOOTBALL_API_KEY;
const API_URL = 'https://api.football-data.org/v4/matches';

export async function GET() {
  // Sprawdzenie czy klucz istnieje
  if (!API_KEY) {
      return NextResponse.json({ error: 'Brak klucza API (FOOTBALL_API_KEY)' }, { status: 500 });
  }

  try {
    // --- ZMIANA TUTAJ: Dodałem "PD" do listy competitions ---
    // PL=Anglia, BL1=Niemcy, SA=Włochy, FL1=Francja, PPL=Polska, PD=Hiszpania
    const response = await fetch(`${API_URL}?competitions=PL,BL1,SA,FL1,PPL,PD`, {
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