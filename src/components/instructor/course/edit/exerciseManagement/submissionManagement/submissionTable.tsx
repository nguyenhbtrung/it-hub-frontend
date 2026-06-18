'use client';

import Chip from '@mui/material/Chip';
import { Submission } from './types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { format } from 'date-fns';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import { useRouter } from 'next/navigation';

interface SubmissionsTableProps {
  submissions: Submission[];
  courseId: string;
  unitId: string;
}

export function SubmissionsTable({ submissions, courseId, unitId }: SubmissionsTableProps) {
  const router = useRouter();
  const getStatusChip = (sub: Submission) => {
    if (sub.attemptCount === 0) {
      return <Chip label='Chưa nộp' size='small' sx={{ bgcolor: 'action.hover', color: 'text.secondary' }} />;
    }
    if (sub.score != null) {
      return (
        <Box>
          <Chip label='Đã chấm' size='small' color='success' sx={{ mb: 0.5 }} />
          <Typography variant='caption' fontWeight='bold' display='block' color='text.secondary'>
            Điểm: {sub.score}/10
          </Typography>
        </Box>
      );
    }
    return (
      <Chip
        label='Đang chờ chấm'
        size='small'
        color='warning'
        icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'warning.main', ml: 0.5 }} />}
      />
    );
  };

  const formatSubmissionTime = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return `Hôm nay, ${format(date, 'HH:mm')}`;
    if (diffDays === 1) return `Hôm qua, ${format(date, 'HH:mm')}`;
    return format(date, 'dd/MM/yyyy, HH:mm');
  };

  const handleRowClick = (attemptId: string | undefined) => {
    if (!attemptId) return;
    router.push(`/instructor/courses/${courseId}/edit/exercises/${unitId}/submissions/${attemptId}`);
  };

  return (
    <TableContainer component={Paper} elevation={0} sx={{ borderColor: 'divider', borderRadius: 0 }}>
      <Table>
        <TableHead sx={{ bgcolor: 'customBackground.5' }}>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'text.secondary' }}>Học viên</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'text.secondary' }}>
              Thời gian nộp
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'text.secondary' }}>Lần nộp</TableCell>
            <TableCell sx={{ fontWeight: 'bold', fontSize: '0.875rem', color: 'text.secondary' }}>Trạng thái</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submissions.map((sub, index) => (
            <TableRow
              key={sub.email + index}
              hover
              onClick={() => handleRowClick(sub.attemptId)}
              sx={{ cursor: 'pointer', '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Avatar src={sub.avatar || undefined} sx={{ width: 40, height: 40 }}>
                    {sub.fullname?.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant='body2' fontWeight='medium'>
                      {sub.fullname}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      {sub.email}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                {sub.createdAt ? (
                  <>
                    <Typography variant='body2'>{formatSubmissionTime(sub.createdAt)}</Typography>
                  </>
                ) : (
                  <Typography variant='body2' color='text.disabled'>
                    ---
                  </Typography>
                )}
              </TableCell>
              <TableCell>
                <Typography variant='body2'>{sub.attemptCount > 0 ? sub.attemptCount : '---'}</Typography>
              </TableCell>
              <TableCell>{getStatusChip(sub)}</TableCell>
            </TableRow>
          ))}
          {submissions.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align='center' sx={{ py: 4 }}>
                <Typography color='text.secondary'>Không có dữ liệu</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
