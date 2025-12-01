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

export default function MenuContent() {
  const [openChapters, setOpenChapters] = useState({
    1: false,
    2: true,
    3: false,
  });

  const [openLesson, setOpenLesson] = useState({
    '2.1': true,
  });

  const handleChapterClick = (chapter) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapter]: !prev[chapter],
    }));
  };

  const handleLessonClick = (lesson) => {
    setOpenLesson((prev) => ({
      ...prev,
      [lesson]: !prev[lesson],
    }));
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
                Hello world Masterclass
              </Typography>
            </Link>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
        {/* Chapters */}
        <Box sx={{ mt: 2 }}>
          {/* Chapter 1 */}
          <Box sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleChapterClick(1)}
              sx={{
                borderRadius: 1,
                '&:hover': { backgroundColor: 'grey.100' },
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: 500, flex: 1 }}>
                Chương 1: Giới thiệu
              </Typography>
              <ExpandMore
                sx={{
                  transform: openChapters[1] ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                  color: 'text.secondary',
                }}
              />
            </ListItemButton>
            <Collapse in={openChapters[1]}>
              <List sx={{ pl: 3, pt: 0.5 }}>
                <ListItem sx={{ p: 0, mb: 0.5 }}>
                  <ListItemButton
                    sx={{
                      borderRadius: 1,
                      py: 1,
                      '&:hover': { backgroundColor: 'grey.100' },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle fontSize='small' />
                    </ListItemIcon>
                    <ListItemText
                      primary='Bài 1.1: Tổng quan'
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
                <ListItem sx={{ p: 0 }}>
                  <ListItemButton
                    sx={{
                      borderRadius: 1,
                      py: 1,
                      '&:hover': { backgroundColor: 'grey.100' },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle fontSize='small' />
                    </ListItemIcon>
                    <ListItemText
                      primary='Bài 1.2: Công cụ cần thiết'
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </Box>

          {/* Chapter 2 */}
          <Box sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleChapterClick(2)}
              sx={{
                borderRadius: 1,
                '&:hover': { backgroundColor: 'grey.100' },
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: 500, flex: 1 }}>
                Chương 2: Kiến thức cơ bản
              </Typography>
              <ExpandMore
                sx={{
                  transform: openChapters[2] ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                  color: 'text.secondary',
                }}
              />
            </ListItemButton>
            <Collapse in={openChapters[2]}>
              <List sx={{ pl: 3, pt: 0.5 }}>
                {/* Lesson 2.1 */}
                <ListItem sx={{ p: 0, mb: 0.5 }}>
                  <Box sx={{ width: '100%' }}>
                    <ListItemButton
                      onClick={() => handleLessonClick('2.1')}
                      sx={{
                        borderRadius: 1,
                        py: 1,
                        backgroundColor: 'primary.light',
                        '&:hover': { backgroundColor: 'primary.light' },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <PlayCircle fontSize='small' sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary='Bài 2.1: Cài đặt môi trường'
                        primaryTypographyProps={{
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: 'primary.main',
                        }}
                      />
                      <ChevronRight
                        fontSize='small'
                        sx={{
                          transform: openLesson['2.1'] ? 'rotate(90deg)' : 'none',
                          transition: 'transform 0.2s',
                          color: 'text.secondary',
                        }}
                      />
                    </ListItemButton>
                    <Collapse in={openLesson['2.1']}>
                      <Box sx={{ pl: 3, mt: 0.5, borderLeft: '1px solid', borderColor: 'grey.200' }}>
                        <ListItemButton
                          sx={{
                            borderRadius: 1,
                            py: 0.75,
                            '&:hover': { backgroundColor: 'grey.100' },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <CheckCircle fontSize='small' sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary='Bước 1: Giới thiệu'
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              color: 'text.secondary',
                            }}
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: 1,
                            py: 0.75,
                            backgroundColor: 'grey.200',
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <PlayCircle fontSize='small' sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText
                            primary='Bước 2: Cấu hình'
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              fontWeight: 500,
                            }}
                          />
                        </ListItemButton>
                        <ListItemButton
                          sx={{
                            borderRadius: 1,
                            py: 0.75,
                            '&:hover': { backgroundColor: 'grey.100' },
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <RadioButtonUnchecked fontSize='small' />
                          </ListItemIcon>
                          <ListItemText
                            primary='Bước 3: Hoàn tất'
                            primaryTypographyProps={{
                              fontSize: '0.875rem',
                              color: 'text.secondary',
                            }}
                          />
                        </ListItemButton>
                      </Box>
                    </Collapse>
                  </Box>
                </ListItem>

                {/* Lesson 2.2 */}
                <ListItem sx={{ p: 0 }}>
                  <ListItemButton
                    sx={{
                      borderRadius: 1,
                      py: 1,
                      '&:hover': { backgroundColor: 'grey.100' },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <RadioButtonUnchecked fontSize='small' />
                    </ListItemIcon>
                    <ListItemText
                      primary='Bài 2.2: Hello World'
                      primaryTypographyProps={{
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              </List>
            </Collapse>
          </Box>

          {/* Chapter 3 */}
          <Box sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleChapterClick(3)}
              sx={{
                borderRadius: 1,
                '&:hover': { backgroundColor: 'grey.100' },
              }}
            >
              <Typography variant='body2' sx={{ fontWeight: 500, flex: 1 }}>
                Chương 3: Nâng cao
              </Typography>
              <ExpandMore
                sx={{
                  transform: openChapters[3] ? 'rotate(180deg)' : 'none',
                  transition: 'transform 0.2s',
                  color: 'text.secondary',
                }}
              />
            </ListItemButton>
            <Collapse in={openChapters[3]}></Collapse>
          </Box>
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
              45%
            </Typography>
          </Box>
          <LinearProgress
            variant='determinate'
            value={45}
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
