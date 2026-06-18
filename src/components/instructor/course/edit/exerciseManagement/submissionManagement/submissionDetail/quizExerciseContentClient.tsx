'use client';

import StepContentRenderer from '@/components/common/richText/renderer/stepContentRenderer';
import CheckCircle from '@mui/icons-material/CheckCircle';
import Close from '@mui/icons-material/Close';
import Info from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { RadioButtonChecked, RadioButtonUnchecked } from '@mui/icons-material';
import React, { useState } from 'react';

interface QuizResultContentClientProps {
  result: any;
  exercise: any;
  children: React.ReactNode;
}

export default function QuizExerciseContentClient({ result, exercise, children }: QuizResultContentClientProps) {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  const scorePercentage = result.score * 10 || 0;
  const isPassed = scorePercentage >= (exercise?.passingScore || 5) * 10;
  const totalQuestions = result?.totalQuestions || 0;
  const correctAnswers = result?.correctAnswers || 0;
  const timeSpentMinutes = Math.floor((result.timeSpent || 0) / 60);
  const timeSpentSeconds = (result.timeSpent || 0) % 60;

  const getQuestionResult = (questionIndex: number) => {
    const question = exercise?.quizzes?.[questionIndex];
    const userAnswerId = result.answers?.[questionIndex];
    const userAnswer = question?.options?.find((opt: any) => opt.id === userAnswerId);
    const correctAnswer = question?.options?.find((opt: any) => opt.isCorrect);
    const isCorrect = userAnswer?.isCorrect || false;

    return {
      question,
      userAnswer,
      correctAnswer,
      isCorrect,
      questionText: question?.question?.content?.[0]?.content?.[0]?.text || `Câu hỏi ${questionIndex + 1}`,
    };
  };

  const handleQuestionClick = (index: number) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };
  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 4 }}>
        <Typography
          variant='h4'
          component='h1'
          sx={{
            fontWeight: 700,
            color: 'text.primary',
          }}
        >
          Kết quả bài trắc nghiệm
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Main content */}
        <Grid size={{ xs: 12, lg: 8 }}>
          {/* Score Card */}
          <Card variant='outlined' sx={{ mb: 3 }}>
            <CardContent sx={{ p: { xs: 3, md: 4 } }}>
              <Stack direction='row' spacing={3} alignItems='center'>
                <Grid size={{ xs: 12, md: 'auto' }}>
                  <Box sx={{ position: 'relative', display: 'inline-flex', mx: 'auto' }}>
                    <CircularProgress
                      variant='determinate'
                      value={scorePercentage}
                      size={128}
                      thickness={3}
                      sx={{
                        color: isPassed ? 'success.main' : 'error.main',
                        borderRadius: '50%',
                      }}
                    />
                    <Box
                      sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant='h4' sx={{ fontWeight: 700 }}>
                        {scorePercentage}%
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}
                      >
                        Điểm số
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 12 }}>
                  <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Stack
                      direction='row'
                      alignItems='center'
                      spacing={1}
                      sx={{ mb: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}
                    >
                      <Chip
                        label={isPassed ? 'Đạt' : 'Chưa đạt'}
                        color={isPassed ? 'success' : 'error'}
                        size='small'
                        icon={<CheckCircle />}
                      />
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Grid container spacing={2}>
                      <Grid size={4}>
                        <Box>
                          <Typography
                            variant='caption'
                            sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}
                          >
                            Số câu đúng
                          </Typography>
                          <Typography variant='h6' sx={{ fontWeight: 700 }}>
                            {correctAnswers}
                            <Typography
                              component='span'
                              sx={{ color: 'text.secondary', fontSize: '0.875rem', fontWeight: 400 }}
                            >
                              /{totalQuestions}
                            </Typography>
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={4}>
                        <Box>
                          <Typography
                            variant='caption'
                            sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}
                          >
                            Thời gian
                          </Typography>
                          <Typography variant='h6' sx={{ fontWeight: 700 }}>
                            {timeSpentMinutes.toString().padStart(2, '0')}:
                            {timeSpentSeconds.toString().padStart(2, '0')}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid size={4}>
                        <Box>
                          <Typography
                            variant='caption'
                            sx={{ color: 'text.secondary', fontWeight: 600, textTransform: 'uppercase' }}
                          >
                            Điểm TB
                          </Typography>
                          <Typography variant='h6' sx={{ fontWeight: 700 }}>
                            {(scorePercentage / 10).toFixed(1)}
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Stack>
            </CardContent>
          </Card>

          {/* Review Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant='h6' sx={{ fontWeight: 700 }}>
              Xem lại bài làm
            </Typography>
            <Stack direction='row' spacing={1}>
              <Chip
                label='Đúng'
                size='small'
                sx={{ bgcolor: 'success.light', color: 'success.dark' }}
                icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'success.main' }} />}
              />
              <Chip
                label='Sai'
                size='small'
                sx={{ bgcolor: 'error.light', color: 'error.dark' }}
                icon={<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'error.main' }} />}
              />
            </Stack>
          </Box>

          {/* Question Review List */}
          <Stack spacing={2}>
            {Array.from({ length: totalQuestions }).map((_, index) => {
              const questionResult = getQuestionResult(index);
              const isExpanded = expandedQuestion === index;
              const isCorrect = questionResult.isCorrect;

              return (
                <Card
                  key={index}
                  variant='outlined'
                  sx={{
                    cursor: 'pointer',
                    borderColor: isExpanded ? 'primary.main' : 'divider',
                    boxShadow: isExpanded ? 1 : 0,
                  }}
                  onClick={() => handleQuestionClick(index)}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Stack direction='row' alignItems='flex-start' spacing={2}>
                      <Box
                        sx={{
                          width: 24,
                          height: 24,
                          borderRadius: '50%',
                          bgcolor: isCorrect ? 'success.light' : 'error.light',
                          color: isCorrect ? 'success.main' : 'error.main',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: 1,
                          borderColor: isCorrect ? 'success.main' : 'error.main',
                          flexShrink: 0,
                          mt: 0.5,
                        }}
                      >
                        {isCorrect ? <CheckCircle fontSize='small' /> : <Close fontSize='small' />}
                      </Box>

                      <Box sx={{ flex: 1 }}>
                        <Stack direction='row' justifyContent='space-between' alignItems='flex-start' sx={{ mb: 0.5 }}>
                          <Typography variant='caption' sx={{ color: 'text.secondary', fontWeight: 500 }}>
                            Câu hỏi {index + 1}
                          </Typography>
                          <Typography variant='caption' sx={{ color: 'text.secondary', fontFamily: 'monospace' }}>
                            {isCorrect ? '1/1 điểm' : '0/1 điểm'}
                          </Typography>
                        </Stack>

                        <StepContentRenderer content={questionResult.question.question} />
                      </Box>

                      <IconButton size='small'>{isExpanded ? <ExpandLess /> : <ExpandMore />}</IconButton>
                    </Stack>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                        {/* Options */}
                        <Stack spacing={2}>
                          {questionResult.question?.options?.map((option: any) => {
                            const isUserAnswer = option.id === questionResult.userAnswer?.id;
                            const isCorrectOption = option.isCorrect;

                            let bgcolor = 'background.paper';
                            let borderColor = 'divider';
                            let iconColor = 'text.secondary';
                            let label = '';

                            if (isUserAnswer && !isCorrectOption) {
                              bgcolor = 'error.light';
                              borderColor = 'error.main';
                              iconColor = 'error.main';
                              label = 'Câu trả lời của học viên';
                            } else if (isCorrectOption) {
                              bgcolor = 'success.light';
                              borderColor = 'success.main';
                              iconColor = 'success.main';
                              label = 'Đáp án đúng';
                            } else {
                              bgcolor = 'background.paper';
                              borderColor = 'divider';
                              iconColor = 'text.secondary';
                            }

                            return (
                              <Paper
                                key={option.id}
                                variant='outlined'
                                sx={{
                                  p: 2,
                                  bgcolor,
                                  borderColor,
                                  borderWidth: isUserAnswer || isCorrectOption ? 2 : 1,
                                  opacity: !isUserAnswer && !isCorrectOption ? 0.6 : 1,
                                }}
                              >
                                <Stack direction='row' alignItems='center' spacing={2}>
                                  {isUserAnswer ? (
                                    <RadioButtonChecked sx={{ color: iconColor }} />
                                  ) : (
                                    <RadioButtonUnchecked sx={{ color: iconColor }} />
                                  )}

                                  <Typography sx={{ flex: 1, fontWeight: 500 }}>{option.text}</Typography>

                                  {label && (
                                    <Chip
                                      label={label}
                                      size='small'
                                      color={isUserAnswer && !isCorrectOption ? 'error' : 'success'}
                                      icon={isUserAnswer && !isCorrectOption ? <Close /> : <CheckCircle />}
                                    />
                                  )}
                                </Stack>
                              </Paper>
                            );
                          })}
                        </Stack>

                        {/* Explanation */}
                        {questionResult.question?.explaination && (
                          <Paper
                            variant='outlined'
                            sx={{
                              mt: 3,
                              p: 3,
                              bgcolor: 'hero.light',
                              borderColor: 'info.main',
                            }}
                          >
                            <Stack direction='row' spacing={2}>
                              <Info sx={{ color: 'info.main', flexShrink: 0 }} />
                              <Box>
                                <Typography
                                  variant='caption'
                                  sx={{ fontWeight: 700, textTransform: 'uppercase', color: 'info.dark', mb: 1 }}
                                >
                                  Giải thích
                                </Typography>
                                {/* <Typography variant='body2' sx={{ color: 'text.primary' }}>
                                  {questionResult.question.explaination.content?.[0]?.content?.[0]?.text ||
                                    'Không có giải thích.'}
                                </Typography> */}
                                <StepContentRenderer content={questionResult.question.explaination} />
                              </Box>
                            </Stack>
                          </Paper>
                        )}
                      </Box>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Stack spacing={3}>
            {/* Question List */}
            <Card variant='outlined'>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant='subtitle2' sx={{ fontWeight: 700, textTransform: 'uppercase' }}>
                    Danh sách câu hỏi
                  </Typography>
                </Box>

                <Grid container spacing={1} sx={{ mb: 3 }}>
                  {Array.from({ length: totalQuestions }).map((_, index) => {
                    const isCorrect = getQuestionResult(index).isCorrect;
                    const isActive = expandedQuestion === index;

                    return (
                      <Grid key={index} size={2.4}>
                        <Button
                          variant='outlined'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuestionClick(index);
                          }}
                          sx={{
                            minWidth: 0,
                            width: '100%',
                            aspectRatio: '1/1',
                            bgcolor: isCorrect ? 'success.light' : 'error.light',
                            color: isCorrect ? 'success.dark' : 'error.dark',
                            borderColor: isCorrect ? 'success.main' : 'error.main',
                            borderWidth: isActive ? 2 : 1,
                            fontWeight: 700,
                            '&:hover': {
                              bgcolor: isCorrect ? 'success.main' : 'error.main',
                              color: 'white',
                            },
                          }}
                        >
                          {index + 1}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>

                <Grid container spacing={2}>
                  <Grid size={6}>
                    <Stack direction='row' alignItems='center' spacing={1}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          bgcolor: 'success.main',
                          border: 1,
                          borderColor: 'success.dark',
                        }}
                      />
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        Đúng
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
                          bgcolor: 'error.main',
                          border: 1,
                          borderColor: 'error.dark',
                        }}
                      />
                      <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                        Sai
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            {children}
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
