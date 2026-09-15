import { Box, Container, Grid, Stack } from '@mui/material';
import { CourseHeader, CourseHeaderSkeleton } from '@/components/user/course/courseHeader';
import { CourseOverview, CourseOverviewSkeleton } from '@/components/user/course/courseOverview';
import { CourseContent, CourseContentSkeleton } from '@/components/user/course/courseContent';
import { CourseTagsSection, CourseTagsSectionSkeleton } from '@/components/user/course/courseTagsSection';
import { InstructorCard, InstructorCardSkeleton } from '@/components/user/course/instructorCard';
import CourseReviews from '@/components/user/course/courseReviews';
import NavTabs from '@/components/user/course/navTabs';
import Section from '@/components/common/section';
import { Suspense } from 'react';
import { getCourseContentOutline, getCourseIdBySlug } from '@/features/course';
import { notFound } from 'next/navigation';

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
  if (!idRes.success) {
    notFound();
  }
  const courseId = idRes.data;
  const courseContentOutlinePromise = getCourseContentOutline(courseId);
  return (
    <>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <Suspense fallback={<CourseHeaderSkeleton />}>
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
              <Suspense fallback={<CourseOverviewSkeleton />}>
                <CourseOverview courseId={courseId} />
              </Suspense>

              {/* Course Content Section */}
              <Section id='content'>
                <Suspense fallback={<CourseContentSkeleton />}>
                  <CourseContent courseContentOulinePromise={courseContentOutlinePromise} slug={slug} />
                </Suspense>
              </Section>

              {/* Tags Section */}
              <Suspense fallback={<CourseTagsSectionSkeleton />}>
                <CourseTagsSection courseId={courseId} />
              </Suspense>

              {/* Instructor Section */}
              <Suspense fallback={<InstructorCardSkeleton />}>
                <InstructorCard courseId={courseId} />
              </Suspense>

              <Suspense>
                <CourseReviews courseId={courseId} />
              </Suspense>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
