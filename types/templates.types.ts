export interface ThemeFonts {
  primary: string;
  heading: string;
  display: string;
}

export interface ThemeData {
  fonts: ThemeFonts;
}

export interface SiteMetadataData {
  title: string;
  description: string;
  lang: string;
}

export interface LinkItem {
  id: string;
  label: string;
  url: string;
}

export interface ContactItem {
  id: string;
  /** filled icon on the orange square (contact card) */
  icon: string;
  title: string;
  lines: string[];
  url: string;
}

export interface CompanyData {
  name: string;
  logo: string;
  /** the same logo with white letters, for the dark footer */
  logoLight: string;
  logoAlt: string;
  logoWidth: number;
  logoHeight: number;
  contactItems: ContactItem[];
}

export interface LinkGroup {
  id: string;
  title: string;
  links: LinkItem[];
}

export interface FooterData {
  logoUrl: string;
  homeLabel: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  linkGroups: LinkGroup[];
  contactTitle: string;
  copyrightText: string;
}

export interface HeaderData {
  logoUrl: string;
  homeLabel: string;
  navLinks: LinkItem[];
  buttonText: string;
  buttonUrl: string;
  mainNavLabel: string;
  mobileNavLabel: string;
  openMenuLabel: string;
  closeMenuLabel: string;
}

/** A section title: the first words in ink, the highlighted words (titleAccent) in copper or orange */
export interface SplitTitle {
  titleTop: string;
  titleAccent: string;
}

export interface HeroData extends SplitTitle {
  id: string;
  label: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  image: string;
  imageAlt: string;
}

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
}

export interface AboutData extends SplitTitle {
  id: string;
  label: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  features: FeatureItem[];
  image: string;
  imageAlt: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  /** "\n" starts a new line (kept from 1024px up) */
  text: string;
  image: string;
  imageAlt: string;
}

export interface ServicesData extends SplitTitle {
  id: string;
  label: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  items: ServiceItem[];
}

export interface WhyPoint {
  id: string;
  title: string;
  /** "\n" starts a new line (kept from 1024px up) */
  text: string;
  image: string;
  imageAlt: string;
}

export interface WhyData extends SplitTitle {
  id: string;
  label: string;
  /** "\n" starts a new line (kept from 1024px up) */
  description: string;
  image: string;
  imageAlt: string;
  points: WhyPoint[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  /** "\n" starts a new line (kept from 1024px up) */
  quote: string;
  image: string;
  stars: number;
}

export interface TestimonialsData extends SplitTitle {
  id: string;
  label: string;
  ratingLabel: string;
  previousLabel: string;
  nextLabel: string;
  items: TestimonialItem[];
}

export interface ContactData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  formTitle: string;
  infoTitle: string;
  /** the drawn map opens the link of this company contact item (the address in Google Maps) */
  mapItemId: string;
  mapLabel: string;
}

export interface FormField {
  placeholder: string;
  icon: string;
}

export interface EnquiryFormData {
  fields: {
    name: FormField;
    email: FormField;
    phone: FormField;
    subject: FormField;
    message: FormField;
  };
  /** subjects after the service names in the form's subject list */
  extraSubjects: string[];
  button: string;
  sending: string;
  successTitle: string;
  success: string;
  closeLabel: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData extends SplitTitle {
  id: string;
  label: string;
  description: string;
  image: string;
  imageAlt: string;
  items: FaqItem[];
}

interface Variants<T> {
  variants: Record<string, T>;
}

export interface TemplateComponent {
  key: string;
  component: string;
}

export interface NexorixTemplateData {
  common: {
    theme: ThemeData;
    metadata: SiteMetadataData;
    company: CompanyData;
    Footer: FooterData;
  };
  categories: {
    ITSolutions: {
      sections: {
        Header?: Variants<HeaderData>;
        Hero?: Variants<HeroData>;
        About?: Variants<AboutData>;
        Services?: Variants<ServicesData>;
        Why?: Variants<WhyData>;
        Testimonials?: Variants<TestimonialsData>;
        Contact?: Variants<ContactData>;
        EnquiryForm?: Variants<EnquiryFormData>;
        Faq?: Variants<FaqData>;
      };
      templateComponents: {
        [template: string]: {
          shared: Record<string, string>;
          pages: Record<string, { components: TemplateComponent[] }>;
        };
      };
    };
  };
}
