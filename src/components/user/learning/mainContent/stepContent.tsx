import { Box, Typography, Button, Breadcrumbs, Link, Divider, Tooltip } from '@mui/material';
import { ArrowBack, ArrowForward, ChevronRight, AccessTime } from '@mui/icons-material';
import { notFound } from 'next/navigation';
import { formatDuration } from '@/lib/utils/formatDatetime';
import StepContentRenderer from '@/components/common/richText/renderer/stepContentRenderer';
import SelectToAskAI from './selectToAskAI';
import { auth } from '@/auth';
import AiChatButton from './aiChatButton';
import NextLink from '@/components/common/Link';
import LearningProgressAction from './learningProgressAction';
import { getCourseContentBreadcrumb, getNavigationByContentId } from '@/features/course';
import { getStepById } from '@/features/step';
import { getMyLearningProgressByStepId } from '@/features/user';

interface MainContentProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function MainContent({ params }: MainContentProps) {
  const { slug, id: stepId } = await params;
  const breadcrumbRes = await getCourseContentBreadcrumb(stepId, 'step');
  if (!breadcrumbRes.success) {
    notFound();
  }
  const breadcrumb = breadcrumbRes?.data;
  const stepRes = await getStepById(stepId);
  const session = await auth();
  const accessToken = session?.accessToken || '';
  if (!stepRes.success) {
    notFound();
  }
  const step = stepRes.data;

  const navRes = await getNavigationByContentId(stepId, { contentType: 'step' });
  if (!navRes.success) {
    notFound();
  }
  const nav = navRes.data;

  const learningProgressPromise = getMyLearningProgressByStepId(stepId);

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 3, md: 6 } }}>
          {/* Breadcrumb */}
          <Breadcrumbs separator={<ChevronRight fontSize='small' />} sx={{ mb: 3 }}>
            <Tooltip title={`Chương ${breadcrumb?.section?.order}: ${breadcrumb?.section?.title}`}>
              <Link
                href={`/courses/${slug}/learn/sections/${breadcrumb?.section?.id}`}
                color='text.secondary'
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  display: 'inline-block',
                  verticalAlign: 'bottom',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: { xs: '100px', sm: '200px' },
                }}
              >
                Chương {breadcrumb?.section?.order}: {breadcrumb?.section?.title}
              </Link>
            </Tooltip>

            <Tooltip title={`Bài ${breadcrumb?.section?.order}.${breadcrumb?.unit?.order}: ${breadcrumb?.unit?.title}`}>
              <Link
                href={`/courses/${slug}/learn/lessons/${breadcrumb?.unit?.id}`}
                color='text.secondary'
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                  display: 'inline-block',
                  verticalAlign: 'bottom',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: { xs: '200px', sm: '300px' },
                }}
              >
                Bài {breadcrumb?.section?.order}.{breadcrumb?.unit?.order}: {breadcrumb?.unit?.title}
              </Link>
            </Tooltip>
          </Breadcrumbs>

          {/* Header với thông tin chi tiết */}
          <Box sx={{ mb: 6 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  variant='h1'
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {step?.title}
                </Typography>
              </Box>

              {/* Metadata */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {step?.duration && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime fontSize='small' />
                    <Typography color='text.primary' variant='caption'>
                      ~{formatDuration(step.duration)}
                    </Typography>
                  </Box>
                )}
                <AiChatButton />
              </Box>
            </Box>
          </Box>

          {step?.content && (
            <SelectToAskAI accessToken={accessToken} stepId={step?.id || ''}>
              <StepContentRenderer content={step?.content} />
            </SelectToAskAI>
          )}

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
                Quay lại
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
                Quay lại
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

            <LearningProgressAction stepId={stepId} learningProgressPromise={learningProgressPromise} />

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
        </Box>
      </Box>
    </Box>
  );
}
