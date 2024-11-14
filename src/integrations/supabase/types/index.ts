import { AuthTypes } from './auth';
import { ChatTypes } from './chat';
import { CoreTypes } from './core';
import { FinancialTypes } from './financial';
import { MetricsTypes } from './metrics';
import { SupportTypes } from './support';

export interface Database {
  public: {
    Tables: AuthTypes & ChatTypes & CoreTypes & FinancialTypes & MetricsTypes & SupportTypes;
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}

export type { AuthTypes, ChatTypes, CoreTypes, FinancialTypes, MetricsTypes, SupportTypes };