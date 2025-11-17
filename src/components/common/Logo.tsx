import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@/components/common/Link';

export default function Logo() {
  return (
    <Box display='flex' justifyContent='center' alignItems='center'>
      <Link href='/' passHref>
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
