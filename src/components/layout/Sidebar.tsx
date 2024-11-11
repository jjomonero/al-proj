import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  FileText,
  Calendar,
  CreditCard,
  BarChart3,
  LifeBuoy,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/" },
    { icon: Home, label: "Imóveis", path: "/imoveis" },
    { icon: FileText, label: "Contratos", path: "/contratos" },
    { icon: Calendar, label: "Agendamentos", path: "/agendamentos" },
    { icon: CreditCard, label: "Pagamentos", path: "/pagamentos" },
    { icon: BarChart3, label: "Relatórios", path: "/relatorios" },
    { icon: LifeBuoy, label: "Suporte", path: "/suporte" },
  ];

  return (
    <div className="w-64 bg-sidebar fixed h-screen flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-white">RentFlow</h1>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`sidebar-link ${
                location.pathname === link.path ? "active" : ""
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;