import { Building, FileText, Calendar, DollarSign } from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import ContractsChart from "@/components/dashboard/ContractsChart";
import RecentContracts from "@/components/dashboard/RecentContracts";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <Header />
      <main className="pl-64 pt-16">
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold">Bem-vindo ao RentFlow</h1>
            <p className="text-muted-foreground mt-1">
              Confira o resumo das suas operações
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total de Imóveis"
              value={48}
              icon={Building}
              trend={{ value: 12, isPositive: true }}
            />
            <StatsCard
              title="Contratos Ativos"
              value={32}
              icon={FileText}
              trend={{ value: 8, isPositive: true }}
            />
            <StatsCard
              title="Visitas Agendadas"
              value={15}
              icon={Calendar}
              trend={{ value: 5, isPositive: true }}
            />
            <StatsCard
              title="Receita Mensal"
              value={45850}
              icon={DollarSign}
              trend={{ value: 3, isPositive: false }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <ContractsChart />
            <RecentContracts />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;