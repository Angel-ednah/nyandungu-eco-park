import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackVisit } from "@/lib/visitTracker";
import QRCodeCard from "@/components/QRCodeCard";
import ImageGallery from "@/components/ImageGallery";
import { sectionData } from "@/data/sectionData";

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
            {/* Image Gallery */}
            {section.gallery && section.gallery.length > 0 && (
              <div className="animate-fade-up">
                <ImageGallery images={section.gallery} sectionTitle={section.title} />
              </div>
            )}

            {section.highlights.map((h, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden shadow-card border border-border animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
                {h.image && (
                  <div className="aspect-[16/7] overflow-hidden">
                    <img src={h.image} alt={h.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{h.title}</h3>
                  {h.titleKn && <p className="text-sm text-primary font-medium mb-2">{h.titleKn}</p>}
                  <p className="text-muted-foreground">{h.description}</p>
                  {h.descriptionKn && <p className="text-sm text-muted-foreground/80 mt-2 italic">{h.descriptionKn}</p>}
                </div>
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
