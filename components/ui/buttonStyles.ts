/** Copper pill of the header ("Contact Us"): turns ink on hover (a fading layer, so the gradient changes smoothly) */
export const buttonClass =
  "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-b from-[var(--color-copper)] to-[var(--color-copper-deep)] font-heading font-semibold text-[var(--color-white)] shadow-[0_0.5rem_1.25rem_-0.6rem_var(--color-shadow-copper)] transition-transform duration-300 before:absolute before:inset-0 before:-z-10 before:bg-[var(--color-ink)] before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-0.5 hover:before:opacity-100";

/** Orange pill of the contact form ("Submit Now"), with the same ink hover layer */
export const submitClass =
  "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full bg-[var(--color-orange-deep)] font-display font-semibold uppercase text-[var(--color-white)] shadow-[0_0.6rem_1.4rem_-0.8rem_var(--color-shadow-orange)] transition-transform duration-300 before:absolute before:inset-0 before:-z-10 before:bg-[var(--color-ink)] before:opacity-0 before:transition-opacity before:duration-300 hover:-translate-y-0.5 hover:before:opacity-100 disabled:cursor-wait disabled:opacity-80";

/** arrow inside a button that turns up-right on hover */
export const buttonArrow = "shrink-0 transition-transform duration-300 group-hover:-rotate-45";

/** round slider arrows (Testimonials): outlined, and the filled orange "next" one */
export const roundOutlineClass =
  "grid place-items-center rounded-full border-[0.09rem] border-[var(--color-ink)] bg-[var(--color-white)] text-[var(--color-ink)] transition-colors duration-300 hover:border-[var(--color-orange)] hover:bg-[var(--color-orange)] hover:text-[var(--color-white)]";
export const roundFilledClass =
  "grid place-items-center rounded-full bg-[var(--color-orange)] text-[var(--color-white)] shadow-[0_0.6rem_1.2rem_-0.6rem_var(--color-shadow-orange)] transition-colors duration-300 hover:bg-[var(--color-ink)]";
