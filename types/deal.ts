export interface Deal {
  id: string;
  title: string;
  originalPrice: number;
  promotionalPrice: number;
  discountPercent: number;
  originalUrl: string;
  affiliateUrl: string;
  imageUrl: string;
  category: string;
  freeShipping: boolean;
  rating: number;
  soldQuantity: number;
  seller: string;
  status: string;
  extractedAt?: string;
}

export type SortOption = "discount" | "price_asc" | "price_desc" | "rating" | "sales";

