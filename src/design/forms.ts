/**
 * Form field definitions. The wording of messages and the recipient address
 * are edited in the CMS (Book a Tour page → Tour Form); the fields themselves
 * are part of the site's code.
 */
import type { AdmissionsTourFormField } from "@/types/sanity";

export const BOOK_TOUR_FORM_ARIA_LABEL = "Book a campus tour";

export const BOOK_TOUR_FORM_FIELDS: AdmissionsTourFormField[] = [
  {
    "label": "Name",
    "name": "name",
    "type": "text",
    "required": true
  },
  {
    "label": "Surname",
    "name": "surname",
    "type": "text",
    "required": true
  },
  {
    "label": "Phone Number",
    "name": "phone",
    "type": "tel",
    "required": true
  },
  {
    "label": "Email",
    "name": "email",
    "type": "email",
    "required": true
  },
  {
    "label": "Preferred Visit Date",
    "name": "preferredVisitDate",
    "type": "date",
    "required": true
  },
  {
    "label": "Time",
    "name": "preferredTime",
    "type": "time",
    "required": true
  },
  {
    "label": "Message",
    "name": "message",
    "type": "textarea",
    "required": true
  }
];
