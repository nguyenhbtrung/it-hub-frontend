'use client';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useRouter, useSearchParams } from 'next/navigation';

export default function CourseSortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sort = searchParams.get('sortBy') || 'popular';

  const handleChange = (event: { target: { value: string } }) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', event.target.value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant='body2' color='text.secondary'>
        Sắp xếp:
      </Typography>
      <FormControl size='small' sx={{ minWidth: 150 }}>
        <Select onChange={handleChange} labelId='sort-label' defaultValue={sort}>
          <MenuItem value='popular'>Phổ biến nhất</MenuItem>
          <MenuItem value='newest'>Mới nhất</MenuItem>
          <MenuItem value='rating'>Đánh giá cao</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
