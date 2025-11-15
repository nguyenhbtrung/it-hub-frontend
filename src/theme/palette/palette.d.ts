import { PaletteColorOptions, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    hero: PaletteColor;
    gradient: {
      [key: string]: string;
    };
    footer: {
      [key: string]: string;
    };
  }
  interface PaletteOptions {
    hero?: PaletteColorOptions;
    gradient?: {
      [key: string]: string;
    };
    footer?: {
      [key: string]: string;
    };
  }
}
