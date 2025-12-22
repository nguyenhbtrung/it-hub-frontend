'use client';

import Add from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState } from 'react';
import Link from '@/components/common/Link';

const filterButtons = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Câu hỏi', value: 'question' },
  { label: 'Chia sẻ kiến thức', value: 'knowledge' },
  { label: 'Thảo luận', value: 'discussion' },
  { label: 'Kinh nghiệm thực tế', value: 'experience' },
  { label: 'Tin tức', value: 'news' },
  { label: 'Tài nguyên', value: 'resource' },
  { label: 'Thông báo', value: 'announcement' },
];

export default function FeedHeader() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <Card
      sx={{
        mb: 3,
        borderRadius: 1,
        p: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent='space-between'
          alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
          spacing={2}
          mb={3}
        >
          <Box>
            <Typography variant='h4' fontWeight='bold' gutterBottom>
              Bài viết đã lưu
            </Typography>
            <Typography variant='body1' color='text.secondary'>
              Danh sách các bài viết bạn đã lưu
            </Typography>
          </Box>
        </Stack>

        {/* Tabs cho mobile */}
        {isMobile && (
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} variant='scrollable'>
              <Tab label='Tất cả' />
              <Tab label='Của tôi' />
              <Tab label='Đã lưu' />
              <Tab label='Phổ biến' />
            </Tabs>
          </Box>
        )}

        {/* Filter buttons */}
        <Box>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
            Lọc theo:
          </Typography>
          <Stack direction='row' flexWrap='wrap' gap={1}>
            {filterButtons.map((filter, index) => (
              <Chip
                key={index}
                label={filter.label}
                size='small'
                sx={{
                  borderRadius: 16,
                  ...(index === 0
                    ? {
                        bgcolor: 'text.primary',
                        color: 'common.white',
                      }
                    : {
                        bgcolor: 'action.hover',
                        '&:hover': { bgcolor: 'action.selected' },
                      }),
                }}
              />
            ))}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
