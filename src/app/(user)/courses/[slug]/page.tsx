import { Box, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import CourseHeader from '@/components/user/course/courseHeader';
import CourseContent from '@/components/user/course/courseContent';
import InstructorCard from '@/components/user/course/instructorCard';
import CourseReviews from '@/components/user/course/courseReviews';
import NavTabs from '@/components/user/course/navTabs';
import Section from '@/components/common/section';
import { fetchCourse } from '@/lib/utils/fakeApi';
import CourseOverview from '@/components/user/course/courseOverview';
import { Suspense } from 'react';
import { getCourseContentOutline, getCourseIdBySlug } from '@/services/course.service';
import CourseTagsSection from '@/components/user/course/courseTagsSection';

type Props = { params: Promise<{ slug: string }> };

export default function CoursePage({ params }: Props) {
  return (
    <Box sx={{ py: { xs: 7, sm: 8 } }}>
      <Suspense>
        <CoursePageWrapper params={params} />
      </Suspense>
    </Box>
  );
}

async function CoursePageWrapper({ params }: Props) {
  const slug = (await params).slug;
  const idRes = await getCourseIdBySlug(slug);
  const courseId = idRes?.data || '';
  const course = await fetchCourse(slug);
  const courseContentOutlinePromise = getCourseContentOutline(courseId);
  return (
    <>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <Suspense>
          <CourseHeader courseId={courseId} />
        </Suspense>
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
              <Suspense>
                <CourseOverview courseId={courseId} />
              </Suspense>

              {/* Course Content Section */}
              <Section id='content'>
                <Suspense>
                  <CourseContent courseContentOulinePromise={courseContentOutlinePromise} />
                </Suspense>
              </Section>

              {/* Tags Section */}
              <Suspense>
                <CourseTagsSection courseId={courseId} />
              </Suspense>

              {/* Instructor Section */}
              <InstructorCard courseId={courseId} />

              <CourseReviews courseId={courseId} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
