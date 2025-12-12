import { JSX } from 'react';

export interface Stat {
  title: string;
  value: string;
  icon?: JSX.Element;
  change?: string;
  changeColor?: string;
  description?: string;
}
