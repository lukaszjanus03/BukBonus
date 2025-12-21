import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // 1. Zabezpieczenie: Nagłówki HTTP (Security Headers)
  async headers() {
    return [
      {
        source: '/:path*', // Te reguły dotyczą każdej podstrony
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload' // Wymusza HTTPS (ważne na produkcji)
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN' // Blokuje ładowanie strony w ramkach (iframe) na obcych stronach
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff' // Zapobiega błędnej interpretacji typów plików
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin' // Chroni prywatność użytkownika
          }
        ]
      }
    ];
  },

  // 2. Optymalizacja obrazków (Dopuszczamy zewnętrzne domeny)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: 'googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'i1.sndcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'dam.begmedia.com',
      },
      {
        protocol: 'https',
        hostname: 'gramgrubo.pl',
      },
      {
        protocol: 'https',
        hostname: 'pewniaczki.pl',
      },
      {
        protocol: 'https',
        hostname: 'surebety.pl',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
      },
    ],
  },
};

export default nextConfig;