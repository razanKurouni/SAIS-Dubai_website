import type { CSSProperties } from "react";
import type { PortableTextBlock } from "@/types/sanity";

/* -----------------------------------------------------------------------------------------
 * Arranging the Arabic subjects cards (academics-arabic-section.tsx) on desktop.
 *
 * The subjects' texts are of very different lengths, so equal cards in one row leave large
 * empty coloured areas. The cards keep their look but the arrangement and the column widths
 * follow the text. They are chosen here, on the server, from an estimate of each card's height
 * (word wrapping with the typefaces' letter widths), for each desktop range of page widths in
 * the CSS, so that at every page width of the range:
 *   - the cards fill the content's width, edge to edge with the rule under the heading;
 *   - no card is narrower than 340px or wider than 1040px, and preferably none is wider than
 *     800px (lines of about 30 to 80 characters, at most about 105);
 *   - the cards end level: none is left with more than max(56px, 10%) of empty space below its
 *     text (planned with a margin for the estimate's error, see PLAN_EMPTY_*); where no
 *     arrangement manages that, the one that comes closest;
 *   - cards side by side preferably have titles of the same number of lines.
 * Preferred, as before, is one row (each subject a column); else two columns with two subjects
 * stacked in one; else, where the content is narrow enough, two subjects over the third across
 * (or one across over two), or one under the other. Reading order stays subject 1, 2, 3, first
 * at the top left in English and at the top right in Arabic (the grid follows the page
 * direction). Tablets and phones: one card per row (CSS only). The result is CSS custom
 * properties per range; without them the CSS shows one equal column per subject (up to three).
 * ----------------------------------------------------------------------------------------- */

/** A subject card: its title (the Heading 3) and the text under it. */
export type LayoutSubject = { title: string; blocks: PortableTextBlock[] };

/** Where a card sits in the grid (1-based grid lines, as in CSS). */
export type CardArea = { column: number; columnSpan: number; row: number; rowSpan: number };

/**
 * The first page width of each desktop range, as in the media queries of the .academics-arabic
 * CSS (the custom properties are named after it). The last range ends at 2212px, where the
 * content stops growing (2229px with a 17px scrollbar), so wider pages look the same.
 */
export const RANGE_STARTS = [981, 1224, 1300, 1640, 1840, 1880, 2080];
const CONTENT_END = 2212;

/** A range's arrangement. Columns but the last (which takes the rest): px = share × grid width + offset. */
export type RangePlan = { range: number; areas: CardArea[]; columns: { share: number; offset: number }[] };

export type BalancedLayout = { gridStyle: CSSProperties; cardStyles: readonly CSSProperties[] };

/* ---------------------------------- Typeface metrics ----------------------------------- */

const widthTable = (list: string) => list.split(" ").map(Number);
/** Advance widths for U+0020–U+007E in 1/1000 em, measured in Chrome: Axiforma Book (the English text). */
const AXIFORMA = widthTable(
  "247 292 455 698 561 877 697 257 313 350 450 530 239 516 230 92 678 381 556 552 591 570 612 500 623 610 258 285 " +
    "574 604 546 505 975 671 669 770 756 605 568 812 756 282 542 661 601 916 778 856 603 856 636 558 561 703 704 1024 " +
    "621 633 613 364 92 364 517 581 0 663 666 598 666 609 379 666 612 241 265 539 241 970 614 644 668 668 384 448 422 " +
    "592 558 834 501 548 504 334 256 350 663",
);
const AXIFORMA_EXTRA: Record<string, number> = {
  "‘": 234, "’": 232, "“": 472, "”": 461, "…": 691, "–": 715, "—": 1034, "«": 506, "»": 506, "é": 609, "á": 663,
};
/** The same for IBM Plex Sans Arabic, which sets all the text of an Arabic section (digits and punctuation too). */
const PLEX_LATIN = widthTable(
  "236 284 419 713 598 927 694 242 335 335 450 600 272 399 272 269 600 600 600 600 600 600 600 600 600 600 292 292 " +
    "600 600 600 477 891 655 653 609 671 583 559 695 707 400 503 634 501 812 707 708 606 708 640 572 594 678 614 896 " +
    "613 593 580 317 383 317 600 565 600 534 580 497 580 549 324 530 568 250 250 527 267 873 568 560 580 580 367 481 " +
    "342 568 492 768 507 499 464 343 314 343 600",
);
const PLEX_EXTRA: Record<string, number> = {
  "«": 513, "»": 513, "،": 272, "؛": 272, "؟": 477, "…": 803, "–": 588, "—": 780,
  "٠": 282, "١": 263, "٢": 485, "٣": 630, "٤": 486, "٥": 526, "٦": 503, "٧": 531, "٨": 531, "٩": 508,
};
/**
 * IBM Plex Sans Arabic letters in their isolated, final, initial and medial forms (letters that
 * join only the letter before them have the first two, hamza one).
 */
const ARABIC_FORMS = new Map<string, number[]>(
  (
    [
      ["اأإآٱ", [224, 270]], ["دذ", [468, 531]], ["رز", [265, 319]], ["وؤ", [455, 450]], ["ة", [448, 476]],
      ["ء", [388]], ["بتثپ", [839, 919, 253, 310]], ["ن", [657, 714, 253, 310]], ["يىئی", [726, 684, 253, 310]],
      ["جحخچ", [591, 642, 634, 663]], ["سش", [1133, 1211, 749, 827]], ["صض", [1248, 1255, 855, 862]],
      ["طظ", [780, 787, 682, 689]], ["عغ", [596, 572, 479, 478]], ["فڤ", [901, 965, 451, 442]],
      ["ق", [716, 712, 451, 442]], ["ك", [751, 919, 332, 452]], ["کگ", [851, 970, 332, 452]],
      ["ل", [655, 702, 269, 314]], ["م", [555, 646, 483, 524]], ["ه", [448, 476, 626, 468]], ["ـ", [107, 107, 107, 107]],
    ] as [string, number[]][]
  ).flatMap(([letters, widths]) => [...letters].map((letter): [string, number[]] => [letter, widths])),
);
/** Lam followed by an alef is one ligature: isolated and final widths. */
const LAM_ALEF = [518, 564];
const ALEFS = "اأإآ";
/**
 * Pairs the font joins more tightly (contextual forms): first letters, second letters in their
 * final form, and the change when the first letter is in its initial / medial form.
 */
const ARABIC_PAIRS: [string, string, number, number][] = [
  ["بتثنيىئ", "يىئ", -212, -104],
  ["بتثنيىئ", "رزن", 0, -56],
  ["سش", "يىئ", -152, -152],
  ["سش", "رز", -120, -120],
  ["صض", "يىئ", -120, -120],
  ["صض", "رز", -80, -88],
  ["فق", "يىئ", -408, 0],
  ["ك", "يىئ", -248, -92],
  ["ل", "يىئ", -228, 0],
];
const ARABIC_MARK = /[ً-ٰٟ]/;
/** Widths relative to the 400 weight: the card titles (500) and bold text (700), per typeface. */
const WEIGHT = { latin: { title: 1.0064, bold: 1.0481 }, arabic: { title: 1.0349, bold: 1.0808 } };
/** Axiforma's kerning makes text narrower than the sum of its letters (fitted on lines and titles in Chrome). */
const KERNING = { text: 0.994, title: 0.996 };

/* ------------------------- What the CSS renders (keep in step) ------------------------- */

const CARD_PADDING_INLINE = 60;
const CARD_PADDING_BLOCK = 70;
const CARD_TITLE_GAP = 22;
const BLOCK_GAP = 14;
const LIST_GAP = 12;
const BULLET_INDENT = 18;
/**
 * Paragraphs follow "body .site-page p" (the site's body text size, line height and letter
 * spacing), which overrides ".academics-arabic__card-body p" from 768px; list items follow
 * ".academics-arabic__card-body li" (1.05rem, line height 1.85).
 */
const PARAGRAPH = { size: 16, lineHeight: 25.6, letterSpacing: 0.48 };
const LIST_ITEM = { size: 16.8, lineHeight: 31.08, letterSpacing: 0 };
const TITLE_LINE_HEIGHT = 1.4;
const GRID_GAP = 28;
const titleSize = (viewport: number) => Math.min(26.88, Math.max(22.72, 0.0185 * viewport)); // clamp(1.42rem, 1.85vw, 1.68rem)
const contentWidth = (viewport: number) => Math.min(viewport * 0.85, 1880); // .academics-arabic__inner

/* ------------------------------------ The text --------------------------------------- */

/** A piece of text the browser may put at the start of a line: width in em, letters taking letter spacing. */
type Word = { em: number; spaced: number; afterSpace: boolean };
type Block = { listItem: boolean; lines: Word[][] };
type CardText = { title: Word[]; blocks: Block[]; space: number };
type Letter = { char: string; factor: number };

/** Width (em) of a word in an Arabic section: letters in their joined forms, the rest in IBM Plex Sans Arabic. */
function arabicWord(letters: Letter[]) {
  const chars = letters.filter(({ char }) => !ARABIC_MARK.test(char));
  const forms = chars.map(({ char }) => ARABIC_FORMS.get(char));
  const joinsNext = (index: number) => forms[index]?.length === 4 && (forms[index + 1]?.length || 0) > 1;
  let em = 0;
  let spaced = 0;
  for (let index = 0; index < chars.length; index += 1) {
    const { char, factor } = chars[index];
    const form = forms[index];
    if (!form) {
      const code = char.charCodeAt(0);
      em += ((code >= 0x20 && code <= 0x7e ? PLEX_LATIN[code - 0x20] : PLEX_EXTRA[char]) ?? 600) * factor;
      spaced += 1;
      continue;
    }
    const afterJoin = index > 0 && joinsNext(index - 1);
    if (char === "ل" && ALEFS.includes(chars[index + 1]?.char || "x")) {
      em += LAM_ALEF[afterJoin ? 1 : 0] * factor;
      index += 1;
      continue;
    }
    const beforeJoin = joinsNext(index);
    // isolated, final, initial or medial form (only letters with all four join the next one)
    em += form[(afterJoin ? 1 : 0) + (beforeJoin ? 2 : 0)] * factor;
    if (afterJoin && !beforeJoin) {
      const previous = chars[index - 1].char;
      const initial = !(index > 1 && joinsNext(index - 2));
      const pair = ARABIC_PAIRS.find(([first, second]) => first.includes(previous) && second.includes(char));
      if (pair) em += pair[initial ? 2 : 3] * factor;
    }
  }
  return { em: em / 1000, spaced };
}

function latinWord(letters: Letter[]) {
  let em = 0;
  for (const { char, factor } of letters) {
    const code = char.charCodeAt(0);
    em += ((code >= 0x20 && code <= 0x7e ? AXIFORMA[code - 0x20] : AXIFORMA_EXTRA[char]) ?? 600) * factor;
  }
  return { em: em / 1000, spaced: letters.length };
}

/**
 * Splits text into the pieces lines break between (at spaces and after hyphens and dashes);
 * each "\n" starts a new line, as the <br>s do.
 */
function toLines(spans: { text: string; weight: "regular" | "title" | "bold" }[], arabic: boolean) {
  const weights = arabic ? WEIGHT.arabic : WEIGHT.latin;
  const lines: Word[][] = [[]];
  let letters: Letter[] = [];
  let afterSpace = true;
  const endWord = (nextAfterSpace: boolean) => {
    if (letters.length) {
      const measured = arabic ? arabicWord(letters) : latinWord(letters);
      lines[lines.length - 1].push({ ...measured, afterSpace });
      afterSpace = nextAfterSpace;
    } else if (nextAfterSpace) afterSpace = true;
    letters = [];
  };
  for (const span of spans) {
    const factor =
      (span.weight === "regular" ? 1 : weights[span.weight]) * (arabic ? 1 : KERNING[span.weight === "title" ? "title" : "text"]);
    for (const char of span.text) {
      if (char === "\n") {
        endWord(true);
        lines.push([]);
      } else if (/\s/.test(char)) {
        endWord(true);
      } else {
        letters.push({ char, factor });
        if (char === "-" || char === "–" || char === "—") endWord(false);
      }
    }
  }
  endWord(true);
  if (lines.length > 1 && !lines[lines.length - 1].length) lines.pop();
  return lines;
}

function cardText(subject: LayoutSubject, arabic: boolean): CardText {
  return {
    space: (arabic ? PLEX_LATIN[0] : AXIFORMA[0]) / 1000,
    title: toLines([{ text: subject.title, weight: "title" }], arabic).flat(),
    blocks: subject.blocks
      .filter((block) => block.children?.some((child) => child.text?.trim()))
      .map((block) => ({
        listItem: !!block.listItem,
        lines: toLines(
          (block.children || []).map((child) => ({
            text: child.text || "",
            weight: child.marks?.includes("strong") ? "bold" : "regular",
          })),
          arabic,
        ),
      })),
  };
}

/** Number of lines the words wrap to in the given width, like the browser's line breaking. */
function lineCount(words: Word[], spaceEm: number, width: number, size: number, letterSpacing: number) {
  const space = spaceEm * size + letterSpacing;
  let lines = 1;
  let used = -1;
  for (const word of words) {
    const length = word.em * size + word.spaced * letterSpacing;
    const gap = word.afterSpace ? space : 0;
    if (used < 0) used = length;
    else if (used + gap + length <= width + 0.01) used += gap + length;
    else {
      lines += 1;
      used = length;
    }
  }
  return lines;
}

/** Estimated height of a card's text (below the title) in a card of the given width. */
function bodyHeight(text: CardText, width: number) {
  if (!text.blocks.length) return 0;
  const inner = width - CARD_PADDING_INLINE;
  let height = CARD_TITLE_GAP;
  text.blocks.forEach((block, index) => {
    if (index > 0) height += block.listItem && text.blocks[index - 1].listItem ? LIST_GAP : BLOCK_GAP;
    const style = block.listItem ? LIST_ITEM : PARAGRAPH;
    const textWidth = inner - (block.listItem ? BULLET_INDENT : 0);
    for (const line of block.lines) {
      height += lineCount(line, text.space, textWidth, style.size, style.letterSpacing) * style.lineHeight;
    }
  });
  return height;
}

const titleLines = (text: CardText, width: number, size: number) =>
  text.title.length ? lineCount(text.title, text.space, width - CARD_PADDING_INLINE, size, 0) : 0;

/* ---------------------------------- Arrangements ------------------------------------- */

const area = (column: number, row: number, rowSpan = 1, columnSpan = 1): CardArea => ({ column, columnSpan, row, rowSpan });

/**
 * The kinds of arrangement: one row; two columns with two subjects stacked in one; two
 * subjects over one across (or one across over two); one under the other. The last two have
 * a card as wide as the content, so they only fit where it is at most 1040px.
 */
type Kind = "row" | "columns" | "wrap" | "stack";
type Arrangement = { kind: Kind; areas: CardArea[]; columns: number; rows: number; beside: number[][] };

const arrangement = (kind: Kind, ...areas: CardArea[]): Arrangement => ({
  kind,
  areas,
  columns: Math.max(...areas.map((item) => item.column + item.columnSpan - 1)),
  rows: Math.max(...areas.map((item) => item.row + item.rowSpan - 1)),
  // for each card, the cards before it whose titles are level with its own (same first row)
  beside: areas.map((item, card) => areas.flatMap((other, index) => (index < card && other.row === item.row ? [index] : []))),
});

/**
 * The arrangements, in reading order (subject 1 first), in the order tried: the row (one that
 * meets the goal wins), the stack (a bound for the rest where it fits), the others. One subject:
 * the CSS alone.
 */
const ARRANGEMENTS: Record<number, Arrangement[]> = {
  2: [arrangement("row", area(1, 1), area(2, 1)), arrangement("stack", area(1, 1), area(1, 2))],
  3: [
    arrangement("row", area(1, 1), area(2, 1), area(3, 1)), // 1 | 2 | 3
    arrangement("stack", area(1, 1), area(1, 2), area(1, 3)),
    arrangement("columns", area(1, 1, 2), area(2, 1), area(2, 2)), // 1 | 2 over 3
    arrangement("columns", area(1, 1), area(2, 1, 2), area(1, 2)), // 1 over 3 | 2
    arrangement("columns", area(1, 1), area(1, 2), area(2, 1, 2)), // 1 over 2 | 3
    arrangement("wrap", area(1, 1), area(2, 1), area(1, 2, 1, 2)), // 1 | 2, then 3 across
    arrangement("wrap", area(1, 1, 1, 2), area(1, 2), area(2, 2)), // 1 across, then 2 | 3
  ],
};

/** No card narrower or wider than this (px) at any desktop page width. */
const MIN_CARD = 340;
const MAX_CARD = 1040;
/** Cards wider than this (px) cost WIDE_COST per px. */
const WIDE_CARD = 800;
/**
 * The goal is at most max(56px, 10%) of empty card below the text; the plan aims lower,
 * max(40px, 7%), to allow for the estimate's error (one line now and then).
 */
const PLAN_EMPTY_PX = 40;
const PLAN_EMPTY_SHARE = 0.07;
/**
 * Costs, in px of empty card, to choose between arrangements that meet the goal: cards wider
 * than WIDE_CARD; titles side by side with different line counts; more rows; another
 * arrangement than the next narrower range's. A row that meets the goal always wins.
 */
const WIDE_COST = 0.5;
const TITLE_MISMATCH_COST = 48;
const KIND_COST: Record<Kind, number> = { row: 0, columns: 0, wrap: 40, stack: 80 };
const SWITCH_COST = 15;
/** Cost of a column whose width changes against, or faster than, the grid's, per 100% of grid width. */
const SLOPE_COST = 20;
/** Page widths checked in each range (every 20px), from 17px below its start (a scrollbar narrows the content). */
const SAMPLE_STEP = 20;
const SCROLLBAR = 17;
/** The search: coarse steps (px) for one and for two free column widths; the candidates kept; the refining steps. */
const COARSE_STEP = [8, 12];
const KEPT = 8;
const REFINE_STEPS = [4, 2, 1];

type Sample = { content: number; title: number };
type Score = { excess: number; cost: number };
/** Natural card height and title line count, remembered per whole px of card width. */
type Heights = {
  height: (card: number, width: number, title: number) => number;
  titleLines: (card: number, width: number, title: number) => number;
};

function heightsOf(texts: CardText[]): Heights {
  const bodies = texts.map(() => new Map<number, number>());
  const titles = texts.map(() => new Map<number, number>());
  const lines = (card: number, width: number, title: number) => {
    const key = Math.floor(width) * 1000 + Math.round(title * 10);
    let count = titles[card].get(key);
    if (count === undefined) {
      count = titleLines(texts[card], Math.floor(width), title);
      titles[card].set(key, count);
    }
    return count;
  };
  return {
    titleLines: lines,
    height: (card, width, title) => {
      const key = Math.floor(width);
      let body = bodies[card].get(key);
      if (body === undefined) {
        body = bodyHeight(texts[card], key);
        bodies[card].set(key, body);
      }
      return CARD_PADDING_BLOCK + lines(card, width, title) * title * TITLE_LINE_HEIGHT + body;
    },
  };
}

/**
 * Scores an arrangement at one page width, with the grid's row sizing: a row is as tall as
 * its tallest card, and a card spanning two rows that needs more height adds it to both
 * evenly. `excess`: the most empty space in a card beyond the planned limit (≤ 0 meets it);
 * `cost`: the empty space and the other costs. Undefined when a card is too narrow or wide.
 */
function scorer(layout: Arrangement, heights: Heights) {
  const { areas, beside } = layout;
  const widths = areas.map(() => 0);
  const natural = areas.map(() => 0);
  const titleLines = areas.map(() => 0);
  const rows = new Array<number>(layout.rows).fill(0);
  const spanHeight = ({ row, rowSpan }: CardArea) => {
    let height = GRID_GAP * (rowSpan - 1);
    for (let index = row - 1; index < row - 1 + rowSpan; index += 1) height += rows[index];
    return height;
  };
  return (columns: number[], sample: Sample): Score | undefined => {
    let cost = 0;
    for (let card = 0; card < areas.length; card += 1) {
      const { column, columnSpan } = areas[card];
      let width = GRID_GAP * (columnSpan - 1);
      for (let index = column - 1; index < column - 1 + columnSpan; index += 1) width += columns[index];
      if (width < MIN_CARD - 0.01 || width > MAX_CARD + 0.01) return undefined;
      widths[card] = width;
      natural[card] = heights.height(card, width, sample.title);
      cost += WIDE_COST * Math.max(0, width - WIDE_CARD);
    }
    rows.fill(0);
    areas.forEach((item, card) => {
      if (item.rowSpan === 1) rows[item.row - 1] = Math.max(rows[item.row - 1], natural[card]);
    });
    areas.forEach((item, card) => {
      const missing = natural[card] - spanHeight(item);
      if (item.rowSpan > 1 && missing > 0) {
        for (let index = item.row - 1; index < item.row - 1 + item.rowSpan; index += 1) rows[index] += missing / item.rowSpan;
      }
    });
    let excess = -Infinity;
    areas.forEach((item, card) => {
      const rendered = spanHeight(item);
      const empty = rendered - natural[card];
      excess = Math.max(excess, empty - Math.max(PLAN_EMPTY_PX, PLAN_EMPTY_SHARE * rendered));
      cost += empty;
      // titles side by side: one cost for each that differs in line count from those before it
      titleLines[card] = heights.titleLines(card, widths[card], sample.title);
      if (beside[card].length && !beside[card].some((other) => titleLines[other] === titleLines[card])) cost += TITLE_MISMATCH_COST;
    });
    return { excess, cost };
  };
}

/** A sample's value: mostly the empty space beyond the planned limit, then the costs. */
const scoreValue = ({ excess, cost }: Score) => 1000 * Math.max(0, excess) + cost;

/**
 * The best column widths for an arrangement over a range, or undefined when none scores below
 * `bound`. The free columns (all but the last) are straight lines in the grid width, set by
 * their widths at the narrowest and at the widest grid of the range: the best widths at each
 * end are found on a coarse grid, the best pairs of them checked over the whole range, and
 * the best pair refined.
 */
function searchColumns(layout: Arrangement, samples: Sample[], heights: Heights, bound: number) {
  const score = scorer(layout, heights);
  const free = layout.columns - 1;
  const low = samples[0].content;
  const high = samples[samples.length - 1].content;
  const columns = new Array<number>(layout.columns).fill(0);
  /** The column widths at a sample, from the parameters: the free columns' widths at the low end, then at the high end. */
  const columnsAt = (params: number[], index: number) => {
    const share = (samples[index].content - low) / (high - low);
    let last = samples[index].content - GRID_GAP * free;
    for (let column = 0; column < free; column += 1) {
      columns[column] = params[column] + share * (params[free + column] - params[column]);
      last -= columns[column];
    }
    columns[free] = last;
    return columns;
  };
  const evaluate = (params: number[], limit: number) => {
    // columns that shrink as the page widens, or grow faster than it, change quickly between the sampled widths
    let total = 0;
    let lastShare = 1;
    for (let column = 0; column < free; column += 1) {
      const share = (params[free + column] - params[column]) / (high - low);
      total += SLOPE_COST * (Math.max(0, -share) + Math.max(0, share - 1)) * samples.length;
      lastShare -= share;
    }
    total += SLOPE_COST * (Math.max(0, -lastShare) + Math.max(0, lastShare - 1)) * samples.length;
    let meetsGoal = true;
    for (let index = 0; index < samples.length; index += 1) {
      const result = score(columnsAt(params, index), samples[index]);
      if (!result) return undefined;
      meetsGoal &&= result.excess <= 0;
      total += scoreValue(result);
      // values are never negative, so the mean so far is a lower bound of the final one
      if (total / samples.length >= limit) return undefined;
    }
    return { meetsGoal, value: total / samples.length };
  };
  if (!free) {
    const result = evaluate([], bound);
    return result && { params: [], ...result };
  }

  // the best widths at each end of the range, on a coarse grid
  const endCandidates = (index: number) => {
    const found: { widths: number[]; value: number }[] = [];
    const step = COARSE_STEP[free - 1];
    const tryWidths = (widths: number[]) => {
      const result = score(columnsAt([...widths, ...widths], index), samples[index]);
      if (result) found.push({ widths, value: scoreValue(result) });
    };
    for (let first = MIN_CARD; first <= MAX_CARD; first += step) {
      if (free === 1) tryWidths([first]);
      else for (let second = MIN_CARD; second <= MAX_CARD; second += step) tryWidths([first, second]);
    }
    return found.sort((a, b) => a.value - b.value).slice(0, KEPT);
  };
  const highEnd = endCandidates(samples.length - 1);
  let best: { params: number[]; meetsGoal: boolean; value: number } | undefined;
  for (const start of endCandidates(0)) {
    for (const end of highEnd) {
      const params = [...start.widths, ...end.widths];
      const result = evaluate(params, best ? best.value : bound);
      if (result) best = { params, ...result };
    }
  }
  if (!best) return undefined;

  // refine each width in turn, in finer and finer steps
  for (const step of REFINE_STEPS) {
    for (let improved = true; improved; ) {
      improved = false;
      for (let param = 0; param < 2 * free; param += 1) {
        for (const change of [-step, step]) {
          const params = best.params.slice();
          params[param] += change;
          const result = evaluate(params, best.value - 1e-6);
          if (result) {
            best = { params, ...result };
            improved = true;
          }
        }
      }
    }
  }
  return best;
}

/** The best arrangement for the page widths from `from` to `to` (see ARRANGEMENTS for the order). */
function planRange(texts: CardText[], from: number, to: number, heights: Heights, previous?: Arrangement) {
  const samples: Sample[] = [];
  for (let viewport = from - SCROLLBAR; ; viewport = Math.min(viewport + SAMPLE_STEP, to)) {
    samples.push({ content: contentWidth(viewport), title: titleSize(viewport) });
    if (viewport >= to) break;
  }
  let best: { layout: Arrangement; params: number[]; value: number; rowMeetsGoal: boolean } | undefined;
  for (const layout of ARRANGEMENTS[texts.length] || []) {
    if (best?.rowMeetsGoal) break;
    const extra = KIND_COST[layout.kind] + (previous && layout !== previous ? SWITCH_COST : 0);
    const found = searchColumns(layout, samples, heights, best ? best.value - extra : Infinity);
    if (!found) continue;
    const rowMeetsGoal = layout.kind === "row" && found.meetsGoal;
    if (!best || rowMeetsGoal || found.value + extra < best.value) {
      best = { layout, params: found.params, value: found.value + extra, rowMeetsGoal };
    }
  }
  if (!best) return undefined;

  const { layout, params } = best;
  const [low, high] = [samples[0].content, samples[samples.length - 1].content];
  const free = layout.columns - 1;
  const plan: RangePlan = {
    range: from,
    areas: layout.areas,
    columns: params.slice(0, free).map((start, column) => {
      const share = (params[free + column] - start) / (high - low);
      return { share, offset: start - share * low };
    }),
  };
  return { plan, layout };
}

/** The arrangement of each desktop range (none for one subject, or where no arrangement keeps the cards 340–1040px wide). */
export function planLayout(subjects: LayoutSubject[], arabic: boolean): RangePlan[] {
  const texts = subjects.map((subject) => cardText(subject, arabic));
  const heights = heightsOf(texts);
  const plans: RangePlan[] = [];
  let previous: Arrangement | undefined;
  RANGE_STARTS.forEach((from, index) => {
    const found = planRange(texts, from, (RANGE_STARTS[index + 1] ?? CONTENT_END + 1) - 1, heights, previous);
    previous = found?.layout;
    if (found) plans.push(found.plan);
  });
  return plans;
}

/* ------------------------------------ The result ------------------------------------- */

const px = (value: number) => `${Math.round(value * 10) / 10}px`;

/** The plans as CSS custom properties: per range, the grid's columns and each card's area. */
function toStyles(plans: RangePlan[], count: number): BalancedLayout {
  const gridStyle: Record<string, string> = {};
  const cardStyles = Array.from({ length: count }, () => ({}) as Record<string, string>);
  for (const plan of plans) {
    const columns = plan.columns.map(({ share, offset }) =>
      Math.abs(share) < 1e-9
        ? `minmax(0, ${px(offset)})`
        : `minmax(0, calc(${(share * 100).toFixed(3)}% ${offset < 0 ? "-" : "+"} ${px(Math.abs(offset))}))`,
    );
    gridStyle[`--academics-arabic-columns-${plan.range}`] = [...columns, "minmax(0, 1fr)"].join(" ");
    plan.areas.forEach(({ row, column, rowSpan, columnSpan }, index) => {
      cardStyles[index][`--academics-arabic-area-${plan.range}`] = `${row} / ${column} / span ${rowSpan} / span ${columnSpan}`;
    });
  }
  // shared by every render of the same text, so frozen
  return Object.freeze({
    gridStyle: Object.freeze(gridStyle) as CSSProperties,
    cardStyles: Object.freeze(cardStyles.map((style) => Object.freeze(style) as CSSProperties)),
  });
}

/** Recent results, by the text they were planned for (the pages are rendered on every request). */
const cache = new Map<string, BalancedLayout>();
const CACHE_SIZE = 64;

/** The cards' arrangement as CSS custom properties for the grid and each card (see the top of this file). */
export function balancedLayout(subjects: LayoutSubject[], arabic: boolean): BalancedLayout {
  const key = JSON.stringify([
    arabic,
    subjects.map((subject) => [
      subject.title,
      subject.blocks.map((block) => [
        block.listItem ? 1 : 0,
        (block.children || []).map((child) => [child.text || "", child.marks?.includes("strong") ? 1 : 0]),
      ]),
    ]),
  ]);
  let layout = cache.get(key);
  if (!layout) {
    layout = toStyles(planLayout(subjects, arabic), subjects.length);
    cache.set(key, layout);
    if (cache.size > CACHE_SIZE) cache.delete(cache.keys().next().value as string);
  }
  return layout;
}
