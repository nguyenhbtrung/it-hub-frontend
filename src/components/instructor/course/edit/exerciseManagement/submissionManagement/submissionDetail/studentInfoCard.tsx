import { getExerciseByUnitId, getSubmissionById } from '@/services/exercise.service';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface StudentInfoCardProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function StudentInfoCard({ params }: StudentInfoCardProps) {
  const { unitId, attemptId } = await params;
  const exerciseRes = await getExerciseByUnitId(unitId);
  const submissionRes = await getSubmissionById(attemptId);

  const exercise = exerciseRes?.data;
  const submission = submissionRes?.data;

  // Xác định trạng thái bài nộp
  const isOnTime = () => {
    if (!exercise.deadline) return true;
    return new Date(submission.createdAt) <= new Date(exercise.deadline);
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy, HH:mm', { locale: vi });
  };
  return (
    <Paper sx={{ p: 3, borderRadius: 1 }}>
      <Typography
        variant='subtitle2'
        color='text.secondary'
        fontWeight='bold'
        textTransform='uppercase'
        letterSpacing={0.5}
        mb={2}
      >
        Thông tin học viên
      </Typography>
      <Stack direction='row' spacing={2} alignItems='center' mb={3}>
        <Avatar
          src={submission.student.avatar || undefined}
          sx={{ width: 56, height: 56, border: 2, borderColor: 'primary.light' }}
        >
          {submission.student.fullname?.charAt(0)}
        </Avatar>
        <Box>
          <Typography fontWeight='bold'>{submission.student.fullname}</Typography>
          <Typography variant='body2' color='text.secondary'>
            {submission.student.email}
          </Typography>
        </Box>
      </Stack>
      <Stack spacing={1.5} divider={<Divider />}>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='body2' color='text.secondary'>
            Trạng thái bài nộp
          </Typography>
          <Chip
            label={isOnTime() ? 'Đúng hạn' : 'Trễ hạn'}
            size='small'
            color={isOnTime() ? 'success' : 'error'}
            sx={{ fontWeight: 'bold', fontSize: '0.7rem' }}
          />
        </Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='body2' color='text.secondary'>
            Ngày nộp
          </Typography>
          <Typography variant='body2' fontWeight='medium'>
            {formatDate(submission.createdAt)}
          </Typography>
        </Stack>
        <Stack direction='row' justifyContent='space-between'>
          <Typography variant='body2' color='text.secondary'>
            Lần nộp
          </Typography>
          <Typography variant='body2' fontWeight='medium'>
            {submission.attemptCount}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
