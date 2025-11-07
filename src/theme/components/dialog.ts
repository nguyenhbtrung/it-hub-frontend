import { Components, Theme } from '@mui/material/styles';
import { shape } from '@/theme';

export const MuiDialog: Components<Theme>['MuiDialog'] = {
  styleOverrides: {
    paper: {
      borderRadius: shape.borderRadiusLg,
      padding: '1.5rem',
    },
  },
};
