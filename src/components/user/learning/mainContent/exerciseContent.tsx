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

import { getCourseContentBreadcrumb, getNavigationByContentId } from '@/services/course.service';
import { notFound } from 'next/navigation';
import { formatDuration } from '@/lib/utils/formatDatetime';
import StepContentRenderer from '@/components/common/richText/renderer/stepContentRenderer';
import SelectToAskAI from './selectToAskAI';
import { auth } from '@/auth';
import AiChatButton from './aiChatButton';
import { getSectionById } from '@/services/section.service';
import { getUnitById } from '@/services/unit.service';
import NextLink from '@/components/common/Link';
import { getExerciseByUnitId, getMyExerciseSubmission } from '@/services/exercise.service';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import FolderZipIcon from '@mui/icons-material/FolderZip';

interface MainContentProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function MainContent({ params }: MainContentProps) {
  const { slug, id: unitId } = await params;
  const breadcrumbRes = await getCourseContentBreadcrumb(unitId, 'unit');
  const breadcrumb = breadcrumbRes?.data;
  const exerciseRes = await getExerciseByUnitId(unitId);
  const session = await auth();
  const accessToken = session?.accessToken || '';
  if (!exerciseRes.success) {
    notFound();
  }
  const exercise = exerciseRes?.data;
  // exerciseRes: {
  //     "success": true,
  //     "message": "Success",
  //     "data": {
  //         "id": "ex1",
  //         "unitId": "unit2",
  //         "type": "project",
  //         "title": "Bài tập: Cài đặt môi trường React",
  //         "description": "Hoàn thành cài đặt Node.js và tạo project bằng Vite hoặc CRA. Nộp link repo.",
  //         "content": {
  //             "type": "doc",
  //             "content": [
  //                 {
  //                     "type": "paragraph",
  //                     "content": [
  //                         {
  //                             "text": "Hướng dẫn: cài Node 14+, chạy npm create vite@latest hoặc npx create-react-app my-app.",
  //                             "type": "text"
  //                         }
  //                     ]
  //                 }
  //             ]
  //         },
  //         "deadline": null,
  //         "duration": 300,
  //         "passingScore": 5,
  //         "unit": {
  //             "title": "Bài tập cài đặt môi trường",
  //             "materials": [
  //                 {
  //                     "id": "cmk6fjkti0003novm0jaofows",
  //                     "file": {
  //                         "id": "cmk6fjkki0002novmrtc8cy6z",
  //                         "name": "courses.sql",
  //                         "size": "3654",
  //                         "type": "OTHER",
  //                         "mimeType": "application/sql",
  //                         "url": "http://localhost:8080/uploads/permanent/bab3a09e-218d-4a7b-9386-4036681b67b3.sql"
  //                     }
  //                 },
  //                 {
  //                     "id": "cmk6fk9uy0007novm52xv11ec",
  //                     "file": {
  //                         "id": "cmk6fk9rg0006novm8g28u4lu",
  //                         "name": "material-theme.zip",
  //                         "size": "4076",
  //                         "type": "OTHER",
  //                         "mimeType": "application/x-zip-compressed",
  //                         "url": "http://localhost:8080/uploads/permanent/6af2cc8f-460a-46df-a902-55690d28dc73.zip"
  //                     }
  //                 }
  //             ]
  //         }
  //     },
  //     "meta": {
  //         "timestamp": "2026-01-09T09:38:53.010Z"
  //     }
  // }

  const submissionRes = await getMyExerciseSubmission(exercise?.id || '');
  const submission = submissionRes?.data;
  //   submissionRes: {
  //     "success": true,
  //     "message": "Success",
  //     "data": {
  //         "id": "cmk6o12wn0002qwvm9nyssraf",
  //         "excerciseId": "ex1",
  //         "studentId": "cmjmsqb0i0001hkvm9qy48dmz",
  //         "score": null,
  //         "comment": null,
  //         "quizResults": null,
  //         "demoUrl": [
  //             "a",
  //             "b"
  //         ],
  //         "note": "abc",
  //         "createdAt": "2026-01-09T09:20:15.031Z",
  //         "attachments": [
  //             {
  //                 "id": "cmk6o12ww0003qwvmze1xw4h7",
  //                 "file": {
  //                     "id": "cmk6nvujx0000qwvmaivwwatv",
  //                     "name": "update-category-1.sql",
  //                     "size": "2144",
  //                     "type": "OTHER",
  //                     "mimeType": "application/x-sql",
  //                     "url": "http://localhost:8080/uploads/permanent/1b4d061e-54a8-4af6-a964-63273c56a900.sql"
  //                 }
  //             },
  //             {
  //                 "id": "cmk6o12ww0004qwvm581k6wav",
  //                 "file": {
  //                     "id": "cmk6nwavg0001qwvmndu999uc",
  //                     "name": "course-content.sql",
  //                     "size": "7640",
  //                     "type": "OTHER",
  //                     "mimeType": "application/x-sql",
  //                     "url": "http://localhost:8080/uploads/permanent/636c97f4-a2cf-49af-9217-9c778da0dad3.sql"
  //                 }
  //             }
  //         ]
  //     },
  //     "meta": {
  //         "timestamp": "2026-01-09T09:42:33.549Z"
  //     }
  // }

  const navRes = await getNavigationByContentId(unitId, { contentType: 'unit' });
  const nav = navRes?.data;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 3, md: 6 } }}>
          {/* Breadcrumb */}
          <Breadcrumbs separator={<ChevronRight fontSize='small' />} sx={{ mb: 3 }}>
            <Link
              href={`/courses/${slug}/learn/sections/${breadcrumb?.section?.id}`}
              color='text.secondary'
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Chương {breadcrumb?.section?.order}: {breadcrumb?.section?.title}
            </Link>
            <Link
              href={`/courses/${slug}/learn/lessons/${breadcrumb?.unit?.id}`}
              color='text.secondary'
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Bài tập: {breadcrumb?.unit?.title}
            </Link>
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
          <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                bgcolor: 'customBackground.4',
                p: 1,
                alignItems: 'center',
                borderTopRightRadius: 12,
                borderTopLeftRadius: 12,
              }}
            >
              <DescriptionOutlined sx={{ ml: 2, color: 'primary.main' }} />
              <Typography
                variant='h5'
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
        </Box>
      </Box>
    </Box>
  );
}
