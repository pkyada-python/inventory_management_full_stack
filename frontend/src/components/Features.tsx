import { motion } from "framer-motion";
import { Shield, Building2, Boxes, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description:
      "Since the inception, we have been a quality-conscious organization. Every product meets rigorous standards for safety, efficiency, and accurate chemical composition.",
  },
  {
    icon: Building2,
    title: "Infrastructure Facilities",
    description:
      "Our well-equipped infrastructural unit helps us to run effective manufacturing operations with cutting-edge research and development methods.",
  },
  {
    icon: Boxes,
    title: "Product Range",
    description:
      "We are making use of the high grade chemicals and natural ingredients to create a comprehensive range of bio products for organic farming and crops.",
  },
];

export const Features = () => {
  return (
    <section id="features" className="section-padding bg-gradient-nature">
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
            Why Choose Us
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Committed to Excellence
          </h2>
          <p className="text-muted-foreground text-lg">
            Our dedication to quality and innovation makes us a trusted leader in
            agricultural bio-products.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="h-full bg-card rounded-2xl p-8 shadow-soft hover:shadow-lifted transition-all duration-300 border border-border/50 hover:border-primary/30 hover:-translate-y-1">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>

                {/* Content */}
                <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Link */}
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
