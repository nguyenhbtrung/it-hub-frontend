'use client';

import { Box, Tabs, Tab, Typography } from '@mui/material';
import { SetStateAction, useState } from 'react';

const tabs = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang hoạt động', value: 'active' },
  { label: 'Đang chờ duyệt', value: 'pending' },
  { label: 'Bản nháp', value: 'draft' },
  { label: 'Đã ẩn', value: 'hidden' },
];

export default function CourseTabs() {
  const [currentTab, setCurrentTab] = useState('all');

  const handleTabChange = (event: any, newValue: SetStateAction<string>) => {
    setCurrentTab(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label='course tabs'
        sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: 'primary.main',
            height: 2,
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: currentTab === tab.value ? 600 : 500,
                  textTransform: 'none',
                  color: currentTab === tab.value ? 'primary.main' : 'text.secondary',
                }}
              >
                {tab.label}
              </Typography>
            }
            sx={{
              minHeight: 48,
              pb: 3,
              '&.Mui-selected': {
                color: 'primary.main',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
