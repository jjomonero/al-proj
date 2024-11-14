export interface SupportTypes {
  faq_topics: {
    Row: {
      id: string;
      title: string;
      description: string;
      frequency: number;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      title: string;
      description: string;
      frequency?: number;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      title?: string;
      description?: string;
      frequency?: number;
      updated_at?: string;
    };
  };
}