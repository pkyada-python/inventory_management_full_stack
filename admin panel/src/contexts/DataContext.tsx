import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Category, User, Product, Inquiry } from '@/types/admin';

interface DataContextType {
  categories: Category[];
  products: Product[];
  users: User[];
  inquiries: Inquiry[];
  addCategory: (category: Omit<Category, 'id' | 'created_at'>) => Promise<boolean>;
  updateCategory: (id: string, category: Omit<Category, 'id'>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  uploadImages: (files: File[]) => Promise<string[]>;
  addProduct: (product: any) => Promise<boolean>;
  updateProduct: (id: string, product: Omit<Product, 'id' | 'created_at'>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Omit<User, 'id' | 'createdAt'>) => void;
  deleteUser: (id: string) => void;
  fetchInquiries: () => Promise<void>;
  refreshData: () => Promise<void>;
  isLoading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const initialUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'admin', createdAt: '2024-01-01' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', createdAt: '2024-01-02' },
  { id: '3', name: 'Bob Wilson', email: 'bob@example.com', role: 'user', createdAt: '2024-01-03' },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('/api/category/getallcategory', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        let fetchedCategories: Category[] = [];

        if (Array.isArray(data)) {
          fetchedCategories = data;
        } else if (data && typeof data === 'object' && Array.isArray(data.categories)) {
          fetchedCategories = data.categories;
        } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
          fetchedCategories = data.data;
        }

        // Normalize ID (handle both id and _id from MongoDB/Python backends)
        const normalizedCategories = fetchedCategories.map(cat => ({
          ...cat,
          id: cat.id || (cat as any)._id?.toString() || Math.random().toString()
        }));

        setCategories(normalizedCategories);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProducts = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('/api/product/getallproduct', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        let fetchedProducts: Product[] = [];

        if (Array.isArray(data)) {
          fetchedProducts = data;
        } else if (data && typeof data === 'object' && Array.isArray(data.products)) {
          fetchedProducts = data.products;
        } else if (data && typeof data === 'object' && Array.isArray(data.data)) {
          fetchedProducts = data.data;
        }

        // Normalize ID (handle both id and _id from backend)
        const normalizedProducts = fetchedProducts.map(prod => ({
          ...prod,
          id: prod.id || (prod as any)._id?.toString() || Math.random().toString(),
          // Use product_image from backend, fallback if it was somehow missing
          product_image: prod.product_image || (prod as any).image
        }));

        setProducts(normalizedProducts);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const fetchInquiries = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('/api/inquiry/getallinquiry', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const resData = await response.json();
        const data = resData.data || [];

        // Normalize ID
        const normalizedInquiries = data.map((inq: any) => ({
          ...inq,
          id: inq.id || inq._id?.toString() || Math.random().toString()
        }));

        setInquiries(normalizedInquiries);
      }
    } catch (error) {
      console.error('Failed to fetch inquiries:', error);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    await Promise.all([
      fetchCategories(),
      fetchProducts(),
      fetchInquiries()
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const addCategory = async (category: Omit<Category, 'id' | 'created_at'>) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('/api/category/addcategory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        await fetchCategories();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding category:', error);
      return false;
    }
  };

  const updateCategory = async (id: string, category: Omit<Category, 'id'>) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`/api/category/updatecategory/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(category),
      });

      if (response.ok) {
        await fetchCategories();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating category:', error);
      return false;
    }
  };

  const deleteCategory = async (id: string) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`/api/category/deletecategory/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchCategories();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting category:', error);
      return false;
    }
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const token = localStorage.getItem('authToken');
    const data = new FormData();
    files.forEach(file => data.append('files', file));

    try {
      const response = await fetch('/api/product/upload-images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        return result.image_urls;
      }
      return [];
    } catch (error) {
      console.error('Error uploading images:', error);
      return [];
    }
  };

  const addProduct = async (productData: any) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('/api/product/addproduct', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        await fetchProducts();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error adding product:', error);
      return false;
    }
  };

  const updateProduct = async (id: string, product: Omit<Product, 'id' | 'created_at'>) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`/api/product/updateproduct/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        await fetchProducts();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error updating product:', error);
      return false;
    }
  };

  const deleteProduct = async (id: string) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(`/api/product/deleteproduct/${id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchProducts();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting product:', error);
      return false;
    }
  };

  const addUser = (user: Omit<User, 'id' | 'createdAt'>) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setUsers(prev => [...prev, newUser]);
  };

  const updateUser = (id: string, user: Omit<User, 'id' | 'createdAt'>) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...user } : u));
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <DataContext.Provider value={{
      categories, products, users, inquiries,
      addCategory, updateCategory, deleteCategory,
      uploadImages, addProduct, updateProduct, deleteProduct,
      addUser, updateUser, deleteUser,
      fetchInquiries, refreshData,
      isLoading
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
