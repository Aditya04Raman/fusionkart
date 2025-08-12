import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } from "@/lib/cart";
import { products } from "@/data/mockProducts";
import { ProductCard } from "@/components/product/ProductCard";


const Cart = () => {
  const [items, setItems] = useState(getCartItems());

  useEffect(() => {
    setItems(getCartItems());
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryEstimate = (() => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() + 3);
    const end = new Date(now);
    end.setDate(end.getDate() + 5);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  })();

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-6">
        <SEO title="Your Cart — FusionKart AI" description="Review your selected items and proceed to checkout." canonical="/cart" />
        <h1 className="mb-4 text-2xl font-semibold">Your Cart</h1>
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <div className="mt-4">
            <Button asChild variant="hero"><Link to="/search">Browse products</Link></Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6">
      <SEO title="Your Cart — FusionKart AI" description="Review items, see totals, and proceed to checkout." canonical="/cart" />
      <h1 className="mb-6 text-2xl font-semibold">Your Cart</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <section className="lg:col-span-2 space-y-4">
          {items.map((i) => (
            <div key={i.id} className="flex items-center gap-4 rounded-lg border bg-card p-4">
              <img src={i.imageUrl} alt={`${i.name} thumbnail`} className="h-20 w-28 rounded-md object-cover" loading="lazy" />
              <div className="flex-1">
                <Link to={`/product/${i.id}`} className="font-medium hover:underline">{i.name}</Link>
                <div className="mt-1 text-sm text-muted-foreground">${i.price.toFixed(2)} each</div>
                <div className="mt-2 flex items-center gap-3 text-sm">
                  <label className="text-muted-foreground">Qty</label>
                  <input
                    aria-label={`Quantity for ${i.name}`}
                    type="number"
                    min={1}
                    value={i.quantity}
                    onChange={(e) => setItems(updateQuantity(i.id, Number(e.target.value)))}
                    className="w-16 rounded-md border bg-background px-2 py-1"
                  />
                  <Button variant="ghost" onClick={() => setItems(removeFromCart(i.id))}>Remove</Button>
                </div>
              </div>
              <div className="text-right font-semibold">${(i.price * i.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => { clearCart(); setItems([]); }}>Clear cart</Button>
            <div className="text-sm text-muted-foreground">Estimated delivery: {deliveryEstimate}</div>
          </div>
        </section>
        <aside className="space-y-4">
          <div className="rounded-lg border bg-card p-4">
            <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between text-sm text-muted-foreground mt-1"><span>Shipping</span><span>Free</span></div>
            <div className="mt-3 flex justify-between text-lg font-semibold"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
            <Button asChild className="mt-4 w-full" variant="hero"><Link to="/checkout">Proceed to Checkout</Link></Button>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h2 className="mb-2 font-semibold">Bank & Card Offers</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>10% instant discount on ABC Bank credit cards</li>
              <li>No Cost EMI on select cards</li>
              <li>Rewards on purchases above $499</li>
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">You might also like</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0,4).map(p => (
            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} rating={p.rating} reviews={p.reviews} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Cart;
