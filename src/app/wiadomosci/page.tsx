'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  content: string;
  image: string;
}

// Baza herbów - Wszystkie drużyny z 5 lig
const TEAM_LOGOS: Record<string, string> = {
  // --- PREMIER LEAGUE (ANGLIA) ---
  'arsenal': 'https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg',
  'aston villa': 'https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg',
  'villa': 'https://upload.wikimedia.org/wikipedia/en/f/f9/Aston_Villa_FC_crest_%282016%29.svg',
  'bournemouth': 'https://upload.wikimedia.org/wikipedia/en/e/e5/AFC_Bournemouth_%282013%29.svg',
  'brentford': 'https://upload.wikimedia.org/wikipedia/en/2/2a/Brentford_FC_crest.svg',
  'brighton': 'https://upload.wikimedia.org/wikipedia/en/f/fd/Brighton_%26_Hove_Albion_logo.svg',
  'chelsea': 'https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg',
  'crystal palace': 'https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg',
  'palace': 'https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg',
  'everton': 'https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg',
  'fulham': 'https://upload.wikimedia.org/wikipedia/en/a/a2/Fulham_FC_%28shield%29.svg',
  'ipswich': 'https://upload.wikimedia.org/wikipedia/en/4/43/Ipswich_Town.svg',
  'leicester': 'https://upload.wikimedia.org/wikipedia/en/2/2d/Leicester_City_crest.svg',
  'liverpool': 'https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg',
  'man city': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
  'manchester city': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
  'city': 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg',
  'man united': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
  'man utd': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
  'manchester united': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
  'united': 'https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg',
  'newcastle': 'https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg',
  'nottingham': 'https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_F.C._logo.svg',
  'forest': 'https://upload.wikimedia.org/wikipedia/en/e/e5/Nottingham_Forest_F.C._logo.svg',
  'southampton': 'https://upload.wikimedia.org/wikipedia/en/c/c9/FC_Southampton_logo.svg',
  'tottenham': 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
  'spurs': 'https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg',
  'west ham': 'https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg',
  'wolves': 'https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg',
  'wolverhampton': 'https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg',

  // --- BUNDESLIGA (NIEMCY) ---
  'augsburg': 'https://upload.wikimedia.org/wikipedia/en/c/c5/FC_Augsburg_logo.svg',
  'union berlin': 'https://upload.wikimedia.org/wikipedia/en/6/6c/1._FC_Union_Berlin_logo.svg',
  'bochum': 'https://upload.wikimedia.org/wikipedia/commons/7/72/VfL_Bochum_logo.svg',
  'werder': 'https://upload.wikimedia.org/wikipedia/commons/b/be/SV-Werder-Bremen-Logo.svg',
  'bremen': 'https://upload.wikimedia.org/wikipedia/commons/b/be/SV-Werder-Bremen-Logo.svg',
  'dortmund': 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
  'bvb': 'https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg',
  'frankfurt': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg',
  'eintracht': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Eintracht_Frankfurt_Logo.svg',
  'freiburg': 'https://upload.wikimedia.org/wikipedia/en/6/6d/SC_Freiburg_logo.svg',
  'heidenheim': 'https://upload.wikimedia.org/wikipedia/commons/9/9d/1._FC_Heidenheim_1846.svg',
  'hoffenheim': 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Logo_TSG_Hoffenheim.svg',
  'holstein kiel': 'https://upload.wikimedia.org/wikipedia/en/4/42/Holstein_Kiel_Logo.svg',
  'kiel': 'https://upload.wikimedia.org/wikipedia/en/4/42/Holstein_Kiel_Logo.svg',
  'leipzig': 'https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg',
  'rb leipzig': 'https://upload.wikimedia.org/wikipedia/en/0/04/RB_Leipzig_2014_logo.svg',
  'leverkusen': 'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg',
  'bayer': 'https://upload.wikimedia.org/wikipedia/en/5/59/Bayer_04_Leverkusen_logo.svg',
  'mainz': 'https://upload.wikimedia.org/wikipedia/commons/9/9e/FSV_Mainz_05_Logo.svg',
  'gladbach': 'https://upload.wikimedia.org/wikipedia/commons/8/81/Borussia_M%C3%B6nchengladbach_logo.svg',
  'monchengladbach': 'https://upload.wikimedia.org/wikipedia/commons/8/81/Borussia_M%C3%B6nchengladbach_logo.svg',
  'bayern': 'https://upload.wikimedia.org/wikipedia/commons/1/1b/FC_Bayern_M%C3%BCnchen_logo_%282017%29.svg',
  'st pauli': 'https://upload.wikimedia.org/wikipedia/en/0/05/FC_St._Pauli_logo.svg',
  'stuttgart': 'https://upload.wikimedia.org/wikipedia/commons/e/eb/VfB_Stuttgart_1893_Logo.svg',
  'vfb': 'https://upload.wikimedia.org/wikipedia/commons/e/eb/VfB_Stuttgart_1893_Logo.svg',
  'wolfsburg': 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Logo-VfL-Wolfsburg.svg',

  // --- SERIE A (WŁOCHY) ---
  'atalanta': 'https://upload.wikimedia.org/wikipedia/en/6/66/AtalantaBC.svg',
  'bologna': 'https://upload.wikimedia.org/wikipedia/en/5/5b/Bologna_F.C._1909_logo.svg',
  'cagliari': 'https://upload.wikimedia.org/wikipedia/en/6/61/Cagliari_Calcio_1920.svg',
  'como': 'https://upload.wikimedia.org/wikipedia/en/e/e8/Como_1907_logo.svg',
  'empoli': 'https://upload.wikimedia.org/wikipedia/en/a/a3/Empoli_FC_1920.svg',
  'fiorentina': 'https://upload.wikimedia.org/wikipedia/en/b/ba/ACF_Fiorentina_2.svg',
  'genoa': 'https://upload.wikimedia.org/wikipedia/en/6/6c/Genoa_C.F.C._logo.svg',
  'verona': 'https://upload.wikimedia.org/wikipedia/en/9/92/Hellas_Verona_FC_logo_%282020%29.svg',
  'hellas': 'https://upload.wikimedia.org/wikipedia/en/9/92/Hellas_Verona_FC_logo_%282020%29.svg',
  'inter': 'https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg',
  'juventus': 'https://upload.wikimedia.org/wikipedia/commons/b/bc/Juventus_FC_2017_icon_%28black%29.svg',
  'lazio': 'https://upload.wikimedia.org/wikipedia/en/c/ce/S.S._Lazio_badge.svg',
  'lecce': 'https://upload.wikimedia.org/wikipedia/en/a/a0/U.S._Lecce_logo.svg',
  'milan': 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
  'ac milan': 'https://upload.wikimedia.org/wikipedia/commons/d/d0/Logo_of_AC_Milan.svg',
  'monza': 'https://upload.wikimedia.org/wikipedia/en/2/2e/AC_Monza_logo.svg',
  'napoli': 'https://upload.wikimedia.org/wikipedia/commons/2/2d/SSC_Napoli_2024_%28deep_blue_navy%29.svg',
  'parma': 'https://upload.wikimedia.org/wikipedia/en/2/26/Parma_Calcio_1913_logo.svg',
  'roma': 'https://upload.wikimedia.org/wikipedia/en/f/f7/AS_Roma_logo_%282017%29.svg',
  'torino': 'https://upload.wikimedia.org/wikipedia/en/2/2e/Torino_FC_Logo.svg',
  'udinese': 'https://upload.wikimedia.org/wikipedia/en/c/ce/Udinese_Calcio_logo.svg',
  'venezia': 'https://upload.wikimedia.org/wikipedia/en/5/5e/Venezia_FC_logo.svg',

  // --- LIGUE 1 (FRANCJA) ---
  'angers': 'https://upload.wikimedia.org/wikipedia/en/d/d4/Angers_SCO_logo.svg',
  'auxerre': 'https://upload.wikimedia.org/wikipedia/en/6/6f/AJ_Auxerre_logo_2024.svg',
  'brest': 'https://upload.wikimedia.org/wikipedia/en/0/05/Stade_Brestois_29_logo.svg',
  'le havre': 'https://upload.wikimedia.org/wikipedia/en/e/e0/Le_Havre_AC_logo_2024.svg',
  'lens': 'https://upload.wikimedia.org/wikipedia/en/c/cc/RC_Lens_logo.svg',
  'lille': 'https://upload.wikimedia.org/wikipedia/en/3/3f/LOSC_Lille_Logo.svg',
  'losc': 'https://upload.wikimedia.org/wikipedia/en/3/3f/LOSC_Lille_Logo.svg',
  'lyon': 'https://upload.wikimedia.org/wikipedia/en/c/c6/Olympique_Lyonnais.svg',
  'olympique lyonnais': 'https://upload.wikimedia.org/wikipedia/en/c/c6/Olympique_Lyonnais.svg',
  'marseille': 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Olympique_Marseille_logo.svg',
  'monaco': 'https://upload.wikimedia.org/wikipedia/en/b/ba/AS_Monaco_FC.svg',
  'montpellier': 'https://upload.wikimedia.org/wikipedia/en/a/a8/Montpellier_HSC_logo.svg',
  'nantes': 'https://upload.wikimedia.org/wikipedia/en/f/f5/FC_Nantes_badge.svg',
  'nice': 'https://upload.wikimedia.org/wikipedia/en/2/2e/OGC_Nice_logo.svg',
  'psg': 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
  'paris': 'https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg',
  'reims': 'https://upload.wikimedia.org/wikipedia/en/2/28/Stade_de_Reims_logo.svg',
  'rennes': 'https://upload.wikimedia.org/wikipedia/en/9/9e/Stade_Rennais_FC.svg',
  'saint-etienne': 'https://upload.wikimedia.org/wikipedia/en/2/2c/AS_Saint-%C3%89tienne_logo.svg',
  'strasbourg': 'https://upload.wikimedia.org/wikipedia/en/8/80/Racing_Club_de_Strasbourg_logo.svg',
  'toulouse': 'https://upload.wikimedia.org/wikipedia/en/f/f6/Toulouse_FC_logo.svg',

  // --- LIGA PORTUGAL (PORTUGALIA) ---
  'arouca': 'https://upload.wikimedia.org/wikipedia/en/d/d6/F.C._Arouca_logo.png',
  'avs': 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Avs_futebol_sad_logo.png',
  'benfica': 'https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg',
  'boavista': 'https://upload.wikimedia.org/wikipedia/en/4/40/Boavista_F.C._logo.svg',
  'braga': 'https://upload.wikimedia.org/wikipedia/en/7/79/S.C._Braga_logo.svg',
  'casa pia': 'https://upload.wikimedia.org/wikipedia/en/8/8a/Casa_Pia_A.C._logo.svg',
  'estoril': 'https://upload.wikimedia.org/wikipedia/en/3/30/G.D._Estoril_Praia_logo.svg',
  'estrela': 'https://upload.wikimedia.org/wikipedia/en/1/1a/C.F._Estrela_da_Amadora_logo.png',
  'famalicao': 'https://upload.wikimedia.org/wikipedia/en/0/0e/F.C._Famalic%C3%A3o_logo.svg',
  'farense': 'https://upload.wikimedia.org/wikipedia/en/1/1b/S.C._Farense_logo.svg',
  'gil vicente': 'https://upload.wikimedia.org/wikipedia/en/d/d3/Gil_Vicente_F.C._logo.svg',
  'moreirense': 'https://upload.wikimedia.org/wikipedia/en/3/36/Moreirense_F.C._logo.svg',
  'nacional': 'https://upload.wikimedia.org/wikipedia/en/4/47/C.D._Nacional_logo.svg',
  'porto': 'https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg',
  'rio ave': 'https://upload.wikimedia.org/wikipedia/en/4/4b/Rio_Ave_F.C._logo.svg',
  'santa clara': 'https://upload.wikimedia.org/wikipedia/en/3/37/C.D._Santa_Clara_logo.svg',
  'sporting': 'https://upload.wikimedia.org/wikipedia/en/e/e1/Sporting_Clube_de_Portugal_%28Logo%29.svg',
  'vitoria': 'https://upload.wikimedia.org/wikipedia/en/4/48/Vit%C3%B3ria_S.C._logo.svg',
  'guimaraes': 'https://upload.wikimedia.org/wikipedia/en/4/48/Vit%C3%B3ria_S.C._logo.svg',

  // --- HISZPANIA (DODATEK) ---
  'real madrid': 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
  'real': 'https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg',
  'barcelona': 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
  'barca': 'https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg',
  'atletico': 'https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg',
  'girona': 'https://upload.wikimedia.org/wikipedia/en/9/90/Girona_FC_Logo.svg',
  'bilbao': 'https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg',
  'athletic': 'https://upload.wikimedia.org/wikipedia/en/9/98/Club_Athletic_Bilbao_logo.svg',
  'sociedad': 'https://upload.wikimedia.org/wikipedia/en/f/f1/Real_Sociedad_logo.svg',
  'betis': 'https://upload.wikimedia.org/wikipedia/en/1/13/Real_betis_logo.svg',
  'sevilla': 'https://upload.wikimedia.org/wikipedia/en/3/3b/Sevilla_FC_logo.svg',

  // DOMYŚLNY
  'default': 'https://cdn-icons-png.flaticon.com/512/16649/16649265.png' 
};

export default function Wiadomosci() {
  const [news, setNews] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  const today = new Date().toLocaleDateString('pl-PL', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Funkcja wyciągająca loga drużyn z tytułu
  const getMatchLogos = (title: string) => {
    if (!title) return { team1: TEAM_LOGOS['default'], team2: TEAM_LOGOS['default'], isVersus: false };

    // 1. Czyścimy tytuł (usuwamy "JUTRO:", "MECZ:" itp.)
    const cleanTitle = title
        .replace(/JUTRO:|DZISIAJ:|SOBOTA:|NIEDZIELA:|MECZ:|PONIEDZIAŁEK:|WTOREK:|ŚRODA:|CZWARTEK:|PIĄTEK:/gi, '')
        .trim();

    // 2. Dzielimy po "vs" lub "-" (najczęstszy separator)
    const parts = cleanTitle.split(/ vs | - /i);

    if (parts.length >= 2) {
        const t1Key = parts[0].trim().toLowerCase();
        const t2Key = parts[1].trim().toLowerCase();

        // Funkcja pomocnicza szukająca logo (partial match)
        const findLogo = (name: string) => {
            for (const [key, url] of Object.entries(TEAM_LOGOS)) {
                // Sprawdzamy, czy nazwa z tytułu zawiera klucz z naszej bazy
                if (name.includes(key)) return url;
            }
            return TEAM_LOGOS['default'];
        };

        return {
            team1: findLogo(t1Key),
            team2: findLogo(t2Key),
            isVersus: true
        };
    }

    // Jeśli nie udało się podzielić na 2 drużyny
    // Spróbujmy znaleźć chociaż jedną drużynę w całym tytule
    const singleTeamLogo = (() => {
        const lowerTitle = cleanTitle.toLowerCase();
        for (const [key, url] of Object.entries(TEAM_LOGOS)) {
            if (key !== 'default' && lowerTitle.includes(key)) return url;
        }
        return TEAM_LOGOS['default'];
    })();

    return { team1: singleTeamLogo, team2: null, isVersus: false };
  };

  useEffect(() => {
    fetch('/api/agent/news')
      .then(res => res.json())
      .then(data => {
        if (data && data.articles) {
          setNews(data.articles);
        } else {
          setNews([]); 
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Błąd pobierania newsów:", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <header className="bg-white border-b border-gray-200 py-6 px-4 text-center shadow-sm">
        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase mb-3 inline-block tracking-wider">
            <i className="far fa-newspaper mr-2"></i>Wydanie Dnia:
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 capitalize tracking-tight">
            {today}
        </h1>
        <p className="text-slate-500 max-w-2xl mx-auto text-xs md:text-sm">
            3 najważniejsze wydarzenia sportowe wybrane przez naszą redakcję.
        </p>
      </header>

      <div className="container mx-auto px-4 py-8 flex-grow">
        
        {loading ? (
            <div className="text-center py-20 opacity-60">
                <i className="fas fa-circle-notch fa-spin text-4xl text-blue-600 mb-4"></i>
                <p className="font-medium text-slate-600">Ładowanie dzisiejszych hitów...</p>
            </div>
        ) : news.length === 0 ? (
            <div className="text-center p-10">Brak newsów.</div>
        ) : (
            <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {news.map((item, index) => {
                    const { team1, team2, isVersus } = getMatchLogos(item.title);

                    return (
                        <article 
                            key={item.id} 
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer h-full flex flex-col"
                        >
                            <div className="absolute top-0 right-0 p-4 z-10 opacity-30 font-black text-6xl text-white pointer-events-none drop-shadow-lg">
                                {index + 1}
                            </div>

                            <Link href={`/mecz/${item.id}`} className="block h-52 relative overflow-hidden bg-slate-900">
                                {/* TŁO: Ciemny gradient + subtelny wzór */}
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"></div>
                                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
                                
                                {/* WIDOK LOGO VS LOGO */}
                                <div className="absolute inset-0 flex items-center justify-center gap-4 px-4 pb-8">
                                    {isVersus ? (
                                        <>
                                            {/* Drużyna 1 */}
                                            <div className="flex flex-col items-center gap-2 w-1/3">
                                                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm shadow-lg w-20 h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                                    <img src={team1} alt="Team 1" className="w-14 h-14 object-contain" />
                                                </div>
                                            </div>

                                            {/* VS */}
                                            <div className="flex flex-col items-center justify-center">
                                                <span className="text-yellow-400 font-black text-2xl italic tracking-tighter drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                                                    VS
                                                </span>
                                            </div>

                                            {/* Drużyna 2 */}
                                            <div className="flex flex-col items-center gap-2 w-1/3">
                                                <div className="bg-white/10 p-3 rounded-full backdrop-blur-sm shadow-lg w-20 h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                                    {team2 && <img src={team2} alt="Team 2" className="w-14 h-14 object-contain" />}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        // Fallback dla newsów nie-meczowych (jedno logo)
                                        <div className="bg-white/10 p-6 rounded-full backdrop-blur-sm shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                                            <img src={team1} alt="News" className="w-20 h-20 object-contain opacity-80" />
                                        </div>
                                    )}
                                </div>
                                
                                {/* Etykieta Ligi/Kategorii */}
                                <div className="absolute bottom-0 left-0 p-4 z-20 w-full bg-gradient-to-t from-slate-900 to-transparent pt-12">
                                    <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm mb-1 inline-block">
                                        {item.category}
                                    </span>
                                    <h2 className="font-bold text-lg leading-tight text-white drop-shadow-md pr-6 line-clamp-2">
                                        {item.title}
                                    </h2>
                                </div>
                            </Link>
                            
                            <div className="p-6 flex flex-col flex-grow relative">
                                <div className="flex items-center text-xs text-blue-700 mb-4 font-bold uppercase tracking-wide bg-blue-50 w-fit px-2.5 py-1 rounded border border-blue-100">
                                    <i className="far fa-clock mr-2"></i> {item.time}
                                </div>
                                
                                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                    {item.content}
                                </p>
                                
                                <Link 
                                    href={`/mecz/${item.id}`} 
                                    className="w-full mt-auto bg-slate-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-blue-600 transition shadow-lg shadow-slate-900/10 group-hover:shadow-blue-600/20 flex items-center justify-center gap-2"
                                >
                                    Zobacz Analizę i Składy <i className="fas fa-arrow-right text-xs opacity-70 group-hover:translate-x-1 transition-transform"></i>
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        )}
      </div>

      <Footer />
    </main>
  );
}