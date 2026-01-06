import { Toolbar, Box } from '@mui/material';
import SearchBar from './SearchBar';
import NavbarLinks from './NavbarLinks';
import MobileMenu from './MobileMenu';
import Logo from '@/components/common/Logo';
import { instructorNavItems, mapCategoryTreeToNavItems, studentNavItems } from '@/data/navigation/userNavItems';
import { auth } from '@/auth';
import { getCategoryTree } from '@/services/category.service';

export default async function NavbarContent() {
  const res = await getCategoryTree();
  const categoryTree = res?.data;

  const userNavItems = mapCategoryTreeToNavItems(categoryTree);

  let navItems = userNavItems;
  const session = await auth();

  if (session?.role === 'student') {
    navItems = [...userNavItems, ...studentNavItems];
  }

  if (session?.role === 'instructor') {
    navItems = [...userNavItems, ...instructorNavItems, ...studentNavItems];
  }

  return (
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box display='flex' alignItems='center' gap={{ xs: 1, lg: 2 }}>
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>
          <MobileMenu navItems={navItems} />
        </Box>
        <Logo href='/' />
        <Box sx={{ width: { xs: 0, lg: 40 } }} />
        <SearchBar />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <NavbarLinks navItems={navItems} session={session} />
      </Box>
    </Toolbar>
  );
}
