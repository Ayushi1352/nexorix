import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Golos_Text, Manrope, Poppins } from "next/font/google";
import rawData from "@/data/templates.json";
import type { NexorixTemplateData } from "@/types/templates.types";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import "./globals.css";

// Manrope (titles, labels, menu) and Golos Text (body text) are variable fonts (every weight);
// Poppins (Contact and FAQ headings, the form) only in the weights the design uses
const golos = Golos_Text({ subsets: ["latin"], fallback: ["Arial", "sans-serif"], variable: "--font-golos" });
const manrope = Manrope({ subsets: ["latin"], fallback: ["Arial", "sans-serif"], variable: "--font-manrope" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], fallback: ["Arial", "sans-serif"], variable: "--font-poppins" });

const templateData: NexorixTemplateData = rawData;
const sectionData = templateData.categories.ITSolutions.sections;
const commonData = templateData.common;
const headerData = sectionData.Header?.variants?.ITSolutionsHeader1;

const fontVariables = {
  "--font-primary": commonData.theme.fonts.primary,
  "--font-heading": commonData.theme.fonts.heading,
  "--font-display": commonData.theme.fonts.display,
} as CSSProperties;

export const metadata: Metadata = {
  title: commonData.metadata.title,
  description: commonData.metadata.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={commonData.metadata.lang}
      style={fontVariables}
      data-scroll-behavior="smooth"
      // Root font size: 16px, and from 1024px up it follows the 1920px design (1rem = 1/120 of the screen, at most 16px),
      // so a 1920px screen shows the design 1:1 and 1440px or 1024px show exactly the same layout, only smaller.
      // Every size on the page is in rem, so it all scales together. Menu links scroll smoothly to their section.
      className={`${golos.variable} ${manrope.variable} ${poppins.variable} h-full text-[16px] lg:text-[length:min(16px,calc(100vw/120))] scroll-smooth antialiased [&_:where(a[href],button:not(:disabled),select,summary,[role=button])]:cursor-pointer motion-reduce:scroll-auto motion-reduce:[&_*]:!duration-[0.01ms]`}
    >
      <body className="min-h-full bg-[var(--color-bg-backdrop)] font-sans text-[var(--color-text)] selection:bg-[var(--color-orange)] selection:text-[var(--color-white)]">
        {/*
          The whole site sits in one frame, at most 1920px wide and centred. Up to 1920px it fills the screen, so
          nothing changes; on wider screens or when the browser is zoomed out the page stays in the middle with
          equal space on both sides instead of stretching.
        */}
        <div className="mx-auto flex min-h-screen w-full max-w-[120rem] flex-col overflow-x-clip bg-[var(--color-bg-main)]">
          <Header data={headerData} company={commonData.company} />
          {children}
          <ScrollReveal />
          <Footer data={commonData.Footer} company={commonData.company} />
        </div>
      </body>
    </html>
  );
}
