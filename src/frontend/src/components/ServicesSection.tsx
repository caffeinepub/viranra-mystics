import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  Camera,
  Film,
  Image,
  Megaphone,
  Music,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    id: 1,
    icon: Bot,
    title: "AI Agent",
    description:
      "Intelligent AI-powered automation agents tailored to your business needs.",
    image: "/assets/generated/service-ai-agent.dim_600x400.jpg",
    tag: "Technology",
    accent: "from-blue-500/20 to-blue-900/5",
  },
  {
    id: 2,
    icon: Film,
    title: "Video Editing",
    description: "Cinematic, professional video editing that tells your story.",
    image: "/assets/generated/service-video-editing.dim_600x400.jpg",
    tag: "Production",
    accent: "from-violet-500/20 to-violet-900/5",
  },
  {
    id: 3,
    icon: Image,
    title: "Video Thumbnail",
    description: "Eye-catching thumbnail designs that drive clicks and views.",
    image: "/assets/generated/service-thumbnail.dim_600x400.jpg",
    tag: "Design",
    accent: "from-pink-500/20 to-pink-900/5",
  },
  {
    id: 4,
    icon: Megaphone,
    title: "Ads Production",
    description: "High-impact ad campaigns crafted to convert and captivate.",
    image: "/assets/generated/service-ads.dim_600x400.jpg",
    tag: "Marketing",
    accent: "from-orange-500/20 to-orange-900/5",
  },
  {
    id: 5,
    icon: Music,
    title: "Song Video Production",
    description: "Stunning music video production from concept to final cut.",
    image: "/assets/generated/service-music-video.dim_600x400.jpg",
    tag: "Production",
    accent: "from-emerald-500/20 to-emerald-900/5",
  },
  {
    id: 6,
    icon: Camera,
    title: "Pre-Wedding Photography",
    description:
      "Timeless pre-wedding portraits capturing the magic of your love story.",
    image: "/assets/generated/service-prewedding.dim_600x400.jpg",
    tag: "Photography",
    accent: "from-rose-500/20 to-rose-900/5",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 44 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function ServicesSection() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="services"
      className="py-24 md:py-36 relative"
      data-ocid="services.section"
    >
      {/* Section atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background pointer-events-none" />
      {/* Soft violet center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, oklch(0.45 0.20 300 / 0.05) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-20"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-gold/80 mb-5 border border-gold/20 rounded-full px-4 py-1.5">
            What We Do
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            Our <span className="shimmer-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            From AI automation to cinematic storytelling — we craft experiences
            that leave a lasting impression.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            const ocid = `services.item.${i + 1}` as const;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group relative rounded-2xl overflow-hidden cursor-pointer"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.155 0.042 285 / 0.95), oklch(0.118 0.028 295 / 0.95))",
                  border: "1px solid oklch(0.28 0.07 288 / 0.55)",
                  boxShadow: "0 4px 24px oklch(0.05 0.02 280 / 0.5)",
                  transition:
                    "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-8px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 28px 64px oklch(0.05 0.02 280 / 0.65), 0 0 40px oklch(0.78 0.14 80 / 0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 24px oklch(0.05 0.02 280 / 0.5)";
                }}
                data-ocid={ocid}
              >
                {/* Image — taller, with richer overlay treatment */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    loading="lazy"
                    style={{
                      transition:
                        "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  />
                  {/* Permanent subtle gradient so content reads */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 30%, oklch(0.10 0.025 285 / 0.55) 100%)",
                    }}
                  />
                  {/* Hover darkening for contrast */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                    style={{
                      background:
                        "linear-gradient(to bottom, oklch(0.10 0.025 285 / 0.15) 0%, oklch(0.10 0.025 285 / 0.65) 100%)",
                    }}
                  />
                  {/* Tag chip */}
                  <span className="absolute top-3.5 right-3.5 text-[11px] font-semibold bg-gold/20 text-gold border border-gold/35 rounded-full px-3 py-1 backdrop-blur-md tracking-wide">
                    {service.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 pt-5">
                  {/* Icon + Title row */}
                  <div className="flex items-start gap-3.5 mb-3.5">
                    <div
                      className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
                      style={{
                        background: "oklch(0.78 0.14 80 / 0.10)",
                        border: "1px solid oklch(0.78 0.14 80 / 0.22)",
                        boxShadow: "0 0 12px oklch(0.78 0.14 80 / 0.08)",
                      }}
                    >
                      <Icon
                        className="w-4.5 h-4.5 text-gold"
                        style={{ width: "1.1rem", height: "1.1rem" }}
                      />
                    </div>
                    <h3 className="font-display text-[1.2rem] font-bold leading-snug tracking-tight text-foreground">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-[0.84rem] leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* CTA — gold underline treatment, arrow on hover */}
                  <button
                    type="button"
                    onClick={scrollToContact}
                    className="group/btn flex items-center gap-1.5 text-sm font-semibold text-gold/80 hover:text-gold transition-colors duration-200"
                  >
                    <span className="border-b border-gold/25 group-hover/btn:border-gold pb-0.5 transition-colors duration-200">
                      Learn More
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </button>
                </div>

                {/* Bottom accent line that grows on hover */}
                <div
                  className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{
                    background:
                      "linear-gradient(to right, oklch(0.78 0.14 80 / 0.7), oklch(0.45 0.20 300 / 0.5))",
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
