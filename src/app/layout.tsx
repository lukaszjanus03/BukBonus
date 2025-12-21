import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 1. Twoje importy (zachowane)
import LiveTicker from "@/components/LiveTicker"; 

// 2. Importujemy komponent Cookies (który zrobiliśmy wcześniej)
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BukBonus.pl - Najlepsze Bonusy Bukmacherskie",
  description: "Ranking legalnych bukmacherów w Polsce. Sprawdź bonusy na start.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        {/* 3. NAPRAWA IKON (FontAwesome CDN) - To naprawi "pusty kwadrat" w menu hamburgerowym */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      
      {/* Dodajemy bg-slate-50, żeby tło strony było spójne z resztą komponentów */}
      <body className={`${inter.className} bg-slate-50 text-slate-900`}>
        
        {/* 4. Twój LiveTicker NA SAMEJ GÓRZE */}
        <LiveTicker />
        
        {/* Reszta strony (Navbar, Hero, Treść) */}
        {children}

        {/* 5. Baner Cookies (pasek na samym dole) */}
        <CookieConsent />

      </body>
    </html>
  );
}