import { FieldType, FilterItem, Operator } from '@/types/filter';
import { operatorMap } from '../const/filter';

export const getOperatorsForField = <T>(field: string, schema: Record<keyof T, FieldType>): Operator[] => {
  const type = schema[field as keyof T];
  return operatorMap[type] ?? [];
};

export const getDefaultFilter = <T>(schema: Record<keyof T, FieldType>): FilterItem => {
  const fields = Object.keys(schema);
  const defaultField = fields[0];
  const defaultOps = getOperatorsForField<T>(defaultField, schema);
  return { field: defaultField, operator: defaultOps[0], value: '' };
};
