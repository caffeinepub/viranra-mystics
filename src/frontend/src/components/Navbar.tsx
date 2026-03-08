import { Button } from "@/components/ui/button";
import { useInternetIdentity } from "@/hooks/useInternetIdentity";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { login, clear, identity, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const isLoggedIn = !!identity;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-violet"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between h-16 md:h-20 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 shrink-0"
          data-ocid="nav.link"
        >
          <img
            src="/assets/generated/viranra-logo-transparent.dim_400x200.png"
            alt="Viranra Mystics"
            className="h-10 md:h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <button
                type="button"
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-muted-foreground hover:text-gold transition-colors duration-200 relative group"
                data-ocid="nav.link"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
        </ul>

        {/* Auth Controls */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: "/admin" })}
                className="text-muted-foreground hover:text-gold"
                data-ocid="nav.link"
              >
                <Sparkles className="w-4 h-4 mr-1" />
                Admin
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={clear}
                className="border-border/60 hover:border-gold/60 hover:text-gold"
                data-ocid="nav.secondary_button"
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              size="sm"
              onClick={login}
              disabled={isLoggingIn}
              className="bg-gold text-primary-foreground hover:bg-primary/90 font-semibold glow-gold"
              data-ocid="nav.primary_button"
            >
              {isLoggingIn ? "Connecting..." : "Login"}
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-muted-foreground hover:text-foreground"
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => scrollTo(link.href)}
                  className="text-left py-2 text-muted-foreground hover:text-gold transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-border/50 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsMobileOpen(false);
                        navigate({ to: "/admin" });
                      }}
                      className="justify-start text-muted-foreground hover:text-gold"
                      data-ocid="nav.link"
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </Button>
                    <Button
                      variant="outline"
                      onClick={clear}
                      className="border-border/60 hover:border-gold/60 hover:text-gold"
                      data-ocid="nav.secondary_button"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={login}
                    disabled={isLoggingIn}
                    className="bg-gold text-primary-foreground font-semibold"
                    data-ocid="nav.primary_button"
                  >
                    {isLoggingIn ? "Connecting..." : "Login"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
