"use client";

import { useEffect, useMemo, useState } from "react";

/** id of the landing page section a link points to ("#about" → "about") */
export const sectionId = (url: string) => url.replace(/^#/, "");

/** Keeps track of the section in the middle of the screen, so its link is shown as the current one */
export const useActiveSection = (urls: string[]) => {
  const urlKey = urls.join(",");
  const ids = useMemo(() => urls.map(sectionId), [urlKey]); // eslint-disable-line react-hooks/exhaustive-deps
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    const elements = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => el !== null);
    for (const el of elements) observer.observe(el);

    const onScroll = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && elements.length > 0) {
        setActive(elements[elements.length - 1].id);
      } else if (window.scrollY <= 8 && elements.length > 0) {
        setActive(elements[0].id);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [ids]);

  return active;
};
