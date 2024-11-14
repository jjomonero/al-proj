export interface FinancialTypes {
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