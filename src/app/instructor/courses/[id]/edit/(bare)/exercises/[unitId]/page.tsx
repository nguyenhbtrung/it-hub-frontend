import { Suspense } from 'react';
import { Box } from '@mui/material';

import OverviewSection from '@/components/instructor/course/edit/exerciseManagement/submissionManagement/overviewSection';
import SubmissionTableSection from '@/components/instructor/course/edit/exerciseManagement/submissionManagement/submissionTableSection';

interface AssignmentManagementPageProps {
  params: Promise<{ unitId: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SubmissionManagementPage({ params, searchParams }: AssignmentManagementPageProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'customBackground.4' }}>
      <Suspense>
        <OverviewSection params={params} />
      </Suspense>

      {/* Main Content */}
      <Suspense>
        <SubmissionTableSection params={params} searchParams={searchParams} />
      </Suspense>
    </Box>
  );
}
