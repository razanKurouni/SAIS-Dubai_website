/**
 * Applies code-owned design tokens (colors, layout, variants) on top of the
 * content that comes from Sanity.
 *
 * Objects are merged key by key. Arrays are merged by position: the overlay
 * for the first card is applied to the first card, and overlay entries that
 * have no matching content item are ignored. Content always wins for keys
 * that are not design tokens because the overlay only contains design keys.
 */

export type DesignOverlay = {
  [key: string]: DesignValue;
};

export type DesignValue = string | boolean | number | null | DesignOverlay | Array<DesignOverlay | null>;

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function mergeValue(content: unknown, overlay: DesignValue): unknown {
  if (overlay === null || overlay === undefined) return content;

  if (Array.isArray(overlay)) {
    if (!Array.isArray(content)) return content;
    return content.map((item, index) => {
      const itemOverlay = overlay[index];
      return itemOverlay && isPlainObject(item) ? mergeValue(item, itemOverlay) : item;
    });
  }

  if (isPlainObject(overlay)) {
    if (content === undefined || content === null) {
      // A design-only object (for example a section that has no content yet)
      // is still useful: components read colors from it and fall back on text.
      return mergeValue({}, overlay);
    }
    if (!isPlainObject(content)) return content;
    const result: Record<string, unknown> = { ...content };
    for (const [key, nested] of Object.entries(overlay)) {
      result[key] = mergeValue(content[key], nested);
    }
    return result;
  }

  return overlay;
}

export function applyDesign<T>(content: T, overlay?: DesignOverlay): T {
  if (!overlay || content === undefined || content === null) return content;
  return mergeValue(content, overlay) as T;
}
