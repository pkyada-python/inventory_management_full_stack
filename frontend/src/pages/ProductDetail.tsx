import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Leaf, Package, Droplets, FileText, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductInquiryModal } from "@/components/ProductInquiryModal";
import { getProductById, getAllProducts } from "@/data/products";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);

  useEffect(() => {
    const findProduct = async () => {
      setIsLoading(true);
      try {
        // Try local data first
        const localProduct = productId ? getProductById(productId) : undefined;

        if (localProduct) {
          setProduct(localProduct);
          const related = getAllProducts()
            .filter(p => p.categorySlug === localProduct.categorySlug && p.id !== localProduct.id)
            .slice(0, 3);
          setRelatedProducts(related);
        } else if (productId) {
          // Try backend
          const response = await fetch(`/api/product/getproductbyid/${productId}`);
          if (response.ok) {
            const result = await response.json();
            const p = result.data;
            if (p) {
              const mappedProduct = {
                id: p._id,
                name: p.name,
                category: p.category_name || "Biologicals",
                categorySlug: (p.category_name || "biologicals").toLowerCase().replace(/\s+/g, '-'),
                description: p.description,
                features: [],
                applications: [],
                image: "/placeholder.svg"
              };
              setProduct(mappedProduct);

              // Try to fetch related from backend too
              const relRes = await fetch(`/api/product/getallproduct`);
              if (relRes.ok) {
                const relData = await relRes.json();
                const allBackProds = relData.data || [];
                const relatedBack = allBackProds
                  .filter((rp: any) => rp.category === p.category && rp._id !== p._id)
                  .map((rp: any) => ({
                    id: rp._id,
                    name: rp.name,
                    description: rp.description,
                    image: "/placeholder.svg"
                  }))
                  .slice(0, 3);
                setRelatedProducts(relatedBack);
              }
            }
          }
        }
      } catch (error) {
        console.error("Error finding product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    findProduct();
  }, [productId]);

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

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
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

      {/* Breadcrumb */}
      <div className="pt-24 pb-4 bg-muted/30">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/#products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <Link to={`/#products`} className="hover:text-primary transition-colors">{product.category}</Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Hero */}
      <section className="py-12 lg:py-20">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl overflow-hidden border border-border/50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
              </div>
              {/* Category Badge */}
              <div className="absolute top-6 left-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg">
                  <Leaf className="w-4 h-4" />
                  {product.category}
                </span>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-8"
            >
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
                    <Check className="w-5 h-5 text-primary" />
                    Key Features
                  </h3>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {product.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-start gap-3 text-muted-foreground">
                        <div className="w-2 h-2 rounded-full bg-secondary shrink-0 mt-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Applications */}
              {product.applications && product.applications.length > 0 && (
                <div className="space-y-4">
                  <h3 className="font-serif text-xl font-semibold text-foreground flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-primary" />
                    Applications
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.applications.map((app: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-primary/10 text-primary text-sm font-medium rounded-full"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="default"
                  size="xl"
                  className="w-full sm:w-auto font-bold"
                  onClick={() => setIsInquiryModalOpen(true)}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Send Inquiry
                </Button>
                <a href="tel:08045802800" className="w-full sm:w-auto">
                  <Button variant="outline" size="xl" className="w-full sm:w-auto">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ProductInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        productName={product.name}
        categoryName={product.category}
      />

      {/* Product Details */}
      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Dosage */}
            {product.dosage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Droplets className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Dosage</h3>
                <p className="text-muted-foreground">{product.dosage}</p>
              </motion.div>
            )}

            {/* Composition */}
            {product.composition && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Composition</h3>
                <p className="text-muted-foreground">{product.composition}</p>
              </motion.div>
            )}

            {/* Packing */}
            {product.packing && product.packing.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-card rounded-2xl p-6 border border-border/50 shadow-soft"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Available Packing</h3>
                <div className="flex flex-wrap gap-2">
                  {product.packing.map((pack, index) => (
                    <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-sm rounded">
                      {pack}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 lg:py-20">
          <div className="container-wide mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
                Related Products
              </h2>
              <p className="text-muted-foreground">
                More products in {product.category}
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct, index) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={`/product/${relatedProduct.id}`}
                    className="block bg-card rounded-2xl border border-border/50 overflow-hidden hover:shadow-lifted hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 relative overflow-hidden">
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {relatedProduct.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-10">
              <Link to="/#products">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;
