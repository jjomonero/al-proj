import { AuthTypes } from './auth';
import { ChatTypes } from './chat';
import { CoreTypes } from './core';
import { FinancialTypes } from './financial';

export interface Database {
  public: {
    Tables: AuthTypes & ChatTypes & CoreTypes & FinancialTypes;
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}

export type { AuthTypes, ChatTypes, CoreTypes, FinancialTypes };