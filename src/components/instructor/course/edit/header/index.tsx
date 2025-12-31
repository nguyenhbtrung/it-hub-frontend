import { AppBar, Toolbar, IconButton, Typography, Box, Divider, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Link from '@/components/common/Link';
import HeaderAction from './headerAction';
import { getCourseDetail } from '@/services/course.service';

interface CourseHeaderProps {
  params: Promise<{ id: string }>;
}

export default async function CourseHeader({ params }: CourseHeaderProps) {
  const { id } = await params;
  const res = await getCourseDetail(id, 'instructor');
  const slug = res?.data?.slug || '';
  const course = res?.data;
  return (
    <AppBar
      position='static'
      color='inherit'
      elevation={0}
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        height: 64,
        justifyContent: 'center',
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            LinkComponent={Link}
            href='/instructor/courses'
            title='Quay lại Quản lý Khóa học'
            sx={{
              color: 'text.secondary',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Divider orientation='vertical' flexItem />
          <Box>
            <Typography variant='caption' color='text.secondary'>
              Chỉnh sửa khóa học
            </Typography>
            <Typography variant='subtitle1' fontWeight='semibold'>
              {course?.title ? course.title : ''}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ ml: 'auto', display: 'flex', gap: 2 }}>
          <HeaderAction slug={slug} />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
