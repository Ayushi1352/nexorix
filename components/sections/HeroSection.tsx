import Image from "next/image";
import type { HeroData } from "@/types/templates.types";
import { Eyebrow, labelSize } from "@/components/ui/SectionHeading";
import { HeroShapes } from "@/components/ui/LineArt";
import { sectionSpaceAfter } from "@/components/ui/sectionSpace";

/**
 * Full-width meeting photo under the header, darkened on the left; label with a copper line, the two-line title
 * (the second line in a copper gradient), two lines of text, and the copper diagonals in the bottom-right corner.
 */
export const HeroSection = ({ data }: { data?: HeroData }) => {
  if (!data) return null;

  return (
    <section
      id={data.id}
      className={`relative mt-[4.5rem] flex min-h-[34rem] items-center overflow-hidden bg-[var(--color-ink)] sm:mt-[5.5rem] sm:min-h-[40rem] lg:mt-[8.875rem] lg:block lg:h-[61rem] lg:min-h-0 ${sectionSpaceAfter}`}
    >
      <Image
        src={data.image}
        alt={data.imageAlt}
        fill
        preload
        quality={90}
        sizes="(min-width: 1920px) 1920px, 100vw"
        className="object-cover object-[62%_center] lg:object-[center_48%]"
      />
      {/* keeps the text readable on every screen: dark on the left, clear over the people on the right */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[var(--color-hero-overlay)] via-[var(--color-hero-overlay-mid)] to-transparent lg:via-[var(--color-hero-overlay-soft)] lg:to-[45%]"
      />
      <HeroShapes className="absolute bottom-0 right-0 h-[40%] w-[26%] sm:h-[55%] sm:w-[32%] lg:h-[52rem] lg:w-[32.5rem]" />

      <div data-reveal className="relative w-full px-4 py-16 sm:px-6 md:px-8 lg:px-0 lg:pl-[10.56rem] lg:pt-[10.28rem] lg:py-0">
        <Eyebrow
          label={data.label}
          className={`${labelSize} font-heading font-semibold text-[var(--color-white)] lg:text-[1.65rem] lg:tracking-[0.2em]`}
          lineClassName="h-[0.125rem] w-12 bg-[var(--color-copper-light)] sm:w-16 lg:w-[7.875rem]"
          gapClassName="gap-5 sm:gap-6 lg:gap-[2.7rem]"
        />
        {/* phones and tablets: the title shrinks with the screen width so each line of the design stays one line */}
        <h1 className="mt-5 font-heading text-[length:min(2.7rem,calc((100vw-2rem)/7.4))] leading-[1.08] tracking-[-0.025em] sm:mt-6 sm:text-[4.1rem] lg:mt-[1.61rem] lg:text-[5.9rem] lg:leading-[6.25rem]">
          <span className="block font-light text-[var(--color-white)]">{data.titleTop}</span>
          <span className="block bg-gradient-to-r from-[var(--color-hero-title-from)] to-[var(--color-hero-title-to)] bg-clip-text pb-[0.08em] text-[1.1em] font-extrabold text-transparent lg:leading-[5.75rem]">
            {data.titleAccent}
          </span>
        </h1>
        {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
        <p className="mt-5 max-w-[30rem] font-sans text-base leading-[1.65] text-[var(--color-white-95)] sm:ml-6 sm:text-lg lg:ml-[2.81rem] lg:mt-[1.49rem] lg:max-w-none lg:whitespace-pre-line lg:text-[1.66rem] lg:leading-[2.69rem]">
          {data.description}
        </p>
      </div>
    </section>
  );
};
