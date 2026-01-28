'use client';

import { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import LinearProgress from '@mui/material/LinearProgress';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  AccessTime as AccessTimeIcon,
  Quiz as QuizIcon,
  Schedule as ScheduleIcon,
  Send as SendIcon,
} from '@mui/icons-material';
import { Divider } from '@mui/material';
import StepContentRenderer from '@/components/common/richText/renderer/stepContentRenderer';

interface QuizSessionProps {
  exercise: any;
  onSubmitQuiz: (answers: any, timeSpent: number) => Promise<void>;
}

export default function QuizSession({ exercise, onSubmitQuiz }: QuizSessionProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedQuestions, setMarkedQuestions] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(exercise?.duration || 1800);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startTime] = useState(() => Date.now());
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalQuestions = exercise?.quizzes?.length || 0;
  const currentQuestion = exercise?.quizzes?.[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const timeProgress = ((exercise?.duration - timeLeft) / exercise?.duration) * 100;

  const handleAutoSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    await onSubmitQuiz(answers, timeSpent);
  };

  // Đếm ngược thời gian
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev: any) => {
        if (prev <= 1) {
          if (intervalRef.current !== null) clearInterval(intervalRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionId,
    }));
  };

  const handleMarkQuestion = () => {
    setMarkedQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(currentQuestionIndex)) {
        newSet.delete(currentQuestionIndex);
      } else {
        newSet.add(currentQuestionIndex);
      }
      return newSet;
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleQuestionNavigation = (index: number) => {
    setCurrentQuestionIndex(index);
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    // Kiểm tra xem đã trả lời hết các câu chưa
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < totalQuestions) {
      if (!window.confirm(`Bạn chưa trả lời ${totalQuestions - answeredCount} câu. Bạn có chắc chắn muốn nộp bài?`)) {
        return;
      }
    }

    setIsSubmitting(true);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    await onSubmitQuiz(answers, timeSpent);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatMinutes = (seconds: number) => {
    return Math.ceil(seconds / 60);
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: { xs: 4, md: 6 } }}>
        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} alignItems={{ xs: 'flex-start', lg: 'flex-end' }}>
          <Grid size={{ xs: 12, lg: 4 }}>
            <Typography variant='h4' component='h1' sx={{ fontWeight: 700, mb: 1 }}>
              {exercise?.unit?.title}
            </Typography>
            <Typography variant='body1' sx={{ color: 'text.secondary' }}>
              {exercise?.description}
            </Typography>
          </Grid>
          <Grid size={{ xs: 'auto', lg: 'auto' }}>
            <Paper
              variant='outlined'
              sx={{
                p: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexWrap: 'wrap',
                bgcolor: 'grey.50',
              }}
            >
              <Stack direction='row' alignItems='center' spacing={1}>
                <QuizIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                  {totalQuestions} Câu hỏi
                </Typography>
              </Stack>
              <Divider orientation='vertical' flexItem />
              <Stack direction='row' alignItems='center' spacing={1}>
                <ScheduleIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                <Typography variant='body2' sx={{ fontWeight: 500 }}>
                  {formatMinutes(exercise?.duration || 1800)} Phút
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        {/* Main content - Câu hỏi */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card variant='outlined'>
            {/* Thanh tiến độ */}
            <Box sx={{ width: '100%', height: 4, bgcolor: 'grey.100' }}>
              <LinearProgress variant='determinate' value={progress} sx={{ height: '100%' }} />
            </Box>

            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              {/* Header câu hỏi */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4 }}>
                <Chip
                  label={`Câu hỏi ${currentQuestionIndex + 1}`}
                  color='primary'
                  variant='outlined'
                  sx={{ fontWeight: 600 }}
                />
                <IconButton
                  onClick={handleMarkQuestion}
                  color={markedQuestions.has(currentQuestionIndex) ? 'warning' : 'default'}
                  sx={{ ml: 1 }}
                >
                  {markedQuestions.has(currentQuestionIndex) ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
              </Box>

              {/* Nội dung câu hỏi */}
              {/* <Typography variant='h6' sx={{ mb: 3, fontWeight: 500, lineHeight: 1.6 }}>
                {currentQuestion?.question?.content?.[0]?.content?.[0]?.text || 'Câu hỏi mẫu'}
              </Typography> */}
              <StepContentRenderer content={currentQuestion.question} />

              {/* Các lựa chọn */}
              <RadioGroup
                value={answers[currentQuestionIndex] || ''}
                onChange={(e) => handleAnswerSelect(currentQuestion?.id, e.target.value)}
              >
                {currentQuestion?.options?.map((option: any, index: number) => (
                  <Paper
                    key={option.id}
                    variant='outlined'
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      borderColor: answers[currentQuestionIndex] === option.id ? 'primary.main' : 'divider',
                      borderWidth: answers[currentQuestionIndex] === option.id ? 2 : 1,
                      transition: 'border-color 0.2s',
                      cursor: 'pointer',
                      '&:hover': {
                        borderColor: 'primary.light',
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={() => handleAnswerSelect(currentQuestion?.id, option.id)}
                  >
                    <FormControlLabel
                      value={option.id}
                      control={<Radio />}
                      label={<Typography sx={{ fontWeight: 500, ml: 1 }}>{option.text}</Typography>}
                      sx={{ m: 0, width: '100%' }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </CardContent>

            {/* Navigation buttons */}
            <Box
              sx={{
                p: 3,
                bgcolor: 'grey.50',
                borderTop: 1,
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Button
                variant='outlined'
                startIcon={<ArrowBackIcon />}
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Câu trước
              </Button>
              <Button
                variant='contained'
                endIcon={<ArrowForwardIcon />}
                onClick={handleNextQuestion}
                disabled={currentQuestionIndex === totalQuestions - 1}
              >
                Câu tiếp theo
              </Button>
            </Box>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Thời gian còn lại */}
            <Card variant='outlined'>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography
                    variant='caption'
                    sx={{ fontWeight: 600, textTransform: 'uppercase', color: 'text.secondary' }}
                  >
                    Thời gian còn lại
                  </Typography>
                  <AccessTimeIcon sx={{ color: 'text.secondary' }} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 2 }}>
                  <Typography variant='h4' sx={{ fontWeight: 700, fontFamily: 'monospace' }}>
                    {formatTime(timeLeft)}
                  </Typography>
                  <Typography variant='body2' sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    phút
                  </Typography>
                </Box>
                <LinearProgress variant='determinate' value={timeProgress} sx={{ height: 8, borderRadius: 4 }} />
              </CardContent>
            </Card>

            {/* Danh sách câu hỏi */}
            <Card variant='outlined'>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant='subtitle2' sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                    Danh sách câu hỏi
                  </Typography>
                  <Chip
                    label={`${Object.keys(answers).length}/${totalQuestions} đã làm`}
                    size='small'
                    variant='outlined'
                  />
                </Box>

                <Grid container spacing={1} sx={{ mb: 3 }}>
                  {Array.from({ length: totalQuestions }).map((_, index) => {
                    let bgcolor = 'background.paper';
                    let color = 'text.primary';
                    let borderColor = 'divider';
                    let fontWeight = 400;

                    if (index === currentQuestionIndex) {
                      bgcolor = 'primary.main';
                      color = 'primary.contrastText';
                      borderColor = 'primary.main';
                      fontWeight = 600;
                    } else if (answers[index]) {
                      bgcolor = 'hero.light';
                      color = 'info.dark';
                      borderColor = 'info.main';
                      fontWeight = 500;
                    } else if (markedQuestions.has(index)) {
                      bgcolor = 'warning.light';
                      color = 'warning.dark';
                      borderColor = 'warning.main';
                      fontWeight = 500;
                    }

                    return (
                      <Grid key={index} size={2.4}>
                        <Button
                          variant='outlined'
                          onClick={() => handleQuestionNavigation(index)}
                          sx={{
                            minWidth: 0,
                            width: '100%',
                            aspectRatio: '1/1',
                            bgcolor,
                            color,
                            borderColor,
                            fontWeight,
                            '&:hover': {
                              bgcolor: `${bgcolor}80`,
                            },
                          }}
                        >
                          {index + 1}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>

                {/* Chú thích */}
                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: 'primary.main',
                          border: 1,
                          borderColor: 'primary.main',
                        }}
                      />
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        Đang làm
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={6}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: 'hero.light',
                          border: 1,
                          borderColor: 'info.main',
                        }}
                      />
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        Đã trả lời
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={6}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: 'background.paper',
                          border: 1,
                          borderColor: 'divider',
                        }}
                      />
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        Chưa làm
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid size={6}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: 'warning.main',
                          border: 1,
                          borderColor: 'warning.dark',
                        }}
                      />
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        Đã đánh dấu
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Nút nộp bài */}
            <Button
              variant='contained'
              size='large'
              fullWidth
              onClick={handleSubmit}
              disabled={isSubmitting}
              startIcon={isSubmitting ? <CircularProgress size={20} color='inherit' /> : <SendIcon />}
              sx={{
                py: 2.5,
                fontSize: '1rem',
                fontWeight: 700,
                boxShadow: 3,
                '&:hover': {
                  boxShadow: 4,
                },
              }}
            >
              {isSubmitting ? 'Đang nộp bài...' : 'Nộp bài thi'}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
