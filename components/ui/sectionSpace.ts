/**
 * Space above and below every section's content. Each section uses exactly this, so the gap between any two
 * sections is the same (twice this) at every screen size: 64px on phones, 80px on tablets, and from 1024px up
 * 9rem, which scales with the design like everything else (144px on a 1920px screen).
 */
export const sectionSpace = "py-8 sm:py-10 lg:py-[4.5rem]";

/** The same space after the full-width hero, so the gap from the hero to the first section matches the others */
export const sectionSpaceAfter = "mb-8 sm:mb-10 lg:mb-[4.5rem]";

/** The same space after the last section, so the gap before the footer matches the others */
export const sectionSpaceEnd = "pb-8 sm:pb-10 lg:pb-[4.5rem]";

/** The fixed header's height, so a menu link scrolls its section to just below the header */
export const scrollMargin = "scroll-mt-[4.5rem] sm:scroll-mt-[5.5rem] lg:scroll-mt-[6.25rem]";

/** Side space of the content on phones and tablets (from 1024px up each section follows the design) */
export const sidePadding = "px-4 sm:px-6 md:px-8";
