export interface Category {
  id: string;
  name: string;
  category_name_slug: string;
  description: string;
  created_at: string;
}

export type ProductType = "Powder" | "Liquid" | "Return";

export interface Product {
  id: string;
  name: string;
  category: string;
  category_name?: string;
  description: string;
  product_type: ProductType;
  created_at: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  createdAt: string;
}

export interface AdminUser {
  email: string;
  name: string;
}
