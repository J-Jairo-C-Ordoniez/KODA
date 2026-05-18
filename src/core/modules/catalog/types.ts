export interface Category {
  categoryId: string;
  tenantId: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Image {
  imageId: number;
  variantId: string;
  content: string;
  isPrimary: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Inventory {
  inventoryId: number;
  variantId: string;
  stock: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface Variant {
  variantId: string;
  productId: string;
  name: string;
  sku: string;
  color: string;
  size: string;
  price: number | string;
  cost: number | string;
  popularity?: number;
  isActive?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  images?: Image[];
  inventories?: Inventory[];
}

export interface Product {
  productId: string;
  tenantId: string;
  categoryId: string;
  name: string;
  description: string;
  gender: 'hombre' | 'mujer' | 'mixto';
  isPublic: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  category?: Category;
  variants?: Variant[];
}
