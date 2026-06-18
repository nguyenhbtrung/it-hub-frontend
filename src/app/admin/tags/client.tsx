'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Suspense } from 'react';
import AddTag from '@/components/admin/tags/addTag';
import TagTable from '@/components/admin/tags/tagTable';

export default function TagPageClient() {
  const [reloadKey, setReloadKey] = useState(0);

  const handleSuccess = () => {
    setReloadKey((k) => k + 1);
  };

  return (
    <>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h4' fontWeight={600} noWrap>
          Quản lý Tag
        </Typography>
        <AddTag onSuccess={handleSuccess} />
      </Box>

      <Suspense>
        <TagTable reloadKey={reloadKey} />
      </Suspense>
    </>
  );
}
