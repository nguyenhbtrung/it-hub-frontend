// src/components/course/SidebarEnrollCard.tsx
'use client';

import { Card, CardContent, Box, Button, Stack } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';

import { CourseDetail } from '@/types/course';
import PromoVideo from '../promoVideo';
import CourseIncludes from '../courseIncludes';
import Link from '@/components/common/Link';

interface SidebarEnrollCardProp {
  course: any;
  enrollmentStatus: any;
}

export default function SidebarEnrollCard({ course, enrollmentStatus }: SidebarEnrollCardProp) {
  const stats = {
    level: course?.level,
    totalDuration: course?.totalDuration,
    lessons: course?.lessons,
    materials: course?.materials,
  };
  const getLassAccessPath = (lastAccess: any) => {
    if (lastAccess?.stepId) return `/learn/steps/${lastAccess.stepId}`;
    if (lastAccess?.unitId) return `/learn/units/${lastAccess.unitId}`;
    if (lastAccess?.sectionId) return `/learn/sections/${lastAccess.sectionId}`;
    return '';
  };
  return (
    <Box>
      <Card sx={{ borderRadius: 3, mb: 2 }}>
        <PromoVideo src={course?.promoVideo?.url} thumb={course?.promoVideo?.metadata?.thumbnails?.[0]} />

        <CardContent>
          <Stack direction='row' spacing={1} sx={{ my: 2 }}>
            {!enrollmentStatus?.status && (
              <Button variant='contained' fullWidth>
                Đăng ký
              </Button>
            )}

            {enrollmentStatus?.status === 'pending' && (
              <Button variant='contained' fullWidth>
                Huỷ đăng ký
              </Button>
            )}

            {(enrollmentStatus?.status === 'active' || enrollmentStatus?.status === 'completed') && (
              <Button
                LinkComponent={Link}
                href={`/courses/${course?.slug}${getLassAccessPath(enrollmentStatus?.lastAccess)}`}
                variant='contained'
                fullWidth
              >
                Tiếp tục học
              </Button>
            )}

            <Button variant='outlined' sx={{ width: 42, height: 42, minWidth: 42, p: 0 }}>
              <ShareIcon />
            </Button>
            <Button variant='outlined' sx={{ width: 42, height: 42, minWidth: 42, p: 0 }}>
              <BookmarkBorderIcon />
            </Button>
          </Stack>
          <Stack direction='row' spacing={1} sx={{ mt: 1 }}></Stack>
          <CourseIncludes courseStats={stats} />
        </CardContent>
      </Card>
    </Box>
  );
}
