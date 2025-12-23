'use client';

import { useState, useRef } from 'react';
import { Box, Typography, Button, Avatar, Stack, IconButton, CircularProgress } from '@mui/material';
import { CameraAlt, Delete } from '@mui/icons-material';

interface AvatarUploadProps {
  initialAvatarUrl: string;
  onAvatarChange: (file: File | null) => void;
}

export default function AvatarUpload({ initialAvatarUrl, onAvatarChange }: AvatarUploadProps) {
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl);
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Kiểm tra kích thước file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Kích thước file tối đa là 5MB');
        return;
      }

      // Kiểm tra định dạng file
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert('Chỉ chấp nhận file JPG, PNG hoặc GIF');
        return;
      }

      setIsUploading(true);

      // Giả lập upload
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setAvatarUrl(result);
          onAvatarChange(file);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
      }, 1000);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(''); // Hoặc URL ảnh mặc định
    onAvatarChange(null);
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={4}
      alignItems={{ xs: 'center', sm: 'flex-start' }}
      sx={{ pb: 4, borderBottom: 1, borderColor: 'divider' }}
    >
      {/* Avatar Container */}
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box
          sx={{
            width: 112,
            height: 112,
            borderRadius: '50%',
            overflow: 'hidden',
            border: 4,
            borderColor: 'grey.100',
            bgcolor: 'grey.200',
            position: 'relative',
            cursor: 'pointer',
            '&:hover .avatar-overlay': {
              opacity: 1,
            },
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleFileSelect}
        >
          {avatarUrl ? (
            <Box
              component='img'
              src={avatarUrl}
              alt='Avatar'
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'grey.300',
              }}
            >
              <CameraAlt sx={{ fontSize: 48, color: 'grey.500' }} />
            </Box>
          )}

          {/* Overlay on hover */}
          <Box
            className='avatar-overlay'
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.3s',
            }}
          >
            {isUploading ? (
              <CircularProgress size={32} sx={{ color: 'white' }} />
            ) : (
              <CameraAlt sx={{ fontSize: 40, color: 'white' }} />
            )}
          </Box>
        </Box>

        {/* Hidden file input */}
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleFileChange}
          accept='image/jpeg,image/jpg,image/png,image/gif'
          style={{ display: 'none' }}
        />
      </Box>

      {/* Avatar Info and Actions */}
      <Box sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}>
        <Typography variant='h6' fontWeight='bold' gutterBottom>
          Ảnh đại diện
        </Typography>
        <Typography variant='body2' color='text.secondary' paragraph sx={{ maxWidth: 480 }}>
          Ảnh hồ sơ hiển thị công khai. Định dạng chấp nhận: JPG, GIF hoặc PNG. Kích thước tối đa 5MB.
        </Typography>
        <Stack direction='row' spacing={2} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
          <Button
            variant='outlined'
            color='primary'
            onClick={handleFileSelect}
            disabled={isUploading}
            startIcon={isUploading ? <CircularProgress size={16} /> : null}
          >
            Tải ảnh mới
          </Button>
          <Button
            variant='outlined'
            color='error'
            onClick={handleRemoveAvatar}
            disabled={!avatarUrl || isUploading}
            startIcon={<Delete />}
          >
            Xóa ảnh
          </Button>
        </Stack>
      </Box>
    </Stack>
  );
}
