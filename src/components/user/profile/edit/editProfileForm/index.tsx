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
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import AvatarUpload from '../avatarUpload';
import SocialLinkField from '../socialLinkField';
import { UserProfile, FormField } from '../types';
import { formFields, defaultUserProfile } from '../data';

// Schema validation với Zod
const profileSchema = z.object({
  fullName: z.string().min(1, 'Họ và tên là bắt buộc'),
  role: z.string().min(1, 'Vai trò là bắt buộc'),
  school: z.string().min(1, 'Trường/Đơn vị là bắt buộc'),
  major: z.string().min(1, 'Chuyên ngành là bắt buộc'),
  bio: z.string().max(500, 'Giới thiệu không được quá 500 ký tự'),
  github: z.string().url('URL không hợp lệ').optional().or(z.literal('')),
  linkedin: z.string().url('URL không hợp lệ').optional().or(z.literal('')),
  website: z.string().url('URL không hợp lệ').optional().or(z.literal('')),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface EditProfileFormProps {
  initialData?: UserProfile;
}

export default function EditProfileForm({ initialData = defaultUserProfile }: EditProfileFormProps) {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [bioLength, setBioLength] = useState(initialData.bio.length);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: initialData.fullName,
      role: initialData.role,
      school: initialData.school,
      major: initialData.major,
      bio: initialData.bio,
      github: initialData.github,
      linkedin: initialData.linkedin,
      website: initialData.website,
    },
  });

  const watchedBio = watch('bio');

  const handleBioChange = (value: string) => {
    setBioLength(value.length);
  };

  const handleAvatarChange = (file: File | null) => {
    setAvatarFile(file);
  };

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);

    try {
      console.log('Submitting data:', data);
      console.log('Avatar file:', avatarFile);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setSubmitSuccess(true);
      setIsSubmitting(false);

      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    reset();
    setAvatarFile(null);
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
    <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ p: 3 }}>
      {submitSuccess && (
        <Alert severity='success' sx={{ mb: 3 }}>
          Thay đổi đã được lưu thành công!
        </Alert>
      )}

      <AvatarUpload initialAvatarUrl={initialData.avatarUrl} onAvatarChange={handleAvatarChange} />

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
    </Box>
  );
}
