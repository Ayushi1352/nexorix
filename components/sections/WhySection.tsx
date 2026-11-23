import { Fragment } from "react";
import Image from "next/image";
import type { WhyData, WhyPoint } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";

/** Square photo with rounded corners, then the point's title and text */
const Point = ({ point, index }: { point: WhyPoint; index: number }) => (
  <li data-reveal data-reveal-delay={(index % 2) * 100} className="group flex items-start gap-5 lg:w-[31.6rem] lg:gap-[2.56rem]">
    <div className="relative aspect-[174/159] w-[7.5rem] shrink-0 overflow-hidden rounded-xl sm:w-[8.5rem] lg:w-[10.875rem] lg:rounded-[1rem]">
      <Image src={point.image} alt={point.imageAlt} fill quality={90} sizes="(min-width: 1024px) 10vw, 140px" className="object-cover transition-transform duration-700 group-hover:scale-110" />
    </div>
    <div className="pt-1 lg:pt-[0.7rem]">
      <h3 className="font-sans text-[1.1rem] font-bold leading-tight tracking-[-0.01em] text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-rust)] lg:whitespace-nowrap lg:text-[1.79rem] lg:leading-[2rem] lg:tracking-[-0.045em]">
        {point.title}
      </h3>
      {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
      <p className="mt-2 font-sans text-[0.95rem] leading-[1.5] text-[var(--color-text-soft)] lg:mt-[0.75rem] lg:whitespace-pre lg:text-[1.36rem] lg:leading-[1.94rem]">{point.text}</p>
    </div>
  </li>
);

/**
 * Team photo on the left with a copper block behind its top-right corner and a copper corner line at its bottom-left;
 * label, title, text and the four points (two rows of two, with thin lines between them) on the right.
 */
export const WhySection = ({ data }: { data?: WhyData }) => {
  if (!data) return null;
  // the points in rows of two (the design's 2 × 2 grid)
  const rows = data.points.reduce<WhyPoint[][]>((all, point, index) => (index % 2 ? all[all.length - 1].push(point) : all.push([point]), all), []);

  return (
    <section
      id={data.id}
      className={`bg-gradient-to-b from-[var(--color-bg-why-top)] to-[var(--color-bg-why-bottom)] ${scrollMargin} ${sectionSpace}`}
    >
      <div className={`mx-auto flex max-w-[44rem] flex-col gap-16 ${sidePadding} lg:max-w-none lg:flex-row lg:items-start lg:gap-0 lg:px-0 lg:pl-[4.69rem]`}>
        {/* photo: the block and the corner line are placed in % of the photo, so they keep the design's layout on every screen */}
        <div data-reveal className="relative mx-auto mt-[calc(min(100%-2.5rem,34rem)*0.0468)] aspect-[660/718] w-[calc(100%-2.5rem)] max-w-[34rem] lg:mx-0 lg:mb-[1.56rem] lg:mt-[1.94rem] lg:w-[41.25rem] lg:max-w-none lg:shrink-0">
          <span aria-hidden="true" className="absolute -right-[4.4%] -top-[4.3%] left-[63%] h-[34.7%] bg-[var(--color-copper)]" />
          <span
            aria-hidden="true"
            className="absolute -bottom-[3.5%] -left-[4.7%] h-[24.4%] w-[35.9%] border-b-[0.45rem] border-l-[0.45rem] border-[var(--color-copper)] lg:border-b-[0.9rem] lg:border-l-[0.9rem]"
          />
          <div className="relative size-full overflow-hidden">
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 35vw, (min-width: 640px) 34rem, 88vw" className="object-cover" />
          </div>
        </div>

        <div className="lg:ml-[6.06rem] lg:pt-[1.13rem]">
          <div data-reveal>
            <Eyebrow
              label={data.label}
              className={`${labelSize} font-heading font-bold text-[var(--color-ink-soft)] lg:text-[1.5625rem] lg:tracking-[0.26em]`}
              lineClassName="h-[0.125rem] w-12 bg-[var(--color-copper)] sm:w-16 lg:h-[0.1875rem] lg:w-[6.81rem]"
              gapClassName="gap-4 lg:gap-[1.85rem]"
            />
            <h2 className={`mt-4 font-heading font-medium tracking-[-0.02em] text-[var(--color-ink)] ${titleSize} lg:mt-[1.68rem] lg:whitespace-nowrap lg:text-[5.74rem] lg:leading-none`}>
              {data.titleTop} <span className="font-bold text-[var(--color-rust)]">{data.titleAccent}</span>
            </h2>
            {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
            <p className="mt-5 font-sans text-base leading-[1.6] text-[var(--color-text)] sm:text-lg lg:mt-[1.55rem] lg:whitespace-pre-line lg:text-[1.74rem] lg:leading-[2.44rem]">
              {data.description}
            </p>
          </div>

          <div className="mt-10 lg:-ml-[1.06rem] lg:mt-[4.4rem]">
            {rows.map((row, rowIndex) => (
              <ul
                key={row[0].id}
                className={`grid gap-8 lg:flex lg:gap-0 ${
                  rowIndex > 0 ? "mt-8 border-t border-[var(--color-divider)] pt-8 lg:mt-[2.6rem] lg:w-[66.94rem] lg:border-t-[0.125rem] lg:pt-[2.2rem]" : ""
                }`}
              >
                {row.map((point, index) => (
                  <Fragment key={point.id}>
                    {index > 0 && <li aria-hidden="true" className="hidden w-[0.125rem] shrink-0 bg-[var(--color-divider)] lg:mr-[2.4rem] lg:block lg:h-[9.94rem]" />}
                    <Point point={point} index={index} />
                  </Fragment>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
