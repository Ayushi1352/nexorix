"use client";

import { useState } from "react";
import type { EnquiryFormData, FormField } from "@/types/templates.types";
import { useDummySubmit } from "@/components/ui/useDummySubmit";
import { Icon } from "@/components/ui/Icon";
import { FormSuccess, Spinner } from "@/components/ui/FormSuccess";
import { buttonArrow, submitClass } from "@/components/ui/buttonStyles";

/** White fields with a light grey border and the design's icon in front */
const base =
  "w-full appearance-none rounded-[0.625rem] border-[0.11rem] border-[var(--color-border-field)] bg-[var(--color-white)] pl-12 pr-4 font-display text-[0.95rem] text-[var(--color-ink)] outline-none transition-colors placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-orange)] lg:pl-[4.75rem] lg:pr-[1.5rem] lg:text-[1.25rem]";
const field = `${base} h-[3.5rem] lg:h-[4.25rem]`;
const iconClass = "pointer-events-none absolute left-4 size-5 text-[var(--color-ink-soft)] lg:left-[1.4rem] lg:size-[1.75rem]";

const Field = ({ name, type = "text", field: data, autoComplete }: { name: string; type?: string; field: FormField; autoComplete?: string }) => (
  <label className="relative flex items-center">
    <Icon name={data.icon} className={iconClass} strokeWidth={1.6} />
    <input name={name} type={type} required placeholder={data.placeholder} aria-label={data.placeholder} autoComplete={autoComplete} className={field} />
  </label>
);

const SelectField = ({ name, field: data, options }: { name: string; field: FormField; options: string[] }) => {
  const [value, setValue] = useState("");

  return (
    <label className="relative flex items-center">
      <Icon name={data.icon} className={iconClass} strokeWidth={1.6} />
      <select
        name={name}
        value={value}
        required
        onChange={(event) => setValue(event.target.value)}
        aria-label={data.placeholder}
        className={`${field} cursor-pointer pr-12 ${value === "" ? "text-[var(--color-text-muted)]" : ""}`}
      >
        <option value="" disabled>
          {data.placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option} className="text-[var(--color-ink)]">
            {option}
          </option>
        ))}
      </select>
      <Icon name="LuChevronDown" className="pointer-events-none absolute right-4 size-5 text-[var(--color-ink)] lg:right-[1.85rem] lg:size-[1.6rem]" strokeWidth={2} />
    </label>
  );
};

/** The "Send Us a Message" form; dummy submit with a thank-you message in place of the button */
export const EnquiryForm = ({ data, subjectOptions }: { data?: EnquiryFormData; subjectOptions: string[] }) => {
  const submit = useDummySubmit();
  if (!data) return null;
  const { fields } = data;

  // remounting the form (via key) after each send clears every field, including the select
  return (
    <form
      key={submit.round}
      onSubmit={submit.onSubmit}
      onInput={submit.onInput}
      aria-busy={submit.sending}
      className="mt-6 grid gap-4 sm:grid-cols-2 lg:mt-[2.6rem] lg:gap-x-[2rem] lg:gap-y-[1.625rem]"
    >
      <Field name="name" field={fields.name} autoComplete="name" />
      <Field name="email" type="email" field={fields.email} autoComplete="email" />
      <Field name="phone" type="tel" field={fields.phone} autoComplete="tel" />
      <SelectField name="subject" field={fields.subject} options={subjectOptions} />
      <label className="relative block sm:col-span-2">
        <Icon name={fields.message.icon} className={`${iconClass} top-4 lg:top-[1.35rem]`} strokeWidth={1.6} />
        <textarea
          name="message"
          required
          rows={5}
          placeholder={fields.message.placeholder}
          aria-label={fields.message.placeholder}
          className={`${base} h-36 resize-y pt-3.5 lg:h-[11.31rem] lg:pt-[1.2rem]`}
        />
      </label>
      {submit.showMessage ? (
        <FormSuccess
          name={submit.name}
          title={data.successTitle}
          message={data.success}
          leaving={submit.status === "leaving"}
          visibleFor={submit.visibleFor}
          onClose={submit.dismiss}
          closeLabel={data.closeLabel}
          className="sm:col-span-2 lg:mt-[0.5rem]"
        />
      ) : (
        <button
          type="submit"
          disabled={submit.sending}
          className={`${submitClass} mt-1 h-14 gap-3 text-[0.95rem] tracking-[0.08em] sm:col-span-2 lg:mt-[0.5rem] lg:h-[4.125rem] lg:gap-[0.9rem] lg:text-[1.375rem]`}
        >
          {submit.sending ? (
            <>
              <Spinner className="size-5 lg:size-[1.6rem]" />
              {data.sending}
            </>
          ) : (
            <>
              {data.button}
              <Icon name="LuArrowRight" className={`${buttonArrow} size-5 lg:size-[1.6rem]`} strokeWidth={2.2} />
            </>
          )}
        </button>
      )}
    </form>
  );
};
