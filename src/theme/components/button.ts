import { Components, Theme } from '@mui/material/styles';
import { shape } from '@/theme';

export const MuiButton: Components<Theme>['MuiButton'] = {
  styleOverrides: {
    root: {
      borderRadius: shape.borderRadiusSm,
      //   fontWeight: 600,
      //   textTransform: 'none',
      padding: '8px 20px',
      boxShadow: 'none',
      '&:hover': {
        boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
      },
    },
  },
};
