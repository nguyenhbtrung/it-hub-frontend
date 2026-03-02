import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import LinkIcon from '@mui/icons-material/Link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';

interface SubmissionDetailDialogProps {
  open: boolean;
  onClose: () => void;
  submission: any;
  exercise: any;
}

export default function SubmissionDetailDialog({ open, onClose, submission, exercise }: SubmissionDetailDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='sm' fullWidth>
      <DialogTitle variant='h5' fontWeight={700}>
        Chi tiết bài nộp
      </DialogTitle>

      <DialogContent dividers>
        {submission ? (
          <>
            {/* Link demo */}
            <Typography variant='h6' fontWeight={600} mb={1}>
              Link Demo & Source
            </Typography>
            {/* Demo URLs */}
            {submission.demoUrl && submission.demoUrl.length > 0 && (
              <Grid container spacing={2} mb={4}>
                {submission.demoUrl.map((url: string, index: number) => (
                  <Grid size={{ xs: 12 }} key={index}>
                    <Link
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
                          {submission.demoUrl.length > 1 ? `Link ${index + 1}` : 'Link'}
                        </Typography>
                        <Typography variant='body2' fontWeight='bold' className='link-text' noWrap>
                          {url.replace(/^https?:\/\//, '')}
                        </Typography>
                      </Box>
                      <OpenInNewIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Ghi chú */}
            <Typography variant='h6' fontWeight={600} mt={2} mb={1}>
              Ghi chú cho giảng viên
            </Typography>
            <Typography whiteSpace='pre-line'>{submission?.note || 'Không có ghi chú'}</Typography>

            {/* Tệp tải lên */}
            <Typography variant='h6' fontWeight={600} mt={2} mb={1}>
              Tệp đã tải lên
            </Typography>
            {submission?.attachments?.map((att: any) => (
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
              </Box>
            ))}

            <Divider sx={{ mt: 4 }} />

            {/* Điểm */}
            <Typography variant='h6' fontWeight={600} mt={2} mb={1}>
              Kết quả
            </Typography>

            {submission?.score === null ? (
              <Typography color='warning.main'>Chưa có điểm</Typography>
            ) : (
              <>
                <Typography
                  fontWeight={600}
                  color={submission.score >= exercise?.passingScore ? 'success.main' : 'error.main'}
                >
                  {submission.score}/10 - {submission.score >= exercise?.passingScore ? 'Đạt' : 'Không đạt'}
                </Typography>

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
                  <Box>
                    <Typography variant='subtitle2' fontWeight='semibold'>
                      Nhận xét của giảng viên
                    </Typography>
                    <Typography variant='caption' color='text.secondary'>
                      &quot;{submission?.comment || 'Không có nhận xét'}&quot;
                    </Typography>
                  </Box>
                </Paper>
              </>
            )}
          </>
        ) : (
          <Typography mb={1}>Không có dữ liệu bài nộp</Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Đóng</Button>
      </DialogActions>
    </Dialog>
  );
}
