import type { TestimonialsData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { SkewSquares } from "@/components/ui/LineArt";
import { TestimonialSlider } from "@/components/sections/TestimonialSlider";

/** Centred heading, the testimonial cards with their arrows, and two pairs of beige squares in the corners */
export const TestimonialsSection = ({ data }: { data?: TestimonialsData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`relative bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <SkewSquares className="absolute right-3 top-8 w-16 text-[var(--color-beige-soft)] sm:right-6 sm:top-10 sm:w-24 lg:right-[4rem] lg:top-[5.99rem] lg:w-[9.5rem]" />
      <SkewSquares className="absolute bottom-8 left-3 w-14 rotate-180 text-[var(--color-beige-soft)] sm:bottom-10 sm:left-6 sm:w-20 lg:bottom-[4.5rem] lg:left-[3.75rem] lg:w-[8rem]" />

      <div data-reveal className={`relative text-center ${sidePadding} lg:px-0`}>
        <Eyebrow
          label={data.label}
          lines="both"
          className={`${labelSize} font-heading font-bold text-[var(--color-ink)] lg:text-[1.73rem] lg:tracking-[0.25em]`}
          lineClassName="h-[0.125rem] w-10 bg-[var(--color-orange)] sm:w-16 lg:h-[0.19rem] lg:w-[6rem]"
          gapClassName="gap-4 lg:gap-[2.1rem]"
        />
        <h2 className={`mt-3 font-heading font-bold tracking-[-0.02em] text-[var(--color-ink)] ${titleSize} lg:mt-[1.9rem] lg:text-[4.5rem] lg:leading-none`}>
          {data.titleTop} <span className="text-[var(--color-orange)]">{data.titleAccent}</span>
        </h2>
      </div>

      <div className={`relative mx-auto mt-10 max-w-[44rem] ${sidePadding} lg:mt-[4.6rem] lg:max-w-none lg:pl-[4.31rem] lg:pr-[4.19rem]`}>
        <TestimonialSlider data={data} />
      </div>
    </section>
  );
};
