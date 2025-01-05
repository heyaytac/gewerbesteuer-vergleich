import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import CityDetails from "@/pages/CityDetails";
import BlogPost from "@/pages/BlogPost";
import BlogPost2024 from "@/pages/BlogPost2024";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/city/:cityId" element={<CityDetails />} />
            <Route path="/blog/gewerbesteuerrechner-leitfaden" element={<BlogPost />} />
            <Route path="/blog/gewerbesteuer-2024" element={<BlogPost2024 />} />
          </Routes>
        </Router>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;