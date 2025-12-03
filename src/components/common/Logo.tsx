import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@/components/common/Link';
import { SxProps } from '@mui/material/styles';
import { Theme } from '@mui/material/styles';

interface LogoProps {
  href: string;
  sx?: SxProps<Theme>;
}

export default function Logo({ href, sx }: LogoProps) {
  return (
    <Box display='flex' justifyContent='center' alignItems='center' sx={{ ...sx }}>
      <Link href={href} passHref>
        <Typography
          textTransform='uppercase'
          variant='h4'
          fontWeight={700}
          color='primary'
          sx={{ whiteSpace: 'nowrap' }}
        >
          IT Hub
        </Typography>
      </Link>
    </Box>
  );
}
