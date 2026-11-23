import Image from "next/image";
import type { FaqData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { CornerAccent } from "@/components/ui/LineArt";
import { FaqAccordion } from "@/components/sections/FaqAccordion";

/** Centred heading; the photo with orange corner lines and the "?" badge on the left, the questions on the right */
export const FaqSection = ({ data }: { data?: FaqData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div data-reveal className={`text-center ${sidePadding} lg:px-0`}>
        <Eyebrow
          label={data.label}
          lines="both"
          className={`${labelSize} font-display font-semibold text-[var(--color-ink)] lg:text-[1.69rem] lg:tracking-[0.42em]`}
          lineClassName="h-[0.125rem] w-10 bg-[var(--color-orange)] sm:w-16 lg:h-[0.19rem] lg:w-[6.9rem]"
          gapClassName="gap-4 lg:gap-[3.2rem]"
        />
        <h2 className={`mt-3 font-display font-semibold tracking-[-0.02em] text-[var(--color-ink-soft)] ${titleSize} lg:mt-[1.98rem] lg:text-[4.57rem] lg:leading-none lg:tracking-[-0.01em]`}>
          {data.titleTop} <span className="font-bold text-[var(--color-orange)]">{data.titleAccent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[40rem] font-display text-base leading-[1.6] text-[var(--color-text-soft)] sm:text-lg lg:mt-[1.34rem] lg:max-w-none lg:text-[1.7rem] lg:leading-none">
          {data.description}
        </p>
      </div>

      <div className={`mx-auto mt-12 grid max-w-[44rem] gap-14 ${sidePadding} lg:mt-[5rem] lg:flex lg:max-w-none lg:items-start lg:gap-[2.81rem] lg:pl-[4.63rem] lg:pr-[3.5rem]`}>
        {/* photo: the corner lines and the badge are placed in % of the photo, so they keep the design's layout on every screen */}
        <div data-reveal className="relative mx-auto aspect-[571/606] w-[calc(100%-2.5rem)] max-w-[26rem] lg:mx-0 lg:mb-[1.25rem] lg:mt-[0.44rem] lg:w-[35.69rem] lg:max-w-none lg:shrink-0">
          <CornerAccent
            corner="top-left"
            className="-left-[3.3%] -top-[3.3%] h-[17.2%] w-[19.3%] rounded-tl-[1.3rem] border-[0.3rem] border-[var(--color-orange)] lg:rounded-tl-[1.6rem] lg:border-[0.375rem]"
          />
          <CornerAccent
            corner="bottom-right"
            className="-bottom-[3.3%] -right-[3%] h-[21.1%] w-[19.6%] rounded-br-[1.3rem] border-[0.3rem] border-[var(--color-orange)] lg:rounded-br-[1.6rem] lg:border-[0.375rem]"
          />
          <div className="relative size-full overflow-hidden rounded-[1.1rem]">
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 26rem, 88vw" className="object-cover object-top" />
          </div>
          {/* decorative question mark badge over the photo's bottom-left corner */}
          <span
            aria-hidden="true"
            className="absolute -bottom-[3.3%] -left-[3.3%] grid aspect-square w-[29.2%] place-items-center rounded-[1rem] bg-[var(--color-beige-badge)] font-display text-[length:min(5.5rem,17vw)] font-bold leading-none text-[var(--color-orange-deep)] lg:rounded-[1.4rem] lg:text-[8.6rem]"
          >
            ?
          </span>
        </div>

        <div className="min-w-0 lg:w-[73.375rem]">
          <FaqAccordion items={data.items} />
        </div>
      </div>
    </section>
  );
};
