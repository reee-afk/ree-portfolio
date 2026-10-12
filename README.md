# Ree — Unboxing My Creative World

Portfolio site for Ritika "Ree" Goel, researcher and product designer.
Built with TanStack Start, React 19, Tailwind CSS 4 and Motion; originally made in Lovable.

## Run it

```sh
bun install
bun run dev      # opens on the port Vite prints
bun run build
```

## Pages

- `/` — unboxing hero, About (with voice note), The Goods (case study cards), Postcards from Ree, process tray, Postcard Lab, Contact
- `/case/pahal`, `/case/nodus`, `/case/accessinav` — case study pages (content in `src/lib/case-studies.ts`)
- `/api/portfolio-guide` — server route for the "Ask Ree's guide" chat

## Things to add

These files weren't available when this copy was made:

- `public/resume.pdf` — the Resume button links here (`src/assets/resume.asset.json`)
- `public/voice-note.mp3` — the About voice note plays this (`src/assets/voice-note.asset.json`)
- `src/assets/ticker.png` — currently a recreated stand-in for the scrolling strip

The "Ask Ree's guide" chat calls Lovable's AI gateway and needs a `LOVABLE_API_KEY`
environment variable; without it the guide replies that it isn't configured yet.
