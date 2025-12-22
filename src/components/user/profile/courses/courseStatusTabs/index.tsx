'use client';

import { Tabs, Tab, Box, Chip, useTheme } from '@mui/material';
import { PlayCircle, AppRegistration, Verified } from '@mui/icons-material';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { CourseTab } from '../types';
import { courseTabs } from '../data';

export default function CourseStatusTabs() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'in-progress';

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', newValue);
    router.push(`${pathname}?${params.toString()}`);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'play_circle':
        return <PlayCircle sx={{ fontSize: 24 }} />;
      case 'app_registration':
        return <AppRegistration sx={{ fontSize: 24 }} />;
      case 'verified':
        return <Verified sx={{ fontSize: 24 }} />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: -2 }}>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant='scrollable'
        scrollButtons='auto'
        aria-label='course status tabs'
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            minHeight: 56,
            px: 1,
            fontSize: '0.875rem',
            fontWeight: 400,
          },
          '& .Mui-selected': {
            fontWeight: 700,
            color: 'primary.main',
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'primary.main',
            height: 2,
          },
        }}
      >
        {courseTabs.map((tab: CourseTab) => (
          <Tab
            key={tab.id}
            value={tab.id}
            label={
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {getIcon(tab.icon)}
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <Chip
                    label={tab.count}
                    size='small'
                    sx={{
                      height: 20,
                      fontSize: '0.625rem',
                      fontWeight: 'medium',
                      bgcolor: 'hero.main',
                      color: 'primary.main',
                    }}
                  />
                )}
              </Box>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
}
