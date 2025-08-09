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

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const categorySlug = (path: string[]) => path.map(slugify).join("-");

// Generate hundreds of products for each leaf category
const genProducts = (): Product[] => {
  const out: Product[] = [];
  const ranges: Record<string, { min: number; max: number }> = {
    mobiles: { min: 99, max: 1499 },
    audio: { min: 19, max: 499 },
    laptops: { min: 399, max: 2999 },
    shoes: { min: 19, max: 249 },
    watches: { min: 29, max: 999 },
    kitchen: { min: 9, max: 299 },
  };

  const rand = (min: number, max: number) => Math.random() * (max - min) + min;

  for (const path of categories) {
    const leaf = path[path.length - 1];
    const leafKey = slugify(leaf);
    const range = ranges[leafKey] ?? { min: 10, max: 1000 };
    const baseId = `${slugify(path[0])}-${leafKey}`;

    const count = 200; // hundreds per category
    for (let i = 1; i <= count; i++) {
      const price = Math.round(rand(range.min, range.max) * 100) / 100;
      const rating = Math.round(rand(3.5, 4.9) * 10) / 10;
      const reviews = Math.floor(rand(25, 5000));
      out.push({
        id: `${baseId}-${i}`,
        name: `${leaf} ${i} — ${path[0]} Collection`,
        price,
        rating,
        reviews,
        category: [...path],
      });
    }
  }
  return out;
};

export const products: Product[] = genProducts();

