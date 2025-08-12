export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

const STORAGE_KEY = "fk_cart_v1";

const read = (): CartItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
};

const write = (items: CartItem[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
};

export const getCartItems = (): CartItem[] => read();

export const clearCart = () => write([]);

export const removeFromCart = (id: string) => {
  const items = read().filter((i) => i.id !== id);
  write(items);
  return items;
};

export const updateQuantity = (id: string, quantity: number) => {
  const items = read().map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i));
  write(items);
  return items;
};

export const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
  const qty = item.quantity ?? 1;
  const items = read();
  const existing = items.find((i) => i.id === item.id);
  if (existing) {
    existing.quantity += qty;
  } else {
    items.push({ ...item, quantity: qty });
  }
  write(items);
  return items;
};

export const getCartTotal = () => {
  const items = read();
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
};
