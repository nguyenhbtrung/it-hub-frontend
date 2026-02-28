import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import MuiLink from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getExerciseByUnitId } from '@/services/exercise.service';
import Link from '@/components/common/Link';

interface SubmissionDetailHeaderProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function SubmissionDetailHeader({ params }: SubmissionDetailHeaderProps) {
  const { id, unitId } = await params;
  const exerciseRes = await getExerciseByUnitId(unitId);

  const exercise = exerciseRes?.data;

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        borderRadius: 0,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        px: { xs: 2, lg: 4 },
        py: 1.5,
      }}
    >
      <Container maxWidth='xl' disableGutters>
        <Stack direction='row' alignItems='center' spacing={2}>
          <MuiLink
            component={Link}
            href={`/instructor/courses/${id}/edit/exercises/${unitId}`}
            underline='none'
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' },
            }}
          >
            <ArrowBackIcon fontSize='small' />
            <Typography variant='body2' sx={{ display: { xs: 'none', md: 'block' } }}>
              Quay lại
            </Typography>
          </MuiLink>
          <Divider orientation='vertical' flexItem sx={{ display: { xs: 'none', md: 'block' } }} />
          <Box>
            <Typography variant='h6' fontWeight='bold' lineHeight={1.2}>
              Chấm điểm bài nộp
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {exercise.unit.title}
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Paper>
  );
}
