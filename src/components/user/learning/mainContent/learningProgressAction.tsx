'use client';

import { useNotification } from '@/contexts/notificationContext';
import { createOrUpdateStepLearningProgressAction, getUserErrorMessage } from '@/features/user';
import { ApiResponse } from '@/lib/api';
import { getErrorMessage } from '@/lib/errors';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';

interface Props {
  stepId: string;
  learningProgressPromise: Promise<ApiResponse<any>>;
}

export default function LearningProgressAction({ stepId, learningProgressPromise }: Props) {
  const res = use(learningProgressPromise);
  const data = res.success ? res.data : null;

  const [status, setStatus] = useState(data?.status || 'not_started');
  const [loading, setLoading] = useState<boolean>(false);
  const { notify } = useNotification();
  const router = useRouter();

  const handleUpdateStatus = async (status: 'completed' | 'not_started') => {
    try {
      setLoading(true);

      const res = await createOrUpdateStepLearningProgressAction(stepId, { status });
      if (!res.success) throw new Error(getErrorMessage(res, getUserErrorMessage));

      setStatus(status);
      router.refresh();
    } catch (error: any) {
      notify('error', error?.message, { vertical: 'bottom', horizontal: 'center' });
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {status === 'not_started' && (
        <Button
          variant='contained'
          size='large'
          disabled={loading}
          onClick={() => handleUpdateStatus('completed')}
          sx={{
            backgroundColor: 'secondary.main',
            '&:hover': { backgroundColor: 'secondary.dark' },
          }}
          startIcon={loading ? <CircularProgress size={12} color='inherit' /> : null}
        >
          Đánh dấu hoàn thành bài giảng
        </Button>
      )}

      {status === 'completed' && (
        <Button
          variant='outlined'
          size='large'
          disabled={loading}
          onClick={() => handleUpdateStatus('not_started')}
          startIcon={loading ? <CircularProgress size={12} color='inherit' /> : null}
        >
          Bỏ đánh dấu hoàn thành bài giảng
        </Button>
      )}
    </>
  );
}
