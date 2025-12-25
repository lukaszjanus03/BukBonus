import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Jeśli kiedyś dodasz panel admina
    },
    sitemap: 'https://bukbonus.pl/sitemap.xml',
  };
}