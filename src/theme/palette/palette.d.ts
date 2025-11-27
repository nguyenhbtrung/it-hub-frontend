import { TypeBackground } from '@mui/material/styles';
import { PaletteColorOptions, PaletteColor } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    hero: PaletteColor;
    search: PaletteColor;
    gradient: {
      [key: string]: string;
    };
    footer: {
      [key: string]: string;
    };
    customBackground: {
      [key: string]: string;
    };
  }
  interface PaletteOptions {
    hero?: PaletteColorOptions;
    search?: PaletteColorOptions;
    gradient?: {
      [key: string]: string;
    };
    footer?: {
      [key: string]: string;
    };
    customBackground?: {
      [key: string]: string;
    };
  }
}
