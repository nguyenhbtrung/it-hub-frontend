import { useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Avatar,
  LinearProgress,
  Paper,
} from '@mui/material';
import { Book, ExpandMore, CheckCircle, PlayCircle, RadioButtonUnchecked, ChevronRight } from '@mui/icons-material';
import Link from '@/components/common/Link';
import { CompletionStatus, LearningCourse } from './types';

interface MenuContentProps {
  course: LearningCourse;
}

interface OpenState {
  [key: string]: boolean;
}

export default function MenuContent({ course }: MenuContentProps) {
  const [openSections, setOpenSections] = useState<OpenState>({});

  const [openLessons, setOpenLessons] = useState<OpenState>({});

  const handleSectionClick = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const handleLessonClick = (lessonId: string) => {
    setOpenLessons((prev) => ({
      ...prev,
      [lessonId]: !prev[lessonId],
    }));
  };

  const handleExcerciseClick = (excerciseId: string) => {};

  const getStatusIcon = (status: CompletionStatus, size: 'small' | 'medium' = 'small') => {
    const iconProps = { fontSize: size };

    switch (status) {
      case 'completed':
        return <CheckCircle {...iconProps} sx={{ color: 'primary.main' }} />;
      case 'not-started':
        return <RadioButtonUnchecked {...iconProps} />;
      default:
        return <RadioButtonUnchecked {...iconProps} />;
    }
  };

  const isLessonActive = (lessonId: string) => {
    return openLessons[lessonId] || false;
  };

  const handleStepClick = (id: string) => {};

  return (
    <>
      {/* Course Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'hero.main' }}>
            <Book sx={{ color: 'primary.main' }} />
          </Avatar>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              Khoá học
            </Typography>
            <Link href={`/courses/${course?.slug}`} passHref>
              <Typography
                variant='subtitle1'
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {course.title}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        <Box sx={{ mt: 2 }}>
          {course.sections.map((section) => (
            <Box key={section.id} sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleSectionClick(section.id)}
                sx={[
                  {
                    borderRadius: 1,
                    '&:hover': { backgroundColor: 'grey.100' },
                  },
                  (theme) => theme.applyStyles('dark', { '&:hover': { backgroundColor: 'grey.800' } }),
                ]}
              >
                <Typography variant='body2' sx={{ fontWeight: 500, flex: 1 }}>
                  Chương {section.order}: {section.title}
                </Typography>
                <ExpandMore
                  sx={{
                    transform: openSections[section.id] ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.2s',
                    color: 'text.secondary',
                  }}
                />
              </ListItemButton>

              <Collapse in={openSections[section.id]}>
                <List sx={{ pl: 3, pt: 0.5 }}>
                  {section.units.map((unit) => (
                    <ListItem key={unit.id} sx={{ p: 0, mb: 0.5 }}>
                      {unit.steps ? (
                        <Box sx={{ width: '100%' }}>
                          <ListItemButton
                            onClick={() => handleLessonClick(unit.id)}
                            sx={[
                              {
                                borderRadius: 1,
                                py: 1,
                                backgroundColor: isLessonActive(unit.id) ? 'hero.light' : 'transparent',
                                '&:hover': {
                                  backgroundColor: isLessonActive(unit.id) ? 'primary.light' : 'grey.100',
                                },
                              },
                              (theme) =>
                                theme.applyStyles('dark', {
                                  backgroundColor: isLessonActive(unit.id) ? '#223843' : 'transparent',
                                  '&:hover': {
                                    backgroundColor: isLessonActive(unit.id) ? '#223843' : 'grey.800',
                                  },
                                }),
                            ]}
                          >
                            <ListItemIcon sx={{ minWidth: 32 }}>{getStatusIcon(unit.status)}</ListItemIcon>
                            <ListItemText
                              primary={
                                unit.type === 'lesson'
                                  ? `Bài ${section.order}.${unit.order}: ${unit.title}`
                                  : `Bài tập: ${unit.title}`
                              }
                              primaryTypographyProps={{
                                fontSize: '0.875rem',
                                fontWeight: isLessonActive(unit.id) ? 500 : 400,
                                color: isLessonActive(unit.id) ? 'primary.main' : 'text.secondary',
                              }}
                            />
                            <ChevronRight
                              fontSize='small'
                              sx={{
                                transform: openLessons[unit.id] ? 'rotate(90deg)' : 'none',
                                transition: 'transform 0.2s',
                                color: 'text.secondary',
                              }}
                            />
                          </ListItemButton>

                          <Collapse in={openLessons[unit.id]}>
                            <Box sx={{ pl: 3, mt: 0.5, borderLeft: '1px solid', borderColor: 'grey.200' }}>
                              {unit.steps.map((step) => (
                                <ListItemButton
                                  key={step.id}
                                  // onClick={() => handleStepClick(step?.id)}
                                  LinkComponent={Link}
                                  href={`/courses/${course?.slug}/learn/steps/${step?.id}`}
                                  sx={[
                                    {
                                      borderRadius: 1,
                                      py: 0.75,
                                      backgroundColor: step.id === course?.contentId ? 'grey.200' : 'transparent',
                                      '&:hover': { backgroundColor: 'grey.100' },
                                    },
                                    (theme) =>
                                      theme.applyStyles('dark', {
                                        backgroundColor: step.id === course?.contentId ? 'grey.700' : 'transparent',

                                        '&:hover': { backgroundColor: 'grey.800' },
                                      }),
                                  ]}
                                >
                                  <ListItemIcon sx={{ minWidth: 32 }}>{getStatusIcon(step.status)}</ListItemIcon>
                                  <ListItemText
                                    primary={`${step.title}`}
                                    primaryTypographyProps={{
                                      fontSize: '0.875rem',
                                      fontWeight: step.id === course?.contentId ? 500 : 400,
                                      // fontWeight: 400,
                                      color: 'text.secondary',
                                    }}
                                  />
                                </ListItemButton>
                              ))}
                            </Box>
                          </Collapse>
                        </Box>
                      ) : (
                        <ListItemButton
                          sx={[
                            {
                              borderRadius: 1,
                              py: 1,
                              '&:hover': { backgroundColor: 'grey.100' },
                            },
                            (theme) => theme.applyStyles('dark', { '&:hover': { backgroundColor: 'grey.800' } }),
                          ]}
                          onClick={() => handleExcerciseClick(unit.id)}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>{getStatusIcon(unit.status)}</ListItemIcon>
                          <ListItemText
                            primary={
                              unit.type === 'lesson'
                                ? `Bài ${section.order}.${unit.order}: ${unit.title}`
                                : `Bài tập: ${unit.title}`
                            }
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              color: 'text.secondary',
                            }}
                          />
                        </ListItemButton>
                      )}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Progress */}
      {/* <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Paper
          elevation={0}
          sx={{
            p: 1.5,
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 1,
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant='body2' sx={{ fontWeight: 500 }}>
              Tiến độ khóa học
            </Typography>
            <Typography variant='body2' sx={{ fontWeight: 700, color: 'primary.main' }}>
              {course.progress}%
            </Typography>
          </Box>
          <LinearProgress
            variant='determinate'
            value={course.progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'grey.200',
              '& .MuiLinearProgress-bar': {
                borderRadius: 4,
                backgroundColor: 'primary.main',
              },
            }}
          />
        </Paper>
      </Box> */}
    </>
  );
}
