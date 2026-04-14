import ImageGallery from "@/components/ImageGallery";
import QRCodeCard from "@/components/QRCodeCard";
import { SITE_NAME, useSEO } from "@/hooks/useSEO";
import { Button } from "@/components/ui/button";
import { sectionData } from "@/data/sectionData";
import { ArrowLeft, ExternalLink, Globe, MessageSquare } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const GOOGLE_REVIEW_URL = "https://share.google/2uD5Q43HBBiGSpYtA";

const SectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const section = id ? sectionData[id] : null;
  const baseUrl = window.location.origin;
  const [lang, setLang] = useState<"en" | "kn">("en");
  const [highlightImageIndices, setHighlightImageIndices] = useState<Record<number, number>>({});
  const isKn = lang === "kn";
  const getHighlightImages = (highlight: { image?: string; carouselImages?: string[] }) =>
    highlight.carouselImages && highlight.carouselImages.length > 0
      ? highlight.carouselImages
      : highlight.image
        ? [highlight.image]
        : [];

  const seoDescription = section
    ? (
        isKn
          ? section.highlights.map((highlight) => highlight.descriptionKn || highlight.description).join(" ")
          : section.highlights.map((highlight) => highlight.description).join(" ")
      ).slice(0, 180)
    : "Explore Nyandungu Eco Park section information, highlights, and visitor guidance.";
  const sectionUrl = id ? `/section/${id}` : window.location.pathname;
  const breadcrumbJsonLd = section
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: section.title,
            item: sectionUrl,
          },
        ],
      }
    : undefined;

  useSEO({
    title: section ? section.title : "Section Not Found",
    description: seoDescription,
    path: sectionUrl,
    image: section?.image,
    imageAlt: section ? `${section.title} at Nyandungu Eco Park` : "Nyandungu Eco Park visitor guide",
    lang: isKn ? "rw" : "en",
    noindex: !section,
    keywords: section
      ? [section.title, section.titleKn, "Nyandungu Eco Park", "Kigali tourism", "Rwanda nature"]
      : ["Nyandungu Eco Park"],
    jsonLd: section
      ? [
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: isKn ? section.titleKn : section.title,
            alternateName: section.titleKn,
            description: seoDescription,
            url: sectionUrl,
            image: section.image,
            inLanguage: isKn ? "rw" : "en",
            isPartOf: {
              "@type": "WebSite",
              name: SITE_NAME,
              url: "/",
            },
            about: {
              "@type": "TouristAttraction",
              name: section.title,
              description: seoDescription,
              url: sectionUrl,
              containedInPlace: {
                "@type": "Place",
                name: "Nyandungu Eco Park",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Kigali",
                  addressCountry: "RW",
                },
              },
            },
          },
          breadcrumbJsonLd,
        ]
      : undefined,
  });

  useEffect(() => {
    if (!section?.highlights) {
      return;
    }

    const intervals: NodeJS.Timeout[] = [];
    section.highlights.forEach((highlight, index) => {
      const images = getHighlightImages(highlight);
      if (images.length > 1) {
        const interval = setInterval(() => {
          setHighlightImageIndices((current) => ({
            ...current,
            [index]: ((current[index] || 0) + 1) % images.length,
          }));
        }, 4000);
        intervals.push(interval);
      }
    });

    return () => intervals.forEach(clearInterval);
  }, [section]);

  if (!section) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-heading mb-4 text-3xl font-bold">Section Not Found</h1>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <section className="relative h-[40vh] min-h-[280px]">
        <img
          src={section.image}
          alt={`${section.title} at Nyandungu Eco Park`}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-12">
          <div className="mb-2 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-primary-foreground/70 hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              {isKn ? "Subira Ahabanza" : "Back to Home"}
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(isKn ? "en" : "kn")}
              className="border-white/30 bg-white/20 text-white backdrop-blur hover:bg-white/30 hover:text-white"
            >
              <Globe className="mr-1 h-4 w-4" />
              {isKn ? "English" : "Ikinyarwanda"}
            </Button>
          </div>
          <h1 className="font-heading text-3xl font-bold text-primary-foreground md:text-4xl">
            {isKn ? section.titleKn : section.title}
          </h1>
          {!isKn && section.titleKn && <p className="mt-1 text-primary-foreground/80">{section.titleKn}</p>}
        </div>
      </section>

      <section className="container py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            {section.video && (
              <div className="animate-fade-up overflow-hidden rounded-xl">
                <video
                  src={section.video}
                  controls
                  className="w-full rounded-xl"
                  preload="metadata"
                  aria-label={`${section.title} visitor video`}
                />
              </div>
            )}

            {section.gallery && section.gallery.length > 0 && (
              <div className="animate-fade-up">
                <ImageGallery images={section.gallery} sectionTitle={section.title} />
              </div>
            )}

            {section.highlights.map((highlight, index) => (
              (() => {
                const highlightImages = getHighlightImages(highlight);

                return (
                  <div
                    key={index}
                    className="animate-fade-up overflow-hidden rounded-xl border border-border bg-card shadow-card"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="p-6 pb-2">
                      <h2 className="font-heading text-xl font-semibold text-foreground">
                        {isKn && highlight.titleKn ? highlight.titleKn : highlight.title}
                      </h2>
                      {!isKn && highlight.titleKn && (
                        <p className="mt-0.5 text-sm font-medium text-primary">{highlight.titleKn}</p>
                      )}
                    </div>

                    {highlightImages.length > 0 && (
                      <div className="px-6 pb-2">
                        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gray-100">
                          <img
                            src={highlightImages[highlightImageIndices[index] || 0]}
                            alt={`${highlight.title} at ${section.title}, image ${(highlightImageIndices[index] || 0) + 1}`}
                            className="h-full w-full object-cover transition-all duration-1000"
                            loading="lazy"
                            decoding="async"
                          />
                          {highlightImages.length > 1 && (
                            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 space-x-2">
                              {highlightImages.map((_, imageIndex) => (
                                <button
                                  key={imageIndex}
                                  onClick={() =>
                                    setHighlightImageIndices((current) => ({ ...current, [index]: imageIndex }))
                                  }
                                  className={`h-2 w-2 rounded-full transition-all ${
                                    imageIndex === (highlightImageIndices[index] || 0)
                                      ? "scale-125 bg-white"
                                      : "bg-white/50 hover:bg-white/75"
                                  }`}
                                  aria-label={`View image ${imageIndex + 1}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div className="p-6 pt-2">
                      <p className="leading-relaxed text-muted-foreground">
                        {isKn && highlight.descriptionKn ? highlight.descriptionKn : highlight.description}
                      </p>

                      {highlight.details && highlight.details.length > 0 && (
                        <div className="mt-4 space-y-3">
                          {highlight.details.map((detail, detailIndex) => (
                            <div key={detailIndex} className="border-l-2 border-primary/30 pl-4">
                              <p className="text-sm font-semibold text-foreground">
                                {isKn && detail.labelKn ? detail.labelKn : detail.label}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {isKn && detail.textKn ? detail.textKn : detail.text}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()
            ))}

            {section.rules && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
                <h2 className="font-heading mb-3 text-lg font-semibold text-foreground">
                  {isKn ? "Amategeko" : "Rules / Amategeko"}
                </h2>
                <ul className="space-y-2">
                  {section.rules.map((rule, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-destructive" />
                      {isKn ? rule.kn : `${rule.en} / ${rule.kn}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h2 className="font-heading text-lg font-semibold text-foreground">
                  {isKn ? "Tanga Igitekerezo" : "Share Your Feedback"}
                </h2>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                {isKn ? "Ese amakuru yagufashije? Tugire icyo utubwira!" : "Did you find this information useful? Let us know!"}
              </p>
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-muted-foreground">
                  {isKn
                    ? "Niba wishimiye uruzinduko rwawe, wadusigira isubiramo kuri Google."
                    : "If you enjoyed your visit, please leave us a review on Google."}
                </p>
                <Button asChild className="mt-4 w-full sm:w-auto">
                  <a href={GOOGLE_REVIEW_URL} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {isKn ? "Duhere Isubiramo kuri Google" : "Leave a Google Review"}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <QRCodeCard sectionId={id!} sectionName={section.title} baseUrl={baseUrl} />
          </aside>
        </div>
      </section>
    </div>
  );
};

export default SectionPage;
