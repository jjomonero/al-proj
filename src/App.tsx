import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Properties from "./pages/Properties";
import Contracts from "./pages/Contracts";
import Appointments from "./pages/Appointments";
import Payments from "./pages/Payments";
import Support from "./pages/Support";
import Reports from "./pages/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/imoveis" element={<Properties />} />
          <Route path="/contratos" element={<Contracts />} />
          <Route path="/agendamentos" element={<Appointments />} />
          <Route path="/pagamentos" element={<Payments />} />
          <Route path="/relatorios" element={<Reports />} />
          <Route path="/suporte" element={<Support />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;