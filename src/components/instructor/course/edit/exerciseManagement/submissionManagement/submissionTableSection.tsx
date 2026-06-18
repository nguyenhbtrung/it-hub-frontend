import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { Suspense } from 'react';
import SearchBox from './searchBox';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import FilterBar from './filterBar';
import Typography from '@mui/material/Typography';
import { SubmissionsTable } from './submissionTable';
import PaginationBar from './paginationBar';
import LightbulbIcon from '@mui/icons-material/LightbulbOutline';
import { Submission } from './types';
import { getStudentSubmissions } from '@/features/exercise';

interface AssignmentTableSectionProps {
  params: Promise<{ unitId: string; id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SubmissionTableSection({ params, searchParams }: AssignmentTableSectionProps) {
  const { unitId, id: courseId } = await params;
  const { page, q, status } = await searchParams;

  let currentPage = Number(page);
  if (!page || isNaN(currentPage) || currentPage < 1) currentPage = 1;

  // Fetch data
  const submissionsRes = await getStudentSubmissions(unitId, {
    page: currentPage,
    limit: 10,
    q: q?.toString(),
    status: status?.toString(),
  });

  const submissions: Submission[] = submissionsRes.success ? (submissionsRes.data ?? []) : [];
  const meta = submissionsRes?.meta || { total: 0, page: 1, limit: 10, timestamp: '' };

  return (
    <Container maxWidth='lg' sx={{ flex: 1, pb: { xs: 3, md: 5 } }}>
      <Paper elevation={0} sx={{ mt: 4, border: 1, borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
        {/* Toolbar */}
        <Box
          sx={{
            p: 2,
            borderBottom: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            alignItems: { md: 'center' },
            justifyContent: 'space-between',
          }}
        >
          <Suspense fallback={<TextField size='small' placeholder='Tìm kiếm...' disabled />}>
            <SearchBox defaultValue={q?.toString() || ''} />
          </Suspense>
          <Suspense
            fallback={
              <Stack direction='row' spacing={1}>
                <Button disabled>Lọc</Button>
              </Stack>
            }
          >
            <FilterBar currentStatus={status?.toString() || 'all'} />
          </Suspense>
        </Box>

        {/* Table */}
        <Suspense fallback={<Typography p={4}>Đang tải danh sách...</Typography>}>
          <SubmissionsTable submissions={submissions} courseId={courseId} unitId={unitId} />
        </Suspense>

        {/* Pagination */}
        <Suspense fallback={<Box p={2}>...</Box>}>
          <PaginationBar meta={meta} currentPage={currentPage} />
        </Suspense>
      </Paper>

      {/* Guidance Note */}
      <Paper
        sx={{
          mt: 3,
          p: 2,
          border: 1,
          borderRadius: 1,
          borderColor: 'primary.light',
          bgcolor: 'hero.light',
          display: 'flex',
          gap: 2,
          alignItems: 'flex-start',
        }}
      >
        <LightbulbIcon sx={{ color: 'primary.main', fontSize: 25, mt: 0.5 }} />
        <Box>
          <Typography variant='subtitle2' fontWeight='semibold'>
            Mẹo cho Giảng viên
          </Typography>
          <Typography variant='caption' color='text.secondary'>
            Sử dụng bộ lọc &quot;Đang chờ chấm&quot; để nhanh chóng hoàn thành việc đánh giá các bài nộp mới nhất. Hệ
            thống sẽ tự động gửi thông báo cho học viên sau khi bạn nhấn &quot;Lưu điểm&quot;.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
