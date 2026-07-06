import { Suspense } from 'react';
import NavbarContent from './NavbarContent';
import NavbarWrapper from './NavbarWrapper';
import NavbarContentSkeleton from './NavbarContentSkeleton';

export default function Navbar() {
  return (
    <NavbarWrapper>
      <Suspense fallback={<NavbarContentSkeleton />}>
        <NavbarContent />
      </Suspense>
    </NavbarWrapper>
  );
}
