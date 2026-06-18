import StepContentRenderer from '@/components/common/richText/renderer/stepContentRenderer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Submission from '../submission';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import NextLink from '@/components/common/Link';
import { getMyExerciseSubmission } from '@/features/exercise';

interface AssignmentContentProps {
  exercise: any;
  nav: any;
  slug: string;
}

export default async function AssignmentContent({ exercise, nav, slug }: AssignmentContentProps) {
  const submissionRes = await getMyExerciseSubmission(exercise?.id || '');
  const submissions = submissionRes.success ? (submissionRes.data ?? []) : [];
  const meta = submissionRes?.meta;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };
  return (
    <>
      {/* Header với thông tin chi tiết */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 1,
              }}
            >
              {exercise?.unit?.title}
            </Typography>
            <Typography
              variant='h6'
              sx={{
                color: 'text.secondary',
                fontSize: '1.125rem',
                fontWeight: 400,
                mb: 2,
              }}
            >
              {exercise?.description}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          // p: { xs: 2, md: 4 },
          display: 'flex',
          gap: 3,
          alignItems: 'flex-start',
        }}
      >
        {/* LEFT: Nội dung bài tập */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                bgcolor: 'customBackground.4',
                p: 2,
                alignItems: 'center',
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
                borderBottom: 1,
                borderColor: 'divider',
              }}
            >
              <DescriptionOutlined sx={{ ml: 1, color: 'primary.main' }} />
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 600,
                  ml: 1,
                }}
              >
                Nội dung bài tập
              </Typography>
            </Box>

            <Box sx={{ p: 4, minHeight: 300 }}>
              {exercise?.content && (
                // <SelectToAskAI accessToken={accessToken} stepId={exercise?.id || ''}>
                <StepContentRenderer content={exercise?.content} />
                // </SelectToAskAI>
              )}
            </Box>

            <Box sx={{ p: 4, pt: 0 }}>
              <Typography
                variant='h6'
                sx={{
                  fontWeight: 600,
                  mb: 2,
                  ml: 1,
                }}
              >
                Tài nguyên đính kèm
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {exercise?.unit?.materials?.map((material: any) => (
                  <Box
                    key={material.id}
                    component='a'
                    href={material.file.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      p: '12px 20px',
                      bgcolor: '#f4f7f9',
                      border: '1px solid',
                      borderColor: '#e0e4e8',
                      borderRadius: '12px',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: '0.2s',
                      '&:hover': {
                        bgcolor: '#ebf0f4',
                        borderColor: 'primary.main',
                      },
                    }}
                  >
                    <FolderZipIcon sx={{ color: '#455a64', mr: 2, fontSize: 28 }} />

                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '1rem',
                        flex: 1,
                        color: '#37474f',
                      }}
                    >
                      {material.file.name}
                    </Typography>

                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.9rem',
                        ml: 2,
                      }}
                    >
                      ({formatFileSize(Number(material.file.size))})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        {/* RIGHT */}
        <Submission exercise={exercise} submissions={submissions} initialAttemptCount={meta?.total || 0} />
      </Box>

      {/* Navigation Buttons */}
      <Divider sx={{ my: 6 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {nav?.previousType === 'step' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/steps/${nav?.previousId}`}
            variant='outlined'
            startIcon={<ArrowBack />}
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.100',
              },
            }}
          >
            Trước đó
          </Button>
        )}

        {nav?.previousType === 'lesson' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/lessons/${nav?.previousId}`}
            variant='outlined'
            startIcon={<ArrowBack />}
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.100',
              },
            }}
          >
            Trước đó
          </Button>
        )}

        {nav?.previousType === 'exercise' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/exercises/${nav?.previousId}`}
            variant='outlined'
            startIcon={<ArrowBack />}
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.100',
              },
            }}
          >
            Trước đó
          </Button>
        )}

        {nav?.previousType === 'section' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/sections/${nav?.previousId}`}
            variant='outlined'
            startIcon={<ArrowBack />}
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.100',
              },
            }}
          >
            Quay lại
          </Button>
        )}

        {nav?.nextType === 'step' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/steps/${nav?.nextId}`}
            variant='contained'
            endIcon={<ArrowForward />}
            size='large'
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Tiếp theo
          </Button>
        )}
        {nav?.nextType === 'lesson' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/lessons/${nav?.nextId}`}
            variant='contained'
            endIcon={<ArrowForward />}
            size='large'
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Tiếp theo
          </Button>
        )}

        {nav?.nextType === 'exercise' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/exercises/${nav?.nextId}`}
            variant='contained'
            endIcon={<ArrowForward />}
            size='large'
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Tiếp theo
          </Button>
        )}

        {nav?.nextType === 'section' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/sections/${nav?.nextId}`}
            variant='contained'
            endIcon={<ArrowForward />}
            size='large'
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Tiếp theo
          </Button>
        )}
      </Box>
    </>
  );
}
