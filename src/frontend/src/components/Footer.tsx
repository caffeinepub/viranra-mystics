import { Heart } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border/40 bg-card/50 backdrop-blur-sm">
      {/* Decorative top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <img
              src="/assets/generated/viranra-logo-transparent.dim_400x200.png"
              alt="Viranra Mystics"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Where creativity meets magic. Your vision, crafted into
              extraordinary experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4 text-gold/90">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Services", href: "#services" },
                { label: "About", href: "#about" },
                { label: "Portfolio", href: "#portfolio" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                    data-ocid="nav.link"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-base font-semibold mb-4 text-gold/90">
              Services
            </h4>
            <ul className="flex flex-col gap-2.5">
              {[
                "AI Agent",
                "Video Editing",
                "Video Thumbnail",
                "Ads Production",
                "Song Video Production",
                "Pre-Wedding Photography",
              ].map((svc) => (
                <li key={svc}>
                  <button
                    type="button"
                    onClick={() => scrollTo("#services")}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {svc}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {year} Viranra Mystics. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-gold fill-gold" />{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
