import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Leaf, FlaskConical, Bug, Sprout, Droplets, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { productCategories } from "@/data/products";

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  Leaf,
  FlaskConical,
  Bug,
  Shield,
  Droplets,
};

export const Products = () => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (name: string) => {
    setExpandedCategory(expandedCategory === name ? null : name);
  };

  return (
    <section id="products" className="section-padding bg-background">
      <div className="container-wide mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-semibold text-secondary uppercase tracking-wider mb-4">
            Our Products
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Premium Bio Products for{" "}
            <span className="text-primary">Organic Farming</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Bio products like Bio Pesticide, Organic Pesticide, Bio Fertilizer,
            Plant Growth Promoter, Bio Growth Hormone, and more.
          </p>
        </motion.div>

        {/* Products Grid - Accordion Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productCategories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Leaf;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group"
              >
                <div
                  className={`bg-card rounded-xl border transition-all duration-300 overflow-hidden ${
                    expandedCategory === category.name
                      ? "border-primary shadow-lifted"
                      : "border-border/50 hover:border-primary/30 hover:shadow-soft"
                  }`}
                >
                  {/* Category Header */}
                  <button
                    onClick={() => toggleCategory(category.name)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                          expandedCategory === category.name
                            ? "bg-primary text-primary-foreground"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {category.name}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {category.products.length} products
                        </span>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                        expandedCategory === category.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Products List */}
                  <AnimatePresence>
                    {expandedCategory === category.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 pt-0">
                          <div className="border-t border-border/50 pt-4">
                            <ul className="space-y-2">
                              {category.products.map((product) => (
                                <li
                                  key={product.id}
                                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group/item"
                                >
                                  <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                                  <Link 
                                    to={`/product/${product.id}`}
                                    className="flex-1 hover:text-primary transition-colors"
                                  >
                                    {product.name}
                                  </Link>
                                  <Link
                                    to={`/product/${product.id}`}
                                    className="text-xs text-primary opacity-0 group-hover/item:opacity-100 transition-opacity"
                                  >
                                    View →
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <a
                              href="#contact"
                              className="inline-flex items-center gap-2 text-primary font-medium text-sm mt-4 hover:gap-3 transition-all"
                            >
                              Inquire About This Category
                              <ArrowRight className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Products Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 bg-muted/50 rounded-2xl p-8 text-center border border-border/50"
        >
          <h3 className="font-serif text-xl font-bold text-foreground mb-3">
            Additional Products Available
          </h3>
          <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
            We also offer Humic Acid, Fulvic Acid, Folic Acid, Natural
            Brassinolide, 6-Benzylaminopurine, Isopropyl Alcohol, Plant
            Nutrients, Emulsifiers, and many more specialized agricultural
            products.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {[
              "Humic Acid",
              "Fulvic Acid",
              "Seaweed Activator",
              "Agricultural Pesticides",
              "Organic Soil Conditioners",
              "Plant Nutrient",
              "Emulsifier",
              "Natural Brassinolide",
            ].map((item) => (
              <span
                key={item}
                className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
              >
                {item}
              </span>
            ))}
          </div>
          <Button variant="default" size="lg">
            Contact for Full Product Catalog
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
