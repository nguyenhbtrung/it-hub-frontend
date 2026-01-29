'use client';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import AddUserDialog from '../dialogs/addUser';

interface AddUserProps {
  onSuccess: () => void;
}

export default function AddUser({ onSuccess }: AddUserProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button startIcon={<AddIcon />} variant='contained' onClick={() => setOpen(true)}>
        Thêm người dùng
      </Button>
      <AddUserDialog open={open} onClose={() => setOpen(false)} onSuccess={onSuccess} />
    </>
  );
}
