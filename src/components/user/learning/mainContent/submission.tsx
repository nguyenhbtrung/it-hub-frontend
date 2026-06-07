'use client';

import { formatDuration } from '@/lib/utils/formatDatetime';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState, useRef } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { getFileErrorMessage, uploadFile } from '@/features/file';
import { getSession } from 'next-auth/react';
import { useNotification } from '@/contexts/notificationContext';
import { addSubmission, deleteSubmission, getMyExerciseSubmission } from '@/services/exercise.service';
import SubmissionDetailDialog from './submissionDetailDialog';
import SubmissionHistoryDialog from './submissionHistoryDialog';
import { getErrorMessage } from '@/lib/errors';

// Giả sử có hàm deleteFile để xử lý xoá file
async function deleteFile(id: string) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
}

const schema = z.object({
  // Thay đổi ở đây
  demoUrl: z
    .array(
      z.object({
        value: z.string().url('URL không hợp lệ'),
      })
    )
    .min(1, 'Cần ít nhất một liên kết'),
  note: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface SubmissionProp {
  submissions: any;
  exercise: any;
  initialAttemptCount: number;
}

export default function Submission({ submissions, exercise, initialAttemptCount }: SubmissionProp) {
  const [submission, setSubmission] = useState(submissions?.[0]);
  const deadline = new Date(exercise.deadline).getTime();
  const [isGraded, setIsGraded] = useState<boolean>(submission?.score);
  const [attemptCount, setAttemptCount] = useState<number>(initialAttemptCount);
  const [remaining, setRemaining] = useState(() => deadline - Date.now());
  const [submissionId, setSubmissionId] = useState<string | null>(submission?.id);
  const [attachments, setAttachments] = useState<any[]>(isGraded ? [] : submission?.attachments || []);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [undoing, setUndoing] = useState(false);
  const [submitted, setSubmitted] = useState(!!submission);
  const [openDetail, setOpenDetail] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { notify } = useNotification();

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      // Chuyển mảng string từ API (nếu có) thành mảng object
      demoUrl: isGraded
        ? [{ value: '' }]
        : submission?.demoUrl?.map((url: string) => ({ value: url })) || [{ value: '' }],
      note: isGraded ? '' : submission?.note || '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'demoUrl',
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(new Date(exercise.deadline).getTime() - Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, [exercise.deadline]);

  const resetInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      try {
        const file = event.target.files[0];
        setLoading(true);
        const session = await getSession();
        const accessToken = session?.accessToken || '';
        const res = await uploadFile(file, false, accessToken);
        if (!res?.success) throw new Error(getErrorMessage(res, getFileErrorMessage));
        const newAttachment = { id: crypto.randomUUID(), file: res?.data };
        setAttachments((prev) => [...prev, newAttachment]);
      } catch (error: any) {
        notify('error', error.message || 'Tải lên thất bại', { vertical: 'bottom', horizontal: 'right' });
      } finally {
        setLoading(false);
        resetInput();
      }
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      try {
        const file = event.dataTransfer.files[0];
        setLoading(true);
        const session = await getSession();
        const accessToken = session?.accessToken || '';
        const res = await uploadFile(file, false, accessToken);
        if (!res?.success) throw new Error(getErrorMessage(res, getFileErrorMessage));
        const newAttachment = { id: crypto.randomUUID(), file: res?.data };
        setAttachments((prev) => [...prev, newAttachment]);
      } catch (error: any) {
        notify('error', error.message || 'Tải lên thất bại', { vertical: 'bottom', horizontal: 'right' });
      } finally {
        setLoading(false);
        resetInput();
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await deleteFile(id);
    setAttachments((prev) => prev.filter((att) => att.id !== id));
    setLoading(false);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      setSubmitting(true);

      const flatDemoUrls = data.demoUrl.map((item) => item.value);

      const payload = {
        demoUrl: flatDemoUrls,
        note: data.note,
        fileIds: attachments.map((att) => att.file.id),
      };

      const res = await addSubmission(exercise.id, payload);
      if (!res?.success) {
        throw new Error('Nộp bài thất bại, vui lòng thử lại');
      }

      reset({
        demoUrl: flatDemoUrls.map((url) => ({ value: url })),
        note: data.note || '',
      });

      setAttemptCount((prev) => prev + 1);
      setIsGraded(false);
      setSubmissionId(res?.data?.id);
      setSubmitted(true);
    } catch (error: any) {
      console.error('Lỗi khi nộp bài:', error);
      notify('error', error.message || 'Nộp bài thất bại, vui lòng thử lại', {
        vertical: 'bottom',
        horizontal: 'right',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUndo = async (e: any) => {
    e.preventDefault();
    setUndoing(true);
    try {
      const res = await deleteSubmission(submissionId || '');
      if (!res?.success) throw new Error('Hoàn tác thất bại, vui lòng thử lại');
      const lastAttemptTime = attemptCount - 1;

      const submissionsRes = await getMyExerciseSubmission(exercise?.id || '');
      const submissions = submissionsRes?.data || [];
      const meta = submissionsRes?.meta;
      const currentSubmission = submissions?.[0];
      setSubmission(currentSubmission);
      setSubmitted(!!currentSubmission);
      setAttemptCount(meta?.total || 0);
      setIsGraded(currentSubmission?.score);
    } catch (error: any) {
      console.error('Lỗi khi hoàn tác nộp bài:', error);
      notify('error', error.message || 'Hoàn tác thất bại, vui lòng thử lại', {
        vertical: 'bottom',
        horizontal: 'right',
      });
    } finally {
      setUndoing(false);
    }
  };

  return (
    <Box sx={{ width: 360, flexShrink: 0 }}>
      {/* Trạng thái nộp bài */}
      <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 2,
            alignItems: 'center',
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant='h6' fontWeight={600}>
            Trạng thái nộp bài
          </Typography>
        </Box>

        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color='text.secondary'>Tình trạng</Typography>
            <Chip
              label={submitted ? (isGraded ? 'Đã chấm điểm' : 'Đã nộp bài') : 'Chưa nộp bài'}
              color={submitted ? 'success' : 'error'}
              size='small'
            />
          </Box>

          {submitted && (
            <>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                <Typography color='text.secondary'>Lần</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography color='text.secondary'>{attemptCount}</Typography>
                  <Button size='small' variant='text' onClick={() => setOpenHistory(true)}>
                    Xem Lịch sử
                  </Button>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1, alignItems: 'center' }}>
                <Typography color='text.secondary'>Điểm số</Typography>

                {!isGraded ? (
                  <Typography fontWeight={500} color='warning.main'>
                    Chưa có điểm
                  </Typography>
                ) : (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Hiển thị điểm */}
                    <Typography
                      fontWeight={600}
                      sx={{ color: submission.score >= exercise?.passingScore ? 'success.main' : 'error.main' }}
                    >
                      {submission.score}/10
                    </Typography>

                    <Button size='small' variant='text' onClick={() => setOpenDetail(true)}>
                      Xem chi tiết
                    </Button>
                  </Box>
                )}
              </Box>
            </>
          )}

          {exercise?.deadline && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography color='text.secondary'>Hạn chót</Typography>
              <Typography fontWeight={500}>{new Date(exercise.deadline).toLocaleString('vi-VN')}</Typography>
            </Box>
          )}

          {exercise?.deadline && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography color='text.secondary'>Còn lại</Typography>
              <Typography color='primary.main' fontWeight={500}>
                {formatDuration(remaining)}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Nộp bài */}
      <Box sx={{ border: 1, borderColor: 'divider', borderRadius: 1, mt: 3 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            p: 2,
            alignItems: 'center',
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            borderBottom: 1,
            borderColor: 'divider',
          }}
        >
          <Typography variant='h6' fontWeight={600}>
            Nộp bài
          </Typography>
        </Box>

        <Box sx={{ p: 2 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography fontSize={14} fontWeight={500} mb={1}>
              Link Demo & Source Code <span style={{ color: '#d32f2f' }}>*</span>
            </Typography>

            {fields.map((field, index) => (
              <Box key={field.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                {!submitted || isGraded ? (
                  <Controller
                    name={`demoUrl.${index}.value`}
                    control={control}
                    render={({ field: controllerField }) => (
                      <TextField
                        {...controllerField}
                        fullWidth
                        placeholder='Nhập liên kết demo...'
                        size='small'
                        error={!!errors.demoUrl?.[index]?.value}
                        helperText={errors.demoUrl?.[index]?.value?.message}
                      />
                    )}
                  />
                ) : (
                  <Typography
                    component='a'
                    href={field.value}
                    target='_blank'
                    rel='noopener noreferrer'
                    sx={{
                      wordBreak: 'break-word',
                      color: 'primary.main',
                      textDecoration: 'underline',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <InsertLinkIcon fontSize='small' />
                    {field.value}
                  </Typography>
                )}

                {(!submitted || isGraded) && fields.length > 1 && (
                  <IconButton size='small' onClick={() => remove(index)} sx={{ mt: 0.5 }}>
                    <CloseIcon fontSize='small' />
                  </IconButton>
                )}
              </Box>
            ))}

            {(!submitted || isGraded) && (
              <Button
                fullWidth
                variant='outlined'
                startIcon={<InsertLinkIcon />}
                sx={{ mb: 2 }}
                onClick={() => append({ value: '' })}
              >
                Thêm liên kết khác
              </Button>
            )}

            <Divider sx={{ my: 2 }}>hoặc</Divider>

            {/* Upload file */}
            <Box sx={{ mb: 2 }}>
              <Typography fontSize={14} fontWeight={500} mb={1}>
                Tải lên tệp
              </Typography>

              {(!submitted || isGraded) && (
                <Box
                  onClick={() => fileInputRef.current?.click()}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  sx={{
                    border: '2px dashed',
                    borderColor: 'divider',
                    borderRadius: 1,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={40} sx={{ mb: 1 }} />
                  ) : (
                    <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                  )}
                  <Typography fontSize={12} fontWeight={500} color='text.primary'>
                    Kéo thả hoặc chọn file (.zip, .rar, .pdf, ...)
                  </Typography>
                  <input type='file' hidden ref={fileInputRef} onChange={handleFileSelect} />
                </Box>
              )}
            </Box>

            {/* Attachments hiển thị từ submission và file mới upload */}
            {attachments.map((att: any) => (
              <Box
                key={att.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1,
                  p: 1,
                  border: '1px dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                }}
              >
                <Box
                  component='a'
                  href={att.file.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    textDecoration: 'none',
                    //   color: 'primary.main',
                    flexGrow: 1,
                  }}
                >
                  <UploadFileIcon fontSize='small' />
                  <Typography fontSize={14}>{att.file.name}</Typography>
                </Box>

                {(!submitted || isGraded) && (
                  <IconButton size='small' onClick={() => handleDelete(att.id)}>
                    <CloseIcon fontSize='small' />
                  </IconButton>
                )}
              </Box>
            ))}

            {/* Ghi chú */}
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography fontSize={14} fontWeight={500} mb={1}>
                Ghi chú cho giảng viên
              </Typography>

              {!submitted || isGraded ? (
                <Controller
                  name='note'
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      multiline
                      rows={3}
                      fullWidth
                      placeholder='Nhập ghi chú về project...'
                      variant='outlined'
                      size='small'
                    />
                  )}
                />
              ) : (
                <Paper variant='outlined' sx={{ p: 2, borderRadius: 1, bgcolor: 'grey.50' }}>
                  <Typography fontSize={14} color='text.primary' sx={{ whiteSpace: 'pre-line' }}>
                    {watch('note') || 'Không có ghi chú nào.'}
                  </Typography>
                </Paper>
              )}
            </Box>

            {!submitted ? (
              <Button
                type='submit'
                fullWidth
                variant='contained'
                size='large'
                startIcon={submitting ? <CircularProgress size={20} color='inherit' /> : <SendIcon />}
                sx={{ mt: 2 }}
                disabled={submitting}
              >
                {submitting ? 'Đang gửi...' : 'Nộp bài'}
              </Button>
            ) : isGraded ? (
              <Button
                type='submit'
                fullWidth
                variant='contained'
                size='large'
                startIcon={submitting ? <CircularProgress size={20} color='inherit' /> : <SendIcon />}
                sx={{ mt: 2 }}
                disabled={submitting}
              >
                {submitting ? 'Đang gửi...' : 'Nộp lại bài'}
              </Button>
            ) : (
              <Button
                fullWidth
                variant='outlined'
                size='large'
                color='secondary'
                sx={{ mt: 2 }}
                type='button'
                onClick={handleUndo}
                disabled={undoing}
              >
                Hoàn tác
              </Button>
            )}
          </form>
        </Box>
      </Box>
      <SubmissionHistoryDialog
        open={openHistory}
        onClose={() => setOpenHistory(false)}
        exerciseId={exercise?.id || ''}
        currentAttemptId={submissionId || ''}
        passingScore={exercise?.passingScore || 0}
      />
      <SubmissionDetailDialog
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        submission={submission}
        exercise={exercise}
      />
    </Box>
  );
}
