
import Footer from "./components/Footer";
import Header from "./components/Header";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SectionsPage from "./pages/SectionsPage";
import SectionPage from "./pages/SectionPage";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-card"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="min-h-screen">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/section" element={<SectionsPage />} />
          <Route path="/section/:id" element={<SectionPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
