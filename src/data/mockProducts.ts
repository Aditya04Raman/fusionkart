export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  category: string[]; // multi-level
}

export const categories: string[][] = [
  ["Electronics", "Mobiles"],
  ["Electronics", "Audio"],
  ["Electronics", "Laptops"],
  ["Fashion", "Men", "Shoes"],
  ["Fashion", "Women", "Watches"],
  ["Home", "Kitchen"],
];

export const products: Product[] = [
  { id: 'p1', name: 'Fusion X1 Smartphone 128GB', price: 699, rating: 4.5, reviews: 1892, category: ['Electronics', 'Mobiles'] },
  { id: 'p2', name: 'Auraluxe Wireless Headphones', price: 129, rating: 4.3, reviews: 876, category: ['Electronics', 'Audio'] },
  { id: 'p3', name: 'NovaBook Pro 14" Laptop', price: 1199, rating: 4.7, reviews: 512, category: ['Electronics', 'Laptops'] },
  { id: 'p4', name: 'Stride Runner Men\'s Shoes', price: 89, rating: 4.2, reviews: 144, category: ['Fashion', 'Men', 'Shoes'] },
  { id: 'p5', name: 'Astra Women\'s Chrono Watch', price: 249, rating: 4.6, reviews: 232, category: ['Fashion', 'Women', 'Watches'] },
  { id: 'p6', name: 'ChefPro Nonstick Pan Set', price: 79, rating: 4.1, reviews: 98, category: ['Home', 'Kitchen'] },
  { id: 'p7', name: 'Fusion X1 Pro Smartphone 256GB', price: 899, rating: 4.8, reviews: 2044, category: ['Electronics', 'Mobiles'] },
  { id: 'p8', name: 'EchoBuds ANC Earbuds', price: 149, rating: 4.4, reviews: 321, category: ['Electronics', 'Audio'] },
  { id: 'p9', name: 'NovaBook Air 13" Laptop', price: 999, rating: 4.5, reviews: 220, category: ['Electronics', 'Laptops'] },
  { id: 'p10', name: 'SonicMax Bluetooth Speaker', price: 59, rating: 4.0, reviews: 412, category: ['Electronics', 'Audio'] },
];
