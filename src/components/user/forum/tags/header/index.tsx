'use client';

import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Tag as TagIcon,
  Article as ArticleIcon,
  Group as GroupIcon,
  Forum as ForumIcon,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const filterOptions = [
  'Tất cả',
  'Câu hỏi',
  'Chia sẻ kiến thức',
  'Thảo luận',
  'Kinh nghiệm thực tế',
  'Tin tức',
  'Tài nguyên',
  'Thông báo',
];

const StyledCard = styled(Card)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  overflow: 'hidden',
  marginBottom: theme.spacing(3),
}));

const TagIconLarge = styled(TagIcon)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(3),
  right: theme.spacing(3),
  fontSize: 180,
  opacity: 0.05,
  transform: 'rotate(-12deg) translateX(40px) translateY(-40px)',
  pointerEvents: 'none',
}));

const StatItem = ({ icon: Icon, value, label, color }: any) => (
  <Stack direction='row' alignItems='center' spacing={1}>
    <Icon sx={{ color, fontSize: 20 }} />
    <Typography variant='body2' fontWeight='bold'>
      {value}
    </Typography>
    <Typography variant='body2' color='text.secondary'>
      {label}
    </Typography>
  </Stack>
);

const FilterChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ theme, selected }) => ({
  borderRadius: 16,
  height: 32,
  fontSize: '0.75rem',
  fontWeight: 500,
  ...(selected
    ? {
        backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#0f172a',
        color: '#fff',
      }
    : {
        backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#fff',
        color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#334155',
        border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0'}`,
        '&:hover': {
          backgroundColor: theme.palette.mode === 'dark' ? '#334155' : '#f1f5f9',
        },
      }),
}));

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');

  const handleFilterClick = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <>
      {/* Tag Info Card */}
      <StyledCard>
        <TagIconLarge />
        <CardContent sx={{ position: 'relative', zIndex: 1 }}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={3}
            alignItems={{ xs: 'flex-start', md: 'flex-start' }}
          >
            {/* Logo */}
            <Box
              sx={{
                width: 80,
                height: 80,
                flexShrink: 0,
                borderRadius: 2,
                backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0'}`,
              }}
            >
              <Avatar
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuC-x7RzNzkEeXSav7lDUAwZj3otDtMDO-EIM4Vy_53cdxN3ndd4E5UsybsQ4AGpWjGsnixnpiWQBfGfq31VoTYia6_E2zXWR66u3ZGov9Gbqt8VnjlCR6A6oQKvYVTplBkpPIqXS0pR5yjRW8vFIPQ7couPyiFCDOztfDc54r6dxKI3uE0PZj6dNBQSFcnzWSoo4KHYlfGvp4pUhkgDbvSaXzKB0swXE6WQe1fQnjZoardQe2_VBZCAP1jL_heAdx35JB0cvJdIuDE'
                sx={{ width: 48, height: 48 }}
              />
            </Box>

            {/* Tag Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Stack
                direction={{ xs: 'column', sm: 'column' }}
                justifyContent='space-between'
                alignItems={{ xs: 'flex-start', sm: 'flex-start' }}
                spacing={2}
                mb={2}
              >
                <Typography
                  variant='h4'
                  component='h1'
                  fontWeight='black'
                  sx={{
                    fontSize: { xs: '1.5rem', md: '1.875rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Các bài viết có tag:{' '}
                  <Typography
                    component='span'
                    color='primary'
                    sx={{
                      fontSize: 'inherit',
                      fontWeight: 'inherit',
                    }}
                  >
                    #Java
                  </Typography>
                </Typography>
                <Button
                  variant='contained'
                  startIcon={<NotificationsIcon />}
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    backgroundColor: theme.palette.mode === 'dark' ? '#1e293b' : '#f1f5f9',
                    color: theme.palette.mode === 'dark' ? '#cbd5e1' : '#334155',
                    '&:hover': {
                      backgroundColor: theme.palette.mode === 'dark' ? '#334155' : '#e2e8f0',
                    },
                  }}
                >
                  Theo dõi Tag
                </Button>
              </Stack>

              {/* <Typography
                variant='body1'
                color='text.secondary'
                paragraph
                sx={{ mb: 3, maxWidth: '36rem', lineHeight: 1.625 }}
              >
                Java là một ngôn ngữ lập trình hướng đối tượng, dựa trên lớp, được thiết kế để có càng ít phụ thuộc thực
                thi càng tốt. Thảo luận về cú pháp, Spring framework, JVM và các vấn đề liên quan.
              </Typography> */}

              {/* Stats */}
              <Stack direction={{ xs: 'column', sm: 'row' }} gap={{ xs: 2, sm: 4, md: 6, lg: 3 }} alignItems='center'>
                <StatItem icon={ArticleIcon} value='2,412' label='bài viết' color={theme.palette.primary.main} />
                <StatItem icon={GroupIcon} value='850' label='người theo dõi' color='#10b981' />
                <StatItem icon={ForumIcon} value='142' label='bài hôm nay' color='#f59e0b' />
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </StyledCard>

      {/* Filter Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant='body2'
          color='text.secondary'
          fontWeight='medium'
          sx={{
            mb: 1,
            position: 'sticky',
            left: 0,
            backgroundColor: 'background.default',
            pr: 1,
            display: 'inline-block',
          }}
        >
          Lọc theo:
        </Typography>
        <Box
          sx={{
            overflowX: 'auto',
            pb: 1,
            '&::-webkit-scrollbar': { display: 'none' },
            scrollbarWidth: 'none',
          }}
        >
          <Stack direction='row' spacing={1} sx={{ minWidth: 'max-content' }}>
            {filterOptions.map((filter) => (
              <FilterChip
                key={filter}
                label={filter}
                selected={selectedFilter === filter}
                onClick={() => handleFilterClick(filter)}
              />
            ))}
          </Stack>
        </Box>
      </Box>
    </>
  );
}
