export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-500 text-xs py-12 border-t border-slate-800 mt-auto font-sans">
      <div className="container mx-auto px-4">
        
        {/* SEKCJA 1: GŁÓWNE OSTRZEŻENIA PRAWNE (Najważniejsze) */}
        <div className="mb-10 p-5 bg-slate-800/40 rounded-xl border border-slate-700/50 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-4">
              <div className="bg-red-600 text-white font-bold px-3 py-1.5 rounded text-[10px] uppercase tracking-wider shrink-0 shadow-lg shadow-red-900/20">
                 Ostrzeżenie 18+
              </div>
              <div className="space-y-2">
                <p className="leading-relaxed text-slate-400">
                   Serwis <strong>BukBonus.pl</strong> przeznaczony jest wyłącznie dla osób pełnoletnich (18+). 
                   Hazard wiąże się z ryzykiem utraty środków finansowych oraz uzależnienia. 
                   Gra u podmiotów nieposiadających zezwolenia Ministerstwa Finansów jest zabroniona i grozi surowymi konsekwencjami prawnymi.
                </p>
                <p className="text-[10px] text-slate-500">
                   Korzystając z serwisu, akceptujesz ryzyko związane z hazardem. Jeśli czujesz, że tracisz kontrolę, skontaktuj się z instytucjami pomocowymi (np. Anonimowi Hazardziści).
                </p>
              </div>
          </div>
        </div>

        {/* SEKCJA 2: LICENCJE I INFORMACJE (Grid) */}
        <div className="grid md:grid-cols-12 gap-10 mb-10 border-b border-slate-800 pb-10">
          
          {/* Kolumna Lewa: Lista Licencji */}
          <div className="md:col-span-7">
            <h4 className="font-bold text-slate-300 mb-4 uppercase tracking-wide text-[11px] border-b border-slate-800/50 pb-2 inline-block">
              Legalni Bukmacherzy (Zezwolenia MF RP)
            </h4>
            <ul className="space-y-2 text-[10px] leading-relaxed opacity-80 grid md:grid-cols-2 gap-x-8">
              <li><strong>STS S.A.</strong> – nr SC/12/7251/11-6/KLE/2011/5540/12</li>
              <li><strong>Fortuna online zakłady bukmacherskie Sp. z o.o.</strong> – nr SC/12/72/51/11</li>
              <li><strong>Superbet zakłady bukmacherskie Sp. z o.o.</strong> – nr PS4.6831.5.2019</li>
              <li><strong>Betclic (BEM Operations Limited)</strong> – nr PS4.6831.11.2017</li>
              <li><strong>BETFAN Sp. z o.o.</strong> – nr PS4.6831.3.2018</li>
              <li><strong>LV BET Zakłady Bukmacherskie Sp. z o.o.</strong> – nr PS4.6831.9.2016.EQK</li>
              <li><strong>Bukmacherska Sp. z o.o. (Fuksiarz)</strong> – nr PS4.6831.1.2020</li>
              <li><strong>forBET Zakłady Bukmacherskie Sp. z o.o.</strong> – nr PS4.6831.10.2016</li>
              <li><strong>FUN PROJECT Sp. z o.o. (BetX)</strong> – nr PS4.6831.12.2017</li>
              <li><strong>Totalbet Zakłady Bukmacherskie Sp. z o.o.</strong> – nr PS4.6831.15.2017</li>
              <li><strong>E-TOTO Zakłady Bukmacherskie Sp. z o.o.</strong> – nr AG9(RG3)/7251/15/KLE/2013/17</li>
              <li><strong>GO BET Sp. z o.o.</strong> – nr PA11.6831.11.2021</li>
            </ul>
          </div>

          {/* Kolumna Prawa: O nas i Menu */}
          <div className="md:col-span-5 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-slate-300 mb-4 uppercase tracking-wide text-[11px] border-b border-slate-800/50 pb-2 inline-block">
                  O Serwisie
                </h4>
                <p className="mb-4 text-[11px] leading-relaxed">
                  BukBonus.pl to niezależny portal informacyjny. Nie jesteśmy organizatorem gier hazardowych. 
                  Prezentujemy rzetelne recenzje, analizy kursów oraz kody promocyjne legalnych operatorów działających w Polsce.
                </p>
                <p className="text-[10px] italic opacity-60">
                  Administrator nie ponosi odpowiedzialności za treści reklamowe emitowane przez partnerów oraz za decyzje finansowe użytkowników.
                </p>
              </div>
          </div>
        </div>

        {/* SEKCJA 3: LINKI I COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-2">
          
          <div className="flex flex-wrap justify-center md:justify-start gap-6 font-bold text-slate-400 text-xs">
            <a href="/regulamin" className="hover:text-white transition hover:underline underline-offset-4">Regulamin</a>
            <a href="/polityka-prywatnosci" className="hover:text-white transition hover:underline underline-offset-4">Polityka Prywatności</a>
            {/* ZMIANA: Dodano link do Zasad Afiliacji */}
            <a href="/zasady-afiliacji" className="hover:text-white transition hover:underline underline-offset-4">Zasady Afiliacji</a>
            <a href="mailto:kontakt@bukbonus.pl" className="hover:text-white transition hover:underline underline-offset-4">Kontakt</a>
          </div>

          <div className="text-center md:text-right">
              <div className="font-bold text-slate-300 mb-1">BukBonus.pl &copy; {new Date().getFullYear()}</div>
              <div className="text-[10px] opacity-50">Wszelkie prawa zastrzeżone.</div>
          </div>
          
        </div>
      </div>
    </footer>
  );
}