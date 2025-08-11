import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

interface WishlistRow {
  id: string;
  created_at: string;
  product?: {
    id: string;
    name: string;
    price: number;
    slug: string;
  } | null;
}

const Wishlist = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<WishlistRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      setLoggedIn(!!user);
      if (!user) { setLoading(false); return; }
      const { data, error } = await supabase
        .from('wishlist_items')
        .select('id, created_at, product:products(id, name, price, slug)')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) {
        toast({ title: 'Failed to load wishlist', description: error.message, variant: 'destructive' });
      } else {
        setItems((data as any) || []);
      }
      setLoading(false);
    };
    load();
  }, [toast]);

  const removeItem = async (id: string) => {
    const { error } = await supabase.from('wishlist_items').delete().eq('id', id);
    if (error) return toast({ title: 'Could not remove', description: error.message, variant: 'destructive' });
    setItems(prev => prev.filter(i => i.id !== id));
    toast({ title: 'Removed from wishlist' });
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <SEO title="Your Wishlist — FusionKart AI" description="Products you love and want to buy later." canonical="/wishlist" />
      <h1 className="mb-4 text-2xl font-semibold">Wishlist</h1>
      {!loggedIn && (
        <div className="rounded-lg border bg-card p-6">
          <p className="text-muted-foreground">Please log in to view your wishlist.</p>
          <div className="mt-3"><Button asChild variant="hero"><Link to="/auth">Login</Link></Button></div>
        </div>
      )}
      {loggedIn && (
        <div className="space-y-3">
          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : items.length === 0 ? (
            <div className="rounded-lg border bg-card p-6 text-center">
              <p className="text-muted-foreground">No items yet.</p>
              <div className="mt-3"><Button asChild variant="secondary"><Link to="/search">Browse products</Link></Button></div>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((it) => (
                <li key={it.id} className="rounded-lg border bg-card p-4 flex items-center justify-between">
                  <div>
                    <div className="font-medium">{it.product?.name ?? 'Unknown product'}</div>
                    {typeof it.product?.price === 'number' && (
                      <div className="text-sm text-muted-foreground">${(it.product!.price as number).toFixed(2)}</div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {it.product?.id && (
                      <Button asChild size="sm"><Link to={`/product/${it.product.id}`}>View</Link></Button>
                    )}
                    <Button size="sm" variant="secondary" onClick={() => removeItem(it.id)}>Remove</Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </main>
  );
};

export default Wishlist;
