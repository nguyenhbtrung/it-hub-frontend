import { Components, Theme } from '@mui/material/styles';
import { shape } from '@/theme';

export const MuiPaper: Components<Theme>['MuiPaper'] = {
  styleOverrides: {
    rounded: {
      borderRadius: shape.borderRadiusMd,
    },
  },
};
