// src/components/course/SidebarEnrollCard.tsx
'use client';

import { Card, CardContent, Box, Button, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { CourseDetail } from '@/types/course';
import PromoVideo from '../promoVideo';
import CourseIncludes from '../courseIncludes';

export default function SidebarEnrollCard({ course }: { course: CourseDetail }) {
  return (
    <Box>
      <Card sx={{ borderRadius: 3, mb: 2 }}>
        <PromoVideo />

        <CardContent>
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
          <CourseIncludes courseStats={course.stats} />
        </CardContent>
      </Card>
    </Box>
  );
}
