'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import AppPagination from '@/components/common/pagination';

export default function PaginationBar({ meta, currentPage }: { meta: any; currentPage: number }) {
  const router = useRouter();
  const totalPages = Math.ceil(meta.total / meta.limit);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        bgcolor: 'customBackground.5',
        borderTop: '1px solid',
        borderColor: 'divider',
        px: 2,
        py: 1.5,
      }}
    >
      <Typography variant='caption' color='text.secondary'>
        Hiển thị{' '}
        <strong>
          {(currentPage - 1) * meta.limit + 1} - {Math.min(currentPage * meta.limit, meta.total)}
        </strong>{' '}
        trong số <strong>{meta.total}</strong> học viên
      </Typography>
      <AppPagination count={totalPages} page={currentPage} onChange={handlePageChange} size={30} borderRadius={0.5} />
    </Box>
  );
}
