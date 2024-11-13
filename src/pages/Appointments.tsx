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
  scheduled: { label: "Agendado", variant: "default" },
  completed: { label: "Concluído", variant: "success" },
  cancelled: { label: "Cancelado", variant: "destructive" },
} as const;

const Appointments = () => {
  const { data: appointments } = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select(`
          *,
          property:properties(title)
        `)
        .order("date", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Agendamentos</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie as visitas aos imóveis
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imóvel</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Horário</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments?.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">
                  {appointment.property?.title}
                </TableCell>
                <TableCell>{appointment.client_name}</TableCell>
                <TableCell>
                  {new Date(appointment.date).toLocaleDateString("pt-BR")}
                </TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>
                  <Badge variant={statusMap[appointment.status as keyof typeof statusMap].variant as any}>
                    {statusMap[appointment.status as keyof typeof statusMap].label}
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

export default Appointments;