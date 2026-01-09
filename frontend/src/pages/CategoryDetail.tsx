import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Leaf, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CategoryDetail = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const [categoryData, setCategoryData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCategoryProducts = async () => {
            setIsLoading(true);
            try {
                // Use the standardized hyphenated URL
                const response = await fetch('/api/product/get-all-category-all-product');
                if (response.ok) {
                    const result = await response.json();
                    const allCategories = result.data || [];

                    // The API now returns slugs directly, making lookup easy
                    const foundCategory = allCategories.find((cat: any) =>
                        cat.slug === categorySlug
                    );

                    if (foundCategory) {
                        // console.log(foundCategory);
                        setCategoryData(foundCategory);
                    }
                }
            } catch (error) {
                console.error("Error fetching category products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategoryProducts();
        window.scrollTo(0, 0);
    }, [categorySlug]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!categoryData) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
                        <p className="text-muted-foreground mb-6">The category you're looking for doesn't exist.</p>
                        <Link to="/#products">
                            <Button variant="default">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Products
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            {/* Hero Section with Category Info */}
            <section className="pt-32 pb-16 bg-muted/30">
                <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="max-w-4xl mx-auto text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full mb-6">
                            <Leaf className="w-4 h-4" />
                            <span className="text-sm font-semibold uppercase tracking-wider">Agro Products</span>
                        </div>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
                            {categoryData.name}
                        </h1>
                        {categoryData.description && (
                            <p className="text-lg text-muted-foreground leading-relaxed italic">
                                {categoryData.description}
                            </p>
                        )}
                    </motion.div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-16 lg:py-24">
                <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-12 border-b border-border/50 pb-6">
                        <h2 className="font-serif text-2xl font-bold text-foreground flex items-center gap-2">
                            <LayoutGrid className="w-6 h-6 text-primary" />
                            Products in this Category
                        </h2>
                        <span className="text-muted-foreground font-medium">
                            {categoryData.products.length} Products Found
                        </span>
                    </div>

                    {categoryData.products.length > 0 ? (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {categoryData.products.map((product: any, index: number) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    <Link
                                        to={`/product/${product.id}`}
                                        className="group block bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lifted hover:border-primary/30 transition-all duration-500"
                                    >
                                        <div className="aspect-square bg-muted relative overflow-hidden">
                                            <img
                                                src={product.product_images?.[0] || product.product_image || "/placeholder.svg"}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                                <span className="text-white text-sm font-medium flex items-center gap-1">
                                                    View Details <ArrowLeft className="w-4 h-4 rotate-180" />
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 text-center">
                                            <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                                {product.name}
                                            </h3>
                                            <div className="w-12 h-1 bg-secondary mx-auto mt-4 rounded-full group-hover:w-20 transition-all duration-300" />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-border">
                            <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground text-lg">No products available in this category yet.</p>
                            <Link to="/#products" className="mt-6 inline-block">
                                <Button variant="outline">Browse Other Categories</Button>
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Back to Home CTA */}
            <section className="pb-24">
                <div className="container-wide mx-auto px-4 text-center">
                    <Link to="/#products">
                        <Button variant="ghost" size="lg" className="hover:bg-primary/5 hover:text-inherit">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to All Agro Products
                        </Button>
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default CategoryDetail;
