import StepContentRenderer from '@/components/common/richText/renderer/stepContentRenderer';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import FileIcon from './fileIcon';
import DownloadIcon from '@mui/icons-material/Download';
import { getExerciseByUnitId } from '@/services/exercise.service';

interface ExerciseInfoCardProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function ExerciseInfoCard({ params }: ExerciseInfoCardProps) {
  const { unitId } = await params;
  const exerciseRes = await getExerciseByUnitId(unitId);

  const exercise = exerciseRes?.data;
  return (
    <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
      <Box sx={{ p: { xs: 3, md: 4 }, bgcolor: 'grey.50', borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant='h5' fontWeight='bold'>
          {exercise.unit.title}
        </Typography>
      </Box>
      <Box sx={{ p: { xs: 3, md: 4 } }}>
        {/* Description */}
        <Box mb={4}>
          <Typography
            variant='subtitle2'
            color='text.secondary'
            fontWeight='bold'
            textTransform='uppercase'
            letterSpacing={0.5}
            mb={2}
          >
            Mô tả yêu cầu
          </Typography>
          {exercise.content && <StepContentRenderer content={exercise.content} />}
        </Box>

        {/* Resources */}
        {exercise.unit.materials && exercise.unit.materials.length > 0 && (
          <Box>
            <Divider sx={{ my: 3 }} />
            <Typography
              variant='subtitle2'
              color='text.secondary'
              fontWeight='bold'
              textTransform='uppercase'
              letterSpacing={0.5}
              mb={2}
            >
              Tài nguyên
            </Typography>
            <Grid container spacing={2}>
              {exercise.unit.materials.map((material: any) => (
                <Grid size={{ xs: 12, sm: 6 }} key={material.id}>
                  <MuiLink
                    href={material.file.url}
                    target='_blank'
                    rel='noopener'
                    underline='none'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5,
                      p: 2,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1,
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        '& .download-icon': { color: 'primary.main' },
                      },
                    }}
                  >
                    <FileIcon fileType={material.file.type} mimeType={material.file.mimeType} />
                    <Typography variant='body2' fontWeight='medium' noWrap>
                      {material.file.name}
                    </Typography>
                    <DownloadIcon className='download-icon' sx={{ ml: 'auto', fontSize: 20, color: 'text.disabled' }} />
                  </MuiLink>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
