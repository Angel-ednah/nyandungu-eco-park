import SectionCard from "@/components/SectionCard";
import { SITE_NAME, useSEO } from "@/hooks/useSEO";
import { sectionDirectory } from "@/data/sectionDirectory";
import { Link } from "react-router-dom";
import { ArrowLeft, QrCode } from "lucide-react";

const SectionsPage = () => {
  useSEO({
    title: "Park Sections",
    description:
      "Browse the four main Nyandungu Eco Park sections: Nyandungu Info, Peacock Sanctuary, Top 10 Attractions, and Trails and Wildlife.",
    path: "/section",
    image: sectionDirectory[0]?.image,
    imageAlt: "Nyandungu Eco Park public section guide",
    keywords: [
      "Nyandungu Eco Park sections",
      "Nyandungu Info",
      "Peacock Sanctuary",
      "Top 10 Attractions",
      "Trails and Wildlife",
    ],
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Nyandungu Eco Park Sections",
        description:
          "Browse the four main Nyandungu Eco Park sections and open each section page for detailed visitor information.",
        url: "/section",
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: "/",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Nyandungu Eco Park section directory",
        itemListElement: sectionDirectory.map((section, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: section.title,
          url: section.path,
        })),
      },
    ],
  });

  return (
    <div className="py-16">
      <section className="container">
        <Link
          to="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <QrCode className="h-7 w-7 text-primary" />
          </div>
          <h1 className="font-heading text-4xl font-bold text-foreground md:text-5xl">
            Explore All Sections
          </h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground md:text-lg">
            These are the four public sections of Nyandungu Eco Park. Each section has its own
            page, and QR codes can be added later for direct on-site access.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {sectionDirectory.map((section) => (
            <SectionCard key={section.id} {...section} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default SectionsPage;
