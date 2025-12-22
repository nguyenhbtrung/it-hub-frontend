'use client';

import { Tabs, Tab, Box, useTheme } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ProfileTabs() {
  const theme = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(0);

  const tabs = [
    { label: 'Tổng quan', href: '/profile' },
    { label: 'Khóa học của tôi', href: '/profile/my-courses' },
    { label: 'Chỉnh sửa hồ sơ', href: '/profile/edit' },
    { label: 'Cài đặt', href: '/profile/settings' },
  ];

  useEffect(() => {
    const index = tabs.findIndex((tab) => tab.href === pathname);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(index >= 0 ? index : 0);
  }, [pathname]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    router.push(tabs[newValue].href);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant='scrollable'
        scrollButtons='auto'
        aria-label='profile tabs'
        sx={{
          '& .MuiTab-root': {
            textTransform: 'none',
            fontWeight: 400,
            minHeight: 48,
            px: 1,
            mr: 4,
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
        {tabs.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>
    </Box>
  );
}
