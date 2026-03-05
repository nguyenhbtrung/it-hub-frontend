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
import SelectToAskAI from '../selectToAskAI';
import { auth } from '@/auth';
import AiChatButton from '../aiChatButton';
import { getSectionById } from '@/services/section.service';
import { getUnitById } from '@/services/unit.service';
import NextLink from '@/components/common/Link';
import { getExerciseByUnitId, getMyExerciseSubmission } from '@/services/exercise.service';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import Submission from '../submission';
import AssignmentContent from './assignmentContent';
import { Suspense } from 'react';
import QuizContent from './quizContent';

interface MainContentProps {
  params: Promise<{ slug: string; id: string }>;
}

export default async function MainContent({ params }: MainContentProps) {
  const { slug, id: unitId } = await params;
  const breadcrumbRes = await getCourseContentBreadcrumb(unitId, 'unit');
  const breadcrumb = breadcrumbRes?.data;
  const exerciseRes = await getExerciseByUnitId(unitId);
  if (!exerciseRes.success) {
    notFound();
  }
  const exercise = exerciseRes?.data;
  console.log('exercise: ', exercise);
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

  const navRes = await getNavigationByContentId(unitId, { contentType: 'unit' });
  const nav = navRes?.data;

  const renderExerciseContent = () => {
    switch (exercise.type) {
      case 'assignment':
        return (
          <Suspense>
            <AssignmentContent exercise={exercise} nav={nav} slug={slug} />
          </Suspense>
        );

      case 'project':
        return (
          <Suspense>
            <AssignmentContent exercise={exercise} nav={nav} slug={slug} />
          </Suspense>
        );

      case 'quiz':
        return (
          <Suspense>
            <QuizContent exercise={exercise} nav={nav} slug={slug} />
          </Suspense>
        );

      default:
        return <Typography color='text.secondary'>Loại bài tập chưa được hỗ trợ</Typography>;
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 3, md: 6 } }}>
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
          {renderExerciseContent()}
        </Box>
      </Box>
    </Box>
  );
}
