import FeaturedCourses from '@/components/user/home/FeaturedCourses';
import LandingSection from '@/components/user/home/landingSection';
import LearningAssistant from '@/components/user/home/LearningAssistant';
import UpcomingContests from '@/components/user/home/upcomingContests';
import { Container } from '@mui/material';
import { Suspense } from 'react';

export default function HomePage() {
  return (
    <>
      <Suspense>
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
