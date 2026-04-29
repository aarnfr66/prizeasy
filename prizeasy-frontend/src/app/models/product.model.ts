import { Category } from './category.model';

export interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  pointsCost: number;
  stock: number;
  category?: Category | null;
}
