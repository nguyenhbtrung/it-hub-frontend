'use client';

import { useState } from 'react';
import {
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Box,
} from '@mui/material';
import { History as HistoryIcon, Close as CloseIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useRouter } from 'next/navigation';

interface QuickToolsClientProps {
  initialSubmissions: any[];
  currentAttemptId: string;
  courseId: string;
  unitId: string;
  passingScore: number;
}

function SubmissionHistoryDialog({
  open,
  onClose,
  onViewClick,
  submissions,
  currentAttemptId,
  passingScore,
}: {
  open: boolean;
  onClose: () => void;
  onViewClick: (id: string) => void;
  submissions: any[];
  currentAttemptId: string;
  passingScore: number;
}) {
  // Sắp xếp submissions mới nhất lên đầu
  const sortedSubmissions = [...submissions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi });
  };

  const handleViewSubmission = (attemptId: string) => {
    // Điều hướng đến trang chi tiết của lần nộp đó
    onViewClick(attemptId);
    onClose();
  };

  const getStatusChip = (submission: any) => {
    if (submission.score !== null && submission.score !== undefined) {
      return <Chip label='Đã chấm' size='small' color='success' variant='outlined' />;
    }
    return <Chip label='Đang chấm' size='small' color='warning' variant='outlined' />;
  };

  const getResultChip = (submission: any) => {
    if (submission.score === null || submission.score === undefined) {
      return <Chip label='Chờ' size='small' />;
    }
    const passed = submission.score >= passingScore;
    return (
      <Chip label={passed ? 'Đạt' : 'Không đạt'} size='small' color={passed ? 'success' : 'error'} variant='outlined' />
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, overflow: 'hidden' },
      }}
    >
      {/* Header */}
      <DialogTitle sx={{ p: 0 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 2,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Stack direction='row' alignItems='center' spacing={1.5}>
            <Box
              sx={{
                p: 1,
                borderRadius: 1,
                bgcolor: 'primary.lighter',
                color: 'primary.main',
                display: 'flex',
              }}
            >
              <HistoryIcon />
            </Box>
            <Typography variant='h6' fontWeight='bold'>
              Lịch sử nộp bài
            </Typography>
          </Stack>
          <IconButton onClick={onClose} size='small'>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      {/* Content */}
      <DialogContent dividers sx={{ p: 0, bgcolor: 'background.paper' }}>
        <Box sx={{ p: 3 }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            Danh sách các phiên bản bài nộp của học viên cho bài tập này.
          </Typography>
          <TableContainer component={Paper} variant='outlined'>
            <Table size='small'>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Lần nộp</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Ngày nộp</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Điểm</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Kết quả</TableCell>
                  <TableCell align='center' sx={{ fontWeight: 600 }}>
                    Hành động
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedSubmissions.map((sub, index) => {
                  const isCurrent = sub.id === currentAttemptId;
                  return (
                    <TableRow
                      key={sub.id}
                      sx={{
                        ...(isCurrent && {
                          bgcolor: 'primary.lighter',
                          borderLeft: '4px solid',
                          borderLeftColor: 'primary.main',
                        }),
                        '&:hover': { bgcolor: 'action.hover' },
                      }}
                    >
                      <TableCell>
                        <Stack spacing={0.5}>
                          <Typography variant='body2' fontWeight='medium'>
                            Lần {sortedSubmissions.length - index}
                          </Typography>
                          {isCurrent && (
                            <Typography variant='caption' color='primary' fontWeight='bold'>
                              Hiện tại
                            </Typography>
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2' color='text.secondary'>
                          {formatDate(sub.createdAt)}
                        </Typography>
                      </TableCell>
                      <TableCell>{getStatusChip(sub)}</TableCell>
                      <TableCell>
                        {sub.score !== null ? (
                          <Typography variant='body2' fontWeight='bold' color='primary'>
                            {sub.score}/10
                          </Typography>
                        ) : (
                          <Typography variant='body2' color='text.disabled'>
                            -
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>{getResultChip(sub)}</TableCell>
                      <TableCell align='center'>
                        <IconButton size='small' color='primary' onClick={() => handleViewSubmission(sub.id)}>
                          <VisibilityIcon fontSize='small' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </DialogContent>

      {/* Footer */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: 1,
          borderColor: 'divider',
          bgcolor: 'grey.50',
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={onClose} variant='contained' color='primary'>
          Đóng
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function QuickToolsClient({
  initialSubmissions,
  currentAttemptId,
  courseId,
  unitId,
  passingScore,
}: QuickToolsClientProps) {
  const [historyOpen, setHistoryOpen] = useState(false);
  const router = useRouter();

  const handleViewSubmissionClick = (attemptId: string) => {
    router.push(`/instructor/courses/${courseId}/edit/exercises/${unitId}/submissions/${attemptId}`);
  };

  return (
    <>
      <Stack direction='row' spacing={1}>
        <Button
          variant='outlined'
          color='inherit'
          fullWidth
          startIcon={<HistoryIcon />}
          onClick={() => setHistoryOpen(true)}
          sx={{
            flexDirection: 'column',
            py: 1.5,
            gap: 0.5,
            '& .MuiButton-startIcon': { margin: 0 },
          }}
        >
          Lịch sử nộp
        </Button>
        {/* Có thể thêm nút Hướng dẫn tương tự */}
      </Stack>

      <SubmissionHistoryDialog
        open={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onViewClick={handleViewSubmissionClick}
        submissions={initialSubmissions}
        currentAttemptId={currentAttemptId}
        passingScore={passingScore}
      />
    </>
  );
}
