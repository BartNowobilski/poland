/* "Ask about this home" → pre-selects the residence in the contact form
   and scrolls to it. Contact listens for the event. */
export const INQUIRE_EVENT = "tj:inquire";

export function requestInquiry(residenceId) {
  window.dispatchEvent(new CustomEvent(INQUIRE_EVENT, { detail: { residenceId } }));
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
}
