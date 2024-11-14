export interface CoreTypes {
  properties: {
    Row: {
      id: string;
      title: string;
      address: string;
      type: string;
      bedrooms: number;
      bathrooms: number;
      area: number;
      price: number;
      status: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      title: string;
      address: string;
      type: string;
      bedrooms: number;
      bathrooms: number;
      area: number;
      price: number;
      status?: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      title?: string;
      address?: string;
      type?: string;
      bedrooms?: number;
      bathrooms?: number;
      area?: number;
      price?: number;
      status?: string;
      updated_at?: string;
    };
  };
  tenants: {
    Row: {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      cpf: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      name: string;
      email: string;
      phone?: string | null;
      cpf: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      name?: string;
      email?: string;
      phone?: string | null;
      cpf?: string;
      updated_at?: string;
    };
  };
}