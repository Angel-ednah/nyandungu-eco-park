import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur no-print">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Nyandungu Eco-Park" width={40} height={40} />
          <span className="font-heading text-lg font-bold text-foreground">Nyandungu</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Home</Link>
          <Link to="/section/nyandungu-info" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Park Info</Link>
          <Link to="/section/peacock" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Peacock</Link>
          <Link to="/section/top-ten" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Top 10 Sites</Link>
          <Link to="/section/trails" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Trails</Link>
          {user ? (
            <>
              <Link to="/admin" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Admin</Link>
              <button onClick={handleSignOut} className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1">
                <LogOut className="h-4 w-4" /> Sohoka
              </button>
            </>
          ) : (
            <Link to="/login" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">Admin</Link>
          )}
        </nav>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-border bg-background p-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setOpen(false)} className="text-sm font-medium py-2">Home</Link>
          <Link to="/section/nyandungu-info" onClick={() => setOpen(false)} className="text-sm font-medium py-2">Park Info</Link>
          <Link to="/section/peacock" onClick={() => setOpen(false)} className="text-sm font-medium py-2">Peacock</Link>
          <Link to="/section/top-ten" onClick={() => setOpen(false)} className="text-sm font-medium py-2">Top 10 Sites</Link>
          <Link to="/section/trails" onClick={() => setOpen(false)} className="text-sm font-medium py-2">Trails</Link>
          {user ? (
            <>
              <Link to="/admin" onClick={() => setOpen(false)} className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center">Admin</Link>
              <button onClick={() => { handleSignOut(); setOpen(false); }} className="text-sm font-medium text-destructive py-2 text-left">Sohoka / Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setOpen(false)} className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-lg text-center">Admin Login</Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
