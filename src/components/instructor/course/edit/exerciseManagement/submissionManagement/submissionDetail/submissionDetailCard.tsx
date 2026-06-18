import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import FileIcon from './fileIcon';
import {
  Link as LinkIcon,
  NoteOutlined as NoteIcon,
  SendOutlined as SendIcon,
  Download as DownloadIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { getSubmissionById } from '@/features/exercise';
import { notFound } from 'next/navigation';

interface SubmissionDetailCardProps {
  params: Promise<{ id: string; unitId: string; attemptId: string }>;
}

export default async function SubmissionDetailCard({ params }: SubmissionDetailCardProps) {
  const { attemptId } = await params;
  const submissionRes = await getSubmissionById(attemptId);

  if (!submissionRes.success || !submissionRes.data) {
    notFound();
  }
  const submission = submissionRes.data;

  return (
    <Paper sx={{ borderRadius: 1, overflow: 'hidden' }}>
      <Box sx={{ p: { xs: 3, md: 4 } }}>
        <Stack direction='row' alignItems='center' spacing={1.5} mb={3} pb={2} borderBottom={1} borderColor='divider'>
          <SendIcon color='primary' />
          <Typography variant='h6' fontWeight='bold'>
            Chi tiết bài nộp của học viên
          </Typography>
        </Stack>

        {/* Demo URLs */}
        {submission.demoUrl && submission.demoUrl.length > 0 && (
          <Grid container spacing={2} mb={4}>
            {submission.demoUrl.map((url: string, index: number) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <MuiLink
                  href={url}
                  target='_blank'
                  rel='noopener'
                  underline='none'
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    p: 2,
                    border: 1,
                    borderColor: 'divider',
                    borderRadius: 1,
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      '& .link-text': { color: 'primary.main' },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 0.7,
                      bgcolor: 'grey.800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                    }}
                  >
                    <LinkIcon fontSize='small' />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant='caption' color='text.secondary' fontWeight='medium'>
                      {submission.demoUrl.length > 1 ? `Link Demo ${index + 1}` : 'Link Demo'}
                    </Typography>
                    <Typography variant='body2' fontWeight='bold' className='link-text' noWrap>
                      {url.replace(/^https?:\/\//, '')}
                    </Typography>
                  </Box>
                  <OpenInNewIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                </MuiLink>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Note */}
        {submission.note && (
          <Box mb={4}>
            <Stack direction='row' alignItems='center' spacing={1} mb={2}>
              <NoteIcon color='primary' />
              <Typography variant='h6' fontWeight='bold'>
                Ghi chú
              </Typography>
            </Stack>
            <Typography variant='body2' color='text.secondary' sx={{ whiteSpace: 'pre-line', lineHeight: 1.8 }}>
              {submission.note}
            </Typography>
          </Box>
        )}

        {/* Attachments */}
        {submission.attachments && submission.attachments.length > 0 && (
          <Box>
            <Divider sx={{ mb: 3 }} />
            <Typography
              variant='subtitle2'
              color='text.secondary'
              fontWeight='bold'
              textTransform='uppercase'
              letterSpacing={0.5}
              mb={2}
            >
              Tệp đính kèm
            </Typography>
            <Stack spacing={2}>
              {submission.attachments.map((attachment: any) => (
                <Paper
                  key={attachment.id}
                  variant='outlined'
                  sx={{
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    bgcolor: 'grey.50',
                  }}
                >
                  <FileIcon fileType={attachment.file.type} mimeType={attachment.file.mimeType} size='large' />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant='body2' fontWeight='bold'>
                      {attachment.file.name}
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      Dung lượng: {(attachment.file.size / 1024 / 1024).toFixed(2)} MB
                    </Typography>
                  </Box>
                  <MuiLink
                    href={attachment.file.url}
                    target='_blank'
                    rel='noopener'
                    underline='none'
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      px: 2,
                      py: 1,
                      border: 1,
                      borderColor: 'divider',
                      borderRadius: 1.5,
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: 'primary.main',
                        color: 'primary.main',
                      },
                    }}
                  >
                    <DownloadIcon fontSize='small' />
                    <Typography variant='button' fontWeight='bold' fontSize='small'>
                      Tải về
                    </Typography>
                  </MuiLink>
                </Paper>
              ))}
            </Stack>
          </Box>
        )}
      </Box>
    </Paper>
  );
}
