import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border bg-muted py-8 no-print">
    <div className="container text-center">
      <p className="font-heading text-lg font-bold text-foreground mb-1">Discover Nyandungu Eco Park</p>
      <p className="text-sm text-muted-foreground mb-4">Scan · Learn · Protect</p>
      <div className="flex justify-center gap-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary transition-colors">Home</Link>
        <Link to="/admin" className="hover:text-primary transition-colors">Admin</Link>
      </div>
      <p className="text-xs text-muted-foreground mt-4">© {new Date().getFullYear()} Discover Nyandungu Eco Park. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
