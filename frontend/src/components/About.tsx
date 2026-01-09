import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award, Users, Calendar, FileText } from "lucide-react";
import aboutImage from "@/assets/about-image.jpg";

const stats = [
  { icon: Calendar, value: "2008", label: "Established" },
  { icon: Users, value: "1000+", label: "Happy Clients" },
  { icon: Award, value: "100+", label: "Products" },
  { icon: FileText, value: "15+", label: "Years Experience" },
];

export const About = () => {
  return (
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-wide mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lifted">
              <img
                src={aboutImage}
                alt="Redox Industries Products"
                className="w-full h-[400px] lg:h-[500px] object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-6 shadow-lifted border border-border/50"
            >
              <div className="text-center">
                <span className="block font-serif text-4xl font-bold text-primary">
                  15+
                </span>
                <span className="text-muted-foreground text-sm">
                  Years of Excellence
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
              About Us
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Redox Industries Limited
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
              <p>
                Established in 2008, Redox Industries Limited is a manufacturer
                and supplier of plant nutrients, pesticides, growth promoters,
                and insecticides. Since then, thanks to our superior quality
                product offering, we have earned a stellar reputation among
                customers and major competitors in our sector.
              </p>
              <p>
                We carry various products, including Receptone (Bio Stimulant),
                Retry (Growth Promoter), Reset, Refund, Rowdy, Regold, Refil ++,
                RDX Bio Pesticide, Reshot Super, Recure Bio Fungicide, Return.
                Our products are widely recognized for their safe application,
                efficiency, accurate chemical composition and pH value.
              </p>
              <p>
                Plant-based alkaloids are mixed with microbial enzymes to make
                our products, which are optimized for warding off various plant
                pests and illnesses. Our products are developed utilizing
                cutting-edge research and development methods to meet all quality
                standards.
              </p>
            </div>

            {/* Leadership */}
            <div className="bg-primary/5 rounded-xl p-4 mb-8 border border-primary/10">
              <p className="text-foreground">
                With the help of our <strong>CEO, Mr. Janak Dhameliya</strong>,
                and{" "}
                <strong>Managing Director, Mr. Hitesh Kumbhani</strong>, we have
                become a leader in our field.
              </p>
            </div>

            {/* Note */}
            <div className="bg-secondary/20 rounded-xl p-4 mb-8 border border-secondary/30">
              <p className="text-foreground font-medium text-center">
                "We are accepting orders in bulk only by Resellers."
              </p>
            </div>

          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-6 text-center shadow-soft border border-border/50 hover:shadow-lifted hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <span className="block font-serif text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </span>
              <span className="text-muted-foreground text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
