import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generujemy dane strukturalne dla Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://bukbonus.pl${item.href}`
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      {/* Wstrzyknięcie danych dla robotów Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <ol className="flex items-center flex-wrap gap-2 text-xs md:text-sm text-slate-500 font-medium">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <i className="fas fa-chevron-right text-[10px] text-slate-300 mx-2"></i>
              )}
              
              {isLast ? (
                <span className="text-slate-800 font-bold" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  {index === 0 && <i className="fas fa-home mb-0.5"></i>}
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}