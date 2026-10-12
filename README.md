# raderat.se

Två sidor i en liten statisk Astro-sajt:

- **/** – "Skriv det. Bränn det. Glöm det." Ett digitalt brasbål. Texten lämnar aldrig webbläsaren.
- **/ta-bort-mig** – checklista över svenska datamäklare/söktjänster med direktlänkar, steg, realistisk förväntan och en brevgenerator. Status sparas i `localStorage`.
- **/om** – utgivningsbevis, vad sajten gör och inte gör, källor.

Inga konton, inga cookies, ingen server, inget personnummer någonstans.

## Kom igång

```bash
nvm use         # Node 22 enligt .nvmrc
npm install
npm run dev      # http://localhost:4321
npm run check    # typkontroll med astro check
npm run build    # statisk output i dist/
npm run preview
```

Kräver Node 22.12+ (Astro 7).

## Deploy

Ren statisk sajt (`dist/`). Konfiguration finns för både Vercel (`vercel.json`) och Netlify (`netlify.toml`). Importera repot hos någon av dem, så plockas build-kommando, output-katalog och headers upp automatiskt. Ta bort filen för den värd du inte använder. Peka sedan DNS för raderat.se dit.

- Sidorna byggs som `om.html` och `ta-bort-mig.html` (`build.format: 'file'`). Netlify serverar dem som `/om` utan vidare. På Vercel sköter `cleanUrls` det.
- Astro lägger en strikt CSP som `<meta>` på varje sida (`security.csp` i `astro.config.mjs`) med hashar för alla skript och stilar och `connect-src 'none'`, så sidan kan inte skicka något någonstans. Inline-attributet `style="..."` blockeras därför: lägg stilar i `global.css`.
- Värdarna sätter dessutom `frame-ancestors 'none'`, `Referrer-Policy: no-referrer` och `Permissions-Policy`, som inte går att sätta via `<meta>`.

## Att underhålla: sajtregistret

Allt ligger i `src/data/sites.json`. Ett nytt fält per sajt:

| fält | betydelse |
|---|---|
| `id` | unik slug |
| `kind` | `sok`, `fordon` eller `dom` |
| `appliesTo` | `alla` (huvudlistan) eller `domda` (dold grupp) |
| `method` | `bankid`, `form` eller `email` |
| `actionUrl` / `email` | var användaren gör borttagningen |
| `expectation` | `good`, `partial`, `uncertain`, `hard` |
| `gdprApplies` | `false` för sajter med utgivningsbevis (vänlig begäran), `true` ger ett GDPR art. 17-brev |
| `steps`, `caveats` | instruktioner och förbehåll som visas på kortet |

Uppdatera `registryVerified` i `src/data/config.ts` varje gång du har gått igenom länkarna.

## Att göra före lansering

- [x] Länkarna genomgångna 2026-10-12. Ratsits `/redigera/dolj` omdirigeras nu till `/tabort` (full borttagning med BankID), Merinfo fungerar, Lexbase har flyttat kontaktsidan till `/kontakta-oss`, och Polisförbundets guide har ny adress. E-postadresserna till Birthday, Biluppgifter och Krimfup finns på respektive sajt.
- [ ] MrKoll: en nyhetskälla uppger att de nyligen ändrat policy så att full borttagning går att begära. Verifiera mot MrKolls egen information innan du lovar något. Sajten ligger bakom Cloudflares botkontroll och måste kontrolleras för hand i en vanlig webbläsare (gäller även länken till kundtjänsten).
- [ ] Sätt `contactEmail` i `src/data/config.ts`.
- [x] OG-bild i `public/og.png` (1200×630), inkopplad i `Base.astro`.
- [ ] Granska brevtexterna juridiskt om sajten ska marknadsföras mot kunder. (Alla sajter har i dag `gdprApplies: false`, så GDPR art. 17-brevet används inte än.)

## Idéer framåt

- Cron-kontroll som larmar när en opt-out-länk slutar fungera (t.ex. Supabase + Edge Function eller GitHub Actions).
- Registret som öppen data på GitHub med bidragsflöde.
- E-postpåminnelse efter 30 dagar ("har sajten svarat?"), valfritt och utan krav på konto.
- Variant för företag/AB-ägande i bolagsregistren.
