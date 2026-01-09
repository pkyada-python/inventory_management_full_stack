import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Send, MessageSquare } from "lucide-react";

export const Contact = () => {
  return (
    <section id="contact" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
            Get In Touch
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's Talk Business!
          </h2>
          <p className="text-muted-foreground text-lg">
            Please take a quick moment to complete this form and a business
            representative will get back to you swiftly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  Request a Quote
                </h3>
              </div>

              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Your Name
                    </label>
                    <Input
                      placeholder="Enter your name"
                      className="bg-background border-border/50 focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Phone Number
                    </label>
                    <Input
                      placeholder="Enter your phone number"
                      className="bg-background border-border/50 focus:border-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    className="bg-background border-border/50 focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Your Message
                  </label>
                  <Textarea
                    placeholder="Tell us about your requirements..."
                    rows={5}
                    className="bg-background border-border/50 focus:border-primary resize-none"
                  />
                </div>
                <Button variant="gold" size="lg" className="w-full">
                  <Send className="w-4 h-4" />
                  Send Inquiry
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-8">
              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-foreground mb-1">
                    Call Us
                  </h4>
                  <a
                    href="tel:08045802800"
                    className="text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    08045802800
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-foreground mb-1">
                    Email Us
                  </h4>
                  <a
                    href="mailto:info@redoxagro.com"
                    className="text-muted-foreground hover:text-primary transition-colors text-lg"
                  >
                    info@redoxagro.com
                  </a>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-foreground mb-1">
                    Visit Us
                  </h4>
                  <p className="text-muted-foreground text-lg">
                    Redox Industries Limited
                    <br />
                    Gujarat, India
                  </p>
                </div>
              </div>

              {/* CTA Box */}
              <div className="bg-primary rounded-2xl p-8 text-primary-foreground mt-8">
                <h4 className="font-serif text-2xl font-bold mb-3">
                  Ready to Grow?
                </h4>
                <p className="text-primary-foreground/80 mb-6">
                  We are also engaged in importing quality products like Humic
                  Acid, Sulphur, Bio Pesticide, Seaweed, and more.
                </p>
                <Button variant="hero" size="lg">
                  Request Catalog
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
