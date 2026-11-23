import { Fragment } from "react";
import Image from "next/image";
import type { AboutData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { Icon } from "@/components/ui/Icon";

/**
 * Label, two-line title, text and three icon features on the left; on the right the team photo with a copper block
 * behind its top-right corner, a beige block behind its bottom-right and a copper corner line at its bottom-left.
 */
export const AboutSection = ({ data }: { data?: AboutData }) => {
  if (!data) return null;

  return (
    <section id={data.id} className={`relative bg-[var(--color-bg-about)] ${scrollMargin} ${sectionSpace}`}>
      <div className={`mx-auto flex max-w-[44rem] flex-col gap-16 ${sidePadding} lg:max-w-none lg:flex-row lg:items-start lg:gap-0 lg:px-0 lg:pl-[5.81rem] lg:pr-[6.94rem]`}>
        <div data-reveal>
          <Eyebrow
            label={data.label}
            className={`${labelSize} font-heading font-bold text-[var(--color-text-muted)] lg:text-[1.5625rem] lg:tracking-[0.26em]`}
            lineClassName="h-[0.125rem] w-12 bg-[var(--color-copper-dark)] sm:w-16 lg:h-[0.1875rem] lg:w-[6.81rem]"
            gapClassName="gap-4 lg:gap-[2.1rem]"
          />
          <h2 className={`mt-4 font-heading tracking-[-0.01em] ${titleSize} lg:mt-[2.48rem] lg:text-[4.9rem] lg:leading-[5.89rem] lg:tracking-normal`}>
            <span className="block font-medium text-[var(--color-ink)]">{data.titleTop}</span>
            <span className="block text-[1.09em] font-bold text-[var(--color-copper)]">{data.titleAccent}</span>
          </h2>
          {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
          <p className="mt-5 font-sans text-base leading-[1.6] text-[var(--color-text)] sm:text-lg lg:mt-[2.225rem] lg:whitespace-pre-line lg:text-[1.69rem] lg:leading-[2.53rem]">
            {data.description}
          </p>

          <ul className="mt-9 flex items-start justify-between sm:justify-start lg:ml-[0.4rem] lg:mt-[2.85rem]">
            {data.features.map((feature, index) => (
              <Fragment key={feature.id}>
                {index > 0 && (
                  <li aria-hidden="true" className="mx-3 h-[5.5rem] w-px shrink-0 self-stretch bg-[var(--color-divider)] sm:mx-8 lg:mx-[3.3rem] lg:h-[7.25rem] lg:w-[0.15rem] lg:self-auto" />
                )}
                <li className="group flex flex-col items-center text-center">
                  <Icon
                    name={feature.icon}
                    className="size-12 text-[var(--color-copper)] transition-transform duration-300 group-hover:-translate-y-1 sm:size-14 lg:size-[5rem]"
                    strokeWidth={1.25}
                  />
                  <span className="mt-3 font-heading text-[0.85rem] font-extrabold leading-tight text-[var(--color-ink)] sm:text-base lg:mt-[0.6rem] lg:whitespace-nowrap lg:text-[1.5625rem]">
                    {feature.title}
                  </span>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>

        {/* photo: the blocks and the corner line are placed in % of the photo, so they keep the design's layout on every screen */}
        <div
          data-reveal
          className="relative mx-auto mb-[calc(min(100%-2rem,40rem)*0.0695)] aspect-[802/606] w-[calc(100%-2rem)] max-w-[40rem] lg:mb-[3.5rem] lg:ml-auto lg:mr-0 lg:mt-[2.19rem] lg:w-[50.125rem] lg:max-w-none"
        >
          <span aria-hidden="true" className="absolute -right-[4.4%] -top-[5.8%] left-[63%] h-[33.7%] bg-[var(--color-copper)]" />
          <span aria-hidden="true" className="absolute -bottom-[9.2%] -right-[7.7%] left-[42.4%] top-[49%] bg-[var(--color-beige)]" />
          <span
            aria-hidden="true"
            className="absolute -bottom-[3.8%] -left-[3.1%] h-[20.3%] w-[17.3%] border-b-[0.3rem] border-l-[0.3rem] border-[var(--color-copper)] lg:border-b-[0.5rem] lg:border-l-[0.5rem]"
          />
          <div className="relative size-full overflow-hidden">
            <Image src={data.image} alt={data.imageAlt} fill quality={90} sizes="(min-width: 1024px) 42vw, (min-width: 640px) 40rem, 92vw" className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
