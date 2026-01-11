import { verifySession } from '@/lib/utils/dal';
import { Box, Container } from '@mui/material';
import EnrolledWelcomeSection from './EnrolledWelcomeSection';
import NewStudentWelcomeSection from './NewStudentWelcomeSection';
import { courseProgress } from '@/types/course';
import { auth } from '@/auth';
import { jwtPayload } from '@/types/jwt';

async function getUserLearningData(userId: string): Promise<courseProgress[]> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return userId === '1'
    ? [
        {
          courseId: 1,
          image: 'https://img-c.udemycdn.com/course/480x270/1362070_b9a1_2.jpg',
          category: 'React',
          level: 'Cơ bản',
          title: 'React Fundamentals React Fundamentals React Fundamentals',
          duration: '4 tuần',
          progress: 40,
          lastAccess: '2025-01-10',
        },
        {
          courseId: 2,
          image: 'https://img-c.udemycdn.com/course/480x270/6244687_efa1_11.jpg',
          category: 'Node.js',
          level: 'Trung cấp',
          title: 'Node.js Essentials',
          duration: '6 tuần',
          progress: 80,
          lastAccess: '2025-02-01',
        },
        {
          courseId: 3,
          image: 'https://img-c.udemycdn.com/course/480x270/567828_67d0.jpg',
          category: 'Python',
          level: 'Nâng cao',
          title: 'Advanced Python Programming',
          duration: '8 tuần',
          progress: 25,
          lastAccess: '2025-02-15',
        },
      ]
    : [];
}

export default async function WelcomeSection() {
  const session = await auth();
  if (!session) return;

  const user: jwtPayload = { userId: '1', name: 'Trung', role: 'instructor' };

  const learning = await getUserLearningData(user.userId.toString());
  // const hasCourses = learning.length > 0;
  const hasCourses = false;

  return (
    <Container maxWidth='xl'>
      <Box
        component='section'
        sx={{
          py: { xs: 8, md: 12 },
          px: { xs: 2, md: 4 },
        }}
      >
        {hasCourses ? (
          <EnrolledWelcomeSection user={user} learning={learning} />
        ) : (
          <NewStudentWelcomeSection user={user} />
        )}
      </Box>
    </Container>
  );
}
