import logo from "@/assets/logo.png";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { NavLink } from "./NavLink";

import { useState } from "react";

const primaryLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/section/nyandungu-info", label: "Visitor Guide" },
  { to: "/section/peacock", label: "Peacock Sanctuary" },
  { to: "/section/top-ten", label: "Top 10 Attractions" },
  { to: "/section/trails", label: "Trails and Wildlife" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur no-print">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Discover Nyandungu Eco Park" width={40} height={40} />
          <span className="font-heading text-lg font-bold text-foreground">Nyandungu Eco Park</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6" aria-label="Primary">
          {primaryLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              activeClassName="text-foreground"
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link to="/admin">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => void signOut()}>
                Sign Out
              </Button>
            </>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link to="/login">Admin Login</Link>
            </Button>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="md:hidden border-t border-border bg-background p-4"
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-2">
            {primaryLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                activeClassName="bg-muted text-foreground"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 border-t border-border pt-4">
            {user ? (
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link to="/admin" onClick={() => setOpen(false)}>
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setOpen(false);
                    void signOut();
                  }}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button asChild variant="ghost" size="sm" className="w-full justify-start px-2">
                <Link to="/login" onClick={() => setOpen(false)}>
                  Admin Login
                </Link>
              </Button>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
