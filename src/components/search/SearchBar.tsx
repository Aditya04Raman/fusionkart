import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/data/mockProducts";

interface Props {
  className?: string;
}

export const SearchBar = ({ className }: Props) => {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const suggestions = useMemo(() => {
    if (!q) return [] as string[];
    const lower = q.toLowerCase();
    const names = products
      .map((p) => p.name)
      .filter((n) => n.toLowerCase().includes(lower));
    return Array.from(new Set(names)).slice(0, 6);
  }, [q]);

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className={className}>
      <form onSubmit={submit} className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search for products, brands and more"
          className="h-12 pl-10 pr-32"
          aria-label="Advanced product search"
        />
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <Button type="button" variant="secondary" className="hidden sm:inline-flex"><SlidersHorizontal className="mr-2" />Filters</Button>
          <Button type="submit" variant="default">Search</Button>
        </div>
      </form>
      {suggestions.length > 0 && (
        <div className="mt-2 rounded-md border bg-card p-2 animate-fade-in">
          <div className="text-xs px-2 py-1 text-muted-foreground">Suggestions</div>
          <ul className="grid gap-1">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  onClick={() => { setQ(s); navigate(`/search?q=${encodeURIComponent(s)}`); }}
                  className="w-full text-left rounded px-2 py-1 hover:bg-accent/30"
                >{s}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
