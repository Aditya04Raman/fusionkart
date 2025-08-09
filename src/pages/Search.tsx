import { useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { categories, products } from "@/data/mockProducts";
import { ProductCard } from "@/components/product/ProductCard";
import SEO from "@/components/common/SEO";

const useQuery = () => new URLSearchParams(useLocation().search);

const Search = () => {
  const query = useQuery();
  const q = query.get('q')?.toLowerCase() ?? '';

  const filtered = useMemo(() => {
    if (!q) return products;
    return products.filter(p => p.name.toLowerCase().includes(q) || p.category.join(' ').toLowerCase().includes(q));
  }, [q]);

  return (
    <main className="container mx-auto px-4 py-6">
      <SEO
        title={`Search${q ? `: ${q}` : ''} — FusionKart AI`}
        description={`Results for ${q || 'all products'} on FusionKart AI.`}
        canonical={`/search${q ? `?q=${encodeURIComponent(q)}` : ''}`}
      />
      <h1 className="mb-4 text-2xl font-semibold">Search Results {q ? `for "${q}"` : ''}</h1>
      <div className="mb-6 text-sm text-muted-foreground">
        Popular categories: {categories.slice(0,4).map((c, i) => (
          <span key={c.join('-')}>
            <Link className="story-link" to={`/search?q=${encodeURIComponent(c[c.length-1])}`}>{c.join(' › ')}</Link>
            {i < 3 ? ' · ' : ''}
          </span>
        ))}
      </div>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(p => (
          <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} rating={p.rating} reviews={p.reviews} />
        ))}
      </section>
    </main>
  );
};

export default Search;
