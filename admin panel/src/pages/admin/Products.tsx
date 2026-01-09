import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { useData } from '@/contexts/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Pencil, Trash2, ImagePlus, X, Eye } from 'lucide-react';
import { Product, ProductType } from '@/types/admin';

export default function Products() {
  const { products, categories, addProduct, updateProduct, deleteProduct, uploadImages } = useData();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (location.state && (location.state as any).editProduct) {
      handleEdit((location.state as any).editProduct);
      // Clear state so it doesn't re-open on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    product_type: 'Powder' as ProductType,
    features: '',
    applications: '',
    dosage: '',
    composition: '',
    packing: ''
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let success = false;
      if (editingProduct) {
        // 1. Upload new images if any
        let newImageUrls: string[] = [];
        if (selectedFiles.length > 0) {
          newImageUrls = await uploadImages(selectedFiles);
          if (newImageUrls.length === 0) {
            setError('Failed to upload new images.');
            setIsLoading(false);
            return;
          }
        }

        // 2. Filter out deleted images and add new ones
        const finalImages = [
          ...existingImages.filter(img => !imagesToDelete.includes(img)),
          ...newImageUrls
        ];

        if (finalImages.length === 0) {
          setError('At least one image is required.');
          setIsLoading(false);
          return;
        }

        // 3. Prepare Update Payload
        const updatedProductData: any = {
          ...formData,
          features: formData.features.split(',').map(s => s.trim()).filter(s => s),
          applications: formData.applications.split(',').map(s => s.trim()).filter(s => s),
          packing: formData.packing.split(',').map(s => s.trim()).filter(s => s),
          product_images: finalImages
        };
        success = await updateProduct(editingProduct.id, updatedProductData);
      } else {
        // 1. Check if images are selected
        if (selectedFiles.length === 0) {
          setError('At least one image is required.');
          setIsLoading(false);
          return;
        }

        // 2. Upload images first to get Cloudinary URLs
        const imageUrls = await uploadImages(selectedFiles);
        if (imageUrls.length === 0) {
          setError('Failed to upload images. Please try again.');
          setIsLoading(false);
          return;
        }

        // 3. Prepare JSON payload
        const productJson = {
          name: formData.name,
          category: formData.category,
          description: formData.description,
          product_type: formData.product_type,
          dosage: formData.dosage,
          composition: formData.composition,
          product_images: imageUrls,
          features: formData.features.split(',').map(s => s.trim()).filter(s => s),
          applications: formData.applications.split(',').map(s => s.trim()).filter(s => s),
          packing: formData.packing.split(',').map(s => s.trim()).filter(s => s)
        };

        // 4. Send as JSON
        success = await addProduct(productJson);
      }


      if (success) {
        handleClose();
      } else {
        setError('Failed to save product. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      description: product.description,
      product_type: product.product_type,
      features: (product.features || []).join(', '),
      applications: (product.applications || []).join(', '),
      dosage: product.dosage || '',
      composition: product.composition || '',
      packing: (product.packing || []).join(', ')
    });
    setExistingImages(product.product_images || []);
    setImagesToDelete([]);
    setIsOpen(true);
  };

  // const deleteProduct = async (id: string) => {
  //   const success = await deleteProduct(id);
  //   if (success) {
  //     handleClose();
  //   }
  // };  

  const handleClose = () => {
    setIsOpen(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      description: '',
      product_type: 'Powder',
      features: '',
      applications: '',
      dosage: '',
      composition: '',
      packing: ''
    });
    setSelectedFiles([]);
    setExistingImages([]);
    setImagesToDelete([]);
    setError(null);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Products</h1>
          <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
            <DialogTrigger asChild>
              <Button onClick={() => setIsOpen(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                {error && (
                  <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
                    {error}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      placeholder="Enter product name"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="product_type">Product Type</Label>
                    <Select
                      value={formData.product_type}
                      onValueChange={(v) => setFormData({ ...formData, product_type: v as ProductType })}
                      disabled={isLoading}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Powder">Powder</SelectItem>
                        <SelectItem value="Liquid">Liquid</SelectItem>
                        <SelectItem value="Return">Return</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category || undefined}
                    onValueChange={(v) => setFormData({ ...formData, category: v })}
                    disabled={isLoading || categories.length === 0}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={categories.length === 0 ? "Loading categories..." : "Select category"} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter product description"
                    rows={2}
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      value={formData.dosage}
                      onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                      placeholder="e.g. 1-2 ml per liter"
                      disabled={isLoading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="composition">Composition</Label>
                    <Input
                      id="composition"
                      value={formData.composition}
                      onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                      placeholder="e.g. Nitrobenzene 20%"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (comma separated)</Label>
                  <Input
                    id="features"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Feature 1, Feature 2"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applications">Applications (comma separated)</Label>
                  <Input
                    id="applications"
                    value={formData.applications}
                    onChange={(e) => setFormData({ ...formData, applications: e.target.value })}
                    placeholder="Cotton, Vegetables"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="packing">Packing (comma separated)</Label>
                  <Input
                    id="packing"
                    value={formData.packing}
                    onChange={(e) => setFormData({ ...formData, packing: e.target.value })}
                    placeholder="100ml, 250ml"
                    disabled={isLoading}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="images">Product Images (At least one required)</Label>
                  <div className="grid grid-cols-4 gap-2 mb-2">
                    {/* Existing Images */}
                    {existingImages.filter(img => !imagesToDelete.includes(img)).map((img, idx) => (
                      <div key={`existing-${idx}`} className="relative aspect-square rounded-md overflow-hidden bg-muted border">
                        <img
                          src={img}
                          alt="existing"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setImagesToDelete(prev => [...prev, img])}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}

                    {/* New Files Preview */}
                    {selectedFiles.map((file, idx) => (
                      <div key={`new-${idx}`} className="relative aspect-square rounded-md overflow-hidden bg-muted border-2 border-primary/30">
                        <img
                          src={URL.createObjectURL(file)}
                          alt="preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== idx))}
                          className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-primary/80 text-[8px] text-white text-center py-0.5 font-bold uppercase">New</div>
                      </div>
                    ))}
                    <label className="flex flex-col items-center justify-center aspect-square rounded-md border border-dashed border-primary/50 bg-primary/5 hover:bg-primary/10 cursor-pointer transition-colors">
                      <ImagePlus className="h-6 w-6 text-primary mb-1" />
                      <span className="text-[10px] font-medium text-primary">Add Image</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files) {
                            setSelectedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>


                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Saving...' : (editingProduct ? 'Update Product' : 'Create Product')}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg bg-card overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-bold">Image</TableHead>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Type</TableHead>
                <TableHead className="font-bold">Description</TableHead>
                <TableHead className="font-bold">Created</TableHead>
                <TableHead className="w-24 text-center font-bold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No products found. Add your first product to get started.
                  </TableCell>
                </TableRow>
              ) : (
                products.map((product) => (
                  <TableRow key={product.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell>
                      <div className="w-12 h-12 rounded bg-muted overflow-hidden border">
                        {product.product_images && product.product_images.length > 0 ? (
                          <img src={product.product_images[0]} alt={product.name} className="w-full h-full object-cover" />
                        ) : product.product_image ? (
                          <img src={product.product_image} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-muted-foreground">No img</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{product.name}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                        {product.category_name || categories.find(c => c.id === product.category)?.name || 'Unknown'}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.product_type === 'Powder' ? 'bg-orange-100 text-orange-700' :
                        product.product_type === 'Liquid' ? 'bg-blue-100 text-blue-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                        {product.product_type}
                      </span>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">{product.description}</TableCell>
                    <TableCell className="whitespace-nowrap text-muted-foreground text-sm">
                      {formatDate(product.created_at || '')}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-center gap-1">
                        <Link to={`/admin/products/${product.id}`}>
                          <Button size="icon" variant="ghost" title="View Details">
                            <Eye className="h-4 w-4 text-primary" />
                          </Button>
                        </Link>
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(product)} title="Edit">
                          <Pencil className="h-4 w-4 text-slate-600" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => deleteProduct(product.id)} title="Delete">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
