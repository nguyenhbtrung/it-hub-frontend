'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import CategoryTable from '@/components/admin/categories/catgoriyTable';
import { Suspense } from 'react';
import AddCategory from '@/components/admin/categories/addCategory';

export default function CategoryPageClient() {
  const [reloadKey, setReloadKey] = useState(0);

  const handleSuccess = () => {
    setReloadKey((k) => k + 1);
  };

  return (
    <>
      <Box display='flex' justifyContent='space-between' sx={{ mb: 2 }}>
        <Typography variant='h4' fontWeight={600} noWrap>
          Quản lý danh mục
        </Typography>
        <AddCategory onSuccess={handleSuccess} />
      </Box>

      <Suspense>
        <CategoryTable reloadKey={reloadKey} />
      </Suspense>
    </>
  );
}
