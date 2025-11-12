import { PaletteColorOptions, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    hero: PaletteColor;
  }
  interface PaletteOptions {
    hero?: PaletteColorOptions;
  }
}
