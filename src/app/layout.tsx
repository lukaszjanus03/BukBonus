import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LiveTicker from "@/components/LiveTicker"; 
import Navbar from "@/components/Navbar";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const GA_MEASUREMENT_ID = 'G-G6YJNYFLZ0'; 

export const metadata: Metadata = {
  // ... (reszta metadanych bez zmian) ...
  title: {
    default: "Najlepsze Bonusy Bukmacherskie 2026 | Kody Promocyjne",
    template: "%s | BukBonus.pl"
  },
  description: "Odbierz ekskluzywne bonusy bukmacherskie: zakłady bez ryzyka, freebety i bonusy powitalne. Sprawdź aktualne kody promocyjne na 2026 rok.",
  keywords: ["bonusy bukmacherskie", "promocje", "kody promocyjne", "zakład bez ryzyka", "ranking bukmacherów 2026"],
  openGraph: {
    title: "Największe Bonusy Bukmacherskie i Kody Promocyjne",
    description: "Zgarnij pakiety powitalne. Porównywarka najlepszych ofert.",
    url: 'https://bukbonus.pl',
    siteName: 'BukBonus.pl',
    locale: 'pl_PL',
    type: 'website',
  },
  verification: {
    google: "ldgcHhMf14xFfxROpGI7YZH83lNJUPM-9mSbKtDRcM0", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <head>
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" 
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" 
          crossOrigin="anonymous" 
          referrerPolicy="no-referrer" 
        />
      </head>
      
      {/* --- ZMIANA TUTAJ: Dodano 'min-h-screen flex flex-col' --- */}
      <body 
        className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex flex-col`}
        suppressHydrationWarning={true} 
      >
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>

        <LiveTicker />
        <Navbar />

        {/* --- ZMIANA TUTAJ: Dodano 'flex-grow', żeby treść wypychała stopkę --- */}
        <main className="pt-[120px] flex-grow">
             {children}
        </main>
        
        <CookieConsent />
      </body>
    </html>
  );
}