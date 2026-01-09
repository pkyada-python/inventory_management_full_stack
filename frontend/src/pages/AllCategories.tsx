import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, FlaskConical, Bug, Sprout, Droplets, Shield, ArrowRight } from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
    Sprout,
    Leaf,
    FlaskConical,
    Bug,
    Shield,
    Droplets,
};

const AllCategories = () => {
    const [categories, setCategories] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/product/get-all-category-all-product');
                if (response.ok) {
                    const result = await response.json();
                    setCategories(result.data || []);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-24 pb-20">
                <section className="container-wide mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                            All Product <span className="text-primary">Categories</span>
                        </h1>
                        <p className="text-muted-foreground text-lg">
                            Explore our complete range of specialized bio products for sustainable agriculture.
                        </p>
                    </motion.div>

                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
                            <p className="text-muted-foreground">Loading catalog...</p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categories.map((category, index) => {
                                const IconComponent = iconMap[category.icon] || Leaf;
                                return (
                                    <motion.div
                                        key={category.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={`/category/${category.slug}`}
                                            className="group relative block h-full bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lifted hover:border-primary/40 transition-all duration-500"
                                        >
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
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default AllCategories;
