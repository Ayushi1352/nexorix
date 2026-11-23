"use client";

import { useState } from "react";
import type { FaqItem } from "@/types/templates.types";
import { Icon } from "@/components/ui/Icon";

/** One answer open at a time (the first one to start with); the open question gets the orange bar */
export const FaqAccordion = ({ items }: { items: FaqItem[] }) => {
  const [open, setOpen] = useState(items[0]?.id ?? "");

  return (
    <ul className="grid gap-3 lg:gap-[1.125rem]">
      {items.map((item, index) => {
        const isOpen = open === item.id;
        return (
          <li
            key={item.id}
            data-reveal
            data-reveal-delay={index * 80}
            className={`overflow-hidden rounded-xl border-[0.125rem] bg-[var(--color-white)] transition-colors duration-300 lg:rounded-[0.875rem] ${
              isOpen ? "border-transparent" : "border-[var(--color-border)] hover:border-[var(--color-orange)]"
            }`}
          >
            <h3>
              <button
                type="button"
                id={`faq-question-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
                onClick={() => setOpen(isOpen ? "" : item.id)}
                className={`flex min-h-[3.75rem] w-full items-center justify-between gap-4 px-4 py-3 text-left font-sans text-[1rem] font-bold leading-snug transition-colors duration-300 sm:px-5 sm:text-[1.1rem] lg:min-h-[5rem] lg:pb-[0.5rem] lg:pl-[2.125rem] lg:pr-[2.25rem] lg:pt-[0.25rem] lg:text-[1.86rem] lg:tracking-[-0.01em] ${
                  isOpen ? "bg-[var(--color-orange-deep)] text-[var(--color-white)] hover:bg-[var(--color-orange-dark)]" : "text-[var(--color-ink)] hover:text-[var(--color-orange-deep)]"
                }`}
              >
                {item.question}
                <Icon name={isOpen ? "LuMinus" : "LuPlus"} className="size-6 shrink-0 lg:size-[2.1rem]" strokeWidth={2} />
              </button>
            </h3>
            <div
              id={`faq-answer-${item.id}`}
              role="region"
              aria-labelledby={`faq-question-${item.id}`}
              className={`grid transition-[grid-template-rows] duration-500 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="bg-[var(--color-bg-faq-answer)] px-4 pb-5 pt-4 font-sans text-[0.95rem] leading-[1.6] text-[var(--color-text)] sm:px-5 lg:px-[2.125rem] lg:pb-[1.86rem] lg:pt-[0.9rem] lg:text-[1.46rem] lg:leading-[2.3rem]">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};
