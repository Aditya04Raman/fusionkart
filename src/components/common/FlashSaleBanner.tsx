import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const target = () => {
  const now = new Date();
  // Next 6 hours from now
  return new Date(now.getTime() + 6 * 60 * 60 * 1000).getTime();
};

const FlashSaleBanner = () => {
  const [deadline] = useState<number>(target());
  const [remaining, setRemaining] = useState<number>(deadline - Date.now());

  useEffect(() => {
    const id = setInterval(() => setRemaining(deadline - Date.now()), 1000);
    return () => clearInterval(id);
  }, [deadline]);

  const hours = Math.max(0, Math.floor(remaining / 36e5));
  const minutes = Math.max(0, Math.floor((remaining % 36e5) / 6e4));
  const seconds = Math.max(0, Math.floor((remaining % 6e4) / 1000));

  return (
    <section className="container mx-auto px-4">
      <div className="rounded-lg border bg-[var(--gradient-surface)] p-4 md:p-6 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="rounded-md bg-accent/15 p-2 text-accent"><Zap /></div>
          <div>
            <h3 className="text-lg font-semibold">Flash Sale</h3>
            <p className="text-sm text-muted-foreground">Hurry! Limited-time mega deals across categories.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="grid grid-flow-col gap-2 text-center auto-cols-max">
            <div className="rounded bg-secondary px-3 py-2"><span className="text-lg font-semibold tabular-nums">{hours.toString().padStart(2, '0')}</span></div>
            <div className="rounded bg-secondary px-3 py-2"><span className="text-lg font-semibold tabular-nums">{minutes.toString().padStart(2, '0')}</span></div>
            <div className="rounded bg-secondary px-3 py-2"><span className="text-lg font-semibold tabular-nums">{seconds.toString().padStart(2, '0')}</span></div>
          </div>
          <Button variant="hero" asChild><Link to="/search?q=deals">Grab Deals</Link></Button>
        </div>
      </div>
    </section>
  );
};

export default FlashSaleBanner;
