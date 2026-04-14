
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
        "A peacock's tail feathers can be over 1.5 meters long! They can fly short distances. Baby peachicks can walk and find food from their first day.\n\nHere are the fun facts on how and why they shake their stuff:\n\nThe 'Train Rattle': When a peacock wants to impress a female (a peahen), he shakes his tail 26 times a second, creating a vibrating 'rattle' that acts as a low-frequency sonic boom to grab her attention.\n\nBuilt-in Sensors: The female doesn't just watch; she feels it! A peahen's head crest acts as a sensor, vibrating in perfect harmony with the male's shimmying feathers.\n\nNot Just for Love: That stunning display of 'eyes' (ocelli) is also a defense mechanism, used to intimidate predators by appearing much larger and flashier.\n\nThe Great Molt: They don't keep the display forever. Peacocks naturally shed their entire 60-inch-long train every year after mating season, regrowing them from scratch for the next season.\n\nIt's All an Illusion: The vibrant blues and greens aren't produced by pigment, but by microscopic 'crystal-like structures' on the feathers that reflect light, meaning they are iridescent structural colors.",
      descriptionKn:
        "Amababa y'umurizo w'inkanga ashobora kurenza metero 1.5! Zishobora kuguruka ahantu hato. Ibyana by'inkanga bishobora gutambuka no gushaka ibiryo kuva umunsi wa mbere.\n\nDore ibintu bishimishije ku buryo n'impamvu bazunguzanya amababa yabo:\n\nUrusaku rw'Umurizo: Iyo inkanga igabo ishaka gushimisha inkazi (peahen), izunguzanya umurizo inshuro 26 mu isegonda, bigatuma havamo urusaku ruvuguruzwa rukora nk'uruvumo rw'amajwi rufata umutwe wa peahen.\n\nIbikoresho byo Kumva: Inkazi ntabwo ireba gusa; ibyumva! Umutwe w'inkazi ufite ibikoresho byo kumva, bizunguzwa hamwe n'amababa y'inkanga igabo.\n\nNtabwo ari Urukundo Gusa: Iryo tondeka ry'amaso (ocelli) nabyo ni uburyo bwo kwirinda, bukoreshwa mu gutera ubwoba inyamaswa zirwanya kugira ngo zigaragare nini kandi zishimishije.\n\nGusohora Amababa: Ntibabika amababa igihe cyose. Inkanga zigabo zisohora umurizo wayo wose ungana na santimetero 152 buri mwaka nyuma y'igihe cyo kubyara, hanyuma ukongera gukura neza ku gihembwe gikurikira.\n\nNi Ubushishozi Gusa: Ubururu n'icyatsi kibisi ntabwo bituruka ku rangi ya pigment, ahubwo ni 'imiterere nk'iya kristaline' ku mababa yerekana urumuri, bivuze ko ari amabara ya iridescent y'imiterere.",
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
