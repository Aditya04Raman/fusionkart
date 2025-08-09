import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Orders = () => {
  // Placeholder orders - we can later fetch from Supabase
  const orders = [
    { id: "FK-1001", date: "2025-08-01", total: 129.98, status: "Shipped" },
    { id: "FK-1000", date: "2025-07-24", total: 59.99, status: "Delivered" },
  ];

  return (
    <main className="container mx-auto px-4 py-6">
      <SEO title="Your Orders — FusionKart AI" description="Track and manage your FusionKart AI orders in one place." canonical="/orders" />
      <h1 className="mb-4 text-2xl font-semibold">Your Orders</h1>

      {orders.length === 0 ? (
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-muted-foreground">You have no orders yet.</p>
          <div className="mt-4">
            <Button asChild variant="hero"><Link to="/search">Start shopping</Link></Button>
          </div>
        </div>
      ) : (
        <section className="grid gap-3">
          {orders.map((o) => (
            <article key={o.id} className="flex items-center justify-between rounded-lg border bg-card p-4">
              <div>
                <div className="font-medium">Order {o.id}</div>
                <div className="text-sm text-muted-foreground">Placed on {o.date} · Total ${o.total.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm px-2 py-1 rounded bg-secondary">{o.status}</span>
                <Button asChild variant="secondary" size="sm"><Link to={`/orders/${o.id}`}>View details</Link></Button>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
};

export default Orders;
