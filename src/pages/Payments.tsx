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
import { supabase } from "@/integrations/supabase/client";

const statusMap = {
  paid: { label: "Pago", variant: "success" },
  pending: { label: "Pendente", variant: "warning" },
  late: { label: "Atrasado", variant: "destructive" },
} as const;

const Payments = () => {
  const { data: payments } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payments")
        .select(`
          *,
          contract:contracts(
            monthly_rent,
            property:properties(title),
            tenant:tenants(name)
          )
        `)
        .order("due_date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const handleCreatePayment = async () => {
    try {
      const response = await supabase.functions.invoke('create-payment', {
        body: {
          contractId: "contract-id", // Será substituído pelo ID real do contrato
          amount: 1000,
          dueDate: "2024-04-01",
          tenantId: "tenant-id" // Será substituído pelo ID real do inquilino
        }
      });

      if (response.error) throw response.error;
      
      // Atualizar a lista de pagamentos
      // queryClient.invalidateQueries(["payments"]);
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Pagamentos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie os pagamentos dos aluguéis
          </p>
        </div>
        <Button onClick={handleCreatePayment}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Pagamento
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imóvel</TableHead>
              <TableHead>Inquilino</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Vencimento</TableHead>
              <TableHead>Pagamento</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments?.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell className="font-medium">
                  {payment.contract?.property?.title}
                </TableCell>
                <TableCell>{payment.contract?.tenant?.name}</TableCell>
                <TableCell>
                  {payment.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  {new Date(payment.due_date).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>
                  {payment.paid_at
                    ? new Date(payment.paid_at).toLocaleDateString("pt-BR")
                    : "-"}
                </TableCell>
                <TableCell>
                  <Badge variant={statusMap[payment.status as keyof typeof statusMap].variant as any}>
                    {statusMap[payment.status as keyof typeof statusMap].label}
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

export default Payments;