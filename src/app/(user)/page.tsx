import HeroSection from '@/components/user/home/HeroSection';
import FeaturedCourses from '@/components/user/home/FeaturedCourses';
import LearningAssistant from '@/components/user/home/LearningAssistant';
import { Container } from '@mui/material';
import UpcomingContests from '@/components/user/home/upcomingContests';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Container maxWidth='xl'>
        <FeaturedCourses />
        <UpcomingContests />
      </Container>
      <LearningAssistant />
    </>
  );
}
