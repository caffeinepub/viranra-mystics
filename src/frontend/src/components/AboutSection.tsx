import { Cpu, Heart, Star } from "lucide-react";
import { motion } from "motion/react";

const pillars = [
  {
    icon: Star,
    title: "Creative Excellence",
    description:
      "Every frame, pixel, and note is crafted with obsessive attention to detail and an uncompromising commitment to quality.",
  },
  {
    icon: Cpu,
    title: "AI-Powered",
    description:
      "We harness cutting-edge artificial intelligence to amplify human creativity, delivering smarter and faster results.",
  },
  {
    icon: Heart,
    title: "Client-Focused",
    description:
      "Your vision drives everything we do. We listen deeply, collaborate closely, and deliver beyond expectations.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      {/* Decorative glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.45 0.20 300 / 0.08) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-gold/80 mb-4 border border-gold/20 rounded-full px-4 py-1.5">
              Our Story
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About <span className="shimmer-text">Viranra</span>
              <br />
              Mystics
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-6">
              Viranra Mystics was founded with a singular belief: that
              creativity and technology, when blended with artistry, can produce
              work that transcends the ordinary. We are a premium creative
              studio passionate about visual storytelling, AI innovation, and
              crafting unforgettable memories.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed">
              From automating businesses with intelligent AI agents to capturing
              the tender pre-wedding moments that become cherished memories —
              every project we touch is infused with a touch of magic. Because
              at Viranra Mystics, we don't just deliver content. We create{" "}
              <em className="text-gold not-italic">experiences</em>.
            </p>
          </motion.div>

          {/* Right: Pillars */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-6"
          >
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="card-mystical rounded-2xl p-6 flex gap-5 items-start group hover-lift"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "200+", label: "Projects Delivered" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "6", label: "Core Services" },
            { value: "5★", label: "Average Rating" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card-mystical rounded-2xl p-6 text-center"
            >
              <p className="font-display text-3xl md:text-4xl font-bold text-gold mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
