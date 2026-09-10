/**
 * Custom Zero-Dependency Lorem Ipsum Generator Engine
 * Based on classic Latin vocabulary from Cicero's "De Finibus Bonorum et Malorum".
 */

export const LATIN_VOCABULARY = [
  "ad", "adipiscing", "aliqua", "aliquam", "aliquet", "amet", "anim", "ante",
  "arcu", "at", "auctor", "augue", "bibendum", "blandit", "commodo", "congue",
  "consectetur", "consequat", "cras", "cum", "curabitur", "cursus", "dapibus",
  "diam", "dictum", "dignissim", "dis", "dolor", "dolore", "donec", "dui",
  "duis", "efficitur", "eget", "eleifend", "elementum", "elit", "enim", "erat",
  "eros", "est", "et", "etiam", "eu", "euismod", "ex", "facilisi", "facilisis",
  "fames", "faucibus", "felis", "fermentum", "feugiat", "fringilla", "fusce",
  "gravida", "habitant", "habitasse", "hac", "hendrerit", "iaculis", "id",
  "imperdiet", "in", "inceptos", "integer", "interdum", "ipsum", "justo",
  "lacinia", "lacus", "laoreet", "lectus", "leo", "libero", "ligula", "litora",
  "lobortis", "lorem", "luctus", "maecenas", "magna", "malesuada", "massa",
  "mattis", "mauris", "maximus", "metus", "mi", "molestie", "mollis", "montes",
  "morbi", "nam", "nascetur", "natoque", "nec", "neque", "netus", "nibh",
  "nisi", "nisl", "non", "nostra", "nulla", "nullam", "nunc", "odio", "orci",
  "ornare", "parturient", "pellentesque", "penatibus", "per", "pharetra",
  "phasellus", "placerat", "porta", "porttitor", "posuere", "potenti", "praesent",
  "pretium", "primis", "proin", "pulvinar", "purus", "quam", "quis", "quisque",
  "rhoncus", "ridiculus", "risus", "rutrum", "sagittis", "sapien", "scelerisque",
  "sed", "sem", "semper", "senectus", "sit", "sociis", "sodales", "sollicitudin",
  "suscipit", "suspendisse", "taciti", "tellus", "tempor", "tempus", "tincidunt",
  "torquent", "tortor", "tristique", "turpis", "ullamcorper", "ultrices",
  "ultricies", "urna", "ut", "varius", "vehicula", "vel", "velit", "venenatis",
  "vestibulum", "vitae", "vivamus", "viverra", "volutpat", "vulputate"
];

export const STANDARD_OPENING = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

/**
 * Returns a random integer between min and max inclusive.
 */
function randomInt(min, max) {
  const low = Math.min(min, max);
  const high = Math.max(min, max);
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

/**
 * Returns a random word from the Latin vocabulary.
 */
function getRandomWord(vocab = LATIN_VOCABULARY) {
  return vocab[Math.floor(Math.random() * vocab.length)];
}

/**
 * Generates an array of words of specified length.
 */
export function generateWords(count) {
  const safeCount = Math.max(1, Number(count) || 1);
  const words = [];
  for (let i = 0; i < safeCount; i++) {
    words.push(getRandomWord());
  }
  return words;
}

/**
 * Generates a single sentence with natural punctuation and length.
 */
export function generateSentence(minWords = 8, maxWords = 14) {
  const length = randomInt(minWords, maxWords);
  const words = [];

  for (let i = 0; i < length; i++) {
    words.push(getRandomWord());
  }

  // Add a natural comma pause for longer sentences (> 9 words)
  if (length >= 10 && Math.random() > 0.45) {
    const commaIndex = randomInt(3, length - 4);
    if (commaIndex > 0 && commaIndex < length - 1) {
      words[commaIndex] = words[commaIndex] + ",";
    }
  }

  // Capitalize first word and append a period
  const firstWord = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  words[0] = firstWord;

  return words.join(" ") + ".";
}

/**
 * Generates a paragraph of sentences.
 */
export function generateParagraph(minSentences = 4, maxSentences = 8, minWords = 8, maxWords = 14) {
  const sentenceCount = randomInt(minSentences, maxSentences);
  const sentences = [];
  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence(minWords, maxWords));
  }
  return sentences.join(" ");
}

/**
 * Master generator function supporting paragraphs, sentences, words, and lists.
 */
export function generateLorem({
  type = "paragraphs", // 'paragraphs' | 'sentences' | 'words' | 'lists'
  count = 3,
  startWithLorem = true,
  format = "plain", // 'plain' | 'html' | 'markdown'
  listType = "unordered", // 'unordered' | 'ordered'
  sentenceLowerBound = 8,
  sentenceUpperBound = 14,
  paragraphLowerBound = 4,
  paragraphUpperBound = 8,
} = {}) {
  const safeCount = Math.max(1, Number(count) || 1);
  const sMin = Math.max(3, Number(sentenceLowerBound) || 8);
  const sMax = Math.max(sMin, Number(sentenceUpperBound) || 14);
  const pMin = Math.max(1, Number(paragraphLowerBound) || 4);
  const pMax = Math.max(pMin, Number(paragraphUpperBound) || 8);

  // 1. WORDS MODE
  if (type === "words") {
    let words = generateWords(safeCount);
    if (startWithLorem) {
      const openingWords = "lorem ipsum dolor sit amet consectetur adipiscing elit".split(" ");
      for (let i = 0; i < Math.min(safeCount, openingWords.length); i++) {
        words[i] = openingWords[i];
      }
    }
    const text = words.join(" ");
    if (format === "html") return `<p>${text}</p>`;
    return text;
  }

  // 2. SENTENCES MODE
  if (type === "sentences") {
    const sentences = [];
    for (let i = 0; i < safeCount; i++) {
      if (i === 0 && startWithLorem) {
        sentences.push(STANDARD_OPENING);
      } else {
        sentences.push(generateSentence(sMin, sMax));
      }
    }

    if (format === "html") {
      return sentences.map((s) => `<p>${s}</p>`).join("\n");
    }
    if (format === "markdown") {
      return sentences.join("\n\n");
    }
    return sentences.join(" ");
  }

  // 3. LISTS MODE
  if (type === "lists") {
    const items = [];
    for (let i = 0; i < safeCount; i++) {
      if (i === 0 && startWithLorem) {
        items.push("Lorem ipsum dolor sit amet, consectetur adipiscing elit.");
      } else {
        items.push(generateSentence(sMin, sMax));
      }
    }

    if (format === "html") {
      const tag = listType === "ordered" ? "ol" : "ul";
      const lis = items.map((item) => `  <li>${item}</li>`).join("\n");
      return `<${tag}>\n${lis}\n</${tag}>`;
    }

    if (format === "markdown") {
      return items
        .map((item, idx) => (listType === "ordered" ? `${idx + 1}. ${item}` : `- ${item}`))
        .join("\n");
    }

    return items
      .map((item, idx) => (listType === "ordered" ? `${idx + 1}. ${item}` : `• ${item}`))
      .join("\n");
  }

  // 4. PARAGRAPHS MODE (Default)
  const paragraphs = [];
  for (let i = 0; i < safeCount; i++) {
    if (i === 0 && startWithLorem) {
      const restOfFirstParagraph = generateParagraph(pMin - 1, pMax - 1, sMin, sMax);
      paragraphs.push(`${STANDARD_OPENING} ${restOfFirstParagraph}`.trim());
    } else {
      paragraphs.push(generateParagraph(pMin, pMax, sMin, sMax));
    }
  }

  if (format === "html") {
    return paragraphs.map((p) => `<p>${p}</p>`).join("\n\n");
  }

  if (format === "markdown") {
    return paragraphs.join("\n\n");
  }

  return paragraphs.join("\n\n");
}

/**
 * Calculates real-time text statistics.
 */
export function getTextStats(text = "") {
  const trimmed = text.trim();
  if (!trimmed) {
    return { words: 0, characters: 0, paragraphs: 0, readingTimeMinutes: 0 };
  }

  const characters = trimmed.length;
  // Clean tags/markdown tokens for accurate word count
  const cleanWords = trimmed
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*`_>•]/g, " ")
    .replace(/^\s*\d+\.\s+/gm, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  const words = cleanWords.length;
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length || 1;
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

  return {
    words,
    characters,
    paragraphs,
    readingTimeMinutes,
  };
}

