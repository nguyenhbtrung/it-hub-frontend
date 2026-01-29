'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import UserTable from '@/components/admin/users/userTable';
import { Suspense } from 'react';
import AddUser from '@/components/admin/users/addUser';

export default function UserPageClient() {
  const [reloadKey, setReloadKey] = useState(0);

  const handleSuccess = () => {
    setReloadKey((k) => k + 1);
  };

  return (
    <>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h4' fontWeight={600} noWrap>
          Quản lý người dùng
        </Typography>
        <AddUser onSuccess={handleSuccess} />
      </Box>

      <Suspense>
        <UserTable reloadKey={reloadKey} />
      </Suspense>
    </>
  );
}
