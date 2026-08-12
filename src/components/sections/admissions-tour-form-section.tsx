"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { AdmissionsTourFormSection as AdmissionsTourFormSectionData } from "@/types/sanity";

type AdmissionsTourFormSectionProps = {
  section?: AdmissionsTourFormSectionData;
};

export function AdmissionsTourFormSection({ section }: AdmissionsTourFormSectionProps) {
  const [submitted, setSubmitted] = useState(false);
  const fields = section?.fields || [];

  if (!fields.length) return null;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.currentTarget.reset();
    setSubmitted(true);
  }

  return (
    <section className="admissions-tour-form" aria-label={section?.ariaLabel || "Book a campus tour"}>
      <form className="admissions-tour-form__inner" onSubmit={handleSubmit}>
        <div className="admissions-tour-form__grid">
          {fields.map((field, index) => {
            const id = `admissions-tour-${field.name || index}`;
            const isTextarea = field.type === "textarea";

            return (
              <label
                className={`admissions-tour-form__field ${isTextarea ? "is-wide" : ""}`.trim()}
                htmlFor={id}
                key={field._key || `${field.name}-${index}`}
              >
                <span className="admissions-tour-form__label">{field.label}</span>
                {isTextarea ? (
                  <span className="admissions-tour-form__control is-textarea">
                    <textarea
                      id={id}
                      name={field.name || `field-${index}`}
                      placeholder={field.placeholder}
                      required={field.required}
                      rows={6}
                    />
                  </span>
                ) : (
                  <span className="admissions-tour-form__control">
                    <input
                      id={id}
                      name={field.name || `field-${index}`}
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  </span>
                )}
              </label>
            );
          })}
        </div>

        <button className="admissions-tour-form__submit" type="submit">
          <span>{section?.submitLabel || "Submit"}</span>
          <span className="admissions-tour-form__submit-icon" aria-hidden="true">
            <ArrowRight size={17} strokeWidth={3} />
          </span>
        </button>

        {submitted ? (
          <p className="admissions-tour-form__success" role="status">
            {section?.successMessage || "Thank you. Your tour request has been received."}
          </p>
        ) : null}
      </form>
    </section>
  );
}
