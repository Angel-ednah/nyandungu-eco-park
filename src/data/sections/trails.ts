import type { SectionContent } from "../sectionData";
import docTrailCranes from "@/assets/doc-trail-cranes.jpg";
import docBarbet from "@/assets/doc-barbet.jpg";
import docBarbet2 from "@/assets/doc-barbet2.jpg";
import docKingfisher from "@/assets/doc-kingfisher.jpg";
import docFishEagle from "@/assets/doc-fish-eagle.jpg";
import docFlameTree from "@/assets/doc-flame-tree.jpg";
import docBambooPath from "@/assets/doc-bamboo-path.jpg";

export const trailsSection: SectionContent = {
  title: "Umudobori Lane — Trails & Wildlife",
  titleKn: "Murakaza neza muri Umudobori Lane",
  image: docBambooPath,
  gallery: [docTrailCranes, docBarbet, docBarbet2, docFishEagle, docKingfisher],
  highlights: [
    {
      title: "Path Regulations",
      titleKn: "Amabwiriza yo mu nzira",
      description:
        "Drive your bicycle slowly and stay on the designated trails to prevent accidents and protect the park's ecosystem. Use the correct bicycle size: large for adults, small for children only.",
      descriptionKn:
        "Nyonga igare gahoro kandi ugume mu nzira zabugenewe kugira ngo wirinde impanuka ukanabungabunga urusobe rw'ibinyabuzima. Koresha igare rijyanye n'ikigero cyawe.",
    },
    {
      title: "Keep the Park Clean",
      titleKn: "Gira Isuku muri Pariki",
      description:
        "Smoking is strictly prohibited. Use the dustbins accordingly. Separate biodegradable waste from non-biodegradable waste to keep Nyandungu green.",
      descriptionKn:
        "Birabujijwe kunywa itabi muri pariki. Koresha ibyandani byabugenewe. Tandukanya imyanda ibora n'itabora kugira ngo dukomeze kugira Nyandungu isukuye.",
    },
    {
      title: "The Gray Crowned Crane (Umusambi)",
      titleKn: "Umusambi",
      description:
        "Rwanda's national treasure — symbolizing grace and royalty. Once endangered, now protected and free in Nyandungu.",
      descriptionKn:
        "Umurage w'Igihugu — ni ikimenyetso cy'ubwiza n'icyubahiro. Yari imbonekarime, ubu muri Nyandungu ifite umutekano usesuye.",
      image: docTrailCranes,
      details: [
        {
          label: "Commitment & Loyalty",
          labelKn: "Ubudahemuka n'Ubwizerane",
          text: "A male and female stay together for a lifetime. They are a true symbol of loyalty.",
          textKn:
            "Iyo ingabo n'ingore bimaze guhura, bibana ubuzima bwabo bwose bitaryaryana. Ni ikimenyetso cy'ubudahemuka mu rukundo.",
        },
        {
          label: "Parental Care & Habitat",
          labelKn: "Kurera hamwe n'aho uba",
          text: "They work together perfectly to care for their young and live peacefully in the swamps and wetlands.",
          textKn:
            "Ingabo n'ingore bafatanya mu buryo bw'ubuhanga kurera abana babo, kandi bakunda kuba mu bishanga n'ahantu hari amazi.",
        },
      ],
    },
    {
      title: "Double-Toothed Barbet",
      titleKn: "Ikigumbira",
      description:
        "A rare and special resident of Nyandungu. These birds prefer to live in holes they create in dead trees, transforming what seems lifeless into a beautiful home.",
      descriptionKn:
        "Ni inyoni idasanzwe kandi ni umwihariko wa pariki ya Nyandungu. Zikunda kuba mu mwobo zicukura mu biti byumye, zihindura ibiti byumye ubuturo bwiza bw'umuryango wazo.",
      image: docBarbet,
      details: [
        {
          label: "Shared Responsibility",
          labelKn: "Gufatanya Kurera",
          text: "The male and female form a strong couple. While the female protects the eggs or young, the male ensures the family's safety.",
          textKn:
            "Ingabo n'ingore bafatanya byimazeyo. Mu gihe ingore irinda amagi cyangwa ibyana, ingabo icunga umutekano.",
        },
        {
          label: "Unique Characteristics",
          labelKn: "Umwihariko wayo",
          text: "Known for its strong beak and distinct red and black colors, it plays a vital role in the park's ecosystem.",
          textKn:
            "Izwiho umunwa ukomeye n'amabara y'umutuku n'umukara, ikaba ifite uruhare runini mu kuringaniza urusobe rw'ibinyabuzima.",
        },
      ],
    },
    {
      title: "White-collared Oliveback",
      titleKn: "Inyoni y'Imbonekarime",
      description:
        "Very rare—hard to find even in large forests like Nyungwe or Volcanoes National Park, but it has found a safe home here in Nyandungu.",
      descriptionKn:
        "Ni imbonekarime cyane. Nubwo kuyibona bitoroshye ndetse no mu mashyamba manini nka Nyungwe, yatoranyije Nyandungu nk'ubuhungiro bwayo.",
      details: [
        {
          label: "Strength in Numbers",
          labelKn: "Imbaraga mu Bufatanye",
          text: "These birds live in flocks and fly together in large groups as a defense strategy to escape predators.",
          textKn:
            "Izi nyoni zibera mu matsinda kandi zigurukira hamwe ari nyamwinshi kugira ngo zicike inyamaswa zishaka kuzirya.",
        },
        {
          label: "Nature's Harmony",
          labelKn: "Ubwumvikane bw'ibinyabuzima",
          text: "Their presence in Nyandungu is a sign of a healthy and well-restored urban wetland.",
          textKn:
            "Kuba izi nyoni ziba muri Nyandungu ni ikimenyetso cy'uko iki gishanga cyasubiranyijwe neza.",
        },
      ],
    },
    {
      title: "Giant Kingfisher",
      titleKn: "Umunyamyira",
      description:
        "The largest of all Kingfishers. Its impressive size and powerful beak make it a true master of the water bodies in Nyandungu.",
      descriptionKn:
        "Ni yo nini mu bwoko bwose bw'inyoni zirya amafi. Uburebure bwayo n'umunwa wayo ukomeye bituma iba umami w'amazi muri Nyandungu.",
      image: docKingfisher,
      details: [
        {
          label: "The Patient Hunter",
          labelKn: "Ubwitonzi mu guhiga",
          text: "Famous for its patience—stays still for a long time, waiting for the perfect moment to strike its prey.",
          textKn:
            "Izwiho kwihangana cyane; ishobora kumara igihe kirekire itanyeganyega, itegereje akanya keza ko gufata ifi.",
        },
        {
          label: "Expert Diver",
          labelKn: "Ubuhanga mu kwibira",
          text: "Once it spots a fish, it plunges into the water with high speed and precision, rarely missing its target.",
          textKn:
            "Iyo imaze kubona ifi, yijugunya mu mazi n'umuvuduko mwinshi n'ubuhanga budasanzwe.",
        },
      ],
    },
    {
      title: "African Fish Eagle (Kagoma)",
      titleKn: "Inkora",
      description:
        "A majestic bird, often seen as a symbol of power and leadership. Can catch a fish weighing up to 4kg and fly with it!",
      descriptionKn:
        "Ni inyoni y'ikigirwamfura, ikunze gufatwa nk'ikimenyetso cy'imbaraga n'ubuyobozi. Ishobora gufata ifi ipfunitse ibiro 4, ikayiterura ikaguruka!",
      image: docFishEagle,
      details: [
        {
          label: "Indicator of Ecosystem Health",
          labelKn: "Ikimenyetso cy'ubuzima buzira amahembe",
          text: "Seeing an African Fish Eagle is a sign of a healthy wetland—clean water full of fish shows restoration success.",
          textKn:
            "Kuba iyi nyoni iba muri Nyandungu ni ikimenyetso cy'uko igishanga gifite ubuzima bwiza n'isubiranywa ryagenze neza.",
        },
        {
          label: "The Voice of Africa",
          labelKn: "Ijwi rya Afurika",
          text: "Famous for its iconic high-pitched call, often referred to as 'The Voice of Africa.'",
          textKn:
            "Izwiho ijwi ryayo ryumvikana kure cyane, rikaba ari rimwe mu majwi aranga ishyamba n'amazi muri Afurika.",
        },
      ],
    },
    {
      title: "Top 5 Plants: Flame Tree (Umurinzi)",
      titleKn: "Umurinzi (Erythrina abyssinica)",
      description:
        "Known as the 'Lucky Tree,' traditionally planted at gates of homes to protect the household from harm. A symbol of safety and heritage.",
      descriptionKn:
        "Kizwi nk'Igiti cy'Amahirwe. Umurinzi wakunze guterwa mu marembo y'ingo kugira ngo urinde umuryango. Ni ikimenyetso cy'uburinzi n'umurage w'abanyarwanda.",
      image: docFlameTree,
      details: [
        {
          label: "Healing Properties",
          labelKn: "Igiti Kivura",
          text: "A powerful medicinal plant used in traditional medicine to treat liver diseases and other ailments.",
          textKn:
            "Ni igiti kivura indwara zitandukanye zirimo n'iz'umuyaga n'izindi nk'uko byifashishwa mu buvuzi gakondo.",
        },
        {
          label: "A Gift for Birds",
          labelKn: "Ifunguro ry'Inyoni",
          text: "Its bright red flowers produce nectar that attracts and feeds many bird species in the park.",
          textKn:
            "Utubuto n'indabyo zacyo zitukura bitanga umushongi ukurura inyoni z'ubwoko bwinshi.",
        },
      ],
    },
  ],
  rules: [
    { en: "Drive slowly", kn: "Nyonga gahoro" },
    { en: "Stay on designated trails", kn: "Guma mu nzira zabugenewe" },
    { en: "No smoking", kn: "Kunywa itabi birabujijwe" },
    { en: "Use dustbins — separate biodegradable waste", kn: "Koresha ibyandani — tandukanya imyanda ibora n'itabora" },
  ],
};
