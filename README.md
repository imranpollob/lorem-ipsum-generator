# Lorem Ipsum Generator

[![Deploy to GitHub Pages](https://github.com/imranpollob/lorem-ipsum-generator/actions/workflows/deploy.yml/badge.svg)](https://github.com/imranpollob/lorem-ipsum-generator/actions/workflows/deploy.yml)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-imranpollob.github.io-0d9488?style=flat-square)](https://imranpollob.github.io/lorem-ipsum-generator/)
[![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=flat-square&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5.4-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![Zero Dependency](https://img.shields.io/badge/Runtime%20Dependencies-Zero-14b8a6?style=flat-square)](./src/utils/loremGenerator.js)

A fast, zero-dependency customizable **Lorem Ipsum & Placeholder Text Generator** built with React 19 and styled with the **Imran Pollob Brand Theme**.

👉 **Live Demo:** [https://imranpollob.github.io/lorem-ipsum-generator/](https://imranpollob.github.io/lorem-ipsum-generator/)

---

## ✨ Features

- **Custom Algorithmic Engine:** 100% zero external runtime text dependencies. Uses authentic classical Latin vocabulary from Marcus Tullius Cicero's 45 BC treatise *De Finibus Bonorum et Malorum*.
- **Multiple Generation Units:**
  - **Paragraphs:** Customizable paragraph count, sentences per paragraph min/max, and words per sentence min/max.
  - **Sentences:** Standalone sentence generation with natural punctuation pauses and length variance.
  - **Words:** Exact word count outputs.
  - **Lists:** Bulleted (`•`) / Unordered lists and Numbered (`1, 2, 3`) / Ordered lists.
- **Developer-Friendly Output Formats:**
  - **Plain Text**
  - **Semantic HTML Tags** (`<p>`, `<ul><li>`, `<ol><li>`)
  - **Markdown** (`- item` or `1. item` and paragraphs)
- **Live Statistics:** Real-time word count, character count, item/paragraph count, and estimated reading time.
- **Export Tools:**
  - One-click copy with quick visual feedback and browser clipboard fallback.
  - One-click download as `.txt`, `.html`, or `.md` file.
- **Brand Theme Integration:**
  - Full **Imran Pollob Brand Theme** integration (Teal / Cyan scale `#0d9488` / `#14b8a6`).
  - Seamless Light & Dark mode switcher with system preference detection and `localStorage` persistence.
  - Typography: `Plus Jakarta Sans` & `Playfair Display`.
- **SEO & Standards Optimized:**
  - OpenGraph & Twitter Card social preview tags.
  - Schema.org JSON-LD `WebApplication` structured data.
  - SVG brand favicon and web application manifest.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
# Clone the repository
git clone https://github.com/imranpollob/lorem-ipsum-generator.git

# Navigate to project directory
cd lorem-ipsum-generator

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

### Production Build
```bash
npm run build
```
Builds static assets into `dist/`.

### Preview Build
```bash
npm run preview
```

---

## 🌐 Deploying to GitHub Pages

This repository is preconfigured with a GitHub Actions workflow (`.github/workflows/deploy.yml`).

To enable deployment:
1. Go to your repository on GitHub: **Settings > Pages**.
2. Under **Build and deployment > Source**, select **GitHub Actions**.
3. Push to the `main` branch:
   ```bash
   git add .
   git commit -m "feat: brand theme, custom engine, and SEO improvements"
   git push origin main
   ```
4. The GitHub Action will automatically build and publish your site at `https://imranpollob.github.io/lorem-ipsum-generator/`.

---

## 📄 License

MIT © [Imran Pollob](https://github.com/imranpollob)
