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
import SellerDashboard from "./pages/SellerDashboard";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Header />
        <Routes>
  <Route path="/" element={<Index />} />
  <Route path="/search" element={<Search />} />
  <Route path="/product/:id" element={<Product />} />
  <Route path="/seller" element={<SellerDashboard />} />
  <Route path="/orders" element={<Orders />} />
  <Route path="/cart" element={<Cart />} />
  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
  <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
