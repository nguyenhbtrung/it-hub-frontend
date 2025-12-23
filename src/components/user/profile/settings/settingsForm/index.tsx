'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  Stack,
  Alert,
  Snackbar,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { Save, Cancel } from '@mui/icons-material';
import AccountManagement from '../accountManagement';
import NotificationSettings from '../notificationSettings';
import PrivacySettings from '../privacySettings';
import ThemeSettings from '../themeSettings';
import { SettingsData } from '../types';
import { defaultSettings } from '../data';

interface SettingsFormProps {
  initialData?: SettingsData;
}

export default function SettingsForm({ initialData = defaultSettings }: SettingsFormProps) {
  const [settings, setSettings] = useState(initialData);
  const [isDirty, setIsDirty] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'password' | 'devices' | 'delete' | null>(null);

  const handleNotificationChange = (notificationSettings: typeof settings.notifications) => {
    setSettings((prev) => ({ ...prev, notifications: notificationSettings }));
    setIsDirty(true);
  };

  const handlePrivacyChange = (privacySettings: typeof settings.privacy) => {
    setSettings((prev) => ({ ...prev, privacy: privacySettings }));
    setIsDirty(true);
  };

  const handleThemeChange = (theme: 'light' | 'dark') => {
    setSettings((prev) => ({ ...prev, theme: { theme } }));
    setIsDirty(true);
  };

  const handleAccountAction = (type: 'password' | 'devices' | 'delete') => {
    setDialogType(type);
    setShowConfirmDialog(true);
  };

  const handleConfirmAction = () => {
    if (dialogType === 'delete') {
      alert('Chức năng xóa tài khoản đang được phát triển');
    } else if (dialogType === 'password') {
      alert('Chức năng đổi mật khẩu đang được phát triển');
    } else if (dialogType === 'devices') {
      alert('Chức năng quản lý thiết bị đang được phát triển');
    }
    setShowConfirmDialog(false);
    setDialogType(null);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Giả lập API call
    try {
      console.log('Saving settings:', settings);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setShowSuccess(true);
      setIsDirty(false);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error saving settings:', error);
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setSettings(initialData);
    setIsDirty(false);
  };

  const getDialogTitle = () => {
    switch (dialogType) {
      case 'password':
        return 'Đổi mật khẩu';
      case 'devices':
        return 'Quản lý thiết bị';
      case 'delete':
        return 'Xóa tài khoản';
      default:
        return '';
    }
  };

  const getDialogContent = () => {
    switch (dialogType) {
      case 'password':
        return 'Bạn sẽ được chuyển hướng đến trang đổi mật khẩu.';
      case 'devices':
        return 'Bạn sẽ được chuyển hướng đến trang quản lý thiết bị.';
      case 'delete':
        return 'Hành động này không thể hoàn tác. Tất cả dữ liệu của bạn sẽ bị xóa vĩnh viễn. Bạn có chắc chắn muốn tiếp tục?';
      default:
        return '';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, animation: 'fadeIn 0.3s ease-in' }}>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>

      {/* Introduction */}
      <Box>
        <Typography variant='h5' fontWeight='bold' gutterBottom>
          Cài đặt
        </Typography>
        <Typography variant='body1' color='text.secondary' paragraph>
          Quản lý các tùy chọn bảo mật, thông báo và trải nghiệm cá nhân của bạn.
        </Typography>
      </Box>

      {/* Account Management */}
      <AccountManagement
        onPasswordChange={() => handleAccountAction('password')}
        onDeviceManagement={() => handleAccountAction('devices')}
        onAccountDelete={() => handleAccountAction('delete')}
      />

      {/* Notification Settings */}
      <NotificationSettings initialSettings={settings.notifications} onSettingsChange={handleNotificationChange} />

      {/* Privacy and Theme Settings Grid */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <PrivacySettings initialSettings={settings.privacy} onSettingsChange={handlePrivacyChange} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ThemeSettings initialTheme={settings.theme.theme} onThemeChange={handleThemeChange} />
        </Grid>
      </Grid>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          pt: 3,
          mt: 2,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <Button variant='outlined' onClick={handleCancel} disabled={!isDirty || isSubmitting} sx={{ px: 4 }}>
          Hủy
        </Button>
        <Button
          variant='contained'
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
          onClick={handleSubmit}
          disabled={!isDirty || isSubmitting}
          sx={{ px: 4 }}
        >
          {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </Box>

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={3000}
        onClose={() => setShowSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity='success' onClose={() => setShowSuccess(false)}>
          Cài đặt đã được lưu thành công!
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmDialog} onClose={() => setShowConfirmDialog(false)} maxWidth='sm' fullWidth>
        <DialogTitle>{getDialogTitle()}</DialogTitle>
        <DialogContent>
          <DialogContentText>{getDialogContent()}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowConfirmDialog(false)}>Hủy</Button>
          <Button
            onClick={handleConfirmAction}
            variant='contained'
            color={dialogType === 'delete' ? 'error' : 'primary'}
            autoFocus
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
