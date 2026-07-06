import FeaturedCourses from '@/components/user/home/FeaturedCourses';
import { LandingSection, LandingSectionSkeleton } from '@/components/user/home/landingSection';
import LearningAssistant from '@/components/user/home/LearningAssistant';
import { Container } from '@mui/material';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <>
      <Suspense fallback={<LandingSectionSkeleton />}>
        <LandingSection />
      </Suspense>
      <Container maxWidth='xl'>
        <FeaturedCourses />
        {/* <UpcomingContests /> */}
      </Container>
      <Suspense>
        <LearningAssistant />
      </Suspense>
    </>
  );
}
