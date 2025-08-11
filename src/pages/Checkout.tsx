import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface CartItemRow {
  id: string;
  quantity: number;
  product?: { id: string; name: string; price: number; slug: string } | null;
}

const Checkout = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<CartItemRow[]>([]);
  const [cartId, setCartId] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      setLoggedIn(!!user);
      if (!user) { setLoading(false); return; }

      // Ensure cart exists
      const { data: upserted, error: upsertErr } = await supabase
        .from('carts')
        .upsert({ user_id: user.id }, { onConflict: 'user_id' })
        .select()
        .maybeSingle();
      if (upsertErr) { setLoading(false); return toast({ title: 'Cart error', description: upsertErr.message, variant: 'destructive' }); }
      const cId = upserted?.id as string;
      setCartId(cId);

      // Load items with product info
      const { data, error } = await supabase
        .from('cart_items')
        .select('id, quantity, product:products(id, name, price, slug)')
        .eq('cart_id', cId);
      if (error) {
        toast({ title: 'Failed to load cart', description: error.message, variant: 'destructive' });
      } else {
        setItems((data as any) || []);
      }
      setLoading(false);
    };
    load();
  }, [toast]);

  const total = useMemo(() => items.reduce((sum, it) => sum + (Number(it.product?.price || 0) * it.quantity), 0), [items]);

  const placeOrder = async () => {
    if (!cartId) return;
    const { data: { session } } = await supabase.auth.getSession();
    const user = session?.user;
    if (!user) return;

    try {
      // Create order
      const { data: order, error: oErr } = await supabase
        .from('orders')
        .insert({ user_id: user.id, status: 'pending', total })
        .select()
        .single();
      if (oErr) throw oErr;

      // Create order_items
      const payload = items.filter(i => i.product).map((i) => ({
        order_id: (order as any).id,
        product_id: (i.product as any).id,
        quantity: i.quantity,
        unit_price: i.product ? Number(i.product.price) : 0
      }));
      if (payload.length) {
        const { error: oiErr } = await supabase.from('order_items').insert(payload);
        if (oiErr) throw oiErr;
      }

      // Clear cart
      await supabase.from('cart_items').delete().eq('cart_id', cartId);

      toast({ title: 'Order placed', description: 'Thank you for your purchase!' });
      window.location.href = '/orders';
    } catch (err: any) {
      toast({ title: 'Checkout failed', description: err.message, variant: 'destructive' });
    }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <SEO title="Checkout — FusionKart AI" description="Review your cart and place your order." canonical="/checkout" />
      <h1 className="mb-4 text-2xl font-semibold">Checkout</h1>
      {!loggedIn ? (
        <div className="rounded-lg border bg-card p-6">
          <p className="text-muted-foreground">Please log in to proceed to checkout.</p>
          <div className="mt-3"><Button asChild variant="hero"><Link to="/auth">Login</Link></Button></div>
        </div>
      ) : loading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : items.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-muted-foreground">Your cart is empty.</p>
          <div className="mt-3"><Button asChild variant="secondary"><Link to="/search">Browse products</Link></Button></div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-2">
            {items.map((it) => (
              <div key={it.id} className="rounded-lg border bg-card p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium">{it.product?.name ?? 'Unknown product'}</div>
                  <div className="text-sm text-muted-foreground">Qty: {it.quantity}</div>
                </div>
                <div className="font-semibold">${Number(it.product?.price || 0).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <aside className="rounded-lg border bg-card p-4 h-fit">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <Button className="mt-4 w-full" variant="hero" onClick={placeOrder}>Place Order</Button>
          </aside>
        </div>
      )}
    </main>
  );
};

export default Checkout;
