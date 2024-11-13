import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContractForm } from "@/components/contracts/ContractForm";
import { supabase } from "@/integrations/supabase/client";

const statusMap = {
  active: { label: "Ativo", variant: "success" },
  pending: { label: "Pendente", variant: "warning" },
  expired: { label: "Expirado", variant: "destructive" },
} as const;

const Contracts = () => {
  const [open, setOpen] = useState(false);

  const { data: contracts, refetch } = useQuery({
    queryKey: ["contracts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select(`
          *,
          property:properties(title),
          tenant:tenants(name)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleSuccess = () => {
    setOpen(false);
    refetch();
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Contratos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus contratos de aluguel
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Contrato
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Contrato</DialogTitle>
            </DialogHeader>
            <ContractForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imóvel</TableHead>
              <TableHead>Inquilino</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Início</TableHead>
              <TableHead>Término</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts?.map((contract) => (
              <TableRow key={contract.id}>
                <TableCell className="font-medium">
                  {contract.property?.title}
                </TableCell>
                <TableCell>{contract.tenant?.name}</TableCell>
                <TableCell>
                  {contract.monthly_rent.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(contract.start_date).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  {new Date(contract.end_date).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  <Badge variant={statusMap[contract.status as keyof typeof statusMap].variant as any}>
                    {statusMap[contract.status as keyof typeof statusMap].label}
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