// components/course/MenuContent.tsx
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
import { CompletionStatus, LearningCourse } from '@/types/course';

interface MenuContentProps {
  course: LearningCourse;
}

interface OpenState {
  [key: string]: boolean;
}

export default function MenuContent({ course }: MenuContentProps) {
  const [openSections, setOpenSections] = useState<OpenState>({
    'section-1': false,
    'section-2': true,
    'section-3': false,
  });

  const [openLessons, setOpenLessons] = useState<OpenState>({
    'lesson-2-1': true,
  });

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

  const getStatusIcon = (status: CompletionStatus, size: 'small' | 'medium' = 'small') => {
    const iconProps = { fontSize: size };

    switch (status) {
      case 'completed':
        return <CheckCircle {...iconProps} sx={{ color: 'primary.main' }} />;
      case 'in-progress':
        return <PlayCircle {...iconProps} sx={{ color: 'primary.main' }} />;
      case 'not-started':
        return <RadioButtonUnchecked {...iconProps} />;
      default:
        return <RadioButtonUnchecked {...iconProps} />;
    }
  };

  const isLessonActive = (lessonId: string) => {
    return openLessons[lessonId] || false;
  };

  return (
    <>
      {/* Course Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'grey.200' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'hero.main' }}>
            <Book sx={{ color: 'primary.main' }} />
          </Avatar>
          <Box>
            <Typography variant='body2' color='text.secondary'>
              Khoá học
            </Typography>
            <Link href='#' passHref>
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
                sx={{
                  borderRadius: 1,
                  '&:hover': { backgroundColor: 'grey.100' },
                }}
              >
                <Typography variant='body2' sx={{ fontWeight: 500, flex: 1 }}>
                  Phần {section.order}: {section.title}
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
                  {section.lessons.map((lesson) => (
                    <ListItem key={lesson.id} sx={{ p: 0, mb: 0.5 }}>
                      {lesson.steps ? (
                        <Box sx={{ width: '100%' }}>
                          <ListItemButton
                            onClick={() => handleLessonClick(lesson.id)}
                            sx={{
                              borderRadius: 1,
                              py: 1,
                              backgroundColor: isLessonActive(lesson.id) ? 'primary.light' : 'transparent',
                              '&:hover': {
                                backgroundColor: isLessonActive(lesson.id) ? 'primary.light' : 'grey.100',
                              },
                            }}
                          >
                            <ListItemIcon sx={{ minWidth: 32 }}>{getStatusIcon(lesson.status)}</ListItemIcon>
                            <ListItemText
                              primary={`Bài ${section.order}.${lesson.order}: ${lesson.title}`}
                              primaryTypographyProps={{
                                fontSize: '0.875rem',
                                fontWeight: isLessonActive(lesson.id) ? 500 : 400,
                                color: isLessonActive(lesson.id) ? 'primary.main' : 'text.secondary',
                              }}
                            />
                            <ChevronRight
                              fontSize='small'
                              sx={{
                                transform: openLessons[lesson.id] ? 'rotate(90deg)' : 'none',
                                transition: 'transform 0.2s',
                                color: 'text.secondary',
                              }}
                            />
                          </ListItemButton>

                          <Collapse in={openLessons[lesson.id]}>
                            <Box sx={{ pl: 3, mt: 0.5, borderLeft: '1px solid', borderColor: 'grey.200' }}>
                              {lesson.steps.map((step) => (
                                <ListItemButton
                                  key={step.id}
                                  sx={{
                                    borderRadius: 1,
                                    py: 0.75,
                                    backgroundColor: step.status === 'in-progress' ? 'grey.200' : 'transparent',
                                    '&:hover': { backgroundColor: 'grey.100' },
                                  }}
                                >
                                  <ListItemIcon sx={{ minWidth: 32 }}>{getStatusIcon(step.status)}</ListItemIcon>
                                  <ListItemText
                                    primary={`Bước ${step.order}: ${step.title}`}
                                    primaryTypographyProps={{
                                      fontSize: '0.875rem',
                                      fontWeight: step.status === 'in-progress' ? 500 : 400,
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
                          sx={{
                            borderRadius: 1,
                            py: 1,
                            '&:hover': { backgroundColor: 'grey.100' },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>{getStatusIcon(lesson.status)}</ListItemIcon>
                          <ListItemText
                            primary={`Bài ${section.order}.${lesson.order}: ${lesson.title}`}
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
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'grey.200' }}>
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
      </Box>
    </>
  );
}
