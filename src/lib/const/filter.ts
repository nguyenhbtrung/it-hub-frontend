import { FieldType, Operator } from '@/types/filter';

export const operatorMap: Record<FieldType, Operator[]> = {
  string: ['eq', 'ne', 'like'],
  number: ['eq', 'ne', 'gt', 'lt', 'gte', 'lte', 'between'],
  boolean: ['eq', 'ne'],
  date: ['eq', 'ne', 'gt', 'lt', 'gte', 'lte', 'between'],
};

export const operatorLabelsMap: Record<Operator, string> = {
  eq: '=',
  ne: '≠',
  like: 'chứa',
  gt: '>',
  lt: '<',
  gte: '≥',
  lte: '≤',
  between: 'Trong khoảng',
};
