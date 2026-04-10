import heroPark from "@/assets/hero-park.jpg";
import peacockReal from "@/assets/peacock-real.jpg";
import trailsImg from "@/assets/trails.jpg";
import gardenImg from "@/assets/garden.jpg";
import restaurant from "@/assets/restaurant.jpg";
import restaurantNight from "@/assets/restaurant-night.jpg";
import ponds from "@/assets/ponds.jpg";
import cranes from "@/assets/cranes.jpg";
import bicycles from "@/assets/bicycles.jpg";
import medicinalGarden from "@/assets/medicinal-garden.jpg";
import medicinalPlants from "@/assets/medicinal-plants.jpg";
import popesGarden from "@/assets/popes-garden.jpg";
import bambooTrail from "@/assets/bamboo-trail.jpg";
import bambooPath from "@/assets/bamboo-path.jpg";
import fishEagle from "@/assets/fish-eagle.jpg";
import kingfisher from "@/assets/kingfisher.jpg";
import barbet from "@/assets/barbet.jpg";

export interface SectionHighlight {
  title: string;
  titleKn?: string;
  description: string;
  descriptionKn?: string;
  image?: string;
}

export interface SectionContent {
  title: string;
  titleKn: string;
  image: string;
  gallery?: string[];
  highlights: SectionHighlight[];
  rules?: string[];
}

export const sectionData: Record<string, SectionContent> = {
  "nyandungu-info": {
    title: "Welcome to Discover Nyandungu Eco Park",
    titleKn: "Murakaza neza muri Discover Nyandungu Eco Park",
    image: heroPark,
    gallery: [restaurant, restaurantNight, ponds, cranes, bicycles],
    highlights: [
      {
        title: "Dining & Refreshments",
        titleKn: "Amafunguro n'Ibinyobwa",
        description: "Enjoy local cuisine and refreshments at the Nyandungu restaurant, surrounded by nature.",
        descriptionKn: "Shakira amafunguro n'ibinyobwa muri resitora ya Nyandungu, mu bidukikije byiza.",
        image: restaurant,
      },
      {
        title: "Ponds / Ibiyaga Bihangano",
        titleKn: "Ibiyaga Bihangano",
        description: "Discover our learning ponds representing Rwanda's major lakes: Kivu, Muhazi, Ihema, and Ruhondo.",
        descriptionKn: "Vumbura ibiyaga byacu by'imyigishirize bigaragaza ibiyaga bikuru by'u Rwanda.",
        image: ponds,
      },
      {
        title: "Birds / Inyoni",
        titleKn: "Inyoni Nziza Cyane",
        description: "See various beautiful birds in their natural wetland habitat including cranes and kingfishers.",
        descriptionKn: "Reba inyoni nziza zitandukanye mu ishyamba ryazo kamere.",
        image: cranes,
      },
      {
        title: "Bicycle / Amagare",
        titleKn: "Amagare",
        description: "Enjoy cycling through the park trails. Big bicycles for adults, small bicycles for children.",
        descriptionKn: "Ishimire gutembera ku igare mu nzira za pariki.",
        image: bicycles,
      },
      {
        title: "Nature in the City",
        titleKn: "Ibidukikije mu Mujyi",
        description: "Discover nature, learn, and relax in a peaceful environment right here in the city. Turn your curiosity into a real experience.",
        descriptionKn: "Vumbura ibyiza by'ibidukikije, wige, kandi uruhukire ahantu hatuje mu mujyi hagati.",
      },
    ],
    rules: ["No Smoking", "No Outside Food", "No Littering", "No Pets"],
  },
  peacock: {
    title: "Discover the Beauty of the Peacock",
    titleKn: "Vumbura Ubwiza bw'Ingabo z'Inyoni",
    image: peacockReal,
    gallery: [peacockReal],
    highlights: [
      {
        title: "Peafowl Family",
        description: "Male: Peacock · Female: Peahen · Young: Peachick. Peafowls are beautiful birds known for their colorful feathers and calm behavior.",
        image: peacockReal,
      },
      {
        title: "Origin in the Park",
        description: "Peafowls were introduced by local community members after the restoration of the park. They are now part of Nyandungu's biodiversity.",
      },
      {
        title: "Why Protection is Important",
        description: "Prevents disease transmission between humans and animals. Maintains natural behavior. Shelter helps them adapt and supports feeding.",
      },
      {
        title: "Fun Facts",
        description: "A peacock's tail feathers can be over 1.5 meters long! They can fly short distances. Baby peachicks can walk and find food from their first day.",
      },
    ],
    rules: ["Do not feed the peacock", "Keep distance", "Do not cross barriers", "Do not make noise", "Photos only from safe distance"],
  },
  "top-ten": {
    title: "Top 10 Sites to Visit in Nyandungu",
    titleKn: "Ahantu 10 Heza Cyane ho Gusura muri Nyandungu",
    image: gardenImg,
    gallery: [medicinalGarden, popesGarden, bambooTrail, bambooPath, ponds],
    highlights: [
      {
        title: "1. Medicinal Garden",
        titleKn: "Ubusitani bw'Ibiti Bivura",
        description: "Located near the Main Gate, contains almost all plant species found throughout the park. Learn traditional healing practices.",
        descriptionKn: "Hegereye amarembo ya pariki, ufitemo hafi ya mboneka zose z'ibiti bimeze muri iyi pariki.",
        image: medicinalGarden,
      },
      {
        title: "2. Pope's Garden",
        titleKn: "Ubusitani bwa Papa",
        description: "The sacred site where the Pope celebrated Mass during his visit to Rwanda. A living symbol of restoration success.",
        descriptionKn: "Ahantu hashishe amateka aho Papa yasomeye Misa ubwo yageraga mu Rwanda.",
        image: popesGarden,
      },
      {
        title: "3. Learning Pond",
        titleKn: "Ikidendezi cy'Imyigishirize",
        description: "Represents Rwanda's four major lakes: Kivu, Muhazi, Ihema, and Ruhondo. An outdoor classroom for ecology.",
        image: ponds,
      },
      {
        title: "4. Amphitheatre",
        titleKn: "Urubuga",
        description: "A vibrant performance space surrounded by nature, hosting cultural events and gatherings.",
      },
      {
        title: "5. Bamboo Forest",
        titleKn: "Ishyamba ry'Imigano",
        description: "A peaceful area with towering bamboo that creates a natural canopy. Cool and shaded walking paths.",
        image: bambooTrail,
      },
      {
        title: "6. Jogging Track",
        titleKn: "Inzira yo Kwiruka",
        description: "Stay fit while enjoying nature with the park's designated jogging paths through scenic wetlands.",
      },
      {
        title: "7. Children's Playground",
        titleKn: "Ikibuga cy'Abana",
        description: "Dedicated children's playground with safe recreational areas for families.",
      },
      {
        title: "8. Bird Watching Point",
        titleKn: "Ahareba Inyoni",
        description: "Observe diverse bird species in their natural habitat from dedicated viewing platforms.",
        image: cranes,
      },
      {
        title: "9. Wetland Boardwalk",
        titleKn: "Uruhanda rw'Igishanga",
        description: "Walk above the wetlands on wooden boardwalks, experiencing the ecosystem up close.",
      },
      {
        title: "10. Sunset Viewpoint",
        titleKn: "Ahareba Izuba Rirenga",
        description: "The perfect spot to end your visit, watching the sun set over the restored wetlands.",
      },
    ],
  },
  trails: {
    title: "Umudobori Lane — Trails & Wildlife",
    titleKn: "Murakaza neza muri Umudobori Lane",
    image: trailsImg,
    gallery: [cranes, fishEagle, kingfisher, barbet, bambooPath],
    highlights: [
      {
        title: "Path Regulations",
        titleKn: "Amabwiriza yo mu nzira",
        description: "Drive your bicycle slowly and stay on designated trails. Large bicycles for adults, small for children only.",
        descriptionKn: "Nyonga igare gahoro kandi ugume mu nzira zabugenewe.",
      },
      {
        title: "The Gray Crowned Crane (Umusambi)",
        titleKn: "Umusambi",
        description: "Rwanda's national treasure — symbolizing grace and royalty. Once endangered, now protected and free in Nyandungu. Males and females stay together for life.",
        descriptionKn: "Umurage w'Igihugu — ni ikimenyetso cy'ubwiza n'icyubahiro.",
        image: cranes,
      },
      {
        title: "African Fish Eagle",
        titleKn: "Inkona",
        description: "Known for its powerful call and fishing skills. Hunts fish from rivers and lakes near the park.",
        image: fishEagle,
      },
      {
        title: "Malachite Kingfisher",
        titleKn: "Kingfisher",
        description: "A small, brilliantly colored bird found near the park's water bodies. Known for its rapid diving technique.",
        image: kingfisher,
      },
      {
        title: "Double-Toothed Barbet",
        titleKn: "Barbet",
        description: "A striking red and black bird found in the park's forests. Known for its distinctive call and colorful plumage.",
        image: barbet,
      },
      {
        title: "Papyrus Reed & Water Lily",
        description: "Key wetland plants that support the ecosystem. Papyrus filters water naturally, while water lilies provide habitat for aquatic life.",
        image: medicinalPlants,
      },
    ],
    rules: ["Drive slowly", "Stay on designated trails", "No smoking", "Use dustbins — separate biodegradable waste"],
  },
};
