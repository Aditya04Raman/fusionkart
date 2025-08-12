import { useParams, Link } from "react-router-dom";
import { products } from "@/data/mockProducts";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import { Star, Truck, CreditCard, Percent, Package, Clock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { productImageUrl } from "@/lib/images";
import { addToCart } from "@/lib/cart";
import { ProductCard } from "@/components/product/ProductCard";


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
    image: productImageUrl(prod.id, 'lg'),
    aggregateRating: { '@type': 'AggregateRating', ratingValue: prod.rating, reviewCount: prod.reviews },
    offers: { '@type': 'Offer', priceCurrency: 'USD', price: prod.price, availability: 'https://schema.org/InStock' }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      <SEO title={`${prod.name} — FusionKart AI`} description={`Buy ${prod.name} at the best price on FusionKart AI.`} canonical={`/product/${prod.id}`} jsonLd={jsonLd} />
      <article className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={productImageUrl(prod.id, 'lg')}
            alt={`${prod.name} product image`}
            className="rounded-lg border shadow-sm w-full"
            loading="lazy"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{prod.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="fill-current text-amber-400" /> {prod.rating.toFixed(1)} · {prod.reviews} reviews
          </div>
          <div className="mt-4 text-3xl font-bold">${prod.price.toFixed(2)}</div>

          <div className="mt-4 grid gap-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground"><Truck className="h-4 w-4" /> Estimated delivery: 3–5 business days</div>
            <div className="flex items-center gap-2 text-muted-foreground"><Package className="h-4 w-4" /> Free returns within 30 days</div>
            <div className="flex items-center gap-2 text-muted-foreground"><CreditCard className="h-4 w-4" /> Bank offer: 10% off with select cards</div>
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              variant="hero"
              onClick={() => {
                addToCart({ id: prod.id, name: prod.name, price: prod.price, imageUrl: productImageUrl(prod.id, 'sm') });
                toast({ title: 'Added to cart', description: prod.name });
              }}
            >
              Add to Cart
            </Button>
            <Button variant="secondary" asChild><Link to={`/cart?buy=${prod.id}`}>Buy Now</Link></Button>
            <Button variant="outline" asChild><Link to="/wishlist">Save to Wishlist</Link></Button>
          </div>

          <section className="mt-6 space-y-3 text-sm text-muted-foreground">
            <p>
              {prod.name} delivers great value in the {prod.category.join(' › ')} segment. Engineered for performance and reliability, it's a smart pick for everyday use.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Premium build and dependable quality</li>
              <li>Trusted by thousands of customers</li>
              <li>Backed by FusionKart AI support</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Offers</h2>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2"><Percent className="h-4 w-4" /> 10% instant discount on ABC Bank credit cards</li>
              <li className="flex items-center gap-2"><CreditCard className="h-4 w-4" /> No Cost EMI available on select cards</li>
              <li className="flex items-center gap-2"><Clock className="h-4 w-4" /> Limited-time exchange bonus on eligible items</li>
            </ul>
          </section>

          <section className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Top Reviews</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>“Excellent value for money. Exactly as described.”</p>
              <p>“Fast delivery and great build quality. Recommended!”</p>
              <p>“After a week of use, very satisfied with the performance.”</p>
            </div>
          </section>
        </div>
      </article>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold">You may also like</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {products.filter(p => p.id !== prod.id && p.category[p.category.length - 1] === prod.category[prod.category.length - 1]).slice(0,4).map(p => (
            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} rating={p.rating} reviews={p.reviews} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Product;
