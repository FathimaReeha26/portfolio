/* Publications content. The Research section only renders when this
   list is non-empty. Never invent citations — add only real ones.
   Example entry shape (keep commented until you have a real citation):
   {
     kind: "Paper",
     citation: "[Author list]. [Title]. [Venue, Year].",
     href: "https://[link-to-paper]",
     venue: "[VENUE YEAR]",
   }
*/

export type PublicationKind = "Paper" | "Preprint" | "Poster" | "Talk";

export interface Publication {
  kind: PublicationKind;
  citation: string;
  href: string;
  venue: string;
}

export const publications: Publication[] = [];
