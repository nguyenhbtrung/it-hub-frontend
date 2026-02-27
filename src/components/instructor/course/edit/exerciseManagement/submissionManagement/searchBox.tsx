'use client';

import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { alpha } from '@mui/material/styles';

export default function SearchBox({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  return (
    <TextField
      fullWidth
      size='small'
      placeholder='Tìm kiếm tên học viên...'
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && handleSearch(value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchIcon fontSize='small' sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
        sx: {
          bgcolor: (theme) => alpha(theme.palette.common.black, 0.02),
          '&:hover': { bgcolor: (theme) => alpha(theme.palette.common.black, 0.04) },
        },
      }}
      sx={{ maxWidth: 320 }}
    />
  );
}
