import { getSubmissionOverview } from '@/features/exercise';
import Header from './header';
import Container from '@mui/material/Container';
import { Overview } from './types';
import StatsCards from './statsCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { notFound } from 'next/navigation';

interface OverviewSectionProps {
  params: Promise<{ unitId: string; id: string }>;
}

export default async function OverviewSection({ params }: OverviewSectionProps) {
  const { unitId, id } = await params;
  const overviewRes = await getSubmissionOverview(unitId);
  if (!overviewRes.success) {
    notFound();
  }
  const overview: Overview = overviewRes.data || {
    title: 'Bài tập',
    totalStudents: 0,
    submittedStudents: 0,
    unscoredAttempts: 0,
    scoredAttempts: 0,
    averageScore: 0,
  };

  return (
    <>
      {/* App Bar */}
      <Header title={overview?.title} courseId={id} />

      <Container maxWidth='lg' sx={{ flex: 1, pt: { xs: 3, md: 5 } }}>
        <Box sx={{ pb: 4 }}>
          <Typography variant='h4' fontWeight={700} color='text.primary'>
            Quản lý bài nộp
          </Typography>
          <Typography variant='body1' color='text.secondary' sx={{ mt: 0.5 }}>
            Theo dõi tiến độ nộp bài và thực hiện chấm điểm cho học viên.
          </Typography>
        </Box>
        <StatsCards overview={overview} />
      </Container>
    </>
  );
}
