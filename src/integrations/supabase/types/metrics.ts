export interface MetricsTypes {
  metrics: {
    Row: {
      id: string;
      name: string;
      value: number;
      date: string;
      type: string;
      created_at: string;
    };
    Insert: {
      name: string;
      value: number;
      date: string;
      type: string;
      created_at?: string;
    };
    Update: {
      name?: string;
      value?: number;
      date?: string;
      type?: string;
    };
  };
}