export interface Category {
  categoryId: string;
  tenantId: string;
  name: string;
  description?: string | null;
  icon?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateCategoryDTO {
  name: string;
  description?: string;
  icon?: string;
}

export interface UpdateCategoryDTO {
  name?: string;
  description?: string;
  icon?: string;
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

export interface CreateVariantDTO {
  productId: string;
  name: string;
  sku: string;
  color: string;
  size: string;
  price: number;
  cost: number;
  stock?: number;
  isActive?: boolean;
}

export interface UpdateVariantDTO {
  name?: string;
  sku?: string;
  color?: string;
  size?: string;
  price?: number;
  cost?: number;
  stock?: number;
  isActive?: boolean;
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

export interface CreateProductDTO {
  categoryId: string;
  name: string;
  description?: string;
  gender: 'hombre' | 'mujer' | 'mixto';
  isPublic?: boolean;
}

export interface UpdateProductDTO {
  categoryId?: string;
  name?: string;
  description?: string;
  gender?: 'hombre' | 'mujer' | 'mixto';
  isPublic?: boolean;
}

export interface ProductFilters {
  gender?: string;
  color?: string[];
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
}
