import { Box } from '@mui/material';
import SubmissionDetailHeader from '@/components/instructor/course/edit/exerciseManagement/submissionManagement/submissionDetail/header';
import { Suspense } from 'react';
import SubmissionDetailMainContent from '@/components/instructor/course/edit/exerciseManagement/submissionManagement/submissionDetail/submissionDetailMainContent';

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
      <Suspense>
        <SubmissionDetailMainContent params={params} />
      </Suspense>
    </Box>
  );
}
