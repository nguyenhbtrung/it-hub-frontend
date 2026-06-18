import LectureEditor from '@/components/instructor/course/edit/content/editStep/lectureEditor';
import { getStepById } from '@/features/step';

import { Box } from '@mui/material';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface EditStepPageProps {
  params: Promise<{ stepId: string; id: string }>;
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
  const { stepId, id } = await params;
  const res = await getStepById(stepId);
  if (!res.success) {
    notFound();
  }
  const step = res.data;
  return (
    <>
      <LectureEditor step={step} courseId={id} />
    </>
  );
}
