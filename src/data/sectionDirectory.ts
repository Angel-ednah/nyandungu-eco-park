import heroPark from "@/assets/nyandungu-gate.jpg";
import peacockImg from "@/assets/peacock-real.jpg";
import topTenImg from "@/assets/3.jpeg";
import trailsImg from "@/assets/18.jpeg";

export interface SectionDirectoryItem {
  id: string;
  title: string;
  titleKn: string;
  description: string;
  image: string;
}

export const sectionDirectory: SectionDirectoryItem[] = [
  {
    id: "nyandungu-info",
    title: "Visitor Guide",
    titleKn: "Amakuru ya Nyandungu",
    description:
      "Discover nature, wildlife, peaceful trails, visitor rules, and useful park information.",
    image: heroPark,
  },
  {
    id: "peacock",
    title: "Peacock Sanctuary",
    titleKn: "Aho Inkanga Ziri",
    description:
      "Discover the beauty of the peafowl and learn their story, behavior, and protection guidelines.",
    image: peacockImg,
  },
  {
    id: "top-ten",
    title: "Top 10 Attractions",
    titleKn: "Ahantu 10 Heza Cyane",
    description:
      "Explore the park's must-see locations, from gardens and ponds to learning spaces and viewpoints.",
    image: topTenImg,
  },
  {
    id: "trails",
    title: "Trails and Wildlife",
    titleKn: "Inzira n'Ibinyabuzima",
    description:
      "Walk Umudobori Lane, discover birds like the Gray Crowned Crane, and explore unique plants.",
    image: trailsImg,
  },
];
