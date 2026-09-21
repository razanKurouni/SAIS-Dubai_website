import { PAGE_SPECS } from "../../src/content/page-spec";

/** slot id → human label, for Studio previews. */
export const SLOT_LABELS = Object.fromEntries(
  PAGE_SPECS.flatMap((page) => page.slots.map((item) => [item.slot, item.label])),
);
