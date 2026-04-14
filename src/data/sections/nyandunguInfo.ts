
import img1 from "@/assets/1.jpeg";

import img9 from "@/assets/9.jpeg";

import img10 from "@/assets/10.jpeg";

import img11 from "@/assets/11.jpeg";

import img14 from "@/assets/14.jpeg";

import img17 from "@/assets/17.jpeg";

import img21 from "@/assets/21.jpeg";

import docBarbet from "@/assets/doc-barbet.jpg";

import docBarbet2 from "@/assets/doc-barbet2.jpg";

import docBicycles from "@/assets/doc-bicycles.jpg";

import docCranes from "@/assets/doc-cranes.jpg";

import docInfoCenter from "@/assets/doc-info-center.jpg";

import docKingfisher from "@/assets/doc-kingfisher.jpg";

import docPeacock from "@/assets/doc-peacock.jpg";

import docPonds from "@/assets/doc-ponds.jpg";

import nyandunguGate from "@/assets/nyandungu-gate.jpg";

import docRestaurantNight from "@/assets/doc-restaurant-night.jpg";

import docRestaurant from "@/assets/doc-restaurant.jpg";

import fishEagle from "@/assets/fish-eagle.jpg";

import kingfisher from "@/assets/kingfisher.jpg";

import peacock from "@/assets/peacock.jpg";
import type { SectionContent } from "../sectionData";

export const nyandunguInfoSection: SectionContent = {
  title: "Welcome to Nyandungu Eco-Park",
  titleKn: "Murakaza neza muri Nyandungu Eco-Park",
  image: nyandunguGate,
  gallery: [docRestaurant, docRestaurantNight, docPonds, docPeacock, docCranes, docBicycles],
  highlights: [
    {
      title: "1. Dining & Refreshments",
      titleKn: "Amafunguro n'Ibinyobwa",
      description:
        "Enjoy local cuisine and refreshments at the Nyandungu restaurant, surrounded by nature.",
      descriptionKn:
        "Shakira amafunguro n'ibinyobwa muri resitora ya Nyandungu, mu bidukikije byiza.",
      image: docRestaurant,
      carouselImages: [img9, img21],
    },
    {
      title: "2. Ponds",
      titleKn: "Ibiyaga Bihangano",
      description:
        "Discover our learning ponds representing Rwanda's major lakes: Kivu, Muhazi, Ihema, and Ruhondo.",
      descriptionKn:
        "Vumbura ibiyaga byacu by'imyigishirize bigaragaza ibiyaga bikuru by'u Rwanda: Kivu, Muhazi, Ihema, na Ruhondo.",
      image: docPonds,
      carouselImages: [img11, img17, img14],
    },
    {
      title: "3. Birds",
      titleKn: "Inyoni Nziza Cyane",
      description:
        "See various beautiful birds in their natural wetland habitat including cranes, peacocks and kingfishers.",
      descriptionKn:
        "Reba inyoni nziza zitandukanye mu ishyamba ryazo kamere harimo ingabo, inkanga n'izindi.",
      image: docCranes,
      carouselImages: [img1, img10, peacock, fishEagle, kingfisher, docBarbet2, docBarbet, docKingfisher],
    },
    {
      title: "4. Bicycle",
      titleKn: "Amagare",
      description:
        "Enjoy cycling through the park trails. Big bicycles for adults, small bicycles for children.",
      descriptionKn:
        "Ishimire gutembera ku igare mu nzira za pariki. Amagare manini ni ay'abakuru, amato ni ay'abana.",
      image: docBicycles,
    },
    {
      title: "Nature in the City",
      titleKn: "Ibidukikije mu Mujyi",
      description:
        "Discover nature, learn, and relax in a peaceful environment right here in the city. Turn your curiosity into a real experience and discover our hidden beauty.",
      descriptionKn:
        "Vumbura ibyiza by'ibidukikije, wige, kandi uruhukire ahantu hatuje mu mujyi hagati. Hindura amatsiko yawe ubumenyi bufatika uze wirebere ubwiza bwihishe muri iyi pariki.",
      details: [
        {
          label: "Explore Our Ecosystems",
          labelKn: "Sura Urusobe rw'Ibinyabuzima",
          text: "Learn about Rwanda's water bodies at our Learning Pond, representing Lake Kivu, Muhazi, Ihema, and Ruhondo.",
          textKn:
            "Ingera ubumenyi ku mazi y'u Rwanda basura Ikiyaga cy'Imyigishirize, kigaragaza Ikiyaga cya Kivu, Muhazi, Ihema, na Ruhondo.",
        },
        {
          label: "Wildlife & Nature",
          labelKn: "Ibinyabuzima",
          text: "See turtles and various birds in their natural wetland habitat.",
          textKn: "Reba utunyamaswa nka tureture n'inyoni zitandukanye mu Gishanga.",
        },
        {
          label: "Fun & Connection",
          labelKn: "Imyidagaduro",
          text: "Perfect for walking, cycling, or creating unforgettable moments as a couple.",
          textKn:
            "Ni ahantu heza ho gutemberera n'amaguru, ku igare, cyangwa kuhagirira ibihe byiza n'uwo ukunda.",
        },
        {
          label: "Family Friendly",
          labelKn: "Abakundana",
          text: "Dedicated children's playground and safe relaxation areas for everyone.",
          textKn:
            "Ni ahantu hatuje, heza, kandi hafite umutekano ku bakundana kuhagirira ibihe bitazibagirana.",
        },
      ],
    },
    {
      title: "Park Fees",
      titleKn: "Ikiguzi cyo Kwinjira",
      description:
        "Entry Fee: 2,000 RWF for Rwandans · 5,000 RWF for African citizens · 20,000 RWF for international visitors. Designed to be affordable for everyone.",
      descriptionKn:
        "Ikiguzi cyo kwinjira: 2,000 RWF ku Banyarwanda · 5,000 RWF ku benegihugu ba Afurika · 20,000 RWF ku bashyitsi mpuzamahanga. Byateguwe kugira ngo buri wese abashe kuhasura.",
      details: [
        {
          label: "Visit Today",
          labelKn: "Sura Pariki",
          text: "Turn your curiosity into a real experience at Nyandungu Eco-Park.",
          textKn: "Hindura amatsiko yawe ibyishimo bifatika usura Nyandungu Eco-Park uyu munsi.",
        },
      ],
    },
  ],
  rules: [
    { en: "No Smoking", kn: "Kunywa itabi birabujijwe" },
    { en: "No Outside Food", kn: "Ntagwinjiza Ibiryo Biturutse Hanze" },
    { en: "No Littering (Plastic Bottles)", kn: "Ntajugunya ya Pulasitiki" },
    { en: "No Pets", kn: "Ntinjiza Amatungo" },
  ],
};
