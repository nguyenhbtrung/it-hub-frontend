// src/components/course/SidebarEnrollCard.tsx
'use client';

import { Card, CardContent, Typography, Box, Button, Stack, Divider, List, ListItem } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { CourseDetail } from '@/types/course';
import Image from 'next/image';
import PromoVideo from '../promoVideo';

export default function SidebarEnrollCard({ course }: { course: CourseDetail }) {
  const hrs = Math.floor(course.stats.totalDurationMinutes / 60);
  const mins = course.stats.totalDurationMinutes % 60;

  return (
    <Box>
      <Card sx={{ borderRadius: 3, mb: 2 }}>
        <PromoVideo />

        <CardContent>
          {/* <Typography variant='h6' fontWeight={700}>
            {course.price ?? 'Miễn phí'}
          </Typography> */}
          <Stack direction='row' spacing={1} sx={{ my: 2 }}>
            <Button variant='contained' fullWidth>
              Đăng ký
            </Button>
            <Button variant='outlined' sx={{ width: 42, height: 42, minWidth: 42, p: 0 }}>
              <ShareIcon />
            </Button>
            <Button variant='outlined' sx={{ width: 42, height: 42, minWidth: 42, p: 0 }}>
              <BookmarkBorderIcon />
            </Button>
          </Stack>
          <Stack direction='row' spacing={1} sx={{ mt: 1 }}></Stack>

          <Typography variant='h6'>Khoá học bao gồm</Typography>
          <List>
            {/* Thời lượng */}
            <ListItem disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', my: 1 }}>
                <AccessTimeIcon fontSize='small' color='inherit' />
                <Typography variant='body2' color='inherit' sx={{ ml: 1 }}>
                  Thời lượng
                </Typography>
              </Box>
              <Typography variant='body2'>
                {hrs} giờ {mins} phút
              </Typography>
            </ListItem>
            <Divider />

            {/* Level */}
            <ListItem disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                <BarChartOutlinedIcon fontSize='small' color='inherit' />
                <Typography variant='body2' color='inherit' sx={{ ml: 1 }}>
                  Cấp độ
                </Typography>
              </Box>
              <Typography variant='body2'>{course.stats.level}</Typography>
            </ListItem>
          </List>
          <Box sx={{ my: 2 }} />
          <Typography variant='h6'>Lợi ích chính</Typography>
          <Box component='ul' sx={{ pl: 2, mt: 1, color: 'text.secondary' }}>
            {course.keyTakeaways.map((k) => (
              <li key={k}>
                <Typography variant='body2'>{k}</Typography>
              </li>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
