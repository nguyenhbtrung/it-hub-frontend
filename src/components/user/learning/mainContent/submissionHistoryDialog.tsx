'use client';

import { useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import { format } from 'date-fns';
import { History as HistoryIcon, Close as CloseIcon } from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { vi } from 'date-fns/locale';
import { getMyExerciseSubmission } from '@/services/exercise.service';

interface Submission {
  id: string;
  createdAt: string;
  score: number | null;
}

export default function SubmissionHistoryDialog({
  open,
  onClose,
  exerciseId,
  currentAttemptId,
  passingScore,
}: {
  open: boolean;
  onClose: () => void;
  exerciseId: string;
  currentAttemptId: string;
  passingScore: number;
}) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !exerciseId) return;

    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        const res = await getMyExerciseSubmission(exerciseId, { page: 1, limit: 100 });
        setSubmissions(res?.data || []);
      } catch (error) {
        console.error('Failed to fetch submissions:', error);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [exerciseId, open]);

  const sortedSubmissions = useMemo(() => {
    return [...submissions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [submissions]);

  const formatDate = (date: string) => {
    return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi });
  };

  const getStatusChip = (submission: Submission) => {
    if (submission.score !== null && submission.score !== undefined) {
      return <Chip label='Đã chấm' size='small' color='success' variant='outlined' />;
    }
    return <Chip label='Đang chấm' size='small' color='warning' variant='outlined' />;
  };

  const getResultChip = (submission: Submission) => {
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

      <DialogContent dividers sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }}>
            Danh sách các phiên bản bài nộp của học viên cho bài tập này.
          </Typography>

          {loading ? (
            <Box display='flex' justifyContent='center' py={4}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} variant='outlined'>
              <Table size='small'>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Lần nộp</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Ngày nộp</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Trạng thái</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Điểm</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Kết quả</TableCell>
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
                              Lần {index + 1}
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
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </DialogContent>

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
