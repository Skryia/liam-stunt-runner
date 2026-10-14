/* =========================================================
   EVENTS DATA — public appearances only (live data).
   Add ONLY confirmed or provisional real events. Example format:

   {
     id: "2027-05-summer-fair",         // unique
     title: "Summer Fair Stunt Show",
     start: "2027-05-14T14:00",         // UK local time (Europe/London). Date-only: "2027-05-14"
     end: "2027-05-14T16:00",           // optional. Date-only end is inclusive: "2027-05-15"
     venue: "Town Park",
     city: "Bristol",
     description: "Two live shows on the main arena.",
     image: "assets/events/summer-fair.jpg",   // optional
     url: "https://example.com/tickets",       // optional booking/event link
     status: "confirmed"                       // "confirmed" | "provisional" | "cancelled"
   }

   Past events are automatically hidden from the upcoming list.
   ========================================================= */
window.EVENTS = [];
