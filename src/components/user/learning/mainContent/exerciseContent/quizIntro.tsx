'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Quiz,
  AccessTime,
  CheckCircle,
  History,
  InfoOutline,
  List as ListIcon,
  ArrowForward,
  ArrowBack,
} from '@mui/icons-material';

import NextLink from '@/components/common/Link';
import { use } from 'react';
import { formatISOToDateTime, formatSecondsToMMSS } from '@/lib/utils/formatDatetime';

interface QuizIntroProps {
  exercise: any;
  onStartQuiz: () => void;
  nav: any;
  slug: string;
  submissionsPromise: Promise<any>;
}

export default function QuizIntro({ exercise, onStartQuiz, nav, slug, submissionsPromise }: QuizIntroProps) {
  const totalQuestions = exercise?.quizzes?.length || 0;
  const durationInMinutes = exercise?.duration ? Math.floor(exercise.duration / 60) : 30;
  const passingScore = exercise?.passingScore || 8;
  const maxScore = 10;

  const res = use(submissionsPromise);
  console.log('data: ', res?.data);
  const submissions = res?.data || [];

  return (
    <>
      <Box
        sx={{
          bgcolor: 'background.paper',
          overflow: 'hidden',
          px: 2,
          mb: 4,
        }}
      >
        <Box sx={{ p: { xs: 3, md: 4 } }}>
          {/* Phần header với icon và tiêu đề */}
          <Grid container spacing={3} alignItems='flex-start' sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, md: 'auto' }}>
              <Avatar
                variant='rounded'
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: 2,
                  bgcolor: 'hero.main',
                  color: 'primary.main',
                  fontSize: '2.5rem',
                  display: { xs: 'none', md: 'flex' },
                }}
              >
                <Quiz fontSize='large' />
              </Avatar>
            </Grid>
            <Grid size={{ xs: 12, md: 10 }}>
              <Typography
                variant='h1'
                sx={{
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 700,
                  mb: 1,
                }}
              >
                {exercise?.unit?.title}
              </Typography>
              <Typography
                variant='h6'
                sx={{
                  color: 'text.secondary',
                  fontSize: '1.125rem',
                  fontWeight: 400,
                  mb: 2,
                }}
              >
                {exercise?.description}
              </Typography>
            </Grid>
          </Grid>

          {/* Thông tin chi tiết */}
          <Grid container spacing={2} sx={{ mb: 5 }}>
            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card
                variant='outlined'
                sx={{
                  height: '100%',
                  bgcolor: 'grey.50',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 1 }}>
                    <ListIcon sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography
                      variant='caption'
                      sx={{ fontWeight: 600, textTransform: 'uppercase', color: 'text.secondary' }}
                    >
                      Số câu hỏi
                    </Typography>
                  </Stack>
                  <Typography variant='h5' sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {totalQuestions} câu
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card
                variant='outlined'
                sx={{
                  height: '100%',
                  bgcolor: 'grey.50',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 1 }}>
                    <AccessTime sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography
                      variant='caption'
                      sx={{ fontWeight: 600, textTransform: 'uppercase', color: 'text.secondary' }}
                    >
                      Thời gian
                    </Typography>
                  </Stack>
                  <Typography variant='h5' sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {durationInMinutes} phút
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card
                variant='outlined'
                sx={{
                  height: '100%',
                  bgcolor: 'grey.50',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 1 }}>
                    <CheckCircle sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography
                      variant='caption'
                      sx={{ fontWeight: 600, textTransform: 'uppercase', color: 'text.secondary' }}
                    >
                      Điểm đạt
                    </Typography>
                  </Stack>
                  <Typography variant='h5' sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {passingScore}/{maxScore}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
              <Card
                variant='outlined'
                sx={{
                  height: '100%',
                  bgcolor: 'grey.50',
                  borderColor: 'divider',
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Stack direction='row' alignItems='center' spacing={1} sx={{ mb: 1 }}>
                    <History sx={{ color: 'text.secondary', fontSize: 20 }} />
                    <Typography
                      variant='caption'
                      sx={{ fontWeight: 600, textTransform: 'uppercase', color: 'text.secondary' }}
                    >
                      Số lần thử
                    </Typography>
                  </Stack>
                  <Typography variant='h5' sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Không giới hạn
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Phần lưu ý */}
          <Divider sx={{ my: 5, borderColor: 'divider' }} />
          <Box sx={{ mb: 5 }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <InfoOutline fontSize='medium' sx={{ color: 'warning.main' }} />
              Lưu ý trước khi làm bài
            </Typography>

            <Stack spacing={3}>
              <Stack direction='row' spacing={2} alignItems='flex-start'>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: 'hero.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 0.5,
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                    }}
                  />
                </Box>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  Bạn cần hoàn thành tất cả các câu hỏi trong thời gian quy định. Đồng hồ sẽ bắt đầu đếm ngược ngay khi
                  bạn nhấn nút &quot;Bắt đầu&quot;.
                </Typography>
              </Stack>

              <Stack direction='row' spacing={2} alignItems='flex-start'>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: 'hero.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 0.5,
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                    }}
                  />
                </Box>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  Bài thi sẽ tự động nộp khi hết thời gian nếu bạn chưa kịp nhấn nút nộp bài.
                </Typography>
              </Stack>

              <Stack direction='row' spacing={2} alignItems='flex-start'>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: 'hero.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 0.5,
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                    }}
                  />
                </Box>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  Đảm bảo kết nối internet ổn định trong suốt quá trình làm bài. Không nên tải lại trang hoặc đóng trình
                  duyệt.
                </Typography>
              </Stack>

              <Stack direction='row' spacing={2} alignItems='flex-start'>
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    bgcolor: 'hero.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 0.5,
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: 'primary.main',
                    }}
                  />
                </Box>
                <Typography variant='body1' sx={{ color: 'text.secondary' }}>
                  Kết quả và lời giải chi tiết sẽ được hiển thị ngay sau khi bạn nộp bài thành công.
                </Typography>
              </Stack>
            </Stack>
          </Box>

          <Box
            sx={{
              mt: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Button
              variant='contained'
              size='large'
              onClick={onStartQuiz}
              sx={{
                px: 6,
                py: 2,
                borderRadius: 2,
                fontSize: '1.125rem',
                fontWeight: 700,
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 4,
                },
              }}
              endIcon={
                <ArrowForward
                  sx={{
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateX(4px)',
                    },
                  }}
                />
              }
            >
              Bắt đầu làm bài
            </Button>
            <Typography
              variant='subtitle1'
              sx={{
                mt: 2,
                color: 'text.secondary',
                fontWeight: 500,
              }}
            >
              Bạn có thể thực hiện bài trắc nghiệm này nhiều lần.
            </Typography>
          </Box>

          <Box sx={{ mt: 8 }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 700,
                color: 'text.primary',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <History sx={{ color: 'primary.main' }} />
              Lịch sử làm bài
            </Typography>

            <TableContainer
              component={Paper}
              variant='outlined'
              sx={{
                borderRadius: 2,
                borderColor: 'divider',
                overflow: 'hidden',
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: 'grey.50' }}>
                    <TableCell
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase' }}
                    >
                      Lần làm bài
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase' }}
                    >
                      Ngày thực hiện
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase' }}
                    >
                      Điểm số
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase' }}
                    >
                      Thời gian
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase' }}
                    >
                      Trạng thái
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {submissions?.map((submission: any, index: number) => {
                    const createdAt = submission?.createdAt || '';
                    const score = submission?.quizResults?.result?.score;
                    const timeSpent = submission?.quizResults?.result?.timeSpent || 0;
                    const isPass = submission?.quizResults?.result?.score >= exercise?.passingScore;
                    return (
                      <TableRow key={submission?.id} hover>
                        <TableCell sx={{ fontWeight: 600, color: 'text.primary' }}>#{index + 1}</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>{formatISOToDateTime(createdAt)}</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: 'text.primary' }}>{score}/10</TableCell>
                        <TableCell sx={{ color: 'text.secondary' }}>{formatSecondsToMMSS(timeSpent)}</TableCell>
                        <TableCell>
                          <Chip
                            label={isPass ? 'Đạt' : 'Chưa đạt'}
                            size='small'
                            sx={{
                              bgcolor: isPass ? 'success.light' : 'error.light',
                              color: isPass ? 'success.dark' : 'error.dark',
                              fontWeight: 500,
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <NavigationButtons nav={nav} slug={slug} />
    </>
  );
}

function NavigationButtons({ nav, slug }: any) {
  return (
    <>
      <Divider sx={{ my: 6 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {nav?.previousType === 'step' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/steps/${nav?.previousId}`}
            variant='outlined'
            startIcon={<ArrowBack />}
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.100',
              },
            }}
          >
            Trước đó
          </Button>
        )}

        {nav?.previousType === 'lesson' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/lessons/${nav?.previousId}`}
            variant='outlined'
            startIcon={<ArrowBack />}
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.100',
              },
            }}
          >
            Trước đó
          </Button>
        )}

        {nav?.previousType === 'exercise' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/exercises/${nav?.previousId}`}
            variant='outlined'
            startIcon={<ArrowBack />}
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.100',
              },
            }}
          >
            Trước đó
          </Button>
        )}

        {nav?.previousType === 'section' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/sections/${nav?.previousId}`}
            variant='outlined'
            startIcon={<ArrowBack />}
            sx={{
              borderColor: 'grey.300',
              color: 'text.secondary',
              '&:hover': {
                borderColor: 'grey.400',
                backgroundColor: 'grey.100',
              },
            }}
          >
            Quay lại
          </Button>
        )}

        {nav?.nextType === 'step' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/steps/${nav?.nextId}`}
            variant='contained'
            endIcon={<ArrowForward />}
            size='large'
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Tiếp theo
          </Button>
        )}
        {nav?.nextType === 'lesson' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/lessons/${nav?.nextId}`}
            variant='contained'
            endIcon={<ArrowForward />}
            size='large'
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Tiếp theo
          </Button>
        )}

        {nav?.nextType === 'exercise' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/exercises/${nav?.nextId}`}
            variant='contained'
            endIcon={<ArrowForward />}
            size='large'
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Tiếp theo
          </Button>
        )}

        {nav?.nextType === 'section' && (
          <Button
            LinkComponent={NextLink}
            href={`/courses/${slug}/learn/sections/${nav?.nextId}`}
            variant='contained'
            endIcon={<ArrowForward />}
            size='large'
            sx={{
              backgroundColor: 'primary.main',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            Tiếp theo
          </Button>
        )}
      </Box>
    </>
  );
}
