# Maheen's Beauty & Makeup Saloon

Luxury mobile-first website & installable PWA for **Maheen's Beauty & Makeup Saloon** (Latifabad Unit 09, Hyderabad, Sindh).

## 1. Updating Client Content (`src/data/site.ts`)
All saloon details, services, bridal packages, deals, reviews, FAQs, and `// TODO CLIENT` placeholders live in `src/data/site.ts`:
- `contact.openingHoursToday` & `contact.hoursSchedule`: Add opening hours to reveal the live hours line in the Hero and the hours table in Visit Us.
- `contact.googleRating`: Add a verified Google rating string (e.g. `"4.9"`) to show the rating badge in the Hero.
- `social.facebookUrl` & `social.instagramHandle` / `instagramUrl`: Add exact social links.
- `services[].priceFrom`, `bridalPackages[].priceLabel`, `deals[].price` / `validTill`: Add confirmed PKR pricing and seasonal dates.
- `team`: Add verified staff portraits and specialties (`Minal`, `Shumaila`, `Waiba`, `Sumaira`, `Wahiba`, `Mehak`, `Anum`) to automatically reveal the Team section.

## 2. Swapping Photos
Replace the preview assets referenced in `IMAGES` inside `src/data/site.ts` with real salon & bridal photographs stored in `public/photos/` or `src/assets/images/`, and update `public/og-image.jpg` for social link previews.

## 3. Scripts & Deployment
```bash
npm install
npm run dev     # local development on port 3000
npm run lint    # TypeScript type-check
npm run build   # production bundle in dist/ (ready for Vercel / Netlify)
```
