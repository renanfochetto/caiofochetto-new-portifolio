# 🎯 Caio Fochetto - Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Lighthouse](https://img.shields.io/badge/Lighthouse-98%2F100-success?style=flat&logo=lighthouse)](https://developers.google.com/web/tools/lighthouse)
[![Performance](https://img.shields.io/badge/Performance-98%2F100-success?style=flat)](https://pagespeed.web.dev/)

Portfolio profissional de Caio Fochetto - Líder em Marketing de Influência e Performance Digital com 15+ anos de experiência conectando marca, cultura e performance através de estratégias de conteúdo e influência.

**🌐 Live Site:** [caiofochetto.com](https://caiofochetto.com)

---

## ✨ Features

### 🎨 **Design & UX**
- ✅ Design system customizado (Fraunces, Space Grotesk, Manrope)
- ✅ **Dark/Light mode** com persistência (localStorage)
- ✅ **Dynamic favicon** (muda com theme) 🎨
- ✅ Animações suaves e performáticas (Framer Motion)
- ✅ Modo responsivo mobile-first (100% otimizado)
- ✅ Acessibilidade WCAG 2.1 AA compliant

### 🌍 **Internacionalização**
- ✅ Suporte a 3 idiomas (PT, EN, ES)
- ✅ URLs localizadas (`/pt`, `/en`, `/es`)
- ✅ **Auto-detecção de idioma** (Accept-Language header) 🌐
- ✅ Conteúdo dinâmico por localidade

### ⚡ **Performance**
- ✅ **100/100** Lighthouse Performance Score
- ✅ **FCP:** 0.4-0.9s (Excellent)
- ✅ **LCP:** 0.7-0.9s (Excellent)
- ✅ **CLS:** 0 (Perfect)
- ✅ **TBT:** 0ms (Perfect)
- ✅ Bundle otimizado: ~436 KB total page weight

### 🔍 **SEO**
- ✅ Schema.org structured data (Person, CreativeWork, BreadcrumbList)
- ✅ Dynamic meta tags por página
- ✅ Open Graph e Twitter Cards
- ✅ Sitemap.xml automático
- ✅ robots.txt configurado
- ✅ Canonical URLs

### 📊 **Analytics**
- ✅ Umami Analytics integrado
- ✅ Eventos customizados (case views, CTA clicks)
- ✅ Privacy-first (GDPR compliant)

---

## 🛠️ Tech Stack

### **Framework & Core**
- [Next.js 15](https://nextjs.org/) - App Router, Server Components
- [React 19](https://react.dev/) - RC (canary)
- [TypeScript 5](https://www.typescriptlang.org/) - Type-safe development

### **Styling & Animation**
- [Tailwind CSS 3](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion 11](https://www.framer.com/motion/) - Production-ready animations
- CSS Variables - Design tokens system
- **Theme System** - Dark/Light mode with dynamic favicon

### **Fonts**
- [Fraunces](https://fonts.google.com/specimen/Fraunces) - Display font (headings)
- [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) - Sans-serif (subheadings)
- [Manrope](https://fonts.google.com/specimen/Manrope) - Body text
- Self-hosted with Next.js Font Optimization

### **Internationalization**
- Custom i18n implementation
- Dictionary-based translations (`/lib/i18n/dictionaries`)
- Locale-specific routing
- **Auto-detection** via Accept-Language header

### **Analytics & Monitoring**
- [Umami Analytics](https://umami.is/) - Privacy-focused analytics
- Custom event tracking
- Real-time monitoring

### **Deployment**
- [Vercel](https://vercel.com/) - Zero-config deployment
- Automatic CI/CD from GitHub
- Edge Network CDN

---

## 🚀 Quick Start

### Prerequisites
```bash
Node.js 18+ (recommended: 20+)
npm, yarn, or pnpm
```

### Installation
```bash
# Clone repository
git clone https://github.com/renanfochetto/caiofochetto-new-portifolio.git
cd caiofochetto-new-portifolio

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📜 Available Scripts
```bash
# Development
npm run dev          # Start dev server (localhost:3000)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Analysis
npm run analyze      # Bundle size analysis (webpack-bundle-analyzer)
```

---

## 📊 Performance Benchmarks

### Lighthouse Scores (Desktop)

| Metric | Score       | Status |
|--------|-------------|--------|
| Performance | **100/100** | ✅ Excellent |
| Accessibility | **100/100** | ✅ Perfect |
| Best Practices | **100/100** | ✅ Perfect |
| SEO | **100/100** | ✅ Perfect |

### Core Web Vitals

| Metric | Value | Threshold | Status |
|--------|-------|-----------|--------|
| First Contentful Paint (FCP) | 0.4-0.9s | < 1.8s | ✅ Good |
| Largest Contentful Paint (LCP) | 0.7-0.9s | < 2.5s | ✅ Good |
| Cumulative Layout Shift (CLS) | 0 | < 0.1 | ✅ Perfect |
| Total Blocking Time (TBT) | 0ms | < 300ms | ✅ Perfect |
| Speed Index | 0.8-1.0s | < 3.4s | ✅ Good |

### Bundle Size Analysis
```
Total Page Weight: ~436 KB
├─ JavaScript: ~180 KB (gzipped)
├─ CSS: ~12 KB (gzipped)
├─ Fonts: ~42 KB (3 families, optimized weights)
├─ Images: ~200 KB (WebP with lazy loading)
└─ Other: ~2 KB
```

**Optimizations Applied:**
- ✅ Code splitting by route
- ✅ Dynamic imports for heavy components
- ✅ Tree-shaking (removed unused Lucide icons: -337 KB)
- ✅ Image optimization (Next.js Image component)
- ✅ Font subsetting and preloading

---

## 🏗️ Project Structure
```
caiofochetto-new-portifolio/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # Localized routes (pt, en, es)
│   │   ├── page.tsx              # Homepage
│   │   ├── layout.tsx            # Layout with i18n
│   │   ├── performance-case/     # Performance case pages
│   │   ├── production-case/      # Production case pages
│   │   └── not-found.tsx         # Custom 404 page
│   ├── fonts.css                 # Self-hosted fonts
│   └── globals.css               # Global styles
│
├── components/                   # React components
│   ├── cards/                    # Case cards
│   ├── case/                     # Case page sections
│   ├── layout/                   # Header, Footer
│   ├── sections/                 # Homepage sections
│   ├── seo/                      # SEO components (Schema.org)
│   ├── templates/                # Page templates
│   └── ui/                       # Reusable UI components
│
├── lib/                          # Utilities & data
│   ├── data/                     # Static data (cases, experiences)
│   ├── helpers/                  # Helper functions
│   ├── i18n/                     # Internationalization
│   │   └── dictionaries/         # Translation files
│   └── utils.ts                  # Utility functions
│
├── types/                        # TypeScript types
│   ├── index.ts                  # Central exports
│   ├── common.ts                 # Shared types
│   ├── guards.ts                 # Type guards
│   ├── localization.ts           # i18n utilities
│   ├── performance-case.ts       # Performance cases
│   └── production-case.ts        # Production cases
│
├── public/                       # Static assets
│   ├── fonts/                    # Self-hosted fonts
│   ├── images/                   # Optimized images
│   ├── logos/                    # Brand logos (SVG)
│   ├── favicon-dark.svg          # Dark mode favicon
│   └── favicon-light.svg         # Light mode favicon
│
└── next.config.mjs               # Next.js configuration
```

---

## 🎨 Type Architecture

The project follows a **hybrid type architecture** for optimal maintainability:

### **Centralized Types** (`/types`)
Domain types used across multiple components:
- `CaseData` - Performance case structure
- `ProductionCase` - Production case structure
- `Locale`, `LocalizedFields` - i18n types
- Type guards: `isCaseData()`, `isProductionCase()`
- Utilities: `getLocalizedField()`, `getLocalizedArray()`

### **Component-Level Types**
Props interfaces remain inline for component-specific logic.

**Rule:** If used in 2+ components or domain logic → `/types`. Otherwise → inline.

---

## 🌙 Theme System

### Dark/Light Mode
The portfolio features a sophisticated theme system:

- **Automatic detection** of system preference
- **Manual toggle** via UI button
- **Persistent** across sessions (localStorage)
- **Dynamic favicon** that changes with theme
- **Smooth transitions** between modes

### Favicon Implementation
```typescript
// Dark mode: CF logo in lime green
favicon-dark.svg

// Light mode: CF logo in dark purple
favicon-light.svg

// Auto-switches based on theme
useEffect(() => {
  const favicon = document.querySelector('link[rel="icon"]');
  favicon.href = theme === 'dark' 
    ? '/favicon-dark.svg' 
    : '/favicon-light.svg';
}, [theme]);
```

---

## 🔧 Configuration

### Environment Variables

Create `.env.local`:
```bash
# Umami Analytics (optional)
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
NEXT_PUBLIC_UMAMI_URL=https://cloud.umami.is
```

### Next.js Config

Key configurations in `next.config.mjs`:
- Image optimization (AVIF, WebP)
- Redirects (`/` → `/pt`)
- Bundle analyzer (development)
- i18n locale detection

---

## 🌍 Internationalization

### Supported Locales

- 🇧🇷 Portuguese (pt-BR) - Default
- 🇺🇸 English (en-US)
- 🇪🇸 Spanish (es-ES)

### Auto-Detection
The site automatically detects user language from:
1. `Accept-Language` HTTP header
2. Browser settings
3. Falls back to Portuguese (default)

### Adding Translations
```typescript
// lib/i18n/dictionaries/pt.ts
export default {
  hero: {
    headline: "Seu texto aqui",
    // ...
  }
}
```

### Using Translations
```typescript
import { getDictionary } from '@/lib/i18n/dictionaries';

const dict = await getDictionary(locale);
{dict.hero.headline}
```

---

## 📈 SEO Strategy

### Schema.org Implementation

**Dynamic structured data:**
- `PersonSchema` - Auto-updates years of experience
- `CaseStudySchema` - Individual case metadata
- `BreadcrumbSchema` - Navigation hierarchy
- `PortfolioWebsiteSchema` - Site-level metadata

**Single source of truth:** All dates extracted from `lib/data/experiences.ts`

### Meta Tags

Each page includes:
- Dynamic `<title>` and `<meta description>`
- Open Graph tags (Facebook, LinkedIn)
- Twitter Cards
- Canonical URLs
- hreflang tags (multilingual)

---

## 🎯 Optimization Checklist

### ✅ Performance Optimizations Applied

- [x] Bundle size reduction (-670 KB total)
  - [x] Lucide React tree-shaking (-337 KB)
  - [x] SVG logo consolidation (-200 KB)
  - [x] Framer Motion optimization (-8 KB)
  - [x] Code splitting (-125 KB)
- [x] Image optimization (AVIF + lazy loading)
- [x] Font optimization (preload + subsetting)
- [x] CSS optimization (Tailwind purge)
- [x] JavaScript minification
- [x] Gzip/Brotli compression (Vercel)

### ✅ SEO Optimizations

- [x] Dynamic Schema.org structured data
- [x] Automatic sitemap generation
- [x] robots.txt configuration
- [x] Meta tags per page
- [x] Open Graph + Twitter Cards
- [x] Canonical URLs
- [x] hreflang tags

### ✅ Accessibility (WCAG 2.1 AA)

- [x] Semantic HTML
- [x] ARIA labels
- [x] Keyboard navigation
- [x] Color contrast (4.5:1+)
- [x] Alt text on images
- [x] Focus indicators

### ✅ Best Practices

- [x] HTTPS (Vercel SSL)
- [x] CSP headers (planned)
- [x] No console errors
- [x] Valid HTML5
- [x] Mobile-first responsive

---

## 🚢 Deployment

### Automatic Deployment (Vercel)

Every push to `main` branch triggers:
1. Build verification
2. Type checking
3. Lint checks
4. Deployment to production
5. Automatic preview URLs for PRs

### Manual Deployment
```bash
# Build locally
npm run build

# Test production build
npm run start

# Deploy to Vercel
vercel --prod
```

---

## 📝 Development Guidelines

### Code Style

- ESLint configuration enforced
- TypeScript strict mode enabled
- Prettier for formatting (recommended)
- Commit messages: Conventional Commits

### Component Patterns
```typescript
// Prefer named exports
export function ComponentName() { }

// Use TypeScript interfaces for props
interface ComponentProps {
  title: string;
  optional?: boolean;
}

// Destructure props
export function Component({ title, optional = false }: ComponentProps) {
  // ...
}
```

### Performance Best Practices

- Use `next/image` for all images
- Dynamic imports for heavy components
- Avoid client-side data fetching when possible
- Leverage Server Components (default in App Router)

---

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules
npm install

# Rebuild
npm run build
```

### Type Errors
```bash
# Run type check
npm run type-check

# Check specific file
npx tsc --noEmit path/to/file.tsx
```

### Font Loading Issues

Fonts are self-hosted in `/public/fonts`. If fonts don't load:
1. Check `/app/fonts.css` paths
2. Verify font files in `/public/fonts`
3. Check browser DevTools Network tab

---

## 📊 Analytics & Monitoring

### Umami Dashboard

Access real-time analytics:
- **Events:** Case views, CTA clicks, video plays
- **Funnels:** Homepage → Case → Contact
- **Goals:** LinkedIn clicks, 2+ cases viewed
- **Segments:** Returning visitors, traffic sources

### Performance Monitoring

Tools used:
- **Lighthouse:** Chrome DevTools
- **WebPageTest:** [webpagetest.org](https://webpagetest.org)
- **Vercel Analytics:** Real User Monitoring (RUM)

---

## 🤝 Contributing

This is a personal portfolio project. However, if you find bugs or have suggestions:

1. Open an issue describing the problem
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

---

## 📄 License

Copyright © 2026 Caio Fochetto. All rights reserved.

**Portfolio website** - Unauthorized copying or distribution prohibited.

---

## 👨‍💻 Developer

**Developed by:** [Renan Fochetto](https://renanfochetto.dev)  
📧 **Email:** self@renanfochetto.dev  
**Client:** Caio Fochetto  
**Project Duration:** February 2026  
**Status:** ✅ Production Ready

---

## 📞 Contact

**Caio Fochetto**  
📧 Email: [contact form on website]  
💼 LinkedIn: [linkedin.com/in/caiofochetto](https://linkedin.com/in/caiofochetto)  
📺 YouTube: [@caiofochetto](https://youtube.com/@caiofochetto)

---

<div align="center">

**⭐ If you found this project interesting, consider giving it a star!**

Made with ❤️ using Next.js 15, TypeScript, and Tailwind CSS

</div>
