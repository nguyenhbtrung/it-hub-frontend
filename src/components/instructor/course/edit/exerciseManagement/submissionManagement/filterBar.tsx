'use client';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/navigation';

const filterOptions = [
  { value: 'all', label: 'Tất cả' },
  { value: 'pending', label: 'Đang chờ chấm' },
  { value: 'graded', label: 'Đã chấm' },
  { value: 'not_submitted', label: 'Chưa nộp' },
];

export default function FilterBar({ currentStatus }: { currentStatus: string }) {
  const router = useRouter();

  const handleFilter = (status: string) => {
    const params = new URLSearchParams(window.location.search);
    if (status !== 'all') {
      params.set('status', status);
    } else {
      params.delete('status');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <Stack direction='row' spacing={1} sx={{ overflowX: 'auto', py: 0.5 }}>
      {filterOptions.map((option) => (
        <Button
          key={option.value}
          variant={currentStatus === option.value ? 'contained' : 'outlined'}
          size='small'
          onClick={() => handleFilter(option.value)}
          sx={{
            whiteSpace: 'nowrap',
            borderRadius: 2,
            ...(currentStatus === option.value ? {} : { borderColor: 'divider', color: 'text.secondary' }),
          }}
        >
          {option.label}
        </Button>
      ))}
    </Stack>
  );
}
