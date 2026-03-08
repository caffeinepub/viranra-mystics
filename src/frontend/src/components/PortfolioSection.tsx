import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

type FilterCategory =
  | "All"
  | "AI Agent"
  | "Video Editing"
  | "Thumbnail"
  | "Ads"
  | "Music Video"
  | "Pre-Wedding";

const filters: FilterCategory[] = [
  "All",
  "AI Agent",
  "Video Editing",
  "Thumbnail",
  "Ads",
  "Music Video",
  "Pre-Wedding",
];

const portfolioItems = [
  {
    id: 1,
    title: "AI Business Automation",
    category: "AI Agent" as FilterCategory,
    image: "/assets/generated/service-ai-agent.dim_600x400.jpg",
    desc: "Custom AI pipeline reducing manual workload by 80%",
    year: "2025",
  },
  {
    id: 2,
    title: "Corporate Film Edit",
    category: "Video Editing" as FilterCategory,
    image: "/assets/generated/service-video-editing.dim_600x400.jpg",
    desc: "Cinematic brand story for a Fortune 500 client",
    year: "2025",
  },
  {
    id: 3,
    title: "YouTube Channel Rebrand",
    category: "Thumbnail" as FilterCategory,
    image: "/assets/generated/service-thumbnail.dim_600x400.jpg",
    desc: "Consistent thumbnail system driving 3× CTR increase",
    year: "2024",
  },
  {
    id: 4,
    title: "Product Launch Campaign",
    category: "Ads" as FilterCategory,
    image: "/assets/generated/service-ads.dim_600x400.jpg",
    desc: "Multi-platform ad suite achieving 5× ROAS",
    year: "2025",
  },
  {
    id: 5,
    title: "Rising Star Music Video",
    category: "Music Video" as FilterCategory,
    image: "/assets/generated/service-music-video.dim_600x400.jpg",
    desc: "Debut music video reaching 1M views in 30 days",
    year: "2025",
  },
  {
    id: 6,
    title: "Eternal Moments Session",
    category: "Pre-Wedding" as FilterCategory,
    image: "/assets/generated/service-prewedding.dim_600x400.jpg",
    desc: "Golden hour portraits in Rajasthan countryside",
    year: "2024",
  },
];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");

  const filtered =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  return (
    <section
      id="portfolio"
      className="py-24 md:py-36 relative"
      data-ocid="portfolio.section"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-12"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-gold/80 mb-5 border border-gold/20 rounded-full px-4 py-1.5">
            Our Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-5 leading-tight">
            Portfolio <span className="shimmer-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            A curated selection of our finest creative work across all
            disciplines.
          </p>
        </motion.div>

        {/* Filter Pills — custom sliding pill design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-14"
          role="tablist"
          aria-label="Filter portfolio"
        >
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter)}
                className="relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50"
                style={{
                  color: isActive
                    ? "oklch(0.10 0.025 280)"
                    : "oklch(0.60 0.04 280)",
                  background: isActive
                    ? "oklch(0.78 0.14 80)"
                    : "oklch(0.18 0.04 285 / 0.7)",
                  border: isActive
                    ? "1px solid oklch(0.78 0.14 80)"
                    : "1px solid oklch(0.28 0.06 285 / 0.6)",
                  boxShadow: isActive
                    ? "0 0 20px oklch(0.78 0.14 80 / 0.3), inset 0 1px 0 oklch(1 0 0 / 0.15)"
                    : "none",
                }}
                data-ocid="portfolio.tab"
              >
                {filter}
              </button>
            );
          })}
        </motion.div>

        {/* Grid — cards with always-visible caption strip */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -8 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(145deg, oklch(0.155 0.042 285 / 0.9), oklch(0.118 0.028 295 / 0.9))",
                  border: "1px solid oklch(0.28 0.07 288 / 0.5)",
                  boxShadow: "0 4px 20px oklch(0.05 0.02 280 / 0.45)",
                  transition:
                    "transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.32s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(-6px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 24px 56px oklch(0.05 0.02 280 / 0.6), 0 0 30px oklch(0.78 0.14 80 / 0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform =
                    "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 4px 20px oklch(0.05 0.02 280 / 0.45)";
                }}
              >
                {/* Image — full card height with caption visible */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    style={{
                      transition:
                        "transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        "scale(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.transform =
                        "scale(1)";
                    }}
                    loading="lazy"
                  />

                  {/* Persistent bottom gradient — description always readable */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to bottom, transparent 35%, oklch(0.10 0.025 285 / 0.92) 100%)",
                    }}
                  />

                  {/* Caption always visible at bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-[0.75rem] text-foreground/55 leading-snug line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  {/* Year chip */}
                  <span className="absolute top-3 right-3 text-[10px] font-bold tracking-widest text-gold/70 bg-gold/10 border border-gold/20 rounded-full px-2.5 py-1 backdrop-blur-sm">
                    {item.year}
                  </span>
                </div>

                {/* Card footer — strong hierarchy */}
                <div className="px-5 py-4 flex items-center justify-between">
                  <div className="min-w-0">
                    <span className="block text-[10px] font-semibold tracking-[0.22em] uppercase text-gold mb-0.5">
                      {item.category}
                    </span>
                    <h3 className="font-display text-base font-bold text-foreground truncate">
                      {item.title}
                    </h3>
                  </div>
                  {/* Arrow indicator */}
                  <div
                    className="shrink-0 ml-3 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "oklch(0.78 0.14 80 / 0.12)",
                      border: "1px solid oklch(0.78 0.14 80 / 0.25)",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8"
                        stroke="oklch(0.78 0.14 80)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
