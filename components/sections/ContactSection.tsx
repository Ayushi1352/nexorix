import type { CompanyData, ContactData, EnquiryFormData } from "@/types/templates.types";
import { Eyebrow, labelSize, titleSize } from "@/components/ui/SectionHeading";
import { scrollMargin, sectionSpace, sidePadding } from "@/components/ui/sectionSpace";
import { CornerAccent, MapArt } from "@/components/ui/LineArt";
import { Icon } from "@/components/ui/Icon";
import { EnquiryForm } from "@/components/sections/EnquiryForm";

type Props = {
  data?: ContactData;
  form?: EnquiryFormData;
  company: CompanyData;
  /** choices of the form's subject list (built in app/page.tsx from the Services section) */
  subjectOptions: string[];
};

/**
 * Centred heading; the message form on the left and the map on the right, with the dark contact card over the
 * map's top-right corner (phones and tablets: under the map).
 */
export const ContactSection = ({ data, form, company, subjectOptions }: Props) => {
  if (!data) return null;
  // the map opens the link of one company contact item (the address), so the address URL lives in one place
  const mapUrl = company.contactItems.find((item) => item.id === data.mapItemId)?.url;
  const mapArt = (
    <>
      <MapArt className="absolute inset-0 size-full transition-transform duration-700 group-hover:scale-[1.03]" />
      <Icon
        name="FaMapMarkerAlt"
        className="absolute left-[21%] top-[43.5%] h-[10.6%] w-auto text-[var(--color-orange)] drop-shadow-[0_0.4rem_0.4rem_var(--color-shadow-strong)] transition-[transform,color] duration-300 group-hover:-translate-y-1 group-hover:text-[var(--color-ink)]"
      />
    </>
  );
  const mapClass = "group relative block aspect-[833/650] overflow-hidden rounded-[1.25rem] lg:absolute lg:inset-0 lg:aspect-auto";

  return (
    <section id={data.id} className={`bg-[var(--color-bg-main)] ${scrollMargin} ${sectionSpace}`}>
      <div data-reveal className={`text-center ${sidePadding} lg:px-0`}>
        <Eyebrow
          label={data.label}
          lines="both"
          className={`${labelSize} font-display font-semibold text-[var(--color-ink)] lg:text-[1.69rem] lg:tracking-[0.27em]`}
          lineClassName="h-[0.125rem] w-10 bg-[var(--color-orange)] sm:w-16 lg:h-[0.19rem] lg:w-[5.94rem]"
          gapClassName="gap-4 lg:gap-[1.9rem]"
        />
        <h2 className={`mt-3 font-display font-semibold tracking-[-0.02em] text-[var(--color-ink-soft)] ${titleSize} lg:mt-[1.85rem] lg:text-[5.125rem] lg:leading-none lg:tracking-[-0.05em]`}>
          {data.titleTop} <span className="font-bold text-[var(--color-orange)] lg:tracking-[-0.01em]">{data.titleAccent}</span>
        </h2>
        <p className="mx-auto mt-4 max-w-[40rem] font-display text-base leading-[1.6] text-[var(--color-text-soft)] sm:text-lg lg:mt-[1.41rem] lg:max-w-none lg:text-[1.69rem] lg:leading-none">
          {data.description}
        </p>
      </div>

      <div className={`mx-auto mt-10 grid max-w-[44rem] gap-8 ${sidePadding} lg:mt-[4.65rem] lg:flex lg:max-w-none lg:items-start lg:gap-[1.25rem] lg:pl-[4.06rem] lg:pr-[3.75rem]`}>
        {/* message form */}
        <div data-reveal className="relative">
          <CornerAccent
            corner="top-left"
            className="-left-1.5 -top-1.5 size-14 rounded-tl-[1.3rem] border-[0.3rem] border-[var(--color-orange)] lg:-left-[0.375rem] lg:-top-[0.31rem] lg:h-[6.19rem] lg:w-[6.25rem] lg:rounded-tl-[1.6rem] lg:border-[0.375rem]"
          />
          <div className="relative rounded-[1.25rem] border border-[var(--color-border)] bg-[var(--color-white)] px-5 pb-7 pt-6 shadow-[0_1rem_2.2rem_-1.6rem_var(--color-shadow-strong)] sm:px-8 lg:h-[41rem] lg:w-[58.875rem] lg:px-[2.875rem] lg:pb-0 lg:pt-[3.3rem]">
            <h3 className="font-display text-[1.6rem] font-medium leading-tight tracking-[-0.01em] text-[var(--color-ink)] lg:text-[2.5rem] lg:leading-none">{data.formTitle}</h3>
            <EnquiryForm data={form} subjectOptions={subjectOptions} />
          </div>
        </div>

        {/* map with the contact card */}
        <div data-reveal className="relative lg:h-[40.625rem] lg:w-[52.06rem] lg:shrink-0">
          {mapUrl ? (
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" aria-label={data.mapLabel} className={mapClass}>
              {mapArt}
            </a>
          ) : (
            <div aria-hidden="true" className={mapClass}>
              {mapArt}
            </div>
          )}

          <div className="mt-4 rounded-2xl bg-[var(--color-bg-info)] px-6 pb-6 pt-6 text-[var(--color-white)] sm:px-8 lg:absolute lg:right-[2.125rem] lg:top-[0.25rem] lg:mt-0 lg:h-[24.75rem] lg:w-[26.6rem] lg:rounded-[1rem] lg:px-[2.31rem] lg:pb-0 lg:pt-[2.35rem]">
            <h3 className="font-display text-[1.5rem] font-semibold leading-none lg:text-[2.23rem]">{data.infoTitle}</h3>
            <span aria-hidden="true" className="mt-3 block h-1 w-14 rounded-full bg-[var(--color-orange)] lg:mt-[1.15rem] lg:h-[0.31rem] lg:w-[4.5rem]" />
            <ul className="mt-5 lg:mt-[2.35rem]">
              {company.contactItems.map((item, index) => {
                const external = item.url.startsWith("http");
                return (
                  <li
                    key={item.id}
                    className={
                      index > 0
                        ? "relative mt-3.5 pt-3.5 before:absolute before:left-[3.9rem] before:right-0 before:top-0 before:h-px before:bg-[var(--color-divider-info)] lg:mt-[0.8rem] lg:pt-[0.8rem] lg:before:left-[5.56rem]"
                        : "lg:pb-[0.56rem]"
                    }
                  >
                    <a
                      href={item.url}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      aria-label={`${item.title}: ${item.lines.join(" ")}`}
                      className="group flex items-center gap-4 lg:gap-[2.06rem]"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-[var(--color-orange)] transition-[transform,background-color] duration-300 group-hover:scale-105 group-hover:bg-[var(--color-orange-bright)] lg:size-[3.5rem] lg:rounded-[0.6rem]">
                        <Icon name={item.icon} className="size-[1.1rem] lg:size-[1.45rem]" />
                      </span>
                      <span className="min-w-0 break-words font-display text-[0.95rem] leading-[1.55] transition-colors group-hover:text-[var(--color-orange-bright)] lg:text-[1.16rem] lg:leading-[1.875rem]">
                        {item.lines.map((line) => (
                          <span key={line} className="block">
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
      </div>
    </section>
  );
};
