"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { TestimonialItem, TestimonialsData } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";
import { CornerAccent } from "@/components/ui/LineArt";
import { roundFilledClass, roundOutlineClass } from "@/components/ui/buttonStyles";
import { fill } from "@/components/ui/text";

const AUTOPLAY_MS = 6000;

/** Photo on the left; name, role, stars, a short orange line and the quote on the right; quote marks in the corner */
const Card = ({ item, ratingLabel, className = "" }: { item: TestimonialItem; ratingLabel: string; className?: string }) => (
  <figure
    className={`relative flex flex-col gap-5 rounded-[1.1rem] border border-[var(--color-border)] bg-[var(--color-white)] p-5 shadow-[0_1rem_2rem_-1.4rem_var(--color-shadow-strong)] sm:flex-row sm:gap-7 sm:p-7 lg:h-[24.375rem] lg:gap-[2.44rem] lg:pb-0 lg:pl-[2.81rem] lg:pr-[2rem] lg:pt-[2.75rem] ${className}`}
  >
    <Icon name="RiDoubleQuotesR" className="absolute right-5 top-4 size-14 text-[var(--color-quote)] sm:right-7 sm:top-6 lg:right-[2.7rem] lg:top-[1.9rem] lg:size-[5.6rem]" />
    <div className="relative aspect-[251/297] w-[8.5rem] shrink-0 overflow-hidden rounded-[0.8rem] sm:w-[10rem] lg:w-[15.69rem] lg:rounded-[0.9rem]">
      <Image src={item.image} alt={item.name} fill quality={90} sizes="(min-width: 1024px) 14vw, 160px" className="object-cover" />
    </div>
    <div className="relative min-w-0">
      <figcaption>
        <span className="block font-heading text-[1.4rem] font-bold leading-tight tracking-[-0.01em] text-[var(--color-ink)] lg:mt-[0.8rem] lg:text-[2.08rem] lg:leading-none">{item.name}</span>
        <span className="mt-1 block font-sans text-[0.95rem] text-[var(--color-text-soft)] lg:mt-[0.78rem] lg:text-[1.42rem] lg:leading-none">{item.role}</span>
      </figcaption>
      <span className="mt-3 flex gap-1 text-[var(--color-orange)] lg:mt-[1.1rem] lg:gap-[0.17rem]" role="img" aria-label={fill(ratingLabel, { stars: item.stars })}>
        {Array.from({ length: item.stars }, (_, n) => (
          <Icon key={n} name="FaStar" className="size-[1.1rem] lg:size-[1.78rem]" />
        ))}
      </span>
      <span aria-hidden="true" className="mt-3.5 block h-[0.2rem] w-12 bg-[var(--color-orange)] lg:mt-[1.41rem] lg:h-[0.25rem] lg:w-[4.75rem]" />
      {/* the design's line breaks (\n in the JSON) are kept from 1024px up */}
      <blockquote className="mt-3.5 font-sans text-[0.95rem] leading-[1.6] text-[var(--color-text)] lg:mt-[0.92rem] lg:whitespace-pre-line lg:text-[1.25rem] lg:leading-[2.02rem]">
        {item.quote}
      </blockquote>
    </div>
  </figure>
);

/**
 * Two testimonials side by side from 1024px up (one on phones and tablets). The arrows move one testimonial at a
 * time and loop; it also moves on by itself, and stops while the mouse or keyboard focus is on it.
 */
export const TestimonialSlider = ({ data }: { data: TestimonialsData }) => {
  const { items } = data;
  const count = items.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (step: number) => setIndex((current) => (current + step + count) % count);

  useEffect(() => {
    if (paused || count < 2) return;
    const timer = window.setTimeout(() => setIndex((current) => (current + 1) % count), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused, count]);

  if (count === 0) return null;
  // the testimonial shown first, and the one next to it (from 1024px up)
  const shown = count > 1 ? [items[index], items[(index + 1) % count]] : [items[index]];

  return (
    <div
      data-reveal
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="relative">
        <CornerAccent
          corner="top-left"
          className="-left-2 -top-2 h-14 w-[4.5rem] rounded-tl-[1.1rem] border-[0.25rem] border-[var(--color-orange)] lg:-left-[0.25rem] lg:-top-[0.44rem] lg:h-[5.13rem] lg:w-[6.5rem] lg:rounded-tl-[1.3rem] lg:border-[0.31rem]"
        />
        <CornerAccent
          corner="bottom-right"
          className="-bottom-2 -right-2 h-14 w-[4.5rem] rounded-br-[1.1rem] border-[0.25rem] border-[var(--color-orange)] lg:-bottom-[0.19rem] lg:-right-[0.06rem] lg:h-[4.88rem] lg:w-[6.75rem] lg:rounded-br-[1.3rem] lg:border-[0.31rem]"
        />
        <div className="relative grid gap-[1.375rem] lg:grid-cols-2" aria-live="polite">
          {shown.map((item, n) => (
            <Card
              // a new key on every move replays the fade-in
              key={`${index}-${item.id}`}
              item={item}
              ratingLabel={data.ratingLabel}
              className={`transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] starting:translate-y-4 starting:opacity-0 ${n > 0 ? "hidden lg:flex" : ""}`}
            />
          ))}
        </div>
      </div>

      {count > 1 && (
        <div className="mt-10 flex items-center justify-center gap-4 lg:mt-[3rem] lg:gap-[1.44rem]">
          <button type="button" aria-label={data.previousLabel} onClick={() => go(-1)} className={`${roundOutlineClass} size-12 lg:size-[4.44rem]`}>
            <Icon name="LuArrowLeft" className="size-5 lg:size-[1.6rem]" strokeWidth={2} />
          </button>
          <button type="button" aria-label={data.nextLabel} onClick={() => go(1)} className={`${roundFilledClass} size-12 lg:size-[4.44rem]`}>
            <Icon name="LuArrowRight" className="size-5 lg:size-[1.6rem]" strokeWidth={2} />
          </button>
        </div>
      )}
    </div>
  );
};
