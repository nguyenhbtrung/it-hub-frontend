import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/material/styles';

interface SectionProps {
  id: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function Section({ id, children, sx }: SectionProps) {
  return (
    <Box id={id} sx={{ scrollMarginTop: 100, ...sx }}>
      {children}
    </Box>
  );
}
