import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Search from "./pages/Search";
import Product from "./pages/Product";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import SellerDashboard from "./pages/SellerDashboard";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Auth from "./pages/Auth";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Policies from "./pages/Policies";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        {/* ... keep existing code (routes wrapper) */}
        <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/search" element={<Search />} />
  <Route path="/product/:id" element={<Product />} />
  <Route path="/seller" element={<SellerDashboard />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/category/:slug" element={<Category />} />
  <Route path="/auth" element={<Auth />} />
  <Route path="/wishlist" element={<Wishlist />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/faq" element={<FAQ />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/about" element={<About />} />
  <Route path="/policies" element={<Policies />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        {/* ... keep existing code (router end) */}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
