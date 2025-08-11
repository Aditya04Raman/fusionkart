import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Store, User, Search as SearchIcon, Heart, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User as SupaUser } from "@supabase/supabase-js";
import { cleanupAuthState } from "@/lib/auth";

const Header = () => {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [user, setUser] = useState<SupaUser | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evt, session) => {
      setUser(session?.user ?? null);
    });
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    return () => subscription.unsubscribe();
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover-scale" aria-label="FusionKart AI Home">
            <div className="h-9 w-9 rounded-md bg-[var(--gradient-primary)]" />
            <span className="font-brand text-lg font-semibold">FusionKart <span className="text-accent">AI</span></span>
          </Link>

          <form onSubmit={onSubmit} className="hidden md:flex w-[520px] items-center gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for products, brands and more" className="pl-10" aria-label="Search" />
            </div>
            <Button type="submit" variant="default">Search</Button>
          </form>

          <nav className="flex items-center gap-2">
            <Link to="/seller" className="hidden sm:block">
              <Button variant="secondary"><Store className="mr-2" />Sell</Button>
            </Link>
            <Button variant="ghost" asChild>
              <Link to="/wishlist" aria-label="Wishlist">
                <Heart />
              </Link>
            </Button>
            {user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/orders" aria-label="Account">
                    <User />
                  </Link>
                </Button>
                <Button variant="ghost" onClick={async () => { cleanupAuthState(); try { await supabase.auth.signOut({ scope: 'global' }); } catch {}; window.location.href = '/auth'; }} aria-label="Logout">
                  <LogOut />
                </Button>
              </>
            ) : (
              <Button variant="ghost" asChild>
                <Link to="/auth" aria-label="Login">
                  <LogIn />
                </Link>
              </Button>
            )}
            <Button variant="ghost" asChild>
              <Link to="/cart" aria-label="Cart">
                <ShoppingBag />
              </Link>
            </Button>
          </nav>
        </div>

        <form onSubmit={onSubmit} className="md:hidden pb-3">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search products" className="pl-10" aria-label="Search mobile" />
          </div>
        </form>
      </div>
    </header>
  );
};

export default Header;
