'use client';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import Link from 'next/link';
import Button from '@mui/material/Button';
import { useSaveStore } from '@/store/useSaveStore';

interface HeaderActionProps {
  slug: string;
}

export default function HeaderAction({ slug }: HeaderActionProps) {
  const triggerSave = useSaveStore((state) => state.triggerSave);
  const isSubmitting = useSaveStore((state) => state.isSubmitting);
  return (
    <>
      <Button
        component='a'
        href={`/courses/${slug}`}
        target='_blank'
        rel='noopener noreferrer'
        variant='outlined'
        endIcon={<VisibilityIcon />}
        sx={{
          borderColor: 'grey.300',
          color: 'text.primary',
          '&:hover': { bgcolor: 'grey.50' },
        }}
      >
        Xem trước
      </Button>
      <Button
        variant='contained'
        endIcon={<SaveIcon />}
        onClick={triggerSave}
        disabled={isSubmitting}
        sx={{
          bgcolor: 'primary.main',
          fontWeight: 'bold',
          '&:hover': { bgcolor: 'primary.dark' },
        }}
      >
        Lưu thay đổi
      </Button>
    </>
  );
}
