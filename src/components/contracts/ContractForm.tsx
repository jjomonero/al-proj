import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { ContractFormFields } from "./ContractFormFields";

const contractFormSchema = z.object({
  property_id: z.string().min(1, "Imóvel é obrigatório"),
  tenant_id: z.string().min(1, "Inquilino é obrigatório"),
  start_date: z.string().min(1, "Data inicial é obrigatória"),
  end_date: z.string().min(1, "Data final é obrigatória"),
  monthly_rent: z.coerce.number().min(1, "Valor inválido"),
});

export type ContractFormValues = z.infer<typeof contractFormSchema>;

interface ContractFormProps {
  onSuccess?: () => void;
}

export function ContractForm({ onSuccess }: ContractFormProps) {
  const { toast } = useToast();
  const form = useForm<ContractFormValues>({
    resolver: zodResolver(contractFormSchema),
    defaultValues: {
      property_id: "",
      tenant_id: "",
      start_date: "",
      end_date: "",
      monthly_rent: 0,
    },
  });

  const { data: properties } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .eq("status", "available");
      
      if (error) throw error;
      return data;
    },
  });

  const { data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tenants")
        .select("*");
      
      if (error) throw error;
      return data;
    },
  });

  async function onSubmit(values: ContractFormValues) {
    try {
      const { error: contractError } = await supabase
        .from("contracts")
        .insert({
          property_id: values.property_id,
          tenant_id: values.tenant_id,
          start_date: values.start_date,
          end_date: values.end_date,
          monthly_rent: values.monthly_rent,
        });
      
      if (contractError) throw contractError;

      const { error: propertyError } = await supabase
        .from("properties")
        .update({ status: "rented" })
        .eq("id", values.property_id);

      if (propertyError) throw propertyError;

      toast({
        title: "Contrato cadastrado com sucesso!",
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar contrato",
        description: "Tente novamente mais tarde",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <ContractFormFields 
          form={form}
          properties={properties}
          tenants={tenants}
        />
        <Button type="submit" className="w-full">
          Cadastrar Contrato
        </Button>
      </form>
    </Form>
  );
}