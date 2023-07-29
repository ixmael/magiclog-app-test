import { ProductType } from './';

/**
 * This represents the expectation of a ProductRepository implementation
 */
export interface ProductRepositoryInterface {
  getByIDAndSKU: (id: string, sku: string) => Promise<ProductType>;
  addProduct: (product: ProductType) => Promise<boolean>;
  getProductsBy: (field: string, value: string) => Promise<Array<ProductType>>;
}