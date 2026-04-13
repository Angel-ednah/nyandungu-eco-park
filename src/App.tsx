
import Footer from "./components/Footer";

import Header from "./components/Header";

import ProtectedRoute from "./components/ProtectedRoute";

import { AuthProvider } from "./hooks/useAuth";

import AdminPage from "./pages/AdminPage";

import Index from "./pages/Index";

import LoginPage from "./pages/LoginPage";

import NotFound from "./pages/NotFound";

import SectionPage from "./pages/SectionPage";

import { Toaster as Sonner } from "@/components/ui/sonner";

import { Toaster } from "@/components/ui/toaster";

import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { BrowserRouter, Route, Routes } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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
              <Route path="/section/:id" element={<SectionPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
