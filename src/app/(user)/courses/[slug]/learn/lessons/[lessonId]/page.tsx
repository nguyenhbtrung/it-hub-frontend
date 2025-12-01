import MainContent from '@/components/user/learning/mainContent';
import CourseContentMenu from '@/components/user/learning/courseContentMenu';
import { Box } from '@mui/material';

export default function LearningPage() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ height: { xs: 56, sm: 64 }, borderBottom: 1, borderColor: 'divider' }} />
      <Box sx={{ display: 'flex', flex: 1, position: 'relative', flexDirection: { xs: 'column', md: 'row' } }}>
        <CourseContentMenu />
        <MainContent />
      </Box>
    </Box>
  );
}
