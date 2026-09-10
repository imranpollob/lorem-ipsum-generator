# Lorem Ipsum Generator

A clean, customizable dummy text generator built with React and Vite. Generates placeholder text by paragraphs, sentences, words, or lists with one-click copy and export.

[**Live Demo →**](https://imranpollob.github.io/lorem-ipsum-generator/)

---

## Features

- **Flexible units**: Generate by paragraphs, sentences, words, or bulleted/numbered lists.
- **Output formats**: Plain text, HTML tags (`<p>`, `<ul>`, `<ol>`), or Markdown.
- **Customizable length**: Adjust sentence lengths and sentences per paragraph.
- **Quick copy & download**: Copy directly to clipboard or save as `.txt`, `.html`, or `.md`.
- **Text stats**: Live word count, character count, and estimated reading time.
- **Dark mode**: Toggle between light and dark themes with saved preference.
- **Zero text dependencies**: Uses an internal Latin vocabulary generator without external text libraries.

## Getting Started

### Prerequisites
- Node.js 18+

### Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Build
```bash
npm run build
```

## Deployment

This repo uses GitHub Actions to deploy directly to GitHub Pages on every push to `main`.

To enable it on your fork/repo:
1. Go to **Settings** > **Pages**.
2. Set **Source** to **GitHub Actions**.

## License

MIT © [Imran Pollob](https://github.com/imranpollob)
