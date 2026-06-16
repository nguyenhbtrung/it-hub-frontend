'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Card,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AvatarUpload from '../avatarUpload';
import SocialLinkField from '../socialLinkField';
import { FormField } from '../types';
import { formFields } from '../data';
import { uploadFile, deleteFileAction } from '@/features/file';
import { useRouter } from 'next/navigation';
import { useNotification } from '@/contexts/notificationContext';
import { getUserErrorMessage, updateMyProfileAction } from '@/features/user';
import { getErrorMessage } from '@/lib/errors';

// Schema validation với Zod
const profileSchema = z.object({
  fullname: z.string().min(1, 'Họ và tên là bắt buộc'),
  role: z.string().min(1, 'Vai trò là bắt buộc'),
  school: z.string().min(1, 'Trường/Đơn vị là bắt buộc'),
  specialized: z.string().min(1, 'Chuyên ngành là bắt buộc'),
  bio: z.string().max(500, 'Giới thiệu không được quá 500 ký tự'),
  githubUrl: z.url('URL không hợp lệ').optional().or(z.literal('')),
  linkedinUrl: z.url('URL không hợp lệ').optional().or(z.literal('')),
  websiteUrl: z.url('URL không hợp lệ').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileFormProps {
  initialData?: any;
  accessToken: string;
}

export default function EditProfileForm({ initialData, accessToken }: EditProfileFormProps) {
  const [avatarFileId, setAvatarFileId] = useState<string | null>(initialData?.avatar?.id);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bioLength, setBioLength] = useState(initialData?.profile?.bio?.length || 0);

  const { notify } = useNotification();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: initialData?.fullname,
      role: initialData?.role,
      school: initialData?.profile?.school,
      specialized: initialData?.profile?.specialized,
      bio: initialData?.profile?.bio,
      githubUrl: initialData?.profile?.githubUrl,
      linkedinUrl: initialData?.profile?.linkedinUrl,
      websiteUrl: initialData?.profile?.websiteUrl,
    },
  });

  const watchedBio = watch('bio');
  const router = useRouter();

  const handleBioChange = (value: string) => {
    setBioLength(value.length);
  };

  const handleAvatarChange = async (file: File): Promise<string | null> => {
    try {
      if (avatarFileId) {
        await deleteFileAction(avatarFileId);
      }
      const res = await uploadFile(file, true, accessToken);
      if (res.success) {
        const profileRes = await updateMyProfileAction({ avatarId: res?.data?.id });
        if (profileRes.success) {
          setAvatarFileId(res.data?.id);
          router.refresh();
          return res.data?.url;
        } else {
          await deleteFileAction(res.data?.id);
        }
      }
    } catch {}
    return null;
  };

  const handleAvatarRemove = async () => {
    if (avatarFileId) await deleteFileAction(avatarFileId);
    router.refresh();
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);

    const res = await updateMyProfileAction(data);
    if (!res.success) {
      notify('error', getErrorMessage(res, getUserErrorMessage), { vertical: 'top', horizontal: 'right' });
      setIsSubmitting(false);
      return;
    }

    reset(data);
    notify('success', 'Thay đổi đã được lưu thành công!', { vertical: 'top', horizontal: 'right' });
    setIsSubmitting(false);
    router.refresh();
  };

  const handleCancel = () => {
    reset();
    setBioLength(initialData.bio.length);
  };

  const renderField = (field: FormField) => {
    const commonProps = {
      fullWidth: true,
      error: !!errors[field.name as keyof ProfileFormData],
      helperText: errors[field.name as keyof ProfileFormData]?.message,
      disabled: field.disabled || isSubmitting,
    };

    switch (field.type) {
      case 'textarea':
        return (
          <Controller
            name={field.name as keyof ProfileFormData}
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <Box>
                <TextField
                  {...rest}
                  {...commonProps}
                  multiline
                  label={field.label}
                  rows={4}
                  value={value}
                  onChange={(e) => {
                    onChange(e);
                    if (field.name === 'bio') {
                      handleBioChange(e.target.value);
                    }
                  }}
                  placeholder={field.placeholder}
                />
                {field.name === 'bio' && (
                  <Typography
                    variant='caption'
                    color='text.secondary'
                    sx={{ display: 'block', textAlign: 'right', mt: 1 }}
                  >
                    {bioLength} / 500 ký tự
                  </Typography>
                )}
              </Box>
            )}
          />
        );

      case 'select':
        return (
          <FormControl
            fullWidth
            error={!!errors[field.name as keyof ProfileFormData]}
            disabled={field.disabled || isSubmitting}
          >
            <InputLabel>{field.label}</InputLabel>
            <Controller
              name={field.name as keyof ProfileFormData}
              control={control}
              render={({ field: { onChange, value, ...rest } }) => (
                <Select {...rest} label={field.label} value={value} onChange={onChange}>
                  {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        );

      case 'url':
        return (
          <Controller
            name={field.name as keyof ProfileFormData}
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <SocialLinkField field={field} value={value || ''} onChange={onChange} />
            )}
          />
        );

      default:
        return (
          <Controller
            name={field.name as keyof ProfileFormData}
            control={control}
            render={({ field: { onChange, value, ...rest } }) => (
              <TextField
                {...rest}
                {...commonProps}
                type='text'
                label={field.label}
                value={value}
                onChange={onChange}
                placeholder={field.placeholder}
              />
            )}
          />
        );
    }
  };

  return (
    <Card component='form' onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
      <AvatarUpload
        initialAvatarUrl={initialData?.avatar?.url}
        onAvatarUpload={handleAvatarChange}
        onAvatarRemove={handleAvatarRemove}
      />

      {/* Personal Information */}
      <Box sx={{ mt: 4 }}>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          Thông tin cá nhân
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {formFields.slice(0, 5).map((field) => (
            <Grid key={field.name} size={{ xs: 12, md: field.name === 'bio' ? 12 : 6 }}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Social Links */}
      <Box sx={{ mt: 6, pt: 3, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          Liên kết xã hội
        </Typography>

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {formFields.slice(5).map((field) => (
            <Grid key={field.name} size={12}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          mt: 6,
          pt: 3,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
        }}
      >
        <Button
          type='button'
          variant='outlined'
          onClick={handleCancel}
          disabled={isSubmitting || !isDirty}
          sx={{ minWidth: 100 }}
        >
          Hủy
        </Button>
        <Button type='submit' variant='contained' disabled={isSubmitting || !isDirty} sx={{ minWidth: 140 }}>
          {isSubmitting ? (
            <>
              <CircularProgress size={20} sx={{ mr: 1 }} />
              Đang lưu...
            </>
          ) : (
            'Lưu thay đổi'
          )}
        </Button>
      </Box>
    </Card>
  );
}
