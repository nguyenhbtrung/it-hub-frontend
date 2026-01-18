'use client';

import { useState } from 'react';
import { Box, Typography, Grid, Radio, FormControlLabel, RadioGroup, useTheme, useColorScheme } from '@mui/material';
import { Palette, LightMode, DarkMode, CheckCircle } from '@mui/icons-material';
import { themeOptions } from '../data';

export default function ThemeSettings() {
  const { mode, setMode } = useColorScheme();

  const theme = useTheme();

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = event.target.value as 'light' | 'dark';
    setMode(newTheme);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'light_mode':
        return <LightMode sx={{ fontSize: 18, color: theme.palette.text.secondary }} />;
      case 'dark_mode':
        return <DarkMode sx={{ fontSize: 18, color: theme.palette.text.secondary }} />;
      default:
        return null;
    }
  };
  if (!mode) {
    return null;
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant='h6' fontWeight='bold' sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Palette sx={{ color: 'info.main' }} />
        Chủ đề
      </Typography>

      <Box sx={{ flex: 1 }}>
        <Typography variant='body2' fontWeight='medium' color='text.secondary' sx={{ mb: 2 }}>
          Chọn giao diện
        </Typography>

        <RadioGroup name='theme' value={mode} onChange={handleThemeChange} sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            {themeOptions.map((option) => (
              <Grid size={6} key={option.id}>
                <FormControlLabel
                  value={option.id}
                  control={<Radio sx={{ display: 'none' }} />}
                  label={
                    <Box
                      sx={{
                        position: 'relative',
                        borderRadius: 1,
                        border: 2,
                        borderColor: mode === option.id ? 'primary.main' : 'divider',
                        p: 1.5,
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        '&:hover': {
                          borderColor: 'primary.main',
                          boxShadow: 1,
                        },
                      }}
                    >
                      {/* Theme preview box */}
                      <Box
                        sx={{
                          height: 96,
                          borderRadius: 0.5,
                          bgcolor: option.bgColor,
                          border: 1,
                          borderColor: option.borderColor,
                          mb: 1,
                        }}
                      />

                      {/* Theme label */}
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                        {getIcon(option.icon)}
                        <Typography variant='body2' fontWeight='medium'>
                          {option.label}
                        </Typography>
                      </Box>

                      {/* Check icon */}
                      {mode === option.id && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'primary.main',
                          }}
                        >
                          <CheckCircle />
                        </Box>
                      )}
                    </Box>
                  }
                  labelPlacement='end'
                  sx={{ m: 0, width: '100%', display: 'block' }}
                />
              </Grid>
            ))}
          </Grid>
        </RadioGroup>

        <Typography variant='caption' color='text.secondary' sx={{ mt: 2, display: 'block' }}>
          Tùy chỉnh giao diện hiển thị sáng hoặc tối theo sở thích của bạn.
        </Typography>
      </Box>
    </Box>
  );
}
