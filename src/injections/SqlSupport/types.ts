import { SupersetError } from 'src/components/ErrorMessage/types';
import { CtasEnum } from 'src/injections/SqlSupport/actions/sqlSupport';

export type Column = {
  name: string;
};

export type Query = {
  cached: boolean;
  ctas: boolean;
  ctas_method?: keyof typeof CtasEnum;
  dbId: number;
  errors?: SupersetError[];
  errorMessage: string | null;
  extra: {
    progress: string | null;
  };
  id: string;
  isDataPreview: boolean;
  link?: string;
  progress: number;
  results: {
    displayLimitReached: boolean;
    columns: Column[];
    data: Record<string, unknown>[];
    expanded_columns: Column[];
    selected_columns: Column[];
  };
  resultsKey: string | null;
  schema: string;
  sql: string;
  sqlEditorId: string;
  state:
    | 'stopped'
    | 'failed'
    | 'pending'
    | 'running'
    | 'scheduled'
    | 'success'
    | 'timed_out';
  tab: string | null;
  tempSchema: string | null;
  tempTable: string;
  trackingUrl: string | null;
  templateParams: any;
  rows: number;
  queryLimit: number;
};
