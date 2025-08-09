import { useParams } from "react-router-dom";
import { products } from "@/data/mockProducts";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import { Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Product = () => {
  const { id } = useParams();
  const prod = products.find(p => p.id === id);

  if (!prod) return (
    <main className="container mx-auto px-4 py-10"><h1 className="text-2xl font-semibold">Product not found</h1></main>
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: prod.name,
    aggregateRating: { '@type': 'AggregateRating', ratingValue: prod.rating, reviewCount: prod.reviews },
    offers: { '@type': 'Offer', priceCurrency: 'USD', price: prod.price, availability: 'https://schema.org/InStock' }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <SEO title={`${prod.name} — FusionKart AI`} description={`Buy ${prod.name} at the best price on FusionKart AI.`} canonical={`/product/${prod.id}`} jsonLd={jsonLd} />
      <article className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-[var(--gradient-surface)] aspect-[4/3]" />
        <div>
          <h1 className="text-2xl font-semibold">{prod.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="fill-current text-amber-400" /> {prod.rating.toFixed(1)} · {prod.reviews} reviews
          </div>
          <div className="mt-4 text-3xl font-bold">${prod.price.toFixed(2)}</div>
          <div className="mt-6 flex gap-3">
            <Button variant="hero" onClick={() => toast({ title: 'Added to cart', description: prod.name })}>Add to Cart</Button>
            <Button variant="secondary">Buy Now</Button>
          </div>
          <ul className="mt-6 list-disc pl-5 text-sm text-muted-foreground space-y-1">
            <li>Fast, free delivery</li>
            <li>7–30 day returns policy</li>
            <li>Secure payments</li>
          </ul>
        </div>
      </article>
    </main>
  );
};

export default Product;
