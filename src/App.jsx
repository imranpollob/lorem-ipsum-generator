import React, { useState, useEffect } from "react";
import { generateLorem, getTextStats } from "./utils/loremGenerator";

export default function App() {
  // Theme state: dark / light
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("ip-theme");
    if (saved) return saved;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Generator configuration states
  const [type, setType] = useState("paragraphs"); // 'paragraphs' | 'sentences' | 'words' | 'lists'
  const [count, setCount] = useState(3);
  const [format, setFormat] = useState("plain"); // 'plain' | 'html' | 'markdown'
  const [listType, setListType] = useState("unordered"); // 'unordered' | 'ordered'
  const [startWithLorem, setStartWithLorem] = useState(true);

  // Advanced bounds
  const [sentenceLowerBound, setSentenceLowerBound] = useState(8);
  const [sentenceUpperBound, setSentenceUpperBound] = useState(14);
  const [paragraphLowerBound, setParagraphLowerBound] = useState(4);
  const [paragraphUpperBound, setParagraphUpperBound] = useState(8);

  // Output & UI states
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  // Sync theme with document attribute & localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ip-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Generate text function
  const handleGenerate = () => {
    const generated = generateLorem({
      type,
      count,
      format,
      listType,
      startWithLorem,
      sentenceLowerBound,
      sentenceUpperBound,
      paragraphLowerBound,
      paragraphUpperBound,
    });
    setText(generated);
    setCopied(false);
  };

  // Initial generation on component mount
  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Copy to clipboard with fallback
  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  // Download output as file
  const handleDownload = () => {
    if (!text) return;
    const extension = format === "html" ? "html" : format === "markdown" ? "md" : "txt";
    const mimeType = format === "html" ? "text/html" : "text/plain";
    const blob = new Blob([text], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `lorem-ipsum-${type}.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Calculate stats
  const stats = getTextStats(text);

  return (
    <div className="app-wrapper">
      {/* Top Header */}
      <header className="site-header">
        <div className="container header-content">
          <a href="./" className="brand-link" aria-label="Imran Pollob Home">
            <div className="brand-logo-mark">IP</div>
            <div className="brand-info">
              <span className="brand-title">Lorem Ipsum Generator</span>
            </div>
          </a>

          <div className="header-actions">
            <button
              type="button"
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Switch to Light Theme" : "Switch to Dark Theme"}
            >
              {theme === "dark" ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>

            <a
              href="https://github.com/imranpollob/lorem-ipsum-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="github-link-btn"
              aria-label="GitHub Repository"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="container">
          <div className="hero-intro">
            <h1>Customizable Placeholder Text</h1>
            <p>Generate authentic Latin dummy text formatted for web development, design mockups, and typography testing.</p>
          </div>

          <div className="generator-card">
            {/* Controls Pane */}
            <div className="controls-pane">
              {/* Unit Selector */}
              <label className="section-label">Generate By</label>
              <div className="segmented-group" role="tablist">
                {[
                  { id: "paragraphs", label: "Paragraphs" },
                  { id: "sentences", label: "Sentences" },
                  { id: "words", label: "Words" },
                  { id: "lists", label: "Lists" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={type === item.id}
                    className={`segmented-item ${type === item.id ? "active" : ""}`}
                    onClick={() => setType(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Dynamic Inputs Grid */}
              <div className="parameters-grid">
                <div className="input-field">
                  <label htmlFor="countInput">
                    {type === "paragraphs"
                      ? "Number of Paragraphs"
                      : type === "sentences"
                        ? "Number of Sentences"
                        : type === "words"
                          ? "Number of Words"
                          : "Number of List Items"}
                  </label>
                  <input
                    id="countInput"
                    type="number"
                    min={1}
                    max={type === "words" ? 5000 : 100}
                    value={count}
                    onChange={(e) => setCount(Math.max(1, parseInt(e.target.value) || 1))}
                  />
                </div>

                {type === "lists" && (
                  <div className="input-field">
                    <label htmlFor="listTypeSelect">List Style</label>
                    <select
                      id="listTypeSelect"
                      value={listType}
                      onChange={(e) => setListType(e.target.value)}
                    >
                      <option value="unordered">Unordered (Bullet •)</option>
                      <option value="ordered">Ordered (Numbered 1, 2, 3)</option>
                    </select>
                  </div>
                )}

                {type === "paragraphs" && (
                  <>
                    <div className="input-field">
                      <label htmlFor="pMin">Sentences / Para (Min)</label>
                      <input
                        id="pMin"
                        type="number"
                        min={1}
                        max={20}
                        value={paragraphLowerBound}
                        onChange={(e) => setParagraphLowerBound(Math.max(1, parseInt(e.target.value) || 1))}
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="pMax">Sentences / Para (Max)</label>
                      <input
                        id="pMax"
                        type="number"
                        min={paragraphLowerBound}
                        max={30}
                        value={paragraphUpperBound}
                        onChange={(e) => setParagraphUpperBound(Math.max(paragraphLowerBound, parseInt(e.target.value) || 1))}
                      />
                    </div>
                  </>
                )}

                {(type === "paragraphs" || type === "sentences" || type === "lists") && (
                  <>
                    <div className="input-field">
                      <label htmlFor="sMin">Words / Sentence (Min)</label>
                      <input
                        id="sMin"
                        type="number"
                        min={3}
                        max={30}
                        value={sentenceLowerBound}
                        onChange={(e) => setSentenceLowerBound(Math.max(3, parseInt(e.target.value) || 3))}
                      />
                    </div>
                    <div className="input-field">
                      <label htmlFor="sMax">Words / Sentence (Max)</label>
                      <input
                        id="sMax"
                        type="number"
                        min={sentenceLowerBound}
                        max={50}
                        value={sentenceUpperBound}
                        onChange={(e) => setSentenceUpperBound(Math.max(sentenceLowerBound, parseInt(e.target.value) || 5))}
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Options & Output Formatting Row */}
              <div className="options-row">
                <label className="checkbox-toggle">
                  <input
                    type="checkbox"
                    checked={startWithLorem}
                    onChange={(e) => setStartWithLorem(e.target.checked)}
                  />
                  <span>Start with <em>"Lorem ipsum dolor sit amet..."</em></span>
                </label>

                <div className="format-segmented">
                  {[
                    { id: "plain", label: "Plain Text" },
                    { id: "html", label: "HTML Tags" },
                    { id: "markdown", label: "Markdown" },
                  ].map((fmt) => (
                    <button
                      key={fmt.id}
                      type="button"
                      className={`format-btn ${format === fmt.id ? "active" : ""}`}
                      onClick={() => setFormat(fmt.id)}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="action-bar">
                <button type="button" className="btn-primary" onClick={handleGenerate}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
                  </svg>
                  <span>Generate Text</span>
                </button>

                <div className="action-buttons-group">
                  <button
                    type="button"
                    className={`btn-secondary ${copied ? "copied" : ""}`}
                    onClick={handleCopy}
                    disabled={!text}
                  >
                    {copied ? (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={handleDownload}
                    disabled={!text}
                    title="Download as file"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="7 10 12 15 17 10"></polyline>
                      <line x1="12" y1="15" x2="12" y2="3"></line>
                    </svg>
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Live Statistics Bar */}
            <div className="output-stats-bar">
              <div className="stat-item">
                <span>Words:</span>
                <strong>{stats.words}</strong>
              </div>
              <div className="stat-item">
                <span>Characters:</span>
                <strong>{stats.characters}</strong>
              </div>
              <div className="stat-item">
                <span>Paragraphs / Items:</span>
                <strong>{type === "words" ? 1 : type === "sentences" ? count : stats.paragraphs}</strong>
              </div>
              <div className="stat-item">
                <span>Est. Reading Time:</span>
                <strong>{stats.readingTimeMinutes} min</strong>
              </div>
            </div>

            {/* Output Display Area */}
            <div className="output-pane">
              <pre
                className={`result-output ${format !== "plain" ? "code-mode" : ""}`}
                tabIndex={0}
                aria-label="Generated text output"
              >
                {text}
              </pre>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container footer-content">
          <div>
            Crafted with passion by <span className="footer-author-highlight">Imran Pollob</span>
          </div>
          <div className="footer-links">
            <a href="https://github.com/imranpollob" target="_blank" rel="noopener noreferrer" className="footer-link">
              GitHub Profile
            </a>
            <span>·</span>
            <a href="https://github.com/imranpollob/lorem-ipsum-generator" target="_blank" rel="noopener noreferrer" className="footer-link">
              Source Code
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
