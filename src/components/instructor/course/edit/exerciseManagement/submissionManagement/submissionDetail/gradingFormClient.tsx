'use client';

import { useState } from 'react';
import { Paper, Typography, TextField, Button, Stack, InputAdornment, Box } from '@mui/material';
import { Save as SaveIcon } from '@mui/icons-material';
import { useNotification } from '@/contexts/notificationContext';
import { getExerciseErrorMessage, updateSubmissionAction } from '@/features/exercise';
import { getErrorMessage } from '@/lib/errors';

interface GradingFormProps {
  submission: any;
  passingScore: number;
}

export default function GradingFormClient({ submission, passingScore }: GradingFormProps) {
  const [score, setScore] = useState<number | ''>(submission.score || '');
  const [comment, setComment] = useState(submission.comment || '');
  const { notify } = useNotification();

  const handleSubmit = async () => {
    if (score === '' || isNaN(Number(score))) {
      notify('error', 'Vui lòng nhập điểm', { vertical: 'top', horizontal: 'right' });
      return;
    }

    const numericScore = Number(score);

    if (numericScore < 0 || numericScore > 10) {
      notify('error', 'Vui lòng nhập số điểm hợp lệ (0 - 10)', { vertical: 'top', horizontal: 'right' });
      return;
    }

    const res = await updateSubmissionAction(submission.id || '', { score: numericScore, comment });
    if (!res.success) {
      notify('error', getErrorMessage(res, getExerciseErrorMessage), { vertical: 'top', horizontal: 'right' });
      return;
    }
    notify('success', 'lưu điểm thành công', { vertical: 'top', horizontal: 'right' });
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 1 }}>
      <Typography
        variant='subtitle2'
        color='text.secondary'
        fontWeight='bold'
        textTransform='uppercase'
        letterSpacing={0.5}
        mb={3}
      >
        Bảng chấm điểm
      </Typography>
      <Stack spacing={3}>
        <Box>
          <Typography variant='body2' fontWeight='bold' mb={1}>
            Điểm số (Thang 10)
          </Typography>
          <Typography variant='caption' color='text.secondary' display='block' mb={1} fontStyle='italic'>
            * Điểm đạt: &gt;= {passingScore}
          </Typography>
          <TextField
            fullWidth
            type='number'
            value={score}
            onChange={(e) => setScore(e.target.value === '' ? '' : Number(e.target.value))}
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'grey.50',
              },
            }}
            InputProps={{
              endAdornment: <InputAdornment position='end'>/ 10</InputAdornment>,
            }}
          />
        </Box>
        <Box>
          <Typography variant='body2' fontWeight='bold' mb={1}>
            Nhận xét & Phản hồi
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder='Viết lời khuyên hoặc nhận xét cho học viên tại đây...'
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'grey.50',
              },
            }}
          />
        </Box>
        <Button
          variant='contained'
          color='primary'
          size='large'
          startIcon={<SaveIcon />}
          onClick={handleSubmit}
          sx={{
            py: 1.5,
            boxShadow: (theme) => `0 8px 16px -4px ${theme.palette.primary.main}20`,
          }}
        >
          Lưu điểm
        </Button>
      </Stack>
    </Paper>
  );
}
