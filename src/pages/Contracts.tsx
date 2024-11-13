import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import { FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const statusMap = {
  active: { label: "Ativo", variant: "success" },
  pending: { label: "Pendente", variant: "warning" },
  expired: { label: "Expirado", variant: "destructive" },
} as const;

const Contracts = () => {
  const { toast } = useToast();
  const { data: contracts, isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: api.contracts.list,
  });

  const handleAddContract = () => {
    toast({
      title: "Funcionalidade em desenvolvimento",
      description: "Em breve você poderá criar novos contratos.",
    });
  };

  if (isLoading) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Contratos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus contratos de aluguel
          </p>
        </div>
        <Button onClick={handleAddContract}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Contrato
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imóvel</TableHead>
              <TableHead>Locatário</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts?.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">{contract.property}</TableCell>
                <TableCell>{contract.tenant}</TableCell>
                <TableCell>{contract.value}</TableCell>
                <TableCell>{contract.dueDate}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[contract.status].variant as any}>
                    {statusMap[contract.status].label}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Contracts;