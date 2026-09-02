"use client";

import { useEffect, useId, useState, type FormEvent } from "react";
import { ArrowRight, X } from "lucide-react";
import type { CalendarDownloadSection as RegistrationCta } from "@/types/sanity";

type AdmissionsRegistrationPopupProps = {
  section?: RegistrationCta | null;
};

export function AdmissionsRegistrationPopup({ section }: AdmissionsRegistrationPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fields = {
      "Parent/Guardian First Name": String(formData.get("parentFirstName") || ""),
      "Parent/Guardian Surname": String(formData.get("parentSurname") || ""),
      Email: String(formData.get("email") || ""),
      "Phone Number": String(formData.get("phone") || ""),
      "Student Full Name": String(formData.get("studentName") || ""),
      "Student Date of Birth": String(formData.get("studentDateOfBirth") || ""),
      "Grade Applying For": String(formData.get("grade") || ""),
      "Current School": String(formData.get("currentSchool") || ""),
      Message: String(formData.get("message") || ""),
    };

    setStatus("sending");
    try {
      const response = await fetch("/api/book-a-tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "admissions-registration", fields, website: formData.get("website") }),
      });
      if (!response.ok) throw new Error("Submission failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const closePopup = () => {
    setIsOpen(false);
    setStatus("idle");
  };

  return (
    <>
      <section className="calendar-download-section admissions-registration-cta">
        <div className="calendar-download-section__inner">
          <p className="calendar-download-section__text">
            {section?.text || "Start the Pre-Registration Process Now"}
          </p>
          <button className="calendar-download-section__btn" type="button" onClick={() => setIsOpen(true)}>
            <span>{section?.buttonLabel || "Start Now"}</span>
            <span className="calendar-download-section__btn-icon" aria-hidden="true">
              <ArrowRight size={18} strokeWidth={2.5} />
            </span>
          </button>
        </div>
      </section>

      {isOpen ? (
        <div className="admissions-registration-modal" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closePopup();
        }}>
          <div className="admissions-registration-modal__dialog" role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <button className="admissions-registration-modal__close" type="button" onClick={closePopup} aria-label="Close registration form">
              <X size={24} />
            </button>
            <div className="admissions-registration-modal__header">
              <h2 id={titleId}>Pre-Registration Form</h2>
              <p>Please complete the form below and our Registration Team will contact you.</p>
            </div>
            <form className="admissions-registration-form" onSubmit={handleSubmit}>
              <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" hidden />
              <div className="admissions-registration-form__grid">
                <label><span>Parent/Guardian First Name</span><input name="parentFirstName" autoComplete="given-name" required /></label>
                <label><span>Parent/Guardian Surname</span><input name="parentSurname" autoComplete="family-name" required /></label>
                <label><span>Email</span><input name="email" type="email" autoComplete="email" required /></label>
                <label><span>Phone Number</span><input name="phone" type="tel" autoComplete="tel" required /></label>
                <label><span>Student Full Name</span><input name="studentName" required /></label>
                <label><span>Student Date of Birth</span><input name="studentDateOfBirth" type="date" required /></label>
                <label><span>Grade Applying For</span><input name="grade" required /></label>
                <label><span>Current School</span><input name="currentSchool" required /></label>
                <label className="is-wide"><span>Message</span><textarea name="message" rows={4} /></label>
              </div>
              <button className="admissions-registration-form__submit" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Submit Registration"}
                <ArrowRight size={18} aria-hidden="true" />
              </button>
              {status === "success" ? <p className="admissions-registration-form__status is-success" role="status">Thank you. Your registration request has been sent successfully.</p> : null}
              {status === "error" ? <p className="admissions-registration-form__status is-error" role="alert">Sorry, the form could not be sent. Please try again.</p> : null}
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
