import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Paper,
  List,
  ListItem,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  ChevronRight,
  AccessTime,
  School,
  Download,
  Code,
  VideoLibrary,
  Image,
  Note,
  List as ListIcon,
  Quiz,
  Terminal,
} from '@mui/icons-material';
import { stepApi } from '@/lib/mockApi/leanring';
import { getCourseContentBreadcrumb } from '@/services/course.service';
import { getStepById } from '@/services/step.service';
import { notFound } from 'next/navigation';
import { formatDuration } from '@/lib/utils/formatDatetime';
import StepContentRenderer from '@/components/common/richText/renderer/stepContentRenderer';
import SelectToAskAI from './selectToAskAI';
import { auth } from '@/auth';
import AiChatButton from './aiChatButton';

interface MainContentProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function MainContent({ params }: MainContentProps) {
  const { slug, id: stepId } = await params;
  const stepDetails = await stepApi.getStepDetails('step-2-1-2');
  const breadcrumbRes = await getCourseContentBreadcrumb(stepId, 'step');
  const breadcrumb = breadcrumbRes?.data;
  const stepRes = await getStepById(stepId);
  const session = await auth();
  const accessToken = session?.accessToken || '';
  if (!stepRes.success) {
    notFound();
  }
  const step = stepRes?.data;

  if (!stepDetails) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Không tìm thấy nội dung bài học</Typography>
      </Box>
    );
  }

  const { step: stepss, lesson, section, content } = stepDetails;

  // Sort blocks theo order
  const sortedBlocks = content.blocks.sort((a, b) => a.order - b.order);

  // Tính thời gian ước tính
  const totalEstimatedTime =
    content.blocks.reduce((total, block) => {
      if (block.type === 'video' && block.duration) {
        return total + block.duration;
      }
      return total;
    }, 0) / 60; // Chuyển sang phút

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 3, md: 6 } }}>
          {/* Breadcrumb */}
          <Breadcrumbs separator={<ChevronRight fontSize='small' />} sx={{ mb: 3 }}>
            <Link
              href='#'
              color='text.secondary'
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Phần {breadcrumb?.section?.order}: {breadcrumb?.section?.title}
            </Link>
            <Link
              href='#'
              color='text.secondary'
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Bài {breadcrumb?.section?.order}.{breadcrumb?.unit?.order}: {breadcrumb?.unit?.title}
            </Link>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              Bước {breadcrumb?.step?.order}: {breadcrumb?.step?.title}
            </Typography>
          </Breadcrumbs>

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
                  {step?.title}
                </Typography>
                {/* <Typography
                  variant='h6'
                  sx={{
                    color: 'text.secondary',
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    mb: 2,
                  }}
                >
                  {content.description}
                </Typography> */}
              </Box>

              {/* Metadata */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                {/* {content.difficulty && (
                  <Chip
                    label={
                      content.difficulty === 'beginner'
                        ? 'Cơ bản'
                        : content.difficulty === 'intermediate'
                          ? 'Trung cấp'
                          : 'Nâng cao'
                    }
                    size='small'
                    color={
                      content.difficulty === 'beginner'
                        ? 'success'
                        : content.difficulty === 'intermediate'
                          ? 'warning'
                          : 'error'
                    }
                  />
                )} */}

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

            {/* Mục tiêu học tập */}
            {/* {content.objectives && content.objectives.length > 0 && (
              <Paper sx={{ p: 2, bgcolor: 'customBackground.2', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <School fontSize='small' />
                  <Typography variant='subtitle1' fontWeight={500}>
                    Mục tiêu học tập
                  </Typography>
                </Box>
                <List sx={{ pl: 2 }}>
                  {content.objectives.map((objective, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', p: 0, mb: 0.5 }}>
                      <Typography variant='body2'>{objective}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )} */}
          </Box>

          {step?.content && (
            <SelectToAskAI accessToken={accessToken} stepId={step?.id || ''}>
              <StepContentRenderer content={step?.content} />
            </SelectToAskAI>
          )}

          {/* Navigation Buttons */}
          <Divider sx={{ my: 6 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
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
              Bước trước
            </Button>
            <Button
              variant='contained'
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              Hoàn thành và tiếp tục
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
