import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t mt-10">
    <div className="container mx-auto px-4 py-6 flex flex-wrap gap-4 items-center justify-between text-sm text-muted-foreground">
      <p>© {new Date().getFullYear()} FusionKart AI</p>
      <nav className="flex gap-4">
        <Link to="/about" className="hover:underline">About</Link>
        <Link to="/faq" className="hover:underline">Help/FAQ</Link>
        <Link to="/contact" className="hover:underline">Contact</Link>
        <Link to="/policies" className="hover:underline">Policies</Link>
      </nav>
    </div>
  </footer>
);

export default Footer;
