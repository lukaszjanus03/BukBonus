import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jak odebrać bonus bukmacherski? Instrukcje Krok po Kroku 2026',
  description: 'Zobacz szczegółowe poradniki jak zarejestrować konto, wpisać kod promocyjny i odebrać maksymalny bonus u każdego legalnego bukmachera w Polsce.',
};

// Lista zaktualizowana o LOGA (zamiast ikon)
const GUIDES = [
  { slug: 'superbet', name: 'Superbet', logo: 'https://play-lh.googleusercontent.com/0ygX2EFB7ZOfe7cA0EgZ4KBqHf942ShCQPzJJwoo41Y8gqAvDJAQzTzJ-zMj2ejgLI0=w240-h480-rw' },
  { slug: 'sts', name: 'STS', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZR0K8gIc1a6Yx33pUR3Op8lK0VFxStZiwww&s' },
  { slug: 'fortuna', name: 'Fortuna', logo: 'https://i1.sndcdn.com/avatars-000330081863-yuozc1-original.jpg' },
  { slug: 'betclic', name: 'Betclic', logo: 'https://dam.begmedia.com/front/native-apps/app-sports.png' },
  { slug: 'lvbet', name: 'LVBET', logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/lv-bet-logo.jpg' },
  { slug: 'betfan', name: 'Betfan', logo: 'https://pewniaczki.pl/wp-content/uploads/2021/03/betfan.png' },
  { slug: 'totalbet', name: 'Totalbet', logo: 'https://surebety.pl/wp-content/uploads/2020/12/totalbet-pl-zaklady-bukmacherskie-logo.jpg' },
  { slug: 'etoto', name: 'Etoto', logo: 'https://gramgrubo.pl/wp-content/uploads/2025/06/etoto-logo.jpg' },
  { slug: 'fuksiarz', name: 'Fuksiarz', logo: 'https://surebety.pl/wp-content/uploads/2021/04/fuksiarz-logo-bialo-czerwone-400x400-1.png' },
  { slug: 'forbet', name: 'Forbet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Forbetlogo.png/250px-Forbetlogo.png' },
];

export default function GuidesList() {
  return (
    <div className="bg-slate-50 font-sans pb-20">
      <Navbar />
      
      <section className="bg-white py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
            <div className="inline-block bg-yellow-100 text-yellow-800 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest mb-6 border border-yellow-200">
                Centrum Wiedzy
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                Jak odebrać <span className="text-blue-600">Bonus na Start?</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                Wybierz bukmachera z listy poniżej i zobacz <strong>kompletną instrukcję "krok po kroku"</strong>. Tłumaczymy jak założyć konto, gdzie wpisać kod, jak wpłacić pieniądze i jak wypłacić bonus.
            </p>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {GUIDES.map((guide) => (
                <Link 
                    key={guide.slug} 
                    href={`/poradnik/${guide.slug}`}
                    className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-6"
                >
                    {/* ZMIANA: Zamiast kolorowego kółka, biały kontener z LOGO */}
                    <div className="w-20 h-20 bg-white rounded-xl flex items-center justify-center shrink-0 border border-slate-100 shadow-sm p-2 group-hover:border-blue-100 transition-colors">
                        <img 
                            src={guide.logo} 
                            alt={`Bonus ${guide.name}`} 
                            className="max-w-full max-h-full object-contain"
                        />
                    </div>
                    
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {guide.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1 flex items-center gap-1">
                            Zobacz instrukcję <i className="fas fa-arrow-right text-[10px] transform group-hover:translate-x-1 transition-transform"></i>
                        </p>
                    </div>
                </Link>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}