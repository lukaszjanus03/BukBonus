'use client';
import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sprawdź czy użytkownik już zaakceptował
    const consent = localStorage.getItem('bukbonus_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('bukbonus_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[999] p-4 md:p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          <p className="font-bold text-gray-900 mb-1">🍪 Szanujemy Twoją prywatność</p>
          <p>
            Strona korzysta z plików cookies w celu realizacji usług, analizy ruchu oraz w celach marketingowych (afiliacja). 
            Korzystając ze strony, wyrażasz zgodę na ich używanie.
            <a href="#" className="text-blue-600 underline ml-1 hover:text-blue-800">Polityka Prywatności</a>.
          </p>
        </div>
        <div className="flex gap-3 shrink-0">
          <button 
            onClick={acceptCookies}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg text-sm transition"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}