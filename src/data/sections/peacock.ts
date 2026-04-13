
import docPeacockDisplay from "@/assets/doc-peacock-display.jpg";

import docPeacockGrass from "@/assets/doc-peacock-grass.jpg";

import docPeacock from "@/assets/doc-peacock.jpg";
import type { SectionContent } from "../sectionData";

export const peacockSection: SectionContent = {
  title: "Discover the Beauty of the Peacock",
  titleKn: "Vumbura Ubwiza bw'Inkanga",
  image: docPeacockDisplay,
  gallery: [docPeacockDisplay, docPeacockGrass, docPeacock],
  highlights: [
    {
      title: "Peafowl Family",
      titleKn: "Umuryango w'Inkanga",
      description:
        "Male: Peacock · Female: Peahen · Young: Peachick. Peafowls are beautiful birds known for their colorful feathers and calm behavior.",
      descriptionKn:
        "Ingabo: Peacock · Ingore: Peahen · Umwana: Peachick. Inkanga ni inyoni nziza zizwiho amabara menshi y'amababa n'imyitwarire ituje.",
      image: docPeacockDisplay,
    },
    {
      title: "Origin in the Park",
      titleKn: "Inkomoko muri Pariki",
      description:
        "Peafowls were introduced by local community members after the restoration of the park. They are now part of Nyandungu's biodiversity.",
      descriptionKn:
        "Inkanga zashyizwe muri pariki n'abaturage nyuma y'isubiranywa rya pariki. Ubu ni igice cy'urusobe rw'ibinyabuzima bya Nyandungu.",
    },
    {
      title: "Why Protection is Important",
      titleKn: "Impamvu Kubirinda ari Ngombwa",
      description:
        "Prevents disease transmission between humans and animals. Maintains natural behavior. Shelter helps them adapt and supports feeding.",
      descriptionKn:
        "Birinda kwanduza indwara hagati y'abantu n'inyamaswa. Kubungabunga imyitwarire kamere. Ubuhungiro bubafasha kumenyera no kubona amafunguro.",
      image: docPeacockGrass,
    },
    {
      title: "Fun Facts",
      titleKn: "Ibintu Bishimishije",
      description:
        "A peacock's tail feathers can be over 1.5 meters long! They can fly short distances. Baby peachicks can walk and find food from their first day.",
      descriptionKn:
        "Amababa y'umurizo w'inkanga ashobora kurenza metero 1.5! Zishobora kuguruka ahantu hato. Ibyana by'inkanga bishobora gutambuka no gushaka ibiryo kuva umunsi wa mbere.",
    },
  ],
  rules: [
    { en: "Do not feed the peacock", kn: "Ntuzihe ibiryo" },
    { en: "Keep distance", kn: "Sigara kure" },
    { en: "Do not cross barriers", kn: "Nturenga imbago" },
    { en: "Do not make noise", kn: "Ntusakuze" },
    { en: "Photos only from safe distance", kn: "Amafoto uhereye kure gusa" },
  ],
};
