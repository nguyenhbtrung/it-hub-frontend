export type FieldType = 'string' | 'number' | 'boolean' | 'date';

export type Operator = 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'like' | 'between';

export type FilterItem = {
  field: string;
  operator: string;
  value: string;
};
