
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SectionCardProps {
  id: string;
  path?: string;
  title: string;
  titleKn: string;
  description: string;
  image: string;
}

const SectionCard = ({ id, path, title, titleKn, description, image }: SectionCardProps) => (
  <Link
    to={path ?? `/section/${id}`}
    className="group block rounded-xl overflow-hidden shadow-card border border-border bg-card hover:shadow-elevated transition-all duration-300"
  >
    <div className="relative h-48 overflow-hidden">
      <img
        src={image}
        alt={`${title} section at Nyandungu Eco Park`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-overlay" />
      <div className="absolute bottom-3 left-4 right-4">
        <h3 className="font-heading text-xl font-bold text-primary-foreground">{title}</h3>
        <p className="text-sm text-primary-foreground/80">{titleKn}</p>
      </div>
    </div>
    <div className="p-4">
      <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-3 group-hover:gap-2 transition-all">
        Explore <ArrowRight className="h-4 w-4" />
      </span>
    </div>
  </Link>
);

export default SectionCard;
