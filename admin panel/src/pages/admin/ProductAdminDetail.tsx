import { useParams, Link, useNavigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check, Leaf, Package, Droplets, FileText, Image as ImageIcon, Calendar, Pencil, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

export default function ProductAdminDetail() {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const { products, categories, deleteProduct } = useData();

    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <AdminLayout>
                <div className="p-8 text-center bg-card rounded-2xl border shadow-sm max-w-md mx-auto mt-20">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="w-8 h-8 text-muted-foreground opacity-20" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 text-foreground">Product Not Found</h2>
                    <p className="text-muted-foreground mb-6">The product you are looking for might have been removed or the link is broken.</p>
                    <Link to="/admin/products">
                        <Button variant="default" className="w-full">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
                        </Button>
                    </Link>
                </div>
            </AdminLayout>
        );
    }

    const categoryName = product.category_name || categories.find(c => c.id === product.category)?.name || 'Unknown';

    const formatDate = (dateString: string) => {
        if (!dateString) return 'Not available';
        try {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        } catch (e) {
            return dateString;
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            const success = await deleteProduct(product.id);
            if (success) {
                navigate('/admin/products');
            }
        }
    };

    return (
        <AdminLayout>
            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
                {/* Header Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-card/50 p-4 rounded-2xl border border-border/50 backdrop-blur-sm sticky top-0 z-10">
                    <Link to="/admin/products">
                        <Button variant="ghost" className="hover:bg-background">
                            <ArrowLeft className="w-4 h-4 mr-2" /> All Products
                        </Button>
                    </Link>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <Button
                            variant="outline"
                            className="flex-1 sm:flex-none border-primary/20 hover:bg-primary/5 text-primary"
                            onClick={() => navigate('/admin/products', { state: { editProduct: product } })}
                        >
                            <Pencil className="w-4 h-4 mr-2" /> Edit Details
                        </Button>
                        <Button
                            variant="ghost"
                            className="flex-1 sm:flex-none text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={handleDelete}
                        >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Sidebar Info (4/12) */}
                    <div className="lg:col-span-4 space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="group relative aspect-square rounded-3xl overflow-hidden border-4 border-card bg-muted shadow-xl overflow-hidden"
                        >
                            {product.product_images && product.product_images.length > 0 ? (
                                <img
                                    src={product.product_images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                            ) : product.product_image ? (
                                <img
                                    src={product.product_image}
                                    alt={product.name}
                                    className="w-full h-full object-cover shadow-inner"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground p-8">
                                    <ImageIcon className="w-16 h-16 mb-4 opacity-10" />
                                    <span className="font-medium opacity-50">No High-Res Image Available</span>
                                </div>
                            )}
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-3xl" />
                        </motion.div>

                        <div className="bg-card rounded-3xl p-6 border shadow-soft space-y-6">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/70">Category</Label>
                                    <p className="font-bold text-foreground">{categoryName}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${product.product_type === 'Powder' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                                        product.product_type === 'Liquid' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
                                            'bg-red-100 text-red-700 border border-red-200'
                                    }`}>
                                    {product.product_type}
                                </span>
                            </div>

                            <div className="space-y-4">
                                {product.dosage && (
                                    <div className="flex gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10">
                                        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                                            <Droplets className="w-5 h-5 text-primary" />
                                        </div>
                                        <div>
                                            <Label className="text-[10px] uppercase font-bold tracking-widest text-primary/70">Recommended Dosage</Label>
                                            <p className="text-sm font-medium text-foreground/90">{product.dosage}</p>
                                        </div>
                                    </div>
                                )}

                                {product.composition && (
                                    <div className="flex gap-4 p-4 rounded-2xl bg-secondary/5 border border-secondary/10">
                                        <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center shrink-0">
                                            <FileText className="w-5 h-5 text-secondary" />
                                        </div>
                                        <div>
                                            <Label className="text-[10px] uppercase font-bold tracking-widest text-secondary/70">Chemical Composition</Label>
                                            <p className="text-sm font-medium text-foreground/90">{product.composition}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4 opacity-50" />
                                    <span className="text-xs">Created on {formatDate(product.created_at || '')}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content (8/12) */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="bg-card rounded-3xl p-8 border shadow-soft relative overflow-hidden">
                            {/* Decorative background element */}
                            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl" />

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="mb-2">
                                    <span className="text-primary font-bold text-xs uppercase tracking-[0.2em]">Product Overview</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 font-serif leading-tight">{product.name}</h1>
                                <div className="prose prose-slate max-w-none">
                                    <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                        {product.description || "No description provided for this product."}
                                    </p>
                                </div>
                            </motion.div>
                        </div>

                        {product.features && product.features.length > 0 && (
                            <div className="bg-card rounded-3xl p-8 border shadow-soft space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Check className="w-5 h-5 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-bold">Key Benefits & Features</h3>
                                    </div>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {product.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * idx }}
                                            className="group flex gap-4 text-sm text-foreground/80 bg-muted/20 hover:bg-muted/40 p-4 rounded-2xl border border-transparent hover:border-primary/20 transition-all cursor-default"
                                        >
                                            <Check className="w-4 h-4 text-primary mt-0.5 shrink-0 group-hover:scale-125 transition-transform" />
                                            <span className="font-medium">{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="grid sm:grid-cols-2 gap-6">
                            {product.applications && product.applications.length > 0 && (
                                <div className="bg-card rounded-3xl p-8 border shadow-soft space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <Leaf className="w-5 h-5 text-emerald-600" />
                                        </div>
                                        <h3 className="text-xl font-bold">Applications</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.applications.map((app, idx) => (
                                            <span key={idx} className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-sm font-semibold shadow-sm">
                                                {app}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {product.packing && product.packing.length > 0 && (
                                <div className="bg-card rounded-3xl p-8 border shadow-soft space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
                                            <Package className="w-5 h-5 text-amber-600" />
                                        </div>
                                        <h3 className="text-xl font-bold">Packaging Options</h3>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {product.packing.map((pack, idx) => (
                                            <span key={idx} className="px-4 py-2 bg-amber-50 text-amber-700 border border-amber-100 rounded-xl text-sm font-bold shadow-sm">
                                                {pack}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {product.product_images && product.product_images.length > 1 && (
                            <div className="space-y-6 bg-card rounded-3xl p-8 border shadow-soft">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <ImageIcon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-xl font-bold">Product Media Gallery</h3>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                    {product.product_images.map((img, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -5 }}
                                            className="group aspect-square rounded-2xl overflow-hidden border-2 border-muted bg-muted shadow-sm cursor-zoom-in"
                                        >
                                            <img
                                                src={img}
                                                alt={`${product.name} gallery ${idx + 1}`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
