'use client';

import { useState } from 'react';
import { Button, Menu, MenuItem, Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Scope } from './types';

const SCOPE_OPTIONS: {
  value: Scope;
  label: string;
  description: string;
}[] = [
  {
    value: 'step',
    label: 'Bài giảng',
    description: 'Chỉ dựa trên nội dung bài giảng hiện tại',
  },
  {
    value: 'lesson',
    label: 'Bài học',
    description: 'Xem xét toàn bộ bài học',
  },
  {
    value: 'section',
    label: 'Chương',
    description: 'Liên kết kiến thức trong một chương',
  },
  {
    value: 'course',
    label: 'Khoá học',
    description: 'Sử dụng kiến thức trong toàn bộ khoá học',
  },
];

type Props = {
  value: Scope;
  onChange: (value: Scope) => void;
};

export function ScopeMenu({ value, onChange }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const current = SCOPE_OPTIONS.find((s) => s.value === value);

  return (
    <>
      <Button
        size='small'
        variant='outlined'
        onClick={(e) => setAnchorEl(e.currentTarget)}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{ textTransform: 'none', whiteSpace: 'nowrap' }}
      >
        {current?.label}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)} PaperProps={{ sx: { minWidth: 260 } }}>
        {SCOPE_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            onClick={() => {
              onChange(option.value);
              setAnchorEl(null);
            }}
            sx={{ alignItems: 'flex-start', gap: 1, py: 1 }}
          >
            <Box>
              <Typography fontWeight={600}>{option.label}</Typography>
              <Typography variant='caption' color='text.secondary'>
                {option.description}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
