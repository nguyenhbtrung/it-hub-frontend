'use client';
import { Tabs, Tab } from '@mui/material';
import { useEffect, useState } from 'react';

export default function NavTabs() {
  const [value, setValue] = useState('overview');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    const section = document.getElementById(newValue);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const offset = 100; // chiều cao navbar
      const sectionIds = ['overview', 'content', 'instructor', 'reviews'];

      for (let i = 0; i < sectionIds.length; i++) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop - offset;
          const bottom = top + section.offsetHeight;
          if (scrollPosition >= top && scrollPosition < bottom) {
            setValue(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor='secondary'
      indicatorColor='secondary'
      aria-label='navigation tabs'
      centered
      sx={{
        display: { xs: 'none', md: 'flex' },
        borderBottom: 1,
        borderColor: 'divider',
        '& .MuiTab-root': {
          fontSize: '1rem',
          px: 4,
          py: 2,
        },
      }}
    >
      <Tab value='overview' label='Tổng quan' />
      <Tab value='content' label='Nội dung' />
      <Tab value='instructor' label='Giảng viên' />
      <Tab value='reviews' label='Đánh giá' />
    </Tabs>
  );
}
