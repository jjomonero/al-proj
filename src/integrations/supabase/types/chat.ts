export interface ChatTypes {
  chat_conversations: {
    Row: {
      id: string;
      user_id: string;
      topic: string;
      created_at: string;
      updated_at: string;
    };
    Insert: {
      user_id: string;
      topic: string;
      created_at?: string;
      updated_at?: string;
    };
    Update: {
      user_id?: string;
      topic?: string;
      updated_at?: string;
    };
  };
  chat_messages: {
    Row: {
      id: string;
      conversation_id: string;
      content: string;
      is_bot: boolean;
      created_at: string;
    };
    Insert: {
      conversation_id: string;
      content: string;
      is_bot?: boolean;
      created_at?: string;
    };
    Update: {
      content?: string;
      is_bot?: boolean;
    };
  };
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