'use client';
import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip,
  Stack,
  Avatar,
} from '@mui/material';
import {
  Forum as ForumIcon,
  RssFeed as RssFeedIcon,
  School as SchoolIcon,
  EditNote as EditNoteIcon,
  Bookmark as BookmarkIcon,
  TrendingUp as TrendingUpIcon,
  NewReleases as NewReleasesIcon,
  MilitaryTech as MilitaryTechIcon,
  PsychologyAlt as PsychologyAltIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';

const navigationItems = [
  { icon: <ForumIcon />, text: 'Tất cả bài viết' },
  { icon: <TrendingUpIcon />, text: 'Phổ biến' },
  { icon: <NewReleasesIcon />, text: 'Mới nhất' },
  { icon: <RssFeedIcon />, text: 'Đang theo dõi' },
  { icon: <SchoolIcon />, text: 'Bài viết trong khóa học' },
  { icon: <EditNoteIcon />, text: 'Bài viết của tôi' },
  { icon: <BookmarkIcon />, text: 'Đã lưu' },
];

export default function ForumSidebarLeft() {
  return (
    <Card
      sx={{
        position: 'sticky',
        top: 96,
        borderRadius: 1,
        border: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <List disablePadding>
          {navigationItems.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                selected={index === 0}
                sx={{
                  borderRadius: 1,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'hero.light',
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'hero.main',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      // variant: 'body1',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 3 }} />

        <Typography
          variant='caption'
          color='text.secondary'
          sx={{
            display: 'block',
            mb: 2,
            px: 0.5,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          Thống kê cá nhân
        </Typography>

        <Box sx={{ px: 0.5 }}>
          <Stack direction='row' justifyContent='space-between' mb={1}>
            <Typography variant='body2' color='text.secondary'>
              Danh tiếng
            </Typography>
            <Typography variant='body2' fontWeight='bold' color='primary.main'>
              1,240
            </Typography>
          </Stack>

          <Stack direction='row' justifyContent='space-between' mb={3}>
            <Typography variant='body2' color='text.secondary'>
              Bài viết
            </Typography>
            <Typography variant='body2' fontWeight='bold'>
              42
            </Typography>
          </Stack>

          <Stack direction='row' spacing={1}>
            <Avatar
              variant='rounded'
              sx={{
                bgcolor: 'badged.yellow.bg',
                color: 'badged.yellow.text',
                borderRadius: 0.5,
              }}
            >
              <MilitaryTechIcon />
            </Avatar>
            <Avatar
              variant='rounded'
              sx={{
                bgcolor: 'badged.blue.bg',
                color: 'badged.blue.text',
                borderRadius: 0.5,
              }}
            >
              <CheckCircleIcon />
            </Avatar>
            <Avatar
              variant='rounded'
              sx={{
                bgcolor: 'badged.green.bg',
                color: 'badged.green.text',
                borderRadius: 0.5,
              }}
            >
              <MilitaryTechIcon />
            </Avatar>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
