'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNotification } from '@/contexts/notificationContext';
import { createUserAction, getUserErrorMessage } from '@/features/user';
import { getErrorMessage } from '@/lib/errors';
import { useEffect, useState } from 'react';
import { createCategoryAction, getCategories, getCategoryErrorMessage } from '@/features/category';
import { Category } from '@/types/category';

export const createCategoryScheme = z.object({
  name: z.string().min(1, 'Tên danh mục không thể để trống').max(60, 'Tên danh mục không vượt quá 60 ký tự'),
  slug: z.string().min(1, 'Slug không thể để trống').max(60, 'Slug không vượt quá 60 ký tự'),
  description: z.string().min(1, 'Vui lòng nhập mô tả danh mục'),
  parentId: z
    .string()
    .nullable()
    .transform((val) => (val === 'none' || !val ? null : val)),
});

type CreateCategoryForm = z.infer<typeof createCategoryScheme>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddCategoryDialog({ open, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [parentCategories, setParentCategories] = useState<Category[] | null>(null);

  const { notify } = useNotification();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateCategoryForm>({
    resolver: zodResolver(createCategoryScheme),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      parentId: 'none',
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    const fetchParentCategories = async () => {
      setLoading(true);
      const res = await getCategories({ all: true, root: true });
      if (res.success) {
        setParentCategories(res.data ?? []);
      } else {
        notify('error', getErrorMessage(res, getCategoryErrorMessage), { vertical: 'top', horizontal: 'right' });
      }
      setLoading(false);
    };

    fetchParentCategories();
  }, []);

  const onSubmit = async (values: CreateCategoryForm) => {
    console.log('payload: ', values);
    const res = await createCategoryAction(values);
    if (!res.success) {
      notify('error', getErrorMessage(res, getCategoryErrorMessage), { vertical: 'top', horizontal: 'right' });
      return;
    }

    notify('success', 'Thêm danh mục thành công', { vertical: 'top', horizontal: 'right' });

    reset();

    onClose();
    onSuccess?.();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>Thêm danh mục</DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box display='flex' justifyContent='center' py={6}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='name'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Tên danh mục'
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='slug'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Slug'
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
              <Controller
                name='description'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Mô tả danh mục'
                    fullWidth
                    multiline
                    rows={3}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  />
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 12 }}>
              <Controller
                name='parentId'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    value={field.value ?? 'none'}
                    variant='filled'
                    label='Danh mục cha'
                    select
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    <MenuItem value='none'>
                      <em>Không</em>
                    </MenuItem>
                    {(parentCategories ?? []).map((cat) => (
                      <MenuItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant='contained' onClick={handleSubmit(onSubmit)} disabled={isSubmitting || loading}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
