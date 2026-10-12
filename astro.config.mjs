import { defineConfig } from 'astro/config';

// Helt statisk sajt: fungerar som den är på Vercel, Netlify, Cloudflare Pages eller Fly.
export default defineConfig({
  site: 'https://raderat.se',
  trailingSlash: 'never',
  build: { format: 'file' },
  // Ingen markdown på sajten. Shikis inline-stilar krockar dessutom med CSP:n.
  markdown: { syntaxHighlight: false },
  // Astro lägger en CSP-<meta> med hashar för alla skript och stilar på varje sida.
  // Inga externa resurser är tillåtna, och sajten kan inte skicka data någonstans.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "connect-src 'none'",
        "form-action 'none'",
        "object-src 'none'",
        "base-uri 'none'",
      ],
    },
  },
});
