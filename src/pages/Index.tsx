import topTenImg from "@/assets/3.jpeg";
import trailsImg from "@/assets/18.jpeg";
import docBambooPath from "@/assets/doc-bamboo-path.jpg";
import docBambooTrail from "@/assets/doc-bamboo-trail.jpg";
import docBarbet from "@/assets/doc-barbet.jpg";
import docBarbet2 from "@/assets/doc-barbet2.jpg";
import docBicycles from "@/assets/doc-bicycles.jpg";
import docCranes from "@/assets/doc-cranes.jpg";
import docFishEagle from "@/assets/doc-fish-eagle.jpg";
import docFlameTree from "@/assets/doc-flame-tree.jpeg";
import docGreatLakes from "@/assets/doc-great-lakes.jpg";
import docInfoCenter from "@/assets/doc-info-center.jpg";
import docKingfisher from "@/assets/doc-kingfisher.jpg";
import docMedicinalGarden from "@/assets/doc-medicinal-garden.jpg";
import docPeacockDisplay from "@/assets/doc-peacock-display.jpg";
import docPeacockGrass from "@/assets/doc-peacock-grass.jpg";
import docPeacock from "@/assets/doc-peacock.jpg";
import docPlayground from "@/assets/doc-playground.jpg";
import docPonds from "@/assets/doc-ponds.jpg";
import docPopesGarden from "@/assets/doc-popes-garden.jpg";
import docRestaurantNight from "@/assets/doc-restaurant-night.jpg";
import docRestaurant from "@/assets/doc-restaurant.jpg";
import docTrailCranes from "@/assets/doc-trail-cranes.jpg";
import heroPark from "@/assets/nyandungu-gate.jpg";
import peacockImg from "@/assets/peacock-real.jpg";

import SectionCard from "@/components/SectionCard";
import { SITE_NAME, useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";

import { Bird, Leaf, Map, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const sections = [
  {
    id: "nyandungu-info",
    title: "Visitor Guide",
    titleKn: "Amakuru ya Nyandungu",
    description: "Discover nature, wildlife, peaceful trails, visitor rules, and useful park information.",
    image: heroPark,
  },
  {
    id: "peacock",
    title: "Peacock Sanctuary",
    titleKn: "Aho Inkanga Ziri",
    description: "Discover the beauty of the peafowl and learn their story, behavior, and protection guidelines.",
    image: peacockImg,
  },
  {
    id: "top-ten",
    title: "Top 10 Attractions",
    titleKn: "Ahantu 10 Heza Cyane",
    description: "Explore the park's must-see locations, from gardens and ponds to learning spaces and viewpoints.",
    image: topTenImg,
  },
  {
    id: "trails",
    title: "Trails and Wildlife",
    titleKn: "Inzira n'Ibinyabuzima",
    description: "Walk Umudobori Lane, discover birds like the Gray Crowned Crane, and explore unique plants.",
    image: trailsImg,
  },
];

const carouselImages = [
  { src: heroPark, alt: "Nyandungu Eco Park main gate" },
  { src: peacockImg, alt: "Peacock display at Nyandungu Eco Park" },
  { src: topTenImg, alt: "Top attractions at Nyandungu Eco Park" },
  { src: trailsImg, alt: "Nature trail at Nyandungu Eco Park" },
  { src: docMedicinalGarden, alt: "Medicinal garden" },
  { src: docPopesGarden, alt: "Pope's Garden" },
  { src: docBambooTrail, alt: "Bamboo trail" },
  { src: docGreatLakes, alt: "Great Lakes exhibit" },
  { src: docPlayground, alt: "Children's playground" },
  { src: docInfoCenter, alt: "Information center" },
  { src: docPeacockDisplay, alt: "Peacock sanctuary" },
  { src: docPeacockGrass, alt: "Peacock in natural habitat" },
  { src: docPeacock, alt: "Peacock close-up" },
  { src: docRestaurant, alt: "Nyandungu restaurant" },
  { src: docRestaurantNight, alt: "Restaurant at night" },
  { src: docPonds, alt: "Learning ponds" },
  { src: docCranes, alt: "Gray crowned cranes" },
  { src: docBicycles, alt: "Bicycle rentals" },
  { src: docTrailCranes, alt: "Cranes on the trail" },
  { src: docBarbet, alt: "Double-toothed barbet" },
  { src: docBarbet2, alt: "Barbet bird close-up" },
  { src: docFishEagle, alt: "African fish eagle" },
  { src: docKingfisher, alt: "Giant kingfisher" },
  { src: docFlameTree, alt: "Flame tree in bloom" },
  { src: docBambooPath, alt: "Bamboo forest path" },
];

const Index = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useSEO({
    title: "Discover Nyandungu Eco Park",
    description:
      "Plan your visit to Nyandungu Eco Park in Kigali. Explore trails, wildlife, top attractions, and QR-guided visitor information before you arrive.",
    path: "/",
    image: heroPark,
    imageAlt: "Nyandungu Eco Park main gate in Kigali",
    keywords: [
      "Nyandungu Eco Park",
      "Kigali eco park",
      "Rwanda tourist attraction",
      "Nyandungu trails",
      "Nyandungu QR guide",
    ],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: SITE_NAME,
        url: "/",
        inLanguage: ["en", "rw"],
      },
      {
        "@context": "https://schema.org",
        "@type": "TouristAttraction",
        name: SITE_NAME,
        description:
          "QR-guided visitor experience for Nyandungu Eco Park featuring trails, wildlife, top attractions, and visitor information.",
        image: heroPark,
        url: "/",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kigali",
          addressCountry: "RW",
        },
        touristType: ["Families", "Nature Lovers", "Birdwatchers", "Cyclists"],
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Nyandungu Eco Park sections",
        itemListElement: sections.map((section, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: section.title,
          url: `/section/${section.id}`,
        })),
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const currentImage = carouselImages[currentImageIndex];

  return (
    <div>
      <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-in-out"
          width={1920}
          height={1080}
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="animate-fade-up">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary-foreground/80">
              Welcome to
            </p>
            <h1 className="font-heading mb-4 text-4xl font-bold text-primary-foreground md:text-6xl lg:text-7xl">
              Discover Nyandungu Eco Park
            </h1>
            <p className="mb-2 text-xl font-light text-primary-foreground/90 md:text-2xl">
              Scan - Learn - Protect
            </p>
            <p className="mx-auto mb-8 max-w-lg text-primary-foreground/70">
              Discover nature, wildlife, and peaceful trails. Each section has a QR code so you
              can scan it and explore more on site.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground hover:opacity-90">
                <a href="#sections">
                  <QrCode className="mr-2 h-5 w-5" />
                  Explore Sections
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/40 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground hover:text-primary"
              >
                <Link to="/section/nyandungu-info">Plan Your Visit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16">
        <div className="container">
          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3">
            {[
              { icon: QrCode, title: "Scan", desc: "Scan QR codes at each park section for a guided digital experience." },
              { icon: Leaf, title: "Learn", desc: "Discover wildlife, plants, wetlands, and the story of Nyandungu's restoration." },
              { icon: Bird, title: "Protect", desc: "Understand the visitor rules that help preserve this urban wetland ecosystem." },
            ].map((feature) => (
              <div key={feature.title} className="p-6 text-center">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h2 className="font-heading mb-2 text-lg font-semibold">{feature.title}</h2>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="sections" className="py-16">
        <div className="container">
          <div className="mb-12 text-center">
            <h2 className="font-heading mb-3 text-3xl font-bold md:text-4xl">Explore the Park</h2>
            <p className="text-muted-foreground">
              Browse the same sections visitors can access by scanning QR codes inside the park.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((section) => (
              <SectionCard key={section.id} {...section} />
            ))}
          </div>
        </div>
      </section>

      <section id="visit-info" className="bg-muted py-16">
        <div className="container max-w-2xl text-center">
          <Map className="mx-auto mb-4 h-10 w-10 text-primary" />
          <h2 className="font-heading mb-4 text-2xl font-bold">Plan Your Visit</h2>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card">
            <p className="text-lg font-semibold text-foreground">Entry fee for Rwandans: 2,000 RWF</p>
            <p className="mt-1 text-sm text-muted-foreground">Myishyuro yoroshye kuri bose</p>
            <p className="mt-4 text-sm text-muted-foreground">
              No smoking - No outside food - No littering - No pets
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
