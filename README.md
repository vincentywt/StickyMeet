# StickyMeet: waitlist landing pages

Pre-launch waitlist page for **StickyMeet** (Meetup Guarantee / Commit Pay), a Hong Kong–first
show-up commitment for in-person meetups, built in 11 design styles.

Live gallery: https://vincentywt.github.io/StickyMeet/

| Style | Path |
|---|---|
| Japandi | `/japandi/` |
| Memphis | `/memphis/` |
| Bauhaus | `/bauhaus/` |
| Brutalism | `/brutalism/` |
| Cybercore | `/cybercore/` |
| Neo-Brutalism | `/neo-brutalism/` |
| Kawaii | `/kawaii/` |
| Synthwave | `/synthwave/` |
| Luxury Typography | `/luxury/` |
| Graffiti | `/graffiti/` |
| Neumorphism | `/neumorphism/` |

Static HTML/CSS, no build step. Each page is self-contained apart from `assets/waitlist.js`.

## Waitlist submissions

`assets/waitlist.js` posts every form as JSON (`email`, `role`, `style`, `submitted_at`) to
`WAITLIST_ENDPOINT`. While that constant is empty, signups are only stored in the visitor's
browser (demo mode). Set it to a Formspree / Supabase / webhook URL to collect real signups.
The `style` field tells you which design variant converted.
