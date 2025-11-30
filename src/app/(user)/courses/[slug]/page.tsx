import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import CourseHeader from '@/components/user/course/courseHeader';
import CourseContent from '@/components/user/course/courseContent';
import InstructorCard from '@/components/user/course/instructorCard';
import CourseReviews from '@/components/user/course/courseReviews';
import NavTabs from '@/components/user/course/navTabs';
import Section from '@/components/common/section';
import { fetchCourse } from '@/lib/utils/fakeApi';
import CourseOverview from '@/components/user/course/courseOverview';

type Props = { params: Promise<{ slug: string }> };

export default async function CoursePage({ params }: Props) {
  const slug = (await params).slug;
  const course = await fetchCourse(slug);

  return (
    <Box sx={{ py: { xs: 7, sm: 8 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <CourseHeader course={course} />
      </Box>
      <Container
        maxWidth='lg'
        // sx={{ py: { xs: 4, md: 6 } }}
      >
        <Grid container spacing={4}>
          {/* Main Content - Left Side */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={4}>
              <NavTabs />

              {/* Course Overview */}
              <CourseOverview />

              {/* Course Content Section */}
              <Section id='content'>
                {/* <Box sx={{ p: 3 }}> */}
                <CourseContent sections={course.sections} />
                {/* </Box> */}
              </Section>

              {/* Tags Section */}
              {/* <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}> */}
              <Box>
                <Typography variant='h5' fontWeight={600} gutterBottom>
                  Chủ đề liên quan
                </Typography>
                <Stack direction='row' flexWrap='wrap' gap={1}>
                  {course.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      variant='outlined'
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'white',
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Box>

              {/* Instructor Section */}
              <InstructorCard instructor={course.instructor} />

              <CourseReviews />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
