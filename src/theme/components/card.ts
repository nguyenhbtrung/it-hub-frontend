import { Components, Theme } from '@mui/material/styles';
import { shape } from '@/theme';

export const MuiCard: Components<Theme>['MuiCard'] = {
  styleOverrides: {
    root: {
      borderRadius: shape.borderRadiusMd,
      padding: shape.cardPadding,
      boxShadow: `0 ${shape.cardElevation}px 12px rgba(0,0,0,0.08)`,
    },
  },
};
