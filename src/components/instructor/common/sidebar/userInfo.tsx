'use client';

import { ApiResponse } from '@/lib/api';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { use } from 'react';

interface Props {
  profilePromise: Promise<ApiResponse<any>>;
}

export default function UserInfo({ profilePromise }: Props) {
  const res = use(profilePromise);
  const user = res.success ? res.data : null;
  return (
    <>
      {user && (
        <Box>
          <Divider sx={{ mb: 2 }} />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2 }}>
            <Avatar
              alt={user?.fullname || 'User'}
              src={user?.avatar?.url || undefined}
              sx={{ width: 40, height: 40 }}
            />
            <Box sx={{ flex: 1 }}>
              <Typography variant='body2' sx={{ fontWeight: 500 }}>
                {user.fullname}
              </Typography>
              <Typography variant='caption' color='text.secondary'>
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
