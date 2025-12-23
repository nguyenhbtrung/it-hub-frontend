'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Box,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Close, Save, Visibility, VisibilityOff } from '@mui/icons-material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import PasswordStrengthMeter from '../passwordStrengthMeter';
import { changePasswordSchema, type ChangePasswordFormData } from '../schemas';

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ChangePasswordFormData) => Promise<void>;
}

export default function ChangePasswordDialog({ open, onClose, onSubmit }: ChangePasswordDialogProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const newPasswordValue = watch('newPassword');
  const currentPasswordValue = watch('currentPassword');

  const handleClose = () => {
    reset();
    setSubmitError(null);
    onClose();
  };

  const handleFormSubmit = async (data: ChangePasswordFormData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await onSubmit(data);
      setIsSubmitting(false);
      handleClose();
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(error instanceof Error ? error.message : 'Đã xảy ra lỗi khi đổi mật khẩu. Vui lòng thử lại.');
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth='sm'
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        },
      }}
    >
      {/* Dialog Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: 2,
          px: 3,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant='h6' component='div' fontWeight='bold'>
          Đổi mật khẩu
        </Typography>

        <IconButton onClick={handleClose} size='small' sx={{ color: 'text.secondary' }}>
          <Close />
        </IconButton>
      </DialogTitle>

      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent sx={{ py: 3, px: 3 }}>
          {submitError && (
            <Alert severity='error' sx={{ mb: 3 }}>
              {submitError}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Current Password */}
            <Box>
              <Typography variant='body2' fontWeight='medium' color='text.secondary' gutterBottom>
                Mật khẩu hiện tại
              </Typography>
              <Controller
                name='currentPassword'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder='Nhập mật khẩu hiện tại'
                    error={!!errors.currentPassword}
                    helperText={errors.currentPassword?.message}
                    InputProps={{
                      sx: {
                        borderRadius: 1,
                        bgcolor: 'background.default',
                      },
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            edge='end'
                            size='small'
                            sx={{ color: 'text.secondary' }}
                          >
                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    size='medium'
                  />
                )}
              />
            </Box>

            {/* New Password */}
            <Box>
              <Typography variant='body2' fontWeight='medium' color='text.secondary' gutterBottom>
                Mật khẩu mới
              </Typography>
              <Controller
                name='newPassword'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder='Nhập mật khẩu mới'
                    error={!!errors.newPassword}
                    helperText={errors.newPassword?.message}
                    InputProps={{
                      sx: {
                        borderRadius: 1,
                        bgcolor: 'background.default',
                      },
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            edge='end'
                            size='small'
                            sx={{ color: 'text.secondary' }}
                          >
                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    size='medium'
                  />
                )}
              />

              {newPasswordValue && <PasswordStrengthMeter password={newPasswordValue} />}
            </Box>

            {/* Confirm Password */}
            <Box>
              <Typography variant='body2' fontWeight='medium' color='text.secondary' gutterBottom>
                Xác nhận mật khẩu mới
              </Typography>
              <Controller
                name='confirmPassword'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Nhập lại mật khẩu mới'
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                      sx: {
                        borderRadius: 1,
                        bgcolor: 'background.default',
                      },
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge='end'
                            size='small'
                            sx={{ color: 'text.secondary' }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    size='medium'
                  />
                )}
              />
            </Box>
          </Box>
        </DialogContent>

        {/* Dialog Actions */}
        <DialogActions
          sx={{
            py: 2,
            px: 3,
            bgcolor: 'grey.50',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Button
            onClick={handleClose}
            disabled={isSubmitting}
            sx={{
              px: 3,
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'grey.200',
              },
            }}
          >
            Hủy
          </Button>
          <Button
            type='submit'
            variant='contained'
            disabled={isSubmitting || !isDirty}
            startIcon={isSubmitting ? <CircularProgress size={16} /> : <Save />}
            sx={{
              px: 3,
              boxShadow: 1,
            }}
          >
            {isSubmitting ? 'Đang lưu...' : 'Lưu mật khẩu'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
