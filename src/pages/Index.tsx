import hero from "@/assets/hero-banner.jpg";
import { Button } from "@/components/ui/button";
import SEO from "@/components/common/SEO";
import { SearchBar } from "@/components/search/SearchBar";
import { products, categories } from "@/data/mockProducts";
import FlashSaleBanner from "@/components/common/FlashSaleBanner";
import { ProductCard } from "@/components/product/ProductCard";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Index = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--x', `${x}%`);
    el.style.setProperty('--y', `${y}%`);
  };

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'FusionKart AI',
      url: '/',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'FusionKart AI',
      url: '/',
      potentialAction: {
        '@type': 'SearchAction',
        target: '/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ];

  return (
    <main>
      <SEO title="FusionKart AI — Next‑Gen E‑Commerce" description="Shop smarter with powerful search, bold design, and an AI shopping assistant." canonical="/" jsonLd={jsonLd} />

      {/* HERO */}
      <section ref={heroRef} onMouseMove={onMouseMove} className="interactive-spotlight">
        <div className="container mx-auto grid items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-16">
          <div className="animate-enter">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Next‑Gen E‑Commerce, Powered by AI
            </h1>
            <p className="mt-3 text-lg text-muted-foreground max-w-prose">
              FusionKart AI blends Amazon-level usability with Flipkart’s vibrant energy. Lightning fast, thoughtfully designed, and powered by an AI assistant.
            </p>
            <div className="mt-6">
              <SearchBar />
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button variant="hero" size="lg" className="hover-scale" asChild><Link to="/search">Start Shopping</Link></Button>
              <Button variant="secondary" size="lg" className="hover-scale" asChild><Link to="/seller">Sell on FusionKart</Link></Button>
            </div>
          </div>
          <div className="relative">
            <img src={hero} alt="FusionKart AI hero collage of premium products" className="mx-auto w-full max-w-[720px] rounded-lg shadow-lg" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="mb-4 text-2xl font-semibold">Top Categories</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.slice(0,6).map((c) => (
            <Link key={c.join('-')} to={`/category/${c.map(p=>p.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')).join('-')}`} className="rounded-lg border bg-card p-4 text-center hover:shadow-md hover-scale">
              <span className="text-sm font-medium">{c.join(' › ')}</span>
            </Link>
          ))}
        </div>
      </section>

      <FlashSaleBanner />

      {/* FEATURED */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="mb-4 text-2xl font-semibold">Featured</h2>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0,8).map(p => (
            <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} rating={p.rating} reviews={p.reviews} />
          ))}
        </div>
      </section>

      <ChatbotWidget />
    </main>
  );
};

export default Index;
