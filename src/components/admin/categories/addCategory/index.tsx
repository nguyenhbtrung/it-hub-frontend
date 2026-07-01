'use client';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddCategoryDialog from '../dialogs/addCategory';

interface AddUserProps {
  onSuccess: () => void;
}

export default function AddCategory({ onSuccess }: AddUserProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button startIcon={<AddIcon />} variant='contained' onClick={() => setOpen(true)}>
        Thêm Danh mục
      </Button>
      <AddCategoryDialog open={open} onClose={() => setOpen(false)} onSuccess={onSuccess} />
    </>
  );
}
