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
import { PropertyForm } from "@/components/properties/PropertyForm";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

type Property = Tables<"properties">;

const Properties = () => {
  const [open, setOpen] = useState(false);

  const { data: properties, refetch } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Property[];
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
          <h1 className="text-2xl font-bold">Imóveis</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus imóveis cadastrados
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Imóvel
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Cadastrar Imóvel</DialogTitle>
            </DialogHeader>
            <PropertyForm onSuccess={handleSuccess} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-sm border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Imóvel</TableHead>
              <TableHead>Endereço</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties?.map((property) => (
              <TableRow key={property.id}>
                <TableCell className="font-medium">{property.title}</TableCell>
                <TableCell>{property.address}</TableCell>
                <TableCell>{property.type}</TableCell>
                <TableCell>
                  {property.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={property.status === "available" ? "success" : "secondary"}
                  >
                    {property.status === "available" ? "Disponível" : "Alugado"}
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

export default Properties;