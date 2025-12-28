'use client';
import ArrowBackIosNew from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIos from '@mui/icons-material/ArrowForwardIos';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useRouter, useSearchParams } from 'next/navigation';

interface AppPaginationProps {
  count: number;
  page: number;
  onChange?: (event: React.ChangeEvent<unknown>, value: number) => void;
}

export default function AppPagination({ count, page, onChange }: AppPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', value.toString());
    router.replace(`?${params.toString()}`);
  };
  return (
    <>
      {count > 1 && (
        <Pagination
          count={count}
          page={page}
          onChange={onChange || handleChangePage}
          renderItem={(item) => (
            <PaginationItem
              slots={{
                previous: ArrowBackIosNew,
                next: ArrowForwardIos,
              }}
              {...item}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                },
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                minWidth: 40,
                height: 40,
              }}
            />
          )}
        />
      )}
    </>
  );
}
