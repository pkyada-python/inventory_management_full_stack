import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Category, User, Product } from '@/types/admin';

interface DataContextType {
  categories: Category[];
  products: Product[];
  users: User[];
  addCategory: (category: Omit<Category, 'id' | 'created_at'>) => Promise<boolean>;
  updateCategory: (id: string, category: Omit<Category, 'id' | 'created_at'>) => Promise<boolean>;
  deleteCategory: (id: string) => Promise<boolean>;
  addProduct: (product: Omit<Product, 'id' | 'created_at'>) => Promise<boolean>;
  updateProduct: (id: string, product: Omit<Product, 'id' | 'created_at'>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;
  addUser: (user: Omit<User, 'id' | 'createdAt'>) => void;
  updateUser: (id: string, user: Omit<User, 'id' | 'createdAt'>) => void;
  deleteUser: (id: string) => void;
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
          id: prod.id || (prod as any)._id?.toString() || Math.random().toString()
        }));

        setProducts(normalizedProducts);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
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

  const updateCategory = async (id: string, category: Omit<Category, 'id' | 'created_at'>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...category } : c));
    return true;
  };

  const deleteCategory = async (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    return true;
  };

  const addProduct = async (product: Omit<Product, 'id' | 'created_at'>) => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('/api/product/addproduct', {
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
      console.error('Error adding product:', error);
      return false;
    }
  };

  const updateProduct = async (id: string, product: Omit<Product, 'id' | 'created_at'>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...product } : p));
    return true;
  };

  const deleteProduct = async (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    return true;
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
      categories, products, users,
      addCategory, updateCategory, deleteCategory,
      addProduct, updateProduct, deleteProduct,
      addUser, updateUser, deleteUser
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
