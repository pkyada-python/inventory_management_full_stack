import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Leaf, FlaskConical, Bug, Sprout, Droplets, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  Sprout,
  Leaf,
  FlaskConical,
  Bug,
  Shield,
  Droplets,
};

export const Products = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/product/get_all_category_all_product');

        if (response.ok) {
          const result = await response.json();
          const groupedData = result.data || [];

          const mappedCategories = groupedData.map((group: any) => ({
            name: group.category_name,
            slug: group.category_name.toLowerCase().replace(/\s+/g, '-'),
            icon: "Leaf", // Default icon
            description: group.category_description || "",
            products: group.products.map((p: any) => ({
              id: p._id,
              name: p.name,
              category: group.category_name,
              categorySlug: group.category_name.toLowerCase().replace(/\s+/g, '-'),
              description: p.description,
              features: [],
              applications: [],
              image: "/placeholder.svg"
            }))
          }));

          setCategories(mappedCategories);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

  }, []);

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

        {/* Category Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
            <p className="text-muted-foreground animate-pulse">Loading premium catalog...</p>
          </div>
        ) : categories.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => {
              const IconComponent = iconMap[category.icon] || Leaf;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link
                    to={`/category/${category.slug}`}
                    className="group relative block h-full bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lifted hover:border-primary/40 transition-all duration-500"
                  >
                    {/* Visual Decor */}
                    <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-500">
                      <IconComponent className="w-32 h-32" />
                    </div>

                    <div className="p-8 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner">
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <span className="text-sm font-bold text-secondary bg-secondary/5 px-3 py-1 rounded-full border border-secondary/10">
                          {category.products.length} Products
                        </span>
                      </div>

                      <div className="flex-1">
                        <h3 className="font-serif text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                          {category.name}
                        </h3>
                        {/* <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                          Explore our premium range of {category.name.toLowerCase()} designed for sustainable and high-yield farming.
                        </p> */}
                      </div>

                      <div className="inline-flex items-center gap-2 text-primary font-bold text-sm tracking-wide uppercase group-hover:gap-3 transition-all duration-300">
                        View Category
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border/50">
            <Leaf className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-20" />
            <p className="text-muted-foreground text-lg">No products found in our catalog yet.</p>
          </div>
        )}


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
