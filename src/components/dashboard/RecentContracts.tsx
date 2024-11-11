import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const contracts = [
  {
    id: 1,
    property: "Apartamento 301 - Copacabana",
    tenant: "João Silva",
    status: "active",
    value: "R$ 2.500,00",
    dueDate: "15/05/2024",
  },
  {
    id: 2,
    property: "Casa - Jardim Botânico",
    tenant: "Maria Santos",
    status: "pending",
    value: "R$ 4.800,00",
    dueDate: "10/05/2024",
  },
  {
    id: 3,
    property: "Sala Comercial - Centro",
    tenant: "Pedro Costa",
    status: "expired",
    value: "R$ 3.200,00",
    dueDate: "01/05/2024",
  },
];

const statusMap = {
  active: { label: "Ativo", class: "bg-success text-white" },
  pending: { label: "Pendente", class: "bg-yellow-500 text-white" },
  expired: { label: "Expirado", class: "bg-destructive text-white" },
};

const RecentContracts = () => {
  return (
    <div className="stats-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Contratos Recentes</h3>
        <button className="text-sm text-primary font-medium hover:underline">
          Ver todos
        </button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imóvel</TableHead>
            <TableHead>Locatário</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Vencimento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts.map((contract) => (
            <TableRow key={contract.id}>
              <TableCell className="font-medium">{contract.property}</TableCell>
              <TableCell>{contract.tenant}</TableCell>
              <TableCell>
                <Badge className={statusMap[contract.status].class}>
                  {statusMap[contract.status].label}
                </Badge>
              </TableCell>
              <TableCell>{contract.value}</TableCell>
              <TableCell>{contract.dueDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecentContracts;