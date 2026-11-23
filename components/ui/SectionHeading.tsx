/*
  Sizes from 1024px up are taken from the 1920px design: 1 design pixel = 0.0625rem
  (the root font is 100vw / 120 there, at most 16px, so a 1920px screen shows the design 1:1).
*/

/**
 * Size of every section title on phones and tablets, so all titles match (desktop sizes follow the design per section).
 * Phones: shrinks with the screen width so the longest title line still fits; tablets: 2.9rem.
 */
export const titleSize = "text-[length:min(2.15rem,calc((100vw-2rem)/11.6))] leading-[1.16] sm:text-[2.9rem]";

/** Size and letter spacing of every section label ("WHO WE ARE", "OUR SERVICES"…) on phones and tablets */
export const labelSize = "text-[0.8rem] tracking-[0.24em] sm:text-[0.95rem]";

type EyebrowProps = {
  label: string;
  /** "after": one line after the label (left headings); "both": a line on each side (centred headings) */
  lines?: "after" | "both";
  /** font, size, letter spacing and colour of this section's label */
  className?: string;
  /** length, thickness and colour of the lines */
  lineClassName?: string;
  /** space between the label and its lines */
  gapClassName?: string;
};

/** Spaced capitals with short lines beside them: "WHO WE ARE ——" or "—— OUR SERVICES ——" */
export const Eyebrow = ({
  label,
  lines = "after",
  className = "",
  lineClassName = "w-10 sm:w-14 h-[0.125rem] bg-[var(--color-copper)]",
  gapClassName = "gap-3 sm:gap-4",
}: EyebrowProps) => {
  const line = <span aria-hidden="true" className={`shrink-0 ${lineClassName}`} />;
  return (
    <p className={`flex items-center uppercase leading-none ${lines === "both" ? "justify-center" : ""} ${gapClassName} ${className}`}>
      {lines === "both" && line}
      {/* letter spacing also adds space after the last letter; the negative margin keeps the label centred */}
      <span className="-mr-[0.25em]">{label}</span>
      {line}
    </p>
  );
};
