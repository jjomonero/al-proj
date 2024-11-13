import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const contractFormSchema = z.object({
  property_id: z.string().min(1, "Imóvel é obrigatório"),
  tenant_id: z.string().min(1, "Inquilino é obrigatório"),
  start_date: z.string().min(1, "Data inicial é obrigatória"),
  end_date: z.string().min(1, "Data final é obrigatória"),
  monthly_rent: z.coerce.number().min(1, "Valor inválido"),
});

type ContractFormValues = z.infer<typeof contractFormSchema>;

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

  async function onSubmit(data: ContractFormValues) {
    try {
      const { error: contractError } = await supabase
        .from("contracts")
        .insert(data);
      
      if (contractError) throw contractError;

      const { error: propertyError } = await supabase
        .from("properties")
        .update({ status: "rented" })
        .eq("id", data.property_id);

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
        <FormField
          control={form.control}
          name="property_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imóvel</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o imóvel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {properties?.map((property) => (
                    <SelectItem key={property.id} value={property.id}>
                      {property.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tenant_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inquilino</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o inquilino" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tenants?.map((tenant) => (
                    <SelectItem key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Inicial</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data Final</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="monthly_rent"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor do Aluguel</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Cadastrar Contrato
        </Button>
      </form>
    </Form>
  );
}