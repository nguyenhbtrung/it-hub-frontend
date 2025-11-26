import { Suspense } from 'react';
import NavbarContent from './NavbarContent';
import NavbarWrapper from './NavbarWrapper';

export default function Navbar() {
  return (
    <NavbarWrapper>
      <Suspense>
        <NavbarContent />
      </Suspense>
    </NavbarWrapper>
  );
}
