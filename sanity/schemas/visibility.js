/**
 * Field visibility for the Studio.
 *
 * Every section type shares the same fields (see objects/sections.js), but a
 * given section on a given page only uses a few of them. To keep the editing
 * form small, a field is shown only when:
 *   - it already has a value, or
 *   - the website uses it for this section (src/content/slot-fields.ts).
 *
 * Everything else stays hidden. To expose a hidden field for a section, add
 * it to src/content/slot-fields.ts (or re-run `npm run content:slot-fields`
 * once the field has content).
 */
import { HERO_FIELDS, SLOT_FIELDS } from "../../src/content/slot-fields";

const isObject = (value) => Boolean(value) && typeof value === "object" && !Array.isArray(value);

function hasValue(value) {
  if (value === null || value === undefined || value === "") return false;
  if (Array.isArray(value)) return value.length > 0;
  if (isObject(value)) return Object.keys(value).some((key) => !key.startsWith("_") && hasValue(value[key]));
  return true;
}

function sameObject(a, b) {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b)) return false;
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
}

const hasKey = (list, key) => Array.isArray(list) && key !== undefined && list.some((item) => item?._key === key);

/**
 * Finds where `parent` (a section, heading, card or entry object) lives in the
 * page document and returns the matching used-field list for `level`.
 * Returns undefined when it cannot tell, in which case the field is shown.
 */
function usedFields(document, parent, level) {
  if (!document || document._type !== "page" || !parent) return undefined;
  const sections = Array.isArray(document.sections) ? document.sections : [];
  const forSlot = (section) => SLOT_FIELDS[`${document._id}/${section?.slot}`];

  if (level === "section") {
    return forSlot(parent)?.section;
  }

  if (level === "heading") {
    if (sameObject(document.hero?.heading, parent)) return HERO_FIELDS[document._id]?.heading;
    const section = sections.find((item) => sameObject(item?.heading, parent));
    return section ? forSlot(section)?.heading : undefined;
  }

  if (level === "card") {
    const section = sections.find((item) => hasKey(item?.cards, parent._key));
    return section ? forSlot(section)?.card : undefined;
  }

  if (level === "entry") {
    for (const section of sections) {
      if (hasKey(section?.entries, parent._key)) return forSlot(section)?.entry;
      if (Array.isArray(section?.cards) && section.cards.some((card) => hasKey(card?.entries, parent._key))) {
        return forSlot(section)?.cardEntry;
      }
    }
    return undefined;
  }

  if (level === "hero") {
    return HERO_FIELDS[document._id]?.hero;
  }

  return undefined;
}

/**
 * Wraps a field definition so it is hidden unless it has a value or the
 * website uses it for the section being edited.
 */
export function onlyWhenUsed(field, level) {
  return {
    ...field,
    hidden: ({ document, parent, value }) => {
      if (hasValue(value)) return false;
      const used = usedFields(document, parent, level);
      if (!used) return false;
      return !used.includes(field.name);
    },
  };
}

export const onlyWhenUsedAll = (fields, level) => fields.map((field) => onlyWhenUsed(field, level));
