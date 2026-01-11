import { getMyProfile } from '@/services/user.service';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { notFound } from 'next/navigation';

export default async function Bio() {
  const res = await getMyProfile();
  if (!res?.success || !res?.data) {
    notFound();
  }
  const user = res.data;
  return (
    <Box>
      <Typography variant='h5' fontWeight='bold' gutterBottom>
        Tổng quan
      </Typography>
      <Typography variant='body1' color='text.secondary' component={'p'}>
        {user?.profile?.bio}
      </Typography>
    </Box>
  );
}
