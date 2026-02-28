import { Container, Box, Grid, Stack } from '@mui/material';
import QuickTools from '@/components/instructor/course/edit/exerciseManagement/submissionManagement/submissionDetail/quickTools';
import SubmissionDetailHeader from '@/components/instructor/course/edit/exerciseManagement/submissionManagement/submissionDetail/header';
import { Suspense } from 'react';
import ExerciseInfoCard from '@/components/instructor/course/edit/exerciseManagement/submissionManagement/submissionDetail/exerciseInfoCard';
import SubmissionDetailCard from '@/components/instructor/course/edit/exerciseManagement/submissionManagement/submissionDetail/submissionDetailCard';
import StudentInfoCard from '@/components/instructor/course/edit/exerciseManagement/submissionManagement/submissionDetail/studentInfoCard';
import GradingForm from '@/components/instructor/course/edit/exerciseManagement/submissionManagement/submissionDetail/gradingForm';

interface SubmissionDetailPageProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default function SubmissionDetailPage({ params }: SubmissionDetailPageProps) {
  return (
    <Box sx={{ bgcolor: 'customBackground.4', minHeight: '100vh', pb: 4 }}>
      {/* Header */}
      <Suspense>
        <SubmissionDetailHeader params={params} />
      </Suspense>

      {/* Main Content */}
      <Container maxWidth='xl' sx={{ mt: 4, px: { xs: 2, lg: 8 } }}>
        <Grid container spacing={4}>
          {/* Left Column - 70% */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={4}>
              <Suspense>
                <ExerciseInfoCard params={params} />
              </Suspense>

              <Suspense>
                <SubmissionDetailCard params={params} />
              </Suspense>
            </Stack>
          </Grid>

          {/* Right Column - 30% */}
          <Grid size={{ xs: 12, lg: 4 }}>
            <Stack spacing={3} sx={{ position: 'sticky', top: 88 }}>
              <Suspense>
                <StudentInfoCard params={params} />
              </Suspense>

              <Suspense>
                <GradingForm params={params} />
              </Suspense>

              <Suspense>
                <QuickTools params={params} />
              </Suspense>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
