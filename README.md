# Nuvex Studio

Landing page for Nuvex Studio, a web design & development studio. Built with React + Vite, bilingual (English / Thai).

## Run locally

    npm install
    npm run dev

## Build

    npm run build   # output in dist/

## Editing

- Contact details: `src/siteConfig.js`
- All text (EN / TH): `src/i18n/en.js`, `src/i18n/th.js`
- Styles: `src/index.css`
- Contact form delivery: set `VITE_FORM_ENDPOINT` in `.env` (e.g. a Formspree URL)
