import { Link } from "react-router-dom";
import { NavLink } from "./NavLink";

const exploreLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/section/nyandungu-info", label: "Visitor Guide" },
  { to: "/section/peacock", label: "Peacock Sanctuary" },
  { to: "/section/top-ten", label: "Top 10 Attractions" },
  { to: "/section/trails", label: "Trails and Wildlife" },
];

const visitLinks = [
  { to: "/section", label: "Browse sections" },
  { to: "/section/nyandungu-info", label: "Park rules and fees" },
  { to: "/section/top-ten", label: "Plan a full visit" },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-muted/60 no-print">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <section aria-labelledby="footer-brand">
            <h2 id="footer-brand" className="font-heading text-2xl font-bold text-foreground">
              Discover Nyandungu Eco Park
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
              A QR-guided visitor experience for exploring trails, wildlife, gardens, and park
              highlights in Kigali.
            </p>
            <p className="mt-3 text-sm font-medium text-foreground">Scan - Learn - Protect</p>
          </section>

          <nav aria-labelledby="footer-explore">
            <h3 id="footer-explore" className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {exploreLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className="text-muted-foreground transition-colors hover:text-primary"
                    activeClassName="text-foreground"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-visit">
            <h3 id="footer-visit" className="text-sm font-semibold uppercase tracking-wide text-foreground">
              Visitor Info
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {visitLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-muted-foreground transition-colors hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {currentYear} Discover Nyandungu Eco Park. All rights reserved.</p>
          <button type="button" onClick={handleBackToTop} className="text-left transition-colors hover:text-primary">
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
