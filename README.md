# Romantic Birthday Website

React + TypeScript + Tailwind CSS + Framer Motion + Lucide React.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Personalize

Edit **`src/data/birthdayConfig.ts`** only: her name, your name, greeting,
qualities, the three letters, signature, and the final message.
`{name}` in any text is replaced with her name.

## Deploy

`npm run build`, then upload `dist/` to Netlify, Vercel, or GitHub Pages
and send her the link.

## Structure

```
src/
  data/birthdayConfig.ts   all personal content
  hooks/useTheme.ts        dark/light + localStorage
  components/
    FloatingHearts.tsx     hearts + sparkles background
    BirthdayCake.tsx       SVG cake with animated flames
    Hero.tsx               greeting, cake, Make a Wish
    Qualities.tsx          animated quality cards
    Envelope.tsx           3D flap envelope
    LetterModal.tsx        opened letter + cursive signature
    Letters.tsx            three independent envelopes
    Ending.tsx             "I LOVE YOU SO MUCH" finale
    ThemeToggle.tsx, SideNav.tsx
```
