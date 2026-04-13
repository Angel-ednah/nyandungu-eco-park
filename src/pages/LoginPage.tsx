
import logo from "@/assets/logo.png";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { useAuth } from "@/hooks/useAuth";

import { supabase } from "@/integrations/supabase/client";

import { Lock, Mail, UserPlus } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: window.location.origin },
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess("Account yawe yarakozwe! Injira ubu. / Account created! Sign in now.");
        setIsSignUp(false);
      }
    } else {
      const { error } = await signIn(email, password);
      if (error) {
        setError("Email cyangwa password ntibihura. / Invalid credentials.");
      } else {
        navigate("/admin");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src={logo} alt="Discover Nyandungu Eco Park" width={64} height={64} className="mx-auto mb-4" />
          <h1 className="font-heading text-2xl font-bold">
            {isSignUp ? "Create Admin Account" : "Admin Login"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {isSignUp ? "Kora account y'umuyobozi" : "Injira nk'umuyobozi / Sign in as admin"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-card rounded-xl p-6 shadow-card border border-border space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg">{error}</div>
          )}
          {success && (
            <div className="bg-primary/10 text-primary text-sm p-3 rounded-lg">{success}</div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="admin@nyandungu.rw"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password (byibura inyuguti 6)</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="pl-10"
                required
                minLength={6}
              />
            </div>
          </div>

          <Button type="submit" className="w-full bg-gradient-hero" disabled={loading}>
            {loading ? "Tegereza..." : isSignUp ? (
              <><UserPlus className="mr-2 h-4 w-4" /> Kora Account</>
            ) : "Injira / Sign In"}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(""); setSuccess(""); }}
              className="text-sm text-primary hover:underline"
            >
              {isSignUp ? "Ufite account? Injira hano" : "Nta account ufite? Kora account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
