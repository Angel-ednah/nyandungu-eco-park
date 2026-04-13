
import ImageGallery from "@/components/ImageGallery";

import QRCodeCard from "@/components/QRCodeCard";

import { Button } from "@/components/ui/button";

import { Textarea } from "@/components/ui/textarea";

import { sectionData } from "@/data/sectionData";

import { trackVisit } from "@/lib/visitTracker";

import { ArrowLeft, Globe, MessageSquare, Send, Star } from "lucide-react";

import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { toast } from "sonner";

const SectionPage = () => {
  const { id } = useParams<{ id: string }>();
  const section = id ? sectionData[id] : null;
  const baseUrl = window.location.origin;
  const [lang, setLang] = useState<"en" | "kn">("en");
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(0);
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [highlightImageIndices, setHighlightImageIndices] = useState<Record<number, number>>({});

  useEffect(() => {
    if (id) trackVisit(id);
  }, [id]);

  // Auto-rotate carousel images
  useEffect(() => {
    if (section?.highlights) {
      const intervals: NodeJS.Timeout[] = [];
      section.highlights.forEach((highlight, i) => {
        if (highlight.carouselImages && highlight.carouselImages.length > 1) {
          const interval = setInterval(() => {
            setHighlightImageIndices(prev => ({
              ...prev,
              [i]: ((prev[i] || 0) + 1) % highlight.carouselImages!.length
            }));
          }, 4000);
          intervals.push(interval);
        }
      });
      return () => intervals.forEach(clearInterval);
    }
  }, [section]);

  if (!section) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-heading text-3xl font-bold mb-4">Section Not Found</h1>
        <Button asChild><Link to="/"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Home</Link></Button>
      </div>
    );
  }

  const isKn = lang === "kn";

  const handleFeedback = () => {
    if (!feedback.trim() && rating === 0) {
      toast.error(isKn ? "Andika igitekerezo cyawe" : "Please write your feedback or select a rating");
      return;
    }
    // Store in localStorage for now
    const feedbacks = JSON.parse(localStorage.getItem("park-feedback") || "[]");
    feedbacks.push({ sectionId: id, rating, feedback: feedback.trim(), date: new Date().toISOString() });
    localStorage.setItem("park-feedback", JSON.stringify(feedbacks));
    setFeedbackSent(true);
    toast.success(isKn ? "Murakoze! Igitekerezo cyanyu cyakiriwe." : "Thank you! Your feedback has been received.");
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px]">
        <img src={section.image} alt={section.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-overlay" />
        <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-12">
          <div className="flex items-center justify-between mb-2">
            <Link to="/" className="text-primary-foreground/70 text-sm hover:text-primary-foreground inline-flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> {isKn ? "Subira Ahabanza" : "Back to Home"}
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLang(isKn ? "en" : "kn")}
              className="bg-white/20 backdrop-blur border-white/30 text-white hover:bg-white/30 hover:text-white"
            >
              <Globe className="mr-1 h-4 w-4" />
              {isKn ? "English" : "Ikinyarwanda"}
            </Button>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground">
            {isKn ? section.titleKn : section.title}
          </h1>
          {!isKn && section.titleKn && <p className="text-primary-foreground/80 mt-1">{section.titleKn}</p>}
        </div>
      </section>

      {/* Content */}
      <section className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            {section.gallery && section.gallery.length > 0 && (
              <div className="animate-fade-up">
                <ImageGallery images={section.gallery} sectionTitle={section.title} />
              </div>
            )}

            {/* Highlights: Title → Photo → Description */}
            {section.highlights.map((h, i) => (
              <div key={i} className="bg-card rounded-xl overflow-hidden shadow-card border border-border animate-fade-up" style={{ animationDelay: `${i * 0.05}s` }}>
                <div className="p-6 pb-2">
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {isKn && h.titleKn ? h.titleKn : h.title}
                  </h3>
                  {!isKn && h.titleKn && <p className="text-sm text-primary font-medium mt-0.5">{h.titleKn}</p>}
                </div>

                {h.image && (
                  <div className="px-6 pb-2">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden">
                      <img src={h.image} alt={h.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                  </div>
                )}

                {h.carouselImages && h.carouselImages.length > 0 && (
                  <div className="px-6 pb-2">
                    <div className="aspect-[16/9] rounded-lg overflow-hidden relative bg-gray-100">
                      <img
                        src={h.carouselImages[highlightImageIndices[i] || 0]}
                        alt={`${h.title} - Image ${(highlightImageIndices[i] || 0) + 1}`}
                        className="w-full h-full object-cover transition-all duration-1000"
                      />
                      {h.carouselImages.length > 1 && (
                        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                          {h.carouselImages.map((_, imgIndex) => (
                            <button
                              key={imgIndex}
                              onClick={() => setHighlightImageIndices(prev => ({ ...prev, [i]: imgIndex }))}
                              className={`w-2 h-2 rounded-full transition-all ${
                                imgIndex === (highlightImageIndices[i] || 0)
                                  ? "bg-white scale-125"
                                  : "bg-white/50 hover:bg-white/75"
                              }`}
                              aria-label={`View image ${imgIndex + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-6 pt-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {isKn && h.descriptionKn ? h.descriptionKn : h.description}
                  </p>

                  {h.details && h.details.length > 0 && (
                    <div className="mt-4 space-y-3">
                      {h.details.map((d, j) => (
                        <div key={j} className="pl-4 border-l-2 border-primary/30">
                          <p className="text-sm font-semibold text-foreground">
                            {isKn && d.labelKn ? d.labelKn : d.label}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {isKn && d.textKn ? d.textKn : d.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Rules */}
            {section.rules && (
              <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                  {isKn ? "Amategeko" : "Rules / Amategeko"}
                </h3>
                <ul className="space-y-2">
                  {section.rules.map((r, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="w-2 h-2 rounded-full bg-destructive flex-shrink-0" />
                      {isKn ? r.kn : `${r.en} / ${r.kn}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Feedback Section */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-5 w-5 text-primary" />
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  {isKn ? "Tanga Igitekerezo" : "Share Your Feedback"}
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {isKn
                  ? "Ese amakuru yagufashije? Tugire icyo utubwira!"
                  : "Did you find this information useful? Let us know!"}
              </p>

              {feedbackSent ? (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2">🎉</div>
                  <p className="font-semibold text-foreground">
                    {isKn ? "Murakoze cyane!" : "Thank you so much!"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {isKn ? "Igitekerezo cyanyu cyatumijwe neza." : "Your feedback has been recorded."}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-2">
                      {isKn ? "Igitekerezo cyawe (inyenyeri)" : "Your Rating"}
                    </p>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setRating(star)}
                          className="p-1 transition-transform hover:scale-110"
                        >
                          <Star
                            className={`h-7 w-7 ${
                              star <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground/30"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <Textarea
                    placeholder={isKn ? "Andika igitekerezo cyawe hano..." : "Write your feedback here..."}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleFeedback} className="w-full sm:w-auto">
                    <Send className="mr-2 h-4 w-4" />
                    {isKn ? "Ohereza" : "Submit Feedback"}
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <QRCodeCard sectionId={id!} sectionName={section.title} baseUrl={baseUrl} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default SectionPage;
