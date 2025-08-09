import { useMemo } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import SEO from "@/components/common/SEO";
import { ProductCard } from "@/components/product/ProductCard";
import { categories, products } from "@/data/mockProducts";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext, PaginationLink } from "@/components/ui/pagination";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const makeSlug = (path: string[]) => path.map(slugify).join("-");

const useQuery = () => new URLSearchParams(useLocation().search);

const Category = () => {
  const { slug = "" } = useParams();
  const query = useQuery();
  const page = Math.max(1, Number(query.get("page") || 1));
  const perPage = 24;

  const path = useMemo(() => categories.find((c) => makeSlug(c) === slug) ?? null, [slug]);

  const filtered = useMemo(() => {
    if (!path) return [] as typeof products;
    const key = path.join("|");
    return products.filter((p) => p.category.join("|") === key);
  }, [path]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const start = (page - 1) * perPage;
  const current = filtered.slice(start, start + perPage);

  const title = path ? `${path.join(" › ")} — FusionKart AI` : "Category — FusionKart AI";
  const desc = path ? `Discover ${filtered.length}+ products in ${path.join(" › ")} on FusionKart AI.` : "Browse category";

  if (!path) {
    return (
      <main className="container mx-auto px-4 py-6">
        <SEO title="Category not found — FusionKart AI" description="This category does not exist." canonical={`/category/${slug}`} />
        <h1 className="text-2xl font-semibold mb-4">Category not found</h1>
        <p className="text-muted-foreground">Try exploring our top categories below.</p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
          {categories.map((c) => (
            <Link key={c.join("-")} to={`/category/${makeSlug(c)}`} className="rounded-lg border bg-card p-4 text-center hover:shadow-md hover-scale">
              <span className="text-sm font-medium">{c.join(" › ")}</span>
            </Link>
          ))}
        </div>
      </main>
    );
  }

  const baseUrl = `/category/${slug}`;

  return (
    <main className="container mx-auto px-4 py-6">
      <SEO title={title} description={desc} canonical={`${baseUrl}${page > 1 ? `?page=${page}` : ""}`} />
      <h1 className="mb-4 text-2xl font-semibold">{path.join(" › ")}</h1>

      <section className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {current.map((p) => (
          <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} rating={p.rating} reviews={p.reviews} />
        ))}
      </section>

      {totalPages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`${baseUrl}?page=${Math.max(1, page - 1)}`} aria-disabled={page === 1} className={page === 1 ? "pointer-events-none opacity-50" : ""} />
            </PaginationItem>
            {/* Show first, current-1, current, current+1, last */}
            {Array.from(new Set([1, page - 1, page, page + 1, totalPages]))
              .filter((n) => n >= 1 && n <= totalPages)
              .sort((a, b) => a - b)
              .map((n) => (
                <PaginationItem key={n}>
                  <PaginationLink href={`${baseUrl}?page=${n}`} isActive={n === page}>
                    {n}
                  </PaginationLink>
                </PaginationItem>
              ))}
            <PaginationItem>
              <PaginationNext href={`${baseUrl}?page=${Math.min(totalPages, page + 1)}`} aria-disabled={page === totalPages} className={page === totalPages ? "pointer-events-none opacity-50" : ""} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </main>
  );
};

export default Category;
