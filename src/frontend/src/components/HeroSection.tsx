import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "motion/react";

export default function HeroSection() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    const el = document.querySelector("#services");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('/assets/generated/hero-banner.dim_1600x700.jpg')`,
        }}
      />

      {/* Multi-layer atmospheric overlay — strong at bottom where text sits */}
      <div className="absolute inset-0 bg-background/50" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.08 0.03 285 / 0.2) 0%, oklch(0.08 0.03 285 / 0.55) 45%, oklch(0.08 0.03 285 / 0.85) 100%)",
        }}
      />

      {/* Gold radial bloom — larger and more present */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 55%, oklch(0.78 0.14 80 / 0.10) 0%, oklch(0.45 0.20 300 / 0.06) 45%, transparent 70%)",
        }}
      />

      {/* Fine grain texture */}
      <div
        className="absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-24 pb-16">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.28em] uppercase text-gold border border-gold/30 rounded-full px-5 py-2 bg-gold/[0.06] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            Premium Creative Agency
          </span>
        </motion.div>

        {/* Headline — pushed up in size, tighter line-height */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.35 }}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6rem] font-bold leading-[0.95] tracking-tight mb-7"
        >
          Where <em className="not-italic shimmer-text">Creativity</em>
          <br />
          <span className="text-foreground/90">Meets Magic</span>
        </motion.h1>

        {/* Subheadline — distinct weight and spacing from headline */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-serif-alt text-xl md:text-2xl text-foreground/60 max-w-xl mx-auto mb-12 italic font-normal tracking-wide"
        >
          Viranra Mystics — Your Vision, Our Craft
        </motion.p>

        {/* CTAs — primary is visually dominant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={scrollToContact}
            className="group relative overflow-hidden bg-gold text-primary-foreground font-semibold px-9 py-7 text-base rounded-full shadow-[0_0_0_0_oklch(0.78_0.14_80/0.5)] hover:shadow-[0_0_0_8px_oklch(0.78_0.14_80/0)] transition-shadow duration-500"
            data-ocid="hero.primary_button"
          >
            <span className="relative z-10 flex items-center gap-2">
              Get a Quote
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            {/* Shine sweep on hover */}
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </Button>

          <Button
            size="lg"
            variant="ghost"
            onClick={scrollToServices}
            className="px-9 py-7 text-base rounded-full text-foreground/70 hover:text-foreground border border-foreground/15 hover:border-foreground/35 hover:bg-foreground/5 transition-all duration-300"
          >
            Explore Services
          </Button>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-14 flex flex-wrap justify-center items-center gap-6 text-xs text-foreground/40"
        >
          {["200+ Projects", "98% Satisfaction", "6 Services", "5★ Rating"].map(
            (stat, i) => (
              <span key={stat} className="flex items-center gap-3">
                {i > 0 && <span className="w-px h-3 bg-foreground/20" />}
                <span className="tracking-wider uppercase font-medium">
                  {stat}
                </span>
              </span>
            ),
          )}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        type="button"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-foreground/30 hover:text-gold transition-colors duration-300"
        aria-label="Scroll down"
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </motion.button>
    </section>
  );
}
