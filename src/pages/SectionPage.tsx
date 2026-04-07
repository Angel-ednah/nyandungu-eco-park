import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackVisit } from "@/lib/visitTracker";
import QRCodeCard from "@/components/QRCodeCard";

import heroPark from "@/assets/hero-park.jpg";
import peacockImg from "@/assets/peacock.jpg";
import trailsImg from "@/assets/trails.jpg";
import gardenImg from "@/assets/garden.jpg";

interface SectionContent {
  title: string;
  titleKn: string;
  image: string;
  highlights: { title: string; titleKn?: string; description: string; descriptionKn?: string }[];
  rules?: string[];
}

const sectionData: Record<string, SectionContent> = {
  "nyandungu-info": {
    title: "Welcome to Discover Nyandungu Eco Park",
    titleKn: "Murakaza neza muri Discover Nyandungu Eco Park",
    image: heroPark,
    highlights: [
      {
        title: "Dining & Refreshments",
        titleKn: "Amafunguro n'Ibinyobwa",
        description: "Enjoy local cuisine and refreshments at the Nyandungu restaurant, surrounded by nature.",
        descriptionKn: "Shakira amafunguro n'ibinyobwa muri resitora ya Nyandungu, mu bidukikije byiza.",
      },
      {
        title: "Ponds / Ibiyaga Bihangano",
        titleKn: "Ibiyaga Bihangano",
        description: "Discover our learning ponds representing Rwanda's major lakes: Kivu, Muhazi, Ihema, and Ruhondo.",
        descriptionKn: "Vumbura ibiyaga byacu by'imyigishirize bigaragaza ibiyaga bikuru by'u Rwanda.",
      },
      {
        title: "Birds / Inyoni",
        titleKn: "Inyoni Nziza Cyane",
        description: "See various beautiful birds in their natural wetland habitat including cranes and kingfishers.",
        descriptionKn: "Reba inyoni nziza zitandukanye mu ishyamba ryazo kamere.",
      },
      {
        title: "Bicycle / Amagare",
        titleKn: "Amagare",
        description: "Enjoy cycling through the park trails. Big bicycles for adults, small bicycles for children.",
        descriptionKn: "Ishimire gutembera ku igare mu nzira za pariki.",
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
    image: peacockImg,
    highlights: [
      {
        title: "Peafowl Family",
        description: "Male: Peacock · Female: Peahen · Young: Peachick. Peafowls are beautiful birds known for their colorful feathers and calm behavior.",
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
    highlights: [
      {
        title: "1. Medicinal Garden",
        titleKn: "Ubusitani bw'Ibiti Bivura",
        description: "Located near the Main Gate, contains almost all plant species found throughout the park. Learn traditional healing practices.",
        descriptionKn: "Hegereye amarembo ya pariki, ufitemo hafi ya mboneka zose z'ibiti bimeze muri iyi pariki.",
      },
      {
        title: "2. Pope's Garden",
        titleKn: "Ubusitani bwa Papa",
        description: "The sacred site where the Pope celebrated Mass during his visit to Rwanda. A living symbol of restoration success.",
        descriptionKn: "Ahantu hashishe amateka aho Papa yasomeye Misa ubwo yageraga mu Rwanda.",
      },
      {
        title: "3. Learning Pond",
        titleKn: "Ikidendezi cy'Imyigishirize",
        description: "Represents Rwanda's four major lakes: Kivu, Muhazi, Ihema, and Ruhondo. An outdoor classroom for ecology.",
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
      },
      {
        title: "African Fish Eagle",
        titleKn: "Inkona",
        description: "Known for its powerful call and fishing skills. Hunts fish from rivers and lakes near the park.",
      },
      {
        title: "Malachite Kingfisher",
        titleKn: "Kingfisher",
        description: "A small, brilliantly colored bird found near the park's water bodies. Known for its rapid diving technique.",
      },
      {
        title: "Papyrus Reed & Water Lily",
        description: "Key wetland plants that support the ecosystem. Papyrus filters water naturally, while water lilies provide habitat for aquatic life.",
      },
    ],
    rules: ["Drive slowly", "Stay on designated trails", "No smoking", "Use dustbins — separate biodegradable waste"],
  },
};

const SectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const section = id ? sectionData[id] : null;
  const baseUrl = window.location.origin;

  useEffect(() => {
    if (id) trackVisit(id);
  }, [id]);

  if (!section) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Section Not Found</h1>
        <Button asChild><Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link></Button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px]">
        <img src={section.image} alt={section.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12">
          <Link to="/" className="text-primary-foreground/70 text-sm hover:text-primary-foreground mb-2 inline-flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">{section.title}</h1>
          {section.titleKn && <p className="text-primary-foreground/80 mt-1">{section.titleKn}</p>}
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {section.highlights.map((h, i) => (
              <div key={i} className="bg-card rounded-xl p-6 shadow-card border border-border animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{h.title}</h3>
                {h.titleKn && <p className="text-sm text-primary font-medium mb-2">{h.titleKn}</p>}
                <p className="text-muted-foreground">{h.description}</p>
                {h.descriptionKn && <p className="text-sm text-muted-foreground/80 mt-2 italic">{h.descriptionKn}</p>}
              </div>
            ))}

            {section.rules && (
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">Rules / Amategeko</h3>
                <ul className="space-y-2">
                  {section.rules.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-destructive flex-shrink-0" /> {r}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* QR Code Sidebar */}
          <div className="space-y-6">
            <QRCodeCard sectionId={id!} sectionName={section.title} baseUrl={baseUrl} />
            <div className="bg-muted rounded-xl p-5 border border-border">
              <QrCode className="h-6 w-6 text-primary mb-2" />
              <h4 className="font-semibold text-sm mb-1">No smartphone?</h4>
              <p className="text-xs text-muted-foreground mb-2">Share this link with anyone:</p>
              <code className="text-xs bg-background p-2 rounded block break-all border">{baseUrl}/section/{id}</code>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionPage;
