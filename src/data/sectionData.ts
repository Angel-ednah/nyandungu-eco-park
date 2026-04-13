import { nyandunguInfoSection } from "./sections/nyandunguInfo";

import { peacockSection } from "./sections/peacock";

import { topTenSection } from "./sections/topTen";

import { trailsSection } from "./sections/trails";

export interface SectionHighlight {
  title: string;
  titleKn?: string;
  description: string;
  descriptionKn?: string;
  image?: string;
  carouselImages?: string[];
  details?: { label: string; labelKn?: string; text: string; textKn?: string }[];
}

export interface SectionContent {
  title: string;
  titleKn: string;
  image: string;
  gallery?: string[];
  highlights: SectionHighlight[];
  rules?: { en: string; kn: string }[];
}

export const sectionData: Record<string, SectionContent> = {
  "nyandungu-info": nyandunguInfoSection,
  peacock: peacockSection,
  "top-ten": topTenSection,
  trails: trailsSection,
};
