import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { month: "Jan", revenue: 15000 },
  { month: "Fev", revenue: 18000 },
  { month: "Mar", revenue: 17000 },
  { month: "Abr", revenue: 19000 },
  { month: "Mai", revenue: 21000 },
  { month: "Jun", revenue: 20000 },
  { month: "Jul", revenue: 22000 },
];

const RevenueChart = () => {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            name="Receita"
            stroke="#1E40AF"
            fill="#1E40AF"
            fillOpacity={0.1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;