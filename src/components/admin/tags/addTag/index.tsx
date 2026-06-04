'use client';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
// import AddUserDialog from '../dialogs/addUser';

interface AddUserProps {
  onSuccess: () => void;
}

export default function AddTag({ onSuccess }: AddUserProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button startIcon={<AddIcon />} variant='contained' onClick={() => setOpen(true)}>
        Thêm Tag
      </Button>
      {/* <AddUserDialog open={open} onClose={() => setOpen(false)} onSuccess={onSuccess} /> */}
    </>
  );
}
