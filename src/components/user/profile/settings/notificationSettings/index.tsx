'use client';

import { useState } from 'react';
import { Box, Typography, Stack, FormControlLabel, Switch } from '@mui/material';
import { NotificationsActive, Mail, Notifications } from '@mui/icons-material';
import { notificationItems } from '../data';

interface NotificationSettingsProps {
  initialSettings: {
    emailNotifications: boolean;
    inAppNotifications: boolean;
  };
  onSettingsChange: (settings: { emailNotifications: boolean; inAppNotifications: boolean }) => void;
}

export default function NotificationSettings({ initialSettings, onSettingsChange }: NotificationSettingsProps) {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = (id: string) => {
    const newSettings = { ...settings };

    if (id === 'email') {
      newSettings.emailNotifications = !newSettings.emailNotifications;
    } else if (id === 'in-app') {
      newSettings.inAppNotifications = !newSettings.inAppNotifications;
    }

    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const getIcon = (icon: 'mail' | 'notifications') => {
    switch (icon) {
      case 'mail':
        return <Mail sx={{ color: 'text.secondary' }} />;
      case 'notifications':
        return <Notifications sx={{ color: 'text.secondary' }} />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        p: 3,
        mb: 3,
      }}
    >
      <Typography variant='h6' fontWeight='bold' sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <NotificationsActive sx={{ color: 'warning.main' }} />
        Cài đặt thông báo
      </Typography>

      <Stack spacing={2}>
        {notificationItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 2,
              borderRadius: 1,
              '&:hover': { bgcolor: 'action.hover' },
              transition: 'background-color 0.2s',
              cursor: 'pointer',
            }}
            onClick={() => handleToggle(item.id)}
          >
            <Stack direction='row' alignItems='center' spacing={2}>
              {getIcon(item.icon)}
              <Box>
                <Typography fontWeight='medium'>{item.title}</Typography>
                <Typography variant='caption' color='text.secondary'>
                  {item.description}
                </Typography>
              </Box>
            </Stack>

            <FormControlLabel
              control={
                <Switch
                  checked={item.id === 'email' ? settings.emailNotifications : settings.inAppNotifications}
                  onChange={() => handleToggle(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  color='primary'
                />
              }
              label=''
              sx={{ m: 0 }}
            />
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
