# Krishi Shah - Portfolio
https://krishi-shah-s-portfolio-rzkx.vercel.app/

## ✨ Features

- **Modern Design**: Clean, minimal aesthetic with smooth animations
- **Responsive**: Fully responsive across all devices
- **Dark/Light Theme**: System-aware theme with manual toggle
- **Animated Hero**: Typewriter effect with animated background
- **Project Showcase**: Filterable grid with modal details
- **Blog Section**: Article previews with Medium integration
- **Contact Form**: Working form with serverless API endpoint
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Performance**: Optimized images, fonts, and animations
- **Accessibility**: WCAG AA compliant with keyboard navigation

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/krishi-shah/krishi-shah-s-portfolio.git
   cd krishi-shah-s-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── projects/          # Project detail pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── AboutSection.tsx   # About & experience
│   ├── ProjectsSection.tsx # Projects grid
│   ├── WritingSection.tsx # Blog posts
│   ├── ContactSection.tsx # Contact form
│   └── Footer.tsx         # Footer
├── data/                  # Content data (JSON)
│   ├── site.json          # Site configuration
│   ├── projects.json      # Project data
│   └── posts.json         # Blog posts
├── lib/                   # Utilities & hooks
│   ├── content.ts         # Data loaders
│   ├── utils.ts           # Helper functions
│   └── hooks/             # Custom React hooks
├── styles/                # Global styles
│   └── globals.css        # Tailwind & custom CSS
└── public/                # Static assets
```

## ⚙️ Configuration

### Content Data

Edit files in `/data` to update content:

- `site.json` - Name, bio, social links, theme
- `projects.json` - Portfolio projects
- `posts.json` - Blog articles

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `SENDGRID_API_KEY` | SendGrid API key for emails | No* |
| `FORMSPREE_ENDPOINT` | Formspree form endpoint | No* |
| `CONTACT_EMAIL` | Email for form submissions | No |
| `NEXT_PUBLIC_SITE_URL` | Production site URL | No |

*One of `SENDGRID_API_KEY` or `FORMSPREE_ENDPOINT` is required for the contact form to send emails in production.

## 🎨 Customization

### Colors

Edit CSS variables in `styles/globals.css`:

```css
:root {
  --primary: 160 84% 39%;  /* Emerald green */
  --background: 0 0% 100%;
  /* ... */
}
```

### Fonts

Fonts are configured in `app/layout.tsx`:

```typescript
import { Inter, Space_Grotesk, Fira_Code } from 'next/font/google';
```

### Animations

Animation durations in `tailwind.config.js`:

```javascript
transitionDuration: {
  '240': '240ms',   // Base
  '420': '420ms',   // Medium
  '820': '820ms',   // Long
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Build Commands

```bash
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run type-check # TypeScript type checking
```

## 📧 Contact Form Setup

### Option 1: SendGrid

1. Create account at [sendgrid.com](https://sendgrid.com)
2. Generate API key
3. Add `SENDGRID_API_KEY` to environment

### Option 2: Formspree

1. Create form at [formspree.io](https://formspree.io)
2. Copy form endpoint
3. Add `FORMSPREE_ENDPOINT` to environment

## 🔗 CMS Integration (Optional)

The portfolio supports headless CMS integration:

### Sanity

1. Create project at [sanity.io](https://sanity.io)
2. Define schemas matching data structure
3. Replace data loaders in `lib/content.ts`

### Contentful

1. Create space at [contentful.com](https://contentful.com)
2. Define content models
3. Update data fetching logic

## 📝 License

MIT License - feel free to use for your own portfolio!

## 🤝 Credits
- Built with [Next.js](https://nextjs.org)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Animated with [Framer Motion](https://framer.com/motion)

---

Made with ❤️ by Krishi Shah
