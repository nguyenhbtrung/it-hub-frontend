'use client';

import { Box, Tabs, Tab, Typography } from '@mui/material';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

const tabs = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Đang hoạt động', value: 'published' },
  { label: 'Đang chờ duyệt', value: 'pending' },
  { label: 'Bản nháp', value: 'draft' },
  { label: 'Đình chỉ', value: 'suspended' },
];

export default function CourseTabs() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get('status') || 'all';

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newValue === 'all') {
      params.delete('status');
    } else {
      params.set('status', newValue);
    }

    router.push(`${pathname}?${params.toString()}`);
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
