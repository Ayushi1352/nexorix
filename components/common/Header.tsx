"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { CompanyData, HeaderData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { buttonArrow, buttonClass } from "@/components/ui/buttonStyles";
import { sectionId, useActiveSection } from "@/components/ui/useActiveSection";

/** Desktop link with the copper underline of the current section */
const linkClass = (current: boolean) =>
  `relative whitespace-nowrap py-[0.4rem] font-heading text-[1.5625rem] font-semibold leading-none transition-colors after:absolute after:inset-x-0 after:top-[calc(100%+1rem)] after:h-[0.1875rem] after:bg-[var(--color-copper-dark)] after:transition-transform after:duration-300 ${
    current ? "text-[var(--color-copper)] after:scale-x-100" : "text-[var(--color-ink)] after:scale-x-0 hover:text-[var(--color-copper)]"
  }`;

/**
 * White bar: logo on the left, the section links in the middle and the copper "Contact Us" button on the right.
 * At the top of the page it is the design's tall bar; once the page scrolls it gets compact with a shadow.
 * Phones and tablets get a menu button that opens the links in a card under the bar.
 */
export const Header = ({ data, company }: { data?: HeaderData; company: CompanyData }) => {
  const sectionUrls = data ? [...data.navLinks.map((link) => link.url), data.buttonUrl] : [];
  const active = useActiveSection(sectionUrls);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!data) return null;

  /** The logo scrolls back to the top and drops any "#section" from the address bar, without reloading the page */
  const goHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    window.scrollTo({ top: 0 });
    if (window.location.hash) history.pushState(null, "", window.location.pathname + window.location.search);
  };

  const compact = scrolled || open;
  const contactCurrent = sectionId(data.buttonUrl) === active;
  const contactActiveClass =
    "aria-[current=location]:before:opacity-100 aria-[current=location]:ring-2 aria-[current=location]:ring-[var(--color-copper)] aria-[current=location]:ring-offset-2 aria-[current=location]:ring-offset-[var(--color-bg-header)]";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 mx-auto max-w-[120rem] bg-[var(--color-bg-header)] transition-shadow duration-300 ${
        compact ? "shadow-[0_0.5rem_1.75rem_-1rem_var(--color-shadow-strong)]" : ""
      }`}
    >
      <div
        className={`flex items-center gap-4 px-4 transition-[height] duration-300 sm:px-6 md:px-8 lg:gap-0 lg:pl-[3.875rem] lg:pr-[3.375rem] ${
          compact ? "h-[4.5rem] lg:h-[6.25rem]" : "h-[4.5rem] sm:h-[5.5rem] lg:h-[8.875rem]"
        }`}
      >
        <Link href={data.logoUrl} onClick={goHome} aria-label={data.homeLabel} className="shrink-0 transition-opacity duration-300 hover:opacity-75 lg:-mt-[1rem]">
          <Image
            src={company.logo}
            alt={company.logoAlt}
            width={company.logoWidth}
            height={company.logoHeight}
            preload
            quality={90}
            sizes="(min-width: 1024px) 21vw, 190px"
            className={`h-auto transition-[width] duration-300 ${compact ? "w-[9.5rem] lg:w-[19rem]" : "w-[9.5rem] sm:w-[11.5rem] lg:w-[25.5rem]"}`}
          />
        </Link>

        <nav aria-label={data.mainNavLabel} className="hidden items-center gap-[4.03rem] lg:ml-[5.88rem] lg:flex lg:-translate-y-[0.125rem]">
          {data.navLinks.map((link) => {
            const current = sectionId(link.url) === active;
            return (
              <a key={link.id} href={link.url} aria-current={current ? "location" : undefined} className={linkClass(current)}>
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <a
            href={data.buttonUrl}
            aria-current={contactCurrent ? "location" : undefined}
            className={`${buttonClass} ${contactActiveClass} h-11 gap-2 px-5 text-base max-sm:hidden lg:h-[3.5rem] lg:w-[14.5rem] lg:gap-[0.55rem] lg:px-0 lg:text-[1.5625rem]`}
          >
            {data.buttonText}
            <Icon name="LuArrowRight" className={`${buttonArrow} size-[1.1em]`} strokeWidth={2.4} />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? data.closeMenuLabel : data.openMenuLabel}
            className="grid size-11 place-items-center rounded-full border border-[var(--color-border)] text-[var(--color-ink)] transition-colors hover:border-[var(--color-copper)] hover:text-[var(--color-copper)] lg:hidden"
          >
            <Icon name={open ? "LuX" : "LuMenu"} className="size-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* the page behind the open menu is dimmed, a tap on it closes the menu */}
      <div
        aria-hidden="true"
        onClick={() => setOpen(false)}
        className={`fixed inset-0 top-[4.5rem] -z-10 bg-[var(--color-overlay-menu)] transition-opacity duration-500 lg:hidden ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      {/* phones and tablets: a card under the bar, only as tall as its links */}
      <nav
        id="mobile-menu"
        aria-label={data.mobileNavLabel}
        className={`absolute inset-x-4 top-full mt-2 grid max-h-[calc(100dvh-5.5rem)] overflow-hidden rounded-3xl bg-[var(--color-white)] shadow-[0_1.25rem_3.125rem_-1.25rem_var(--color-shadow-strong)] transition-[grid-template-rows,opacity] duration-500 sm:inset-x-6 md:left-auto md:right-8 md:w-[22rem] lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none invisible grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-y-auto">
          <ul className="flex flex-col px-5 py-4 sm:px-6">
            {data.navLinks.map((link) => {
              const current = sectionId(link.url) === active;
              return (
                <li key={link.id}>
                  <a
                    href={link.url}
                    onClick={() => setOpen(false)}
                    aria-current={current ? "location" : undefined}
                    className={`group flex items-center justify-between border-b border-[var(--color-border)] py-3.5 font-heading text-lg font-semibold transition-colors hover:text-[var(--color-copper)] ${
                      current ? "text-[var(--color-copper)]" : "text-[var(--color-ink)]"
                    }`}
                  >
                    {link.label}
                    <Icon name="LuChevronRight" className="size-4 text-[var(--color-copper)] transition-transform group-hover:translate-x-1" strokeWidth={2.4} />
                  </a>
                </li>
              );
            })}
            <li className="pt-5 sm:hidden">
              <a
                href={data.buttonUrl}
                onClick={() => setOpen(false)}
                aria-current={contactCurrent ? "location" : undefined}
                className={`${buttonClass} ${contactActiveClass} h-12 w-full gap-2 text-base`}
              >
                {data.buttonText}
                <Icon name="LuArrowRight" className={`${buttonArrow} size-[1.1em]`} strokeWidth={2.4} />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
