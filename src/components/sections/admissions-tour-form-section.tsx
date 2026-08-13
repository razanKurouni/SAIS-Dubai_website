"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight } from "lucide-react";
import type { AdmissionsTourFormSection as AdmissionsTourFormSectionData } from "@/types/sanity";

type AdmissionsTourFormSectionProps = {
  section?: AdmissionsTourFormSectionData;
};

export function AdmissionsTourFormSection({ section }: AdmissionsTourFormSectionProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const fields = section?.fields || [];

  if (!fields.length) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const submittedFields = Object.fromEntries(
      fields.map((field, index) => [field.label || field.name || `Field ${index + 1}`, String(formData.get(field.name || `field-${index}`) || "")]),
    );

    setStatus("sending");

    try {
      const response = await fetch("/api/book-a-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields: submittedFields, website: formData.get("website") }),
      });

      if (!response.ok) throw new Error("Submission failed");

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="admissions-tour-form" aria-label={section?.ariaLabel || "Book a campus tour"}>
      <form className="admissions-tour-form__inner" onSubmit={handleSubmit}>
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
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

        <button className="admissions-tour-form__submit" type="submit" disabled={status === "sending"}>
          <span>{status === "sending" ? "Sending..." : section?.submitLabel || "Submit"}</span>
          <span className="admissions-tour-form__submit-icon" aria-hidden="true">
            <ArrowRight size={17} strokeWidth={3} />
          </span>
        </button>

        {status === "success" ? (
          <p className="admissions-tour-form__success" role="status">
            {section?.successMessage || "Thank you. Your tour request has been received."}
          </p>
        ) : null}
        {status === "error" ? (
          <p className="admissions-tour-form__success" role="alert">
            {section?.errorMessage || "Sorry, your request could not be sent. Please try again."}
          </p>
        ) : null}
      </form>
    </section>
  );
}
