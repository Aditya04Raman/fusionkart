import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviews: number;
  badge?: string;
}

export const ProductCard = ({ id, name, price, rating, reviews, badge }: Props) => {
  return (
    <article className="group rounded-lg border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/product/${id}`} className="block">
        <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-md bg-[var(--gradient-surface)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(var(--primary)/0.10),transparent_35%),radial-gradient(circle_at_70%_80%,hsl(var(--accent)/0.16),transparent_40%)] transition-transform duration-300 group-hover:scale-105" />
        </div>
        <h3 className="line-clamp-2 text-sm font-medium">{name}</h3>
      </Link>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">${price.toFixed(2)}</div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="fill-current text-amber-400" />
            <span>{rating.toFixed(1)}</span>
            <span>({reviews})</span>
          </div>
        </div>
        <Button size="sm" variant="secondary" asChild>
          <Link to={`/product/${id}`}>View</Link>
        </Button>
      </div>
      {badge && (
        <div className="mt-2 inline-block rounded bg-accent/15 px-2 py-0.5 text-xs text-accent">{badge}</div>
      )}
    </article>
  );
};

export default ProductCard;
