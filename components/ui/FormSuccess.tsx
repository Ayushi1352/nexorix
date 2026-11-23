import { Icon } from "@/components/ui/Icon";
import { fill } from "@/components/ui/text";

type FormSuccessProps = {
  name: string;
  title: string;
  message: string;
  leaving: boolean;
  visibleFor: number;
  onClose: () => void;
  closeLabel: string;
  className?: string;
};

/** Thank-you card shown after a (dummy) form submission; fades out on its own */
export const FormSuccess = ({ name, title, message, leaving, visibleFor, onClose, closeLabel, className = "" }: FormSuccessProps) => {
  // without a name the ", {name}" part is dropped: "Thank you, {name}!" → "Thank you!"
  const heading = fill(name ? title : title.replace(", {name}", ""), { name });

  return (
    <div
      role="status"
      aria-live="polite"
      className={`relative overflow-hidden rounded-2xl border border-[var(--color-beige)] bg-[var(--color-beige-badge)] py-4 pl-4 pr-11 transition-[opacity,transform] ease-[ease] starting:translate-y-2 starting:opacity-0 lg:rounded-[1.25rem] lg:py-[1.4rem] lg:pl-[1.5rem] lg:pr-[4rem] ${
        // fades in when shown; fades out (duration = fadeFor in useDummySubmit) before it is removed
        leaving ? "-translate-y-1.5 opacity-0 duration-[400ms]" : "duration-[450ms]"
      } ${className}`}
    >
      <div className="flex items-start gap-3 lg:gap-[1.1rem]">
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[var(--color-orange)] text-[var(--color-white)] lg:size-[3.1rem]">
          <Icon name="LuCheck" className="size-[1.125rem] lg:size-[1.6rem]" strokeWidth={2.6} />
        </span>
        <div>
          <p className="font-display text-xl font-semibold text-[var(--color-ink)] lg:text-[1.85rem]">{heading}</p>
          <p className="mt-0.5 font-display text-sm text-[var(--color-text-soft)] lg:mt-[0.3rem] lg:text-[1.3rem]">{message}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label={closeLabel}
        className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full text-[var(--color-ink)] transition-colors hover:bg-[var(--color-orange)] hover:text-[var(--color-white)] lg:right-[1rem] lg:top-[1rem] lg:size-[2.6rem]"
      >
        <Icon name="LuX" className="size-4 lg:size-[1.4rem]" />
      </button>
      {/* time left before the message closes itself */}
      <span
        className="absolute bottom-0 left-0 h-[0.1875rem] w-0 bg-[var(--color-orange)] transition-[width] ease-linear starting:w-full"
        style={{ transitionDuration: `${visibleFor}ms` }}
        aria-hidden="true"
      />
    </div>
  );
};

/** small spinner for the submit button while the dummy request runs */
export const Spinner = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={`animate-spin ${className}`} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.3" strokeWidth="3" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
  </svg>
);
