import rawData from "@/data/templates.json";
import type { NexorixTemplateData } from "@/types/templates.types";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WhySection } from "@/components/sections/WhySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { sectionSpaceEnd } from "@/components/ui/sectionSpace";

const templateData: NexorixTemplateData = rawData;
const sectionData = templateData.categories.ITSolutions.sections;
const commonData = templateData.common;
const enquiryFormData = sectionData.EnquiryForm?.variants?.ITSolutionsEnquiryForm1;

// The form's subject list: every service card title, then the form's own extra subjects ("General Enquiry" …)
const subjectOptions = [
  ...(sectionData.Services?.variants?.ITSolutionsServices1?.items ?? []).map((item) => item.title),
  ...(enquiryFormData?.extraSubjects ?? []),
];

/*
  One landing page, sections in the order of the design. Each section's id (templates.json) matches the
  menu and footer links ("#about" → id="about").
*/
export default function Home() {
  return (
    <main className={`flex-1 ${sectionSpaceEnd}`}>
      <HeroSection data={sectionData.Hero?.variants?.ITSolutionsHero1} />
      <AboutSection data={sectionData.About?.variants?.ITSolutionsAbout1} />
      <ServicesSection data={sectionData.Services?.variants?.ITSolutionsServices1} />
      <WhySection data={sectionData.Why?.variants?.ITSolutionsWhy1} />
      <TestimonialsSection data={sectionData.Testimonials?.variants?.ITSolutionsTestimonials1} />
      <FaqSection data={sectionData.Faq?.variants?.ITSolutionsFaq1} />
      <ContactSection
        data={sectionData.Contact?.variants?.ITSolutionsContact1}
        form={enquiryFormData}
        company={commonData.company}
        subjectOptions={subjectOptions}
      />
    </main>
  );
}
