import HeroSection from './HeroSection';
import WelcomeSection from './WelcomeSection';
import { Suspense } from 'react';
import WelcomeSectionSkeleton from './WelcomeSectionSkeleton';
import { auth } from '@/auth';

export default async function LandingSection() {
  const session = await auth();
  if (!session) return <HeroSection />;
  return (
    <Suspense fallback={<WelcomeSectionSkeleton />}>
      <WelcomeSection />
    </Suspense>
  );
}
