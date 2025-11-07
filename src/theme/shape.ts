import { ShapeOptions } from '@mui/system';

export const shape: ShapeOptions & {
  borderRadiusSm: number;
  borderRadiusMd: number;
  borderRadiusLg: number;
  borderRadiusXl: number;
  cardElevation: number;
  cardPadding: string;
} = {
  // === Base radius for all components ===
  borderRadius: 12,

  // === Custom radius scale ===
  borderRadiusSm: 8, // small button, input
  borderRadiusMd: 12, // card, form
  borderRadiusLg: 16, // modal, dialog
  borderRadiusXl: 24, // banner, hero, large section

  // === Card defaults ===
  cardElevation: 2,
  cardPadding: '1.25rem',
};
