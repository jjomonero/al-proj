import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import ContractsChart from "@/components/dashboard/ContractsChart";
import StatsCard from "@/components/dashboard/StatsCard";
import { Building2, Receipt, Users } from "lucide-react";

const Reports = () => {
  const { data: metrics } = useQuery({
    queryKey: ["metrics"],
    queryFn: async () => {
      const metricsPromises = [
        supabase.from("properties").select("*", { count: "exact" }),
        supabase.from("contracts").select("*").eq("status", "active"),
        supabase.from("tenants").select("*", { count: "exact" })
      ];

      const [properties, contracts, tenants] = await Promise.all(metricsPromises);
      
      return {
        properties_count: properties.count || 0,
        active_contracts: contracts.data?.length || 0,
        tenants_count: tenants.count || 0
      };
    },
  });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Relatórios e Análises</h1>
        <p className="text-muted-foreground mt-1">
          Acompanhe o desempenho do seu negócio
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total de Imóveis"
          value={metrics?.properties_count || 0}
          icon={Building2}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Contratos Ativos"
          value={metrics?.active_contracts || 0}
          icon={Receipt}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Inquilinos"
          value={metrics?.tenants_count || 0}
          icon={Users}
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <ContractsChart />
        </Card>
        
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Receita Mensal</h3>
          {/* Implementar gráfico de receita */}
        </Card>
      </div>
    </div>
  );
};

export default Reports;