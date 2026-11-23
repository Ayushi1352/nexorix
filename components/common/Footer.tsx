import Image from "next/image";
import type { CompanyData, FooterData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { WaveLines } from "@/components/ui/LineArt";
import { fill } from "@/components/ui/text";

/** Fills `{year}` in the copyright line; cached so the footer can still be prerendered. */
async function currentYear() {
  "use cache";
  return new Date().getFullYear();
}

const heading = "font-heading text-[1.5rem] font-bold leading-none text-[var(--color-white)] lg:text-[2.25rem]";
const underline = "mt-3 block h-1 w-12 bg-[var(--color-orange)] lg:mt-[1.25rem] lg:h-[0.25rem] lg:w-[5rem]";
/** thin line between the columns (from 1024px up) with a short orange stroke in its middle */
const Divider = () => (
  <span
    aria-hidden="true"
    className="relative hidden w-px shrink-0 bg-gradient-to-b from-transparent via-[var(--color-divider-dark)] to-transparent after:absolute after:left-1/2 after:top-1/2 after:h-[5rem] after:w-[0.3rem] after:-translate-x-1/2 after:rounded-full after:bg-[var(--color-orange)] lg:mt-[0.5rem] lg:block lg:h-[17.44rem] lg:after:top-[4.9rem]"
  />
);

// Logo and short text; the two link lists; the contact details; then the copyright line under a thin rule.
export const Footer = async ({ data, company }: { data?: FooterData; company: CompanyData }) => {
  if (!data) return null;
  const copyright = fill(data.copyrightText, { year: await currentYear() });

  return (
    <footer className="relative overflow-hidden bg-[var(--color-bg-footer)] bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,var(--color-bg-footer-glow),transparent)] text-[var(--color-white)] lg:h-[40.06rem]">
      <WaveLines className="pointer-events-none absolute left-0 top-[23.25rem] hidden w-[21rem] text-[var(--color-orange)] lg:block" />

      {/* phones: the two link lists side by side, contact details below; tablets: link lists and contact details in one row */}
      <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 px-4 pb-10 pt-14 sm:grid-cols-3 sm:gap-x-12 sm:px-6 md:px-8 lg:flex lg:h-[31.25rem] lg:gap-0 lg:p-0 lg:pl-[6.19rem] lg:pt-[7.875rem]">
        {/* logo and text */}
        <div className="col-span-full lg:w-[31.94rem] lg:shrink-0">
          <a href={data.logoUrl} aria-label={data.homeLabel} className="inline-block lg:mt-[0.625rem]">
            <Image
              src={company.logoLight}
              alt={company.logoAlt}
              width={company.logoWidth}
              height={company.logoHeight}
              quality={90}
              sizes="(min-width: 1024px) 24vw, 230px"
              className="h-auto w-[13.5rem] sm:w-[15rem] lg:w-[27.75rem]"
            />
          </a>
          {/* the design's line breaks (\n in the JSON) are kept from 640px up */}
          <p className="mt-5 max-w-[24rem] font-sans text-[0.95rem] leading-[1.6] text-[var(--color-white-85)] sm:max-w-none sm:whitespace-pre-line sm:text-base lg:mt-[2.46rem] lg:text-[1.58rem] lg:leading-[2.31rem]">
            {data.description}
          </p>
        </div>

        {/* link lists */}
        {data.linkGroups.map((group, index) => (
          <div key={group.id} className="contents">
            <Divider />
            <nav aria-label={group.title} className={index === 0 ? "lg:ml-[4.75rem] lg:w-[19.5rem]" : "lg:ml-[4.31rem] lg:w-[20.38rem]"}>
              <h2 className={heading}>{group.title}</h2>
              <span aria-hidden="true" className={underline} />
              <ul className="mt-5 grid gap-3 lg:mt-[2.35rem] lg:gap-[1.02rem]">
                {group.links.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      className="group inline-flex items-center gap-3 whitespace-nowrap font-sans text-[0.95rem] text-[var(--color-white)] transition-colors hover:text-[var(--color-orange-bright)] sm:text-base lg:-ml-[0.25rem] lg:gap-[0.69rem] lg:text-[1.56rem] lg:leading-none"
                    >
                      <Icon
                        name="LuChevronRight"
                        className="size-4 text-[var(--color-orange-bright)] transition-transform group-hover:translate-x-0.5 lg:size-[2rem]"
                        strokeWidth={2.4}
                      />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ))}

        <Divider />

        {/* contact details */}
        <div className="col-span-2 sm:col-span-1 lg:ml-[4.88rem]">
          <h2 className={heading}>{data.contactTitle}</h2>
          <span aria-hidden="true" className={underline} />
          <ul className="mt-5 grid gap-4 lg:mt-[1.7rem] lg:gap-[1.5rem]">
            {company.contactItems.map((item) => {
              const external = item.url.startsWith("http");
              return (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={`${item.title}: ${item.lines.join(" ")}`}
                    className="group flex items-center gap-4 lg:gap-[1.5rem]"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-lg border-2 border-[var(--color-orange-bright)] text-[var(--color-orange-bright)] transition-colors duration-300 group-hover:bg-[var(--color-orange-bright)] group-hover:text-[var(--color-white)] lg:size-[3.5rem] lg:rounded-[0.6rem] lg:border-[0.125rem]">
                      <Icon name={item.icon} className="size-[1.2rem] lg:size-[1.7rem]" />
                    </span>
                    <span className="min-w-0 break-words font-sans text-[0.95rem] leading-[1.5] text-[var(--color-white)] transition-colors group-hover:text-[var(--color-orange-bright)] sm:text-base lg:text-[1.5rem] lg:leading-[1.94rem]">
                      {item.lines.map((line) => (
                        <span key={line} className="block lg:whitespace-nowrap">
                          {line}
                        </span>
                      ))}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="relative mx-4 border-t border-[var(--color-divider-dark)] py-6 sm:mx-6 md:mx-8 lg:mx-[4.375rem] lg:py-0 lg:pt-[2.6rem]">
        <p className="text-center font-sans text-[0.9rem] text-[var(--color-white)] sm:text-left sm:text-[0.95rem] lg:ml-[0.4rem] lg:text-[1.4rem] lg:leading-none">{copyright}</p>
      </div>
    </footer>
  );
};
