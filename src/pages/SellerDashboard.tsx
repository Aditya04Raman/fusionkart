import SEO from "@/components/common/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


const SellerDashboard = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <SEO title="Seller Dashboard — FusionKart AI" description="Manage listings, orders, and performance on FusionKart AI." canonical="/seller" />
      <section className="rounded-lg border bg-card p-6 mb-6">
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-xl font-semibold">Start selling on FusionKart AI</h2>
            <p className="mt-2 text-sm text-muted-foreground">Reach millions of customers, manage orders effortlessly, and grow your business with powerful tools.</p>
            <div className="mt-4 flex gap-3">
              <Button variant="hero">Create a listing</Button>
              <Button variant="outline">Learn more</Button>
            </div>
          </div>
          <ul className="grid gap-3 text-sm text-muted-foreground">
            <li><span className="font-medium text-foreground">1.</span> Create your seller account</li>
            <li><span className="font-medium text-foreground">2.</span> List your products with images and pricing</li>
            <li><span className="font-medium text-foreground">3.</span> Ship orders and get paid quickly</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$12,480</div><p className="text-sm text-muted-foreground">+8.2% this week</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Orders</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">342</div><p className="text-sm text-muted-foreground">12 awaiting shipment</p></CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Rating</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">4.6</div><p className="text-sm text-muted-foreground">1,245 reviews</p></CardContent>
        </Card>
      </section>
    </main>
  );
};

export default SellerDashboard;
