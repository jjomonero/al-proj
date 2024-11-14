export interface FinancialTypes {
  contracts: {
    Row: {
      id: string;
      property_id: string;
      tenant_id: string;
      start_date: string;
      end_date: string;
      monthly_rent: number;
      status: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      property_id: string;
      tenant_id: string;
      start_date: string;
      end_date: string;
      monthly_rent: number;
      status?: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      property_id?: string;
      tenant_id?: string;
      start_date?: string;
      end_date?: string;
      monthly_rent?: number;
      status?: string;
      updated_at?: string;
    };
  };
  payments: {
    Row: {
      id: string;
      contract_id: string;
      amount: number;
      due_date: string;
      paid_at: string | null;
      status: string;
      asaas_id: string | null;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      contract_id: string;
      amount: number;
      due_date: string;
      paid_at?: string | null;
      status?: string;
      asaas_id?: string | null;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      amount?: number;
      due_date?: string;
      paid_at?: string | null;
      status?: string;
      asaas_id?: string | null;
      updated_at?: string;
    };
  };
}