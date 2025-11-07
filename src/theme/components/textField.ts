import { Components, Theme } from '@mui/material/styles';
import { shape } from '@/theme';

export const MuiTextField: Components<Theme>['MuiTextField'] = {
  styleOverrides: {
    root: {
      borderRadius: shape.borderRadiusSm,
    },
  },
};
