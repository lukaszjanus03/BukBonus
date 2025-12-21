'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Article {
  id: number;
  title: string;
  category: string;
  time: string;
}

export default function NewsWidget() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agent/news')
      .then(res => {
         if (!res.ok) throw new Error("Błąd pobierania");
         return res.json();
      })
      .then(data => {
        if (data.articles) {
            setArticles(data.articles.slice(0, 3));
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Błąd widgetu:", err);
        setLoading(false);
      });
  }, []);

  // --- LOADING ---
  if (loading) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
        {[1, 2, 3].map((i) => (
          <div key={i} className="py-4 border-b border-slate-100 last:border-0 animate-pulse flex justify-between items-center">
             <div className="space-y-2 w-2/3">
                <div className="h-2 bg-slate-200 rounded w-1/3"></div>
                <div className="h-3 bg-slate-200 rounded w-3/4"></div>
             </div>
             <div className="h-6 w-20 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (articles.length === 0) return null;

  // --- WIDOK WŁAŚCIWY ---
  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-2">
      
      {articles.map((article, index) => (
        <Link 
          key={article.id} 
          href={`/mecz/${article.id}`} 
          // Flex container: rowywnuje elementy do lewej i prawej (justify-between)
          className={`flex items-center justify-between p-3 hover:bg-slate-50 rounded-lg transition-colors group ${
             index !== articles.length - 1 ? 'border-b border-slate-100 mb-1' : ''
          }`}
        >
          {/* LEWA STRONA: Info o meczu */}
          <div className="flex flex-col gap-1 pr-4">
             <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">
                    {article.category}
                </span>
                <span className="text-[10px] font-bold text-slate-400">
                    {article.time}
                </span>
             </div>
             <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 leading-snug">
                {article.title}
             </h3>
          </div>

          {/* PRAWA STRONA: Przycisk "Zobacz analizę" */}
          <div className="shrink-0">
             <span className="text-[10px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-all whitespace-nowrap flex items-center gap-1">
                Zobacz analizę <i className="fas fa-chevron-right text-[8px]"></i>
             </span>
          </div>
          
        </Link>
      ))}
    </div>
  );
}