import HeroSection from '@/components/user/home/HeroSection';
import FeaturedCourses from '@/components/user/home/FeaturedCourses';
import OngoingCompetitions from '@/components/user/home/OngoingCompetitions';
import LearningAssistant from '@/components/user/home/LearningAssistant';
import { Container } from '@mui/material';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Container maxWidth='xl'>
        <FeaturedCourses />
        <OngoingCompetitions />
        <LearningAssistant />
      </Container>
    </>
  );
}
