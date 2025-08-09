import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Cart = () => {
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
};

export default Cart;
