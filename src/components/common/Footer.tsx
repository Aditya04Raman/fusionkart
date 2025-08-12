import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube, Mail } from "lucide-react";


const Footer = () => (
  <footer className="border-t mt-10">
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-md bg-[var(--gradient-primary)]" aria-hidden />
            <span className="font-brand text-lg font-semibold">FusionKart <span className="text-accent">AI</span></span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Shop smarter with powerful search, bold design, and an AI shopping assistant.</p>
          <div className="mt-4 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Facebook" className="hover:text-foreground"><Facebook /></a>
            <a href="#" aria-label="Instagram" className="hover:text-foreground"><Instagram /></a>
            <a href="#" aria-label="Twitter" className="hover:text-foreground"><Twitter /></a>
            <a href="#" aria-label="YouTube" className="hover:text-foreground"><Youtube /></a>
          </div>
        </div>

        <nav aria-label="Shop" className="text-sm">
          <h2 className="font-semibold text-foreground">Shop</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li><Link to="/search" className="hover:underline">All Products</Link></li>
            <li><Link to="/category/electronics-mobiles" className="hover:underline">Mobiles</Link></li>
            <li><Link to="/category/electronics-laptops" className="hover:underline">Laptops</Link></li>
            <li><Link to="/category/fashion-men-shoes" className="hover:underline">Men's Shoes</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company" className="text-sm">
          <h2 className="font-semibold text-foreground">Company</h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li><Link to="/about" className="hover:underline">About</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/policies" className="hover:underline">Policies</Link></li>
            <li><Link to="/seller" className="hover:underline">Sell on FusionKart</Link></li>
          </ul>
        </nav>

        <div className="text-sm">
          <h2 className="font-semibold text-foreground">Stay in the loop</h2>
          <p className="mt-3 text-muted-foreground">Get updates on deals and new arrivals.</p>
          <form className="mt-3 flex gap-2" onSubmit={(e) => e.preventDefault()}>
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input type="email" placeholder="Your email" aria-label="Email" className="pl-10" />
            </div>
            <Button type="submit" variant="secondary">Subscribe</Button>
          </form>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} FusionKart AI. All rights reserved.</p>
        <div className="flex gap-4">
          <Link to="/faq" className="hover:underline">Help/FAQ</Link>
          <Link to="/policies" className="hover:underline">Privacy & Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
