'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Box,
  CircularProgress,
  Grid,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateUser, getUserById } from '@/services/user.service';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { useNotification } from '@/contexts/notificationContext';

const optionalUrl = z.url('URL không hợp lệ').optional().nullable();

export const updateUserSchema = z.object({
  email: z.email('Email không đúng định dạng'),

  fullname: z.string().nullable().optional(),

  school: z.string().nullable().optional(),
  specialized: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),

  githubUrl: optionalUrl,
  linkedinUrl: optionalUrl,
  websiteUrl: optionalUrl,

  role: z.enum(['admin', 'instructor', 'student']),
  scope: z.enum(['internal', 'external']),
  status: z.enum(['active', 'suspended']),
});

type UpdateUserForm = z.infer<typeof updateUserSchema>;

interface Props {
  open: boolean;
  userId: string | null;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function UpdateUserDialog({ open, userId, onClose, onSuccess }: Props) {
  const { notify } = useNotification();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<UpdateUserForm>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: '',
      fullname: null,
      role: undefined,
      scope: undefined,
      status: undefined,
      school: null,
      specialized: null,
      bio: null,
      githubUrl: null,
      linkedinUrl: null,
      websiteUrl: null,
    },
    mode: 'onBlur',
  });

  useEffect(() => {
    if (!open || !userId) return;

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await getUserById(userId);

        if (res?.success === false) {
          notify('error', res.error.message, { vertical: 'top', horizontal: 'right' });
          return;
        }

        const user = res?.data;
        const profile = user?.profile ?? {};

        reset({
          email: user.email ?? '',
          fullname: user.fullname ?? null,
          role: user.role,
          scope: user.scope,
          status: user.status,
          school: profile.school ?? null,
          specialized: profile.specialized ?? null,
          bio: profile.bio ?? null,
          githubUrl: profile.githubUrl ?? null,
          linkedinUrl: profile.linkedinUrl ?? null,
          websiteUrl: profile.websiteUrl ?? null,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [open, userId, reset, notify]);

  const onSubmit = async (values: UpdateUserForm) => {
    if (!userId) return;

    const res = await updateUser(userId, values);

    if (res?.success === false) {
      notify('error', res.error.message, { vertical: 'top', horizontal: 'right' });
      return;
    }

    notify('success', 'Cập nhật người dùng thành công', {
      vertical: 'top',
      horizontal: 'right',
    });

    onClose();
    onSuccess?.();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>Cập nhật người dùng</DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box display='flex' justifyContent='center' py={6}>
            <CircularProgress />
          </Box>
        ) : (
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
                name='role'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
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

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='status'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Trạng thái'
                    select
                    fullWidth
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                  >
                    <MenuItem value='active'>Hoạt động</MenuItem>
                    <MenuItem value='suspended'>Đình chỉ</MenuItem>
                  </TextField>
                )}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Controller
                name='school'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Trường'
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
                name='specialized'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Chuyên ngành'
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

            <Grid size={12}>
              <Controller
                name='bio'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Giới thiệu'
                    fullWidth
                    multiline
                    rows={4}
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
                name='githubUrl'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Github'
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
                name='linkedinUrl'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='LinkedIn'
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

            <Grid size={12}>
              <Controller
                name='websiteUrl'
                control={control}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Website'
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
