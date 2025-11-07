'use client';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { lightPalette, darkPalette, typography, shape, components } from '@/theme';

export const lightTheme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    palette: { mode: 'light', ...lightPalette },
    typography,
    shape,
    components,
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    cssVariables: true,
    palette: { mode: 'dark', ...darkPalette },
    typography,
    shape,
    components,
  })
);

export const createAppTheme = (mode: 'light' | 'dark') =>
  responsiveFontSizes(
    createTheme({
      cssVariables: true,
      palette: mode === 'light' ? lightPalette : darkPalette,
      typography,
      shape,
      components,
    })
  );

export const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'class',
  },
  colorSchemes: {
    light: {
      palette: lightPalette,
    },
    dark: {
      palette: darkPalette,
    },
  },
  typography,
  shape,
  components,
});
