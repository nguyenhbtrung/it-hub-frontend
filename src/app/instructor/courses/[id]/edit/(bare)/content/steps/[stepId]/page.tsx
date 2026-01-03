import EditStepHeader from '@/components/instructor/course/edit/content/editStep/header';
import LectureEditor from '@/components/instructor/course/edit/content/editStep/lectureEditor';
import { getStepById } from '@/services/step.service';

import { Container, Grid, Box, Paper } from '@mui/material';
import { Suspense } from 'react';

interface EditStepPageProps {
  params: Promise<{ stepId: string }>;
}

export default function EditStepPage({ params }: EditStepPageProps) {
  return (
    <Box sx={{ bgcolor: 'customBackground.4', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Suspense>
        <EditStepPageWrapper params={params} />
      </Suspense>
    </Box>
  );
}

async function EditStepPageWrapper({ params }: EditStepPageProps) {
  const { stepId } = await params;
  const res = await getStepById(stepId);
  const step = res?.data;
  return (
    <>
      <LectureEditor step={step} />
    </>
  );
}
