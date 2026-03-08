import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitInquiry } from "@/hooks/useQueries";
import { CheckCircle, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ServiceType } from "../backend.d";

const serviceOptions: { label: string; value: ServiceType }[] = [
  { label: "AI Agent", value: ServiceType.aiAgent },
  { label: "Video Editing", value: ServiceType.videoEditing },
  { label: "Video Thumbnail", value: ServiceType.videoThumbnail },
  { label: "Ads Production", value: ServiceType.adsProduction },
  { label: "Song Video Production", value: ServiceType.songVideoProduction },
  {
    label: "Pre-Wedding Photography",
    value: ServiceType.preWeddingPhotography,
  },
];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<ServiceType | "">("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submitInquiry = useSubmitInquiry();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !service || !message) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      await submitInquiry.mutateAsync({
        name,
        email,
        phone: phone.trim() || null,
        serviceType: service as ServiceType,
        message,
      });
      setSubmitted(true);
      toast.success("Your inquiry has been submitted successfully!");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setService("");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, oklch(0.78 0.14 80 / 0.05) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, oklch(0.45 0.20 300 / 0.06) 0%, transparent 60%)",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-[0.3em] uppercase text-gold/80 mb-4 border border-gold/20 rounded-full px-4 py-1.5">
            Work With Us
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Get a <span className="shimmer-text">Quote</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Tell us about your project, and we'll bring your vision to life with
            our signature touch of magic.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="card-mystical rounded-2xl p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Email Us</p>
                <p className="text-muted-foreground text-sm">
                  hello@viranramystics.com
                </p>
              </div>
            </div>
            <div className="card-mystical rounded-2xl p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Call Us</p>
                <p className="text-muted-foreground text-sm">+91 98765 43210</p>
              </div>
            </div>
            <div className="card-mystical rounded-2xl p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-gold" />
              </div>
              <div>
                <p className="font-semibold text-sm mb-1">Visit Us</p>
                <p className="text-muted-foreground text-sm">
                  Mumbai, Maharashtra, India
                </p>
              </div>
            </div>

            {/* Decorative quote */}
            <div className="card-mystical rounded-2xl p-6 border-l-2 border-l-gold/60 mt-2">
              <p className="font-serif-alt text-base text-muted-foreground leading-relaxed italic">
                "Every great project begins with a single conversation. Let's
                start yours."
              </p>
              <p className="text-xs text-gold mt-3 font-medium">
                — Viranra Mystics Team
              </p>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="card-mystical rounded-2xl p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center py-10 gap-6"
                  data-ocid="contact.success_state"
                >
                  <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center animate-pulse-gold">
                    <CheckCircle className="w-10 h-10 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold mb-2">
                      Inquiry Submitted!
                    </h3>
                    <p className="text-muted-foreground text-sm max-w-xs">
                      Thank you for reaching out. Our team will get back to you
                      within 24 hours.
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={resetForm}
                    className="border-gold/30 hover:border-gold hover:text-gold"
                  >
                    Submit Another Inquiry
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        placeholder="Arjun Sharma"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-input/50 border-border/60 focus:border-gold/50 focus:ring-gold/20"
                        required
                        data-ocid="contact.input"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="arjun@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-input/50 border-border/60 focus:border-gold/50 focus:ring-gold/20"
                        required
                        data-ocid="contact.input"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone (optional)
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="bg-input/50 border-border/60 focus:border-gold/50 focus:ring-gold/20"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="service" className="text-sm font-medium">
                        Service <span className="text-destructive">*</span>
                      </Label>
                      <Select
                        value={service}
                        onValueChange={(v) => setService(v as ServiceType)}
                      >
                        <SelectTrigger
                          id="service"
                          className="bg-input/50 border-border/60 focus:border-gold/50"
                          data-ocid="contact.select"
                        >
                          <SelectValue placeholder="Choose a service" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border/60">
                          {serviceOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project, timeline, and any specific requirements..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="bg-input/50 border-border/60 focus:border-gold/50 focus:ring-gold/20 resize-none"
                      required
                      data-ocid="contact.textarea"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitInquiry.isPending}
                    className="w-full bg-gold text-primary-foreground hover:opacity-90 font-semibold py-6 text-base rounded-xl glow-gold mt-2"
                    data-ocid="contact.submit_button"
                  >
                    {submitInquiry.isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      "Send Inquiry"
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
