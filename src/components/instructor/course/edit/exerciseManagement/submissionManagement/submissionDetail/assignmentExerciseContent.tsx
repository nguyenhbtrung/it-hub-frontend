import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Suspense } from 'react';
import ExerciseInfoCard from './exerciseInfoCard';
import SubmissionDetailCard from './submissionDetailCard';
import StudentInfoCard from './studentInfoCard';
import GradingForm from './gradingForm';
import QuickTools from './quickTools';

interface AssigmentExerciseContentProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function AssignmentExerciseContent({ params }: AssigmentExerciseContentProps) {
  return (
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
  );
}
