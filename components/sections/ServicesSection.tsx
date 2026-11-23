import Image from "next/image";
import type { ServicesData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { CornerAccent } from "@/components/ui/LineArt";

// The design's photo frames: the first row of cards has slightly taller photos (430 × 167 against 430 × 148)
const photoFrame = (index: number) => (index < 4 ? "aspect-[430/167]" : "aspect-[430/148]");

/** Centred heading, then the service cards (4 per row from 1024px up) with orange corner lines at the grid's corners */
export const ServicesSection = ({ data }: { data?: ServicesData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div data-reveal className={`text-center ${sidePadding} lg:px-0`}>
        <Eyebrow
          label={data.label}
          lines="both"
          className={`${labelSize} font-heading font-bold text-[var(--color-ink)] lg:text-[1.65rem] lg:tracking-[0.33em]`}
          lineClassName="h-[0.125rem] w-10 bg-[var(--color-rust)] sm:w-16 lg:h-[0.1875rem] lg:w-[6.56rem]"
          gapClassName="gap-4 lg:gap-[2.2rem]"
        />
        <h2 className={`mt-3 font-heading font-bold tracking-[-0.02em] text-[var(--color-ink)] ${titleSize} lg:mt-[1.2rem] lg:text-[5rem] lg:leading-none lg:tracking-[-0.02em]`}>
          {data.titleTop} <span className="text-[var(--color-rust)]">{data.titleAccent}</span>
        </h2>
        {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
        <p className="mx-auto mt-4 max-w-[40rem] font-sans text-base leading-[1.6] text-[var(--color-text)] sm:text-lg lg:mt-[0.27rem] lg:max-w-none lg:whitespace-pre-line lg:text-[1.6rem] lg:leading-[2.25rem]">
          {data.description}
        </p>
      </div>

      <div className={`mx-auto mt-10 max-w-[44rem] ${sidePadding} sm:max-w-none lg:mt-[2.6rem] lg:pl-[3.56rem] lg:pr-[3.5rem]`}>
        <div className="relative mb-2.5 lg:mb-[0.375rem]">
          <CornerAccent
            corner="top-left"
            className="-left-2.5 -top-2.5 h-14 w-[4.5rem] rounded-tl-[1.1rem] border-[0.3rem] border-[var(--color-orange)] lg:-left-[0.75rem] lg:-top-[0.875rem] lg:h-[4.69rem] lg:w-[6.19rem] lg:rounded-tl-[1.4rem] lg:border-[0.375rem]"
          />
          <CornerAccent
            corner="bottom-right"
            className="-bottom-2.5 -right-2.5 h-14 w-[4.5rem] rounded-br-[1.1rem] border-[0.3rem] border-[var(--color-orange)] lg:-bottom-[0.375rem] lg:-right-[0.69rem] lg:h-[5.1rem] lg:w-[5.9rem] lg:rounded-br-[1.4rem] lg:border-[0.375rem]"
          />
          <ul className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-[1.875rem] lg:gap-y-[1.8rem]">
            {data.items.map((item, index) => (
              <li
                key={item.id}
                data-reveal
                data-reveal-delay={(index % 4) * 90}
                className="group flex flex-col overflow-hidden rounded-[0.625rem] bg-[var(--color-bg-card)] shadow-[0_0.5rem_1.5rem_-0.9rem_var(--color-shadow-strong)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_1.2rem_2rem_-1rem_var(--color-shadow-strong)]"
              >
                <div className={`relative shrink-0 overflow-hidden ${photoFrame(index)}`}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 23vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex-1 px-5 pb-6 pt-5 lg:pb-[0.25rem] lg:pl-[2.125rem] lg:pr-[1rem] lg:pt-[0.7rem]">
                  <h3 className="font-sans text-[1.15rem] font-bold leading-tight tracking-[-0.01em] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-rust)] lg:whitespace-nowrap lg:text-[1.55rem] lg:leading-none">
                    {item.title}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="mt-2.5 block h-1 w-12 rounded-full bg-[var(--color-orange-deep)] transition-[width] duration-300 group-hover:w-16 lg:mt-[1rem] lg:h-[0.3125rem] lg:w-[3.69rem] lg:group-hover:w-[5.5rem]"
                  />
                  {/* the design's line breaks (\n in the JSON) are kept from 1024px up; a line too long for its card still wraps instead of being cut off */}
                  <p className="mt-3 font-sans text-[0.95rem] leading-[1.55] text-[var(--color-text-soft)] lg:mt-[0.75rem] lg:whitespace-pre-line lg:text-[1.21rem] lg:leading-[1.6rem]">
                    {item.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
