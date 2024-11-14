import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div className="mt-4">
        <span className={`text-sm font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend.isPositive ? '+' : '-'}{trend.value}%
        </span>
        <span className="text-sm text-muted-foreground ml-1">desde o último mês</span>
      </div>
    </Card>
  );
};

export default StatsCard;