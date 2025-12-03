import { theme } from '@/theme';
import { ThemeProvider, CssBaseline } from '@mui/material';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
