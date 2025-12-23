'use client';

import { useState } from 'react';
import { Box, Typography, Stack, FormControlLabel, Switch } from '@mui/material';
import { Lock } from '@mui/icons-material';
import { privacyItems } from '../data';

interface PrivacySettingsProps {
  initialSettings: {
    publicProfile: boolean;
    showProgressBadges: boolean;
    allowEmailSearch: boolean;
  };
  onSettingsChange: (settings: {
    publicProfile: boolean;
    showProgressBadges: boolean;
    allowEmailSearch: boolean;
  }) => void;
}

export default function PrivacySettings({ initialSettings, onSettingsChange }: PrivacySettingsProps) {
  const [settings, setSettings] = useState(initialSettings);

  const handleToggle = (id: string) => {
    const newSettings = { ...settings };

    switch (id) {
      case 'public-profile':
        newSettings.publicProfile = !newSettings.publicProfile;
        break;
      case 'show-progress':
        newSettings.showProgressBadges = !newSettings.showProgressBadges;
        break;
      case 'email-search':
        newSettings.allowEmailSearch = !newSettings.allowEmailSearch;
        break;
    }

    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        p: 3,
        height: '100%',
      }}
    >
      <Typography variant='h6' fontWeight='bold' sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Lock sx={{ color: 'success.main' }} />
        Cài đặt riêng tư
      </Typography>

      <Stack spacing={2}>
        {privacyItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              '&:hover .MuiSwitch-root': {
                bgcolor: 'action.hover',
              },
            }}
            onClick={() => handleToggle(item.id)}
          >
            <Typography fontWeight='medium' variant='body2'>
              {item.title}
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={
                    item.id === 'public-profile'
                      ? settings.publicProfile
                      : item.id === 'show-progress'
                        ? settings.showProgressBadges
                        : settings.allowEmailSearch
                  }
                  onChange={() => handleToggle(item.id)}
                  onClick={(e) => e.stopPropagation()}
                  color='primary'
                  size='small'
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
