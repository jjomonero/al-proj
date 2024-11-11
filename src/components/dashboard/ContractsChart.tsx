import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", active: 40, expired: 24 },
  { month: "Fev", active: 30, expired: 13 },
  { month: "Mar", active: 20, expired: 38 },
  { month: "Abr", active: 27, expired: 39 },
  { month: "Mai", active: 18, expired: 48 },
  { month: "Jun", active: 23, expired: 38 },
  { month: "Jul", active: 34, expired: 43 },
];

const ContractsChart = () => {
  return (
    <div className="stats-card h-[400px]">
      <h3 className="text-lg font-semibold mb-6">Evolução de Contratos</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="active" name="Ativos" fill="#1E40AF" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expired" name="Expirados" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ContractsChart;