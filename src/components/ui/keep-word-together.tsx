import { Fragment, type ReactNode } from "react";

const HYPHENATED_WORDS = /(well-being)/i;

/**
 * Keeps "Well-being" on one line inside short labels and card titles, so a
 * narrow label wraps before the word ("Student & Staff / Well-being") instead
 * of at its hyphen ("Student & Staff Well- / being"). The text itself is unchanged.
 */
export function keepWordTogether(text: string | undefined): ReactNode {
  if (!text || !HYPHENATED_WORDS.test(text)) return text;

  // One wrapping span, so a flex parent (the inner nav links) still sees a single item.
  return (
    <span>
      {text.split(HYPHENATED_WORDS).map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} style={{ whiteSpace: "nowrap" }}>
            {part}
          </span>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </span>
  );
}
