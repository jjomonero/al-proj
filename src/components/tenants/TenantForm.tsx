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
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const tenantFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional(),
  cpf: z.string().min(11, "CPF inválido").max(14, "CPF inválido"),
});

type TenantFormValues = z.infer<typeof tenantFormSchema>;

interface TenantFormProps {
  onSuccess?: () => void;
}

export function TenantForm({ onSuccess }: TenantFormProps) {
  const { toast } = useToast();
  const form = useForm<TenantFormValues>({
    resolver: zodResolver(tenantFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      cpf: "",
    },
  });

  async function onSubmit(data: TenantFormValues) {
    try {
      const { error } = await supabase.from("tenants").insert(data);
      
      if (error) throw error;

      toast({
        title: "Inquilino cadastrado com sucesso!",
      });

      form.reset();
      onSuccess?.();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar inquilino",
        description: "Tente novamente mais tarde",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="João Silva" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="joao@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone</FormLabel>
              <FormControl>
                <Input placeholder="(11) 99999-9999" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cpf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CPF</FormLabel>
              <FormControl>
                <Input placeholder="123.456.789-00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Cadastrar Inquilino
        </Button>
      </form>
    </Form>
  );
}