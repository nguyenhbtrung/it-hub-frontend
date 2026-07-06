import { Box, Container } from '@mui/material';
import EnrolledWelcomeSection from './EnrolledWelcomeSection';
import NewStudentWelcomeSection from './NewStudentWelcomeSection';
import { jwtPayload } from '@/types/jwt';
import { getMyLearningCourses, getMyProfile } from '@/features/user';

export default async function WelcomeSection() {
  const user: jwtPayload = { userId: '1', name: 'Trung', role: 'instructor' };

  const profileRes = await getMyProfile();
  const userData = profileRes.success ? profileRes.data : null;

  const coursesRes = await getMyLearningCourses({ page: 1, limit: 4, status: 'active' });
  const courses = coursesRes.success ? (coursesRes.data ?? []) : [];

  const hasCourses = courses.length > 0;
  // const hasCourses = false;

  return (
    <Container maxWidth='xl'>
      <Box
        component='section'
        sx={{
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 },
        }}
      >
        {hasCourses ? (
          <EnrolledWelcomeSection user={userData || user} courses={courses} />
        ) : (
          <NewStudentWelcomeSection user={userData || user} />
        )}
      </Box>
    </Container>
  );
}
