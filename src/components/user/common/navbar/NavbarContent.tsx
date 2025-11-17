import { Toolbar, Box } from '@mui/material';
import SearchBar from './SearchBar';
import NavbarLinks from './NavbarLinks';
import MobileMenu from './MobileMenu';
import Logo from '@/components/common/Logo';

export default function NavbarContent() {
  return (
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box display='flex' alignItems='center' gap={{ xs: 1, lg: 2 }}>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <MobileMenu />
        </Box>
        <Logo />
        <Box sx={{ width: { xs: 0, lg: 40 } }} />
        <SearchBar />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <NavbarLinks />
      </Box>
    </Toolbar>
  );
}
