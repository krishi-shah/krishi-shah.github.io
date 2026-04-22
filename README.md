# Krishi Shah — Portfolio

**Live site:** https://krishi-shah.github.io

## Tech Stack

- **Framework:** Next.js (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Hosting:** GitHub Pages (auto-deploy via GitHub Actions)

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing Content

All content lives in `/data` as JSON:

- `site.json` — name, bio, social links
- `projects.json` — portfolio projects
- `posts.json` — blog articles

## Deployment

Push to `main` and GitHub Actions builds + deploys automatically. The workflow is at `.github/workflows/deploy.yml`.

To build locally:

```bash
npm run build   # outputs static site to ./out
```

## Project Structure

```
app/            Next.js App Router pages
  projects/    Dynamic project detail pages
components/    React components
data/          Content (JSON)
lib/           Data loaders and utilities
public/        Static assets
styles/        Global CSS
```

## Contact Form

The form opens the visitor's email client pre-filled (`mailto:`), since GitHub Pages is static and can't run server code. To switch to a real submit-without-leaving-the-page form, sign up for [Formspree](https://formspree.io) and update the submit handler in `components/ContactSection.tsx`.
