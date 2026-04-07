import { Link } from "react-router-dom";
import { QrCode, Leaf, Bird, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import SectionCard from "@/components/SectionCard";
import heroPark from "@/assets/hero-park.jpg";
import peacockImg from "@/assets/peacock.jpg";
import trailsImg from "@/assets/trails.jpg";
import gardenImg from "@/assets/garden.jpg";

const sections = [
  {
    id: "nyandungu-info",
    title: "Nyandungu Info",
    titleKn: "Amakuru ya Nyandungu",
    description: "Discover nature, wildlife, and peaceful trails. Learn about dining, ponds, birds, and cycling.",
    image: heroPark,
  },
  {
    id: "peacock",
    title: "Peacock Site",
    titleKn: "Aho Ingabo z'Inyoni Ziri",
    description: "Discover the beauty of the peafowl — learn about their family, behavior, and visitor guidelines.",
    image: peacockImg,
  },
  {
    id: "top-ten",
    title: "Top 10 Sites",
    titleKn: "Ahantu 10 Heza Cyane",
    description: "Explore the best spots: Medicinal Garden, Pope's Garden, Learning Pond, and more.",
    image: gardenImg,
  },
  {
    id: "trails",
    title: "Trails & Wildlife",
    titleKn: "Inzira n'Ibinyabuzima",
    description: "Walk Umudobori Lane, discover birds like the Gray Crowned Crane, and explore unique plants.",
    image: trailsImg,
  },
];

const Index = () => (
  <div>
    {/* Hero */}
    <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
      <img src={heroPark} alt="Discover Nyandungu Eco Park aerial view" className="absolute inset-0 w-full h-full object-cover" width={1920} height={1080} />
      <div className="absolute inset-0 bg-gradient-overlay" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fade-up">
          <p className="text-primary-foreground/80 text-sm font-medium tracking-widest uppercase mb-3">Welcome to</p>
          <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-4">
            Discover Nyandungu Eco Park
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 font-light mb-2">Scan · Learn · Protect</p>
          <p className="text-primary-foreground/70 max-w-lg mx-auto mb-8">
            Discover nature, wildlife, and peaceful trails. Each section has a QR code — scan it to explore!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-gradient-hero hover:opacity-90 text-primary-foreground">
              <a href="#sections"><QrCode className="mr-2 h-5 w-5" /> Explore Sections</a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/admin">Admin Dashboard</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-16 bg-muted">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: QrCode, title: "Scan", desc: "Scan QR codes at each park section for a digital experience" },
            { icon: Leaf, title: "Learn", desc: "Discover wildlife, plants, and the rich history of Nyandungu Eco Park" },
            { icon: Bird, title: "Protect", desc: "Learn how to preserve this beautiful wetland ecosystem" },
          ].map(f => (
            <div key={f.title} className="text-center p-6">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
                <f.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Sections */}
    <section id="sections" className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">Explore the Park</h2>
          <p className="text-muted-foreground">Each section has a QR code you can scan on-site, or browse below</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {sections.map(s => (
            <SectionCard key={s.id} {...s} />
          ))}
        </div>
      </div>
    </section>

    {/* Entry Fee */}
    <section className="py-16 bg-muted">
      <div className="container max-w-2xl text-center">
        <Map className="h-10 w-10 text-primary mx-auto mb-4" />
        <h2 className="font-heading text-2xl font-bold mb-4">Plan Your Visit</h2>
        <div className="bg-card rounded-xl p-6 shadow-card border border-border">
          <p className="text-lg font-semibold text-foreground">Entry Fee for Rwandans: 2,000 RWF</p>
          <p className="text-sm text-muted-foreground mt-1">Myishyuro yoroshye kuri bose</p>
          <p className="text-sm text-muted-foreground mt-4">No Smoking · No Outside Food · No Littering · No Pets</p>
        </div>
      </div>
    </section>
  </div>
);

export default Index;
