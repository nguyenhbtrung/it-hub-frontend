import { Components, Theme } from '@mui/material/styles';
import { shape } from '@/theme';

export const MuiChip: Components<Theme>['MuiChip'] = {
  styleOverrides: {
    root: {
      borderRadius: shape.borderRadiusMd,
      fontWeight: 500,
    },
  },
};
