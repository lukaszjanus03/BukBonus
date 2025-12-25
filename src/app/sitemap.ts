import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://bukbonus.pl';

  return [
    {
      url: baseUrl, // Strona główna
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0, // Najważniejsza
    },
    {
      url: `${baseUrl}/promocje`, // Twoja strona sprzedażowa
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/typy-dnia`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wiadomosci`,
      lastModified: new Date(),
      changeFrequency: 'hourly', // Newsy zmieniają się często
      priority: 0.7,
    },
  ];
}