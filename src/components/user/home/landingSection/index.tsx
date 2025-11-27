import { verifySession } from '@/lib/utils/dal';
import HeroSection from './HeroSection';
import WelcomeSection from './WelcomeSection';
import { Suspense } from 'react';
import WelcomeSectionSkeleton from './WelcomeSectionSkeleton';

export default async function LandingSection() {
  const session = await verifySession();
  if (!session) return <HeroSection />;
  return (
    <Suspense fallback={<WelcomeSectionSkeleton />}>
      <WelcomeSection />
    </Suspense>
  );
}
