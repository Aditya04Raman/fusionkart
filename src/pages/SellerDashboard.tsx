import SEO from "@/components/common/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const SellerDashboard = () => {
  return (
    <main className="container mx-auto px-4 py-6">
      <SEO title="Seller Dashboard — FusionKart AI" description="Manage listings, orders, and performance on FusionKart AI." canonical="/seller" />
      <h1 className="mb-6 text-2xl font-semibold">Seller Dashboard</h1>
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
