import { getCourseExercisesGroupedBySection } from '@/features/course';
import ExerciseManagementClient from './ExerciseManagementClient';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ExerciseManagementProps {
  params: Promise<{ id: string }>;
}

export default async function ExerciseManagement({ params }: ExerciseManagementProps) {
  const { id: courseId } = await params;
  const res = await getCourseExercisesGroupedBySection(courseId, { page: 1, limit: 5 });
  const sections = res.success ? (res.data ?? []) : [];
  const meta = res?.meta;

  return (
    <Box
      sx={{
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
      }}
    >
      {/* Header */}
      <Box sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 4 }}>
        <Typography variant='h5' component='h2' fontWeight={700} color='text.primary'>
          Quản lý bài tập
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ mt: 0.5 }}>
          Quản lý, chấm điểm và phản hồi bài nộp của học viên.
        </Typography>
      </Box>
      <ExerciseManagementClient courseId={courseId} initialSections={sections} initialMeta={meta} />
    </Box>
  );
}
