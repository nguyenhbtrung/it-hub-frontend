import Section from '@/components/common/section';
import { Typography, Grid, List, ListItem, ListItemIcon, ListItemText, Card, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { fetchCourse } from '@/lib/utils/fakeApi';
import CourseIncludes from '../courseIncludes';
import ReadMoreDescription from './readMoreDescription';
import { getCourseDetail } from '@/services/course.service';
import { Key } from 'react';
import { notFound } from 'next/navigation';
import { JSONContent } from '@tiptap/core';

export default async function CourseOverview({ courseId }: { courseId: string }) {
  const res = await getCourseDetail(courseId, 'student');
  if (!res.success) {
    notFound();
  }
  const course = res?.data;

  const stats = {
    level: course?.level,
    totalDuration: course?.totalDuration,
    lessons: course?.lessons,
    materials: course?.materials,
  };

  const EMPTY_DOC: JSONContent = {
    type: 'doc',
    content: [],
  };
  return (
    <Section id='overview'>
      {/* <Typography variant='body1' color='text.secondary' sx={{ my: 3 }}>
        {course.description}
      </Typography> */}

      <ReadMoreDescription content={course?.description || EMPTY_DOC} maxHeight={100} />

      <Box display={{ xs: 'flex', lg: 'none' }} flexDirection='row' alignItems='center' justifyContent='center'>
        <Card sx={{ maxWidth: 600, flex: 1, mb: 4 }}>
          <CourseIncludes courseStats={stats} />
        </Card>
      </Box>

      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography variant='h5' fontWeight={600} gutterBottom>
            Bạn sẽ học được
          </Typography>
          <List sx={{ color: 'text.secondary' }}>
            {course?.keyTakeaways?.map((item: string[], index: Key | null | undefined) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckIcon color='secondary' fontSize='small' />
                </ListItemIcon>
                <ListItemText
                  primary={item}
                  slotProps={{
                    primary: {
                      variant: 'body1',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>

        <Grid size={12}>
          <Typography variant='h5' fontWeight={600} gutterBottom>
            Yêu cầu
          </Typography>
          <List sx={{ color: 'text.secondary' }}>
            {course?.requirements?.map((req: string[], index: Key | null | undefined) => (
              <ListItem key={index} sx={{ py: 0.5 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <CheckIcon color='secondary' fontSize='small' />
                </ListItemIcon>
                <ListItemText
                  primary={req}
                  slotProps={{
                    primary: {
                      variant: 'body1',
                    },
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Section>
  );
}
