'use client';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createUser } from '@/services/user.service';
import { z } from 'zod';
import { useNotification } from '@/contexts/notificationContext';

export const createUserScheme = z.object({
  email: z.email('Email không đúng định dạng'),
  fullname: z.string().nullable().optional(),
  password: z.string().min(1, 'Mật khẩu không thể để trống'),
  role: z.enum(['admin', 'instructor', 'student']),
});

type CreateUserForm = z.infer<typeof createUserScheme>;

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AddUserDialog({ open, onClose, onSuccess }: Props) {
  const { notify } = useNotification();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateUserForm>({
    resolver: zodResolver(createUserScheme),
    defaultValues: {
      email: '',
      fullname: null,
      role: 'student',
      password: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = async (values: CreateUserForm) => {
    try {
      const res = await createUser({ ...values, scope: 'external' });
      if (!res?.success) {
        throw new Error(res?.error?.message);
      }

      notify('success', 'Thêm người dùng thành công', {
        vertical: 'top',
        horizontal: 'right',
      });

      reset();

      onClose();
      onSuccess?.();
    } catch (error: any) {
      notify('error', error.message || 'Thêm người dùng thất bại, vui lòng thử lại', {
        vertical: 'top',
        horizontal: 'right',
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>Thêm người dùng</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='email'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Email'
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='fullname'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label='Họ tên'
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  value={field.value ?? ''}
                  onChange={(e) => {
                    const v = e.target.value;
                    field.onChange(v === '' ? null : v);
                  }}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='password'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  variant='filled'
                  label='Mật khẩu'
                  type='password'
                  fullWidth
                  autoComplete='new-password'
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Controller
              name='role'
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  variant='filled'
                  label='Vai trò'
                  select
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                >
                  <MenuItem value='admin'>Quản trị viên</MenuItem>
                  <MenuItem value='instructor'>Giảng viên</MenuItem>
                  <MenuItem value='student'>Học viên</MenuItem>
                </TextField>
              )}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button variant='contained' onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
