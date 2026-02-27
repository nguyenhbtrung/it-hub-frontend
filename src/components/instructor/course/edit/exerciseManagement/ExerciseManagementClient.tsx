'use client';

import { useState, useCallback, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Badge,
  Stack,
  CircularProgress,
  Collapse,
  TextField,
} from '@mui/material';
import {
  VisibilityOutlined,
  EditOutlined,
  DeleteOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  CalendarTodayOutlined,
  EditNoteOutlined,
} from '@mui/icons-material';
import { getCourseExercisesGroupedBySection } from '@/services/course.service';
import { updateUnit } from '@/services/unit.service';
import { useRouter } from 'next/navigation';

interface Exercise {
  id: string;
  unitId: string;
  title: string;
  type: 'project' | 'assignment' | 'quiz' | 'coding';
  deadline: string | null;
  newAssigments: number;
}

interface Section {
  id: string;
  title: string;
  exercises: Exercise[];
}

interface Meta {
  total: number;
  page: number;
  limit: number;
  timestamp: string;
}

interface ExerciseManagementClientProps {
  courseId: string;
  initialSections: Section[];
  initialMeta: Meta;
}

export default function ExerciseManagementClient({
  courseId,
  initialSections,
  initialMeta,
}: ExerciseManagementClientProps) {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [page, setPage] = useState(initialMeta.page);
  const [hasMore, setHasMore] = useState(initialMeta.page * initialMeta.limit < initialMeta.total);
  const [loading, setLoading] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const initialExpanded = sections.reduce(
      (acc, section) => {
        acc[section.id] = true;
        return acc;
      },
      {} as Record<string, boolean>
    );
    setExpandedSections(initialExpanded);
  }, [sections]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const nextPage = page + 1;
      const res = await getCourseExercisesGroupedBySection(courseId, { page: nextPage, limit: initialMeta.limit });
      const newSections = res?.data || [];
      const newMeta = res?.meta;
      if (newSections.length > 0) {
        setSections((prev) => [...prev, ...newSections]);
        setPage(nextPage);
        if (newMeta) {
          setHasMore(nextPage * newMeta.limit < newMeta.total);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more exercises:', error);
    } finally {
      setLoading(false);
    }
  }, [courseId, page, loading, hasMore, initialMeta.limit]);

  // Intersection Observer cho phần tử cuối cùng
  const { ref: lastSectionRef, inView } = useInView({
    threshold: 0.5,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMore();
    }
  }, [inView, hasMore, loading, loadMore]);

  // Helper format deadline
  const formatDeadline = (deadline: string | null) => {
    if (!deadline) return '—';
    const date = new Date(deadline);
    return date.toLocaleDateString('vi-VN');
  };

  // Helper hiển thị loại bài tập
  const getTypeChip = (type: string) => {
    switch (type) {
      case 'assignment':
        return <Chip label='Thực hành' size='small' sx={{ bgcolor: 'badged.blue.bg', color: 'badged.blue.text' }} />;
      case 'project':
        return <Chip label='Thực hành' size='small' sx={{ bgcolor: 'badged.blue.bg', color: 'badged.blue.text' }} />;
      case 'quiz':
        return (
          <Chip label='Trắc nghiệm' size='small' sx={{ bgcolor: 'badged.green.bg', color: 'badged.green.text' }} />
        );
      case 'coding':
        return (
          <Chip label='Lập trình' size='small' sx={{ bgcolor: 'badged.purple.bg', color: 'badged.purple.text' }} />
        );
      default:
        return <Chip label={type} size='small' variant='outlined' />;
    }
  };

  const handleStartEdit = (exercise: Exercise) => {
    setEditingExerciseId(exercise.id);
    setEditingTitle(exercise.title);
  };

  const handleSaveTitle = async (exercise: Exercise) => {
    try {
      const res = await updateUnit(exercise.unitId, { title: editingTitle });
      if (!res?.success) throw new Error('');
      setSections((prev) =>
        prev.map((section) => ({
          ...section,
          exercises: section.exercises.map((ex) => (ex.id === exercise.id ? { ...ex, title: editingTitle } : ex)),
        }))
      );
    } catch (error) {
    } finally {
      setEditingExerciseId(null);
    }
  };

  const handleEditContentClick = (unitId: string) => {
    router.push(`/instructor/courses/${courseId}/edit/content/exercises/${unitId}`);
  };

  const handleViewClick = (unitId: string) => {
    router.push(`/instructor/courses/${courseId}/edit/exercises/${unitId}`);
  };

  return (
    <Box sx={{ flex: 1, overflow: 'auto', py: 4 }}>
      {sections.length === 0 ? (
        <Typography color='text.secondary' align='center' sx={{ py: 8 }}>
          Chưa có bài tập nào trong khoá học này.
        </Typography>
      ) : (
        <Stack spacing={4}>
          {sections.map((section, index) => {
            const isExpanded = expandedSections[section.id] ?? true;
            const isLastSection = index === sections.length - 1;

            return (
              <Box key={section.id} ref={isLastSection ? lastSectionRef : null}>
                {/* Header của chương */}
                <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ px: 1, mb: 2 }}>
                  <Stack direction='row' alignItems='center' spacing={1.5}>
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: 0.7,
                        bgcolor: 'hero.light',
                        color: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.875rem',
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Typography variant='h6' fontWeight={700} color='text.primary'>
                      {section.title}
                    </Typography>
                  </Stack>
                  <IconButton size='small' onClick={() => toggleSection(section.id)} sx={{ color: 'text.disabled' }}>
                    {isExpanded ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
                  </IconButton>
                </Stack>

                {/* Bảng bài tập (có thể thu gọn) */}
                <Collapse in={isExpanded} timeout='auto' unmountOnExit>
                  <TableContainer
                    component={Paper}
                    elevation={0}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      overflow: 'hidden',
                    }}
                  >
                    <Table sx={{ minWidth: 650 }}>
                      <TableHead>
                        <TableRow sx={{ bgcolor: 'action.hover' }}>
                          <TableCell sx={{ width: 350, fontWeight: 700, fontSize: '0.875rem' }}>Tiêu đề</TableCell>
                          <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Loại</TableCell>
                          <TableCell sx={{ fontWeight: 700, fontSize: '0.875rem' }}>Hạn chót</TableCell>
                          <TableCell align='right' sx={{ fontWeight: 700, fontSize: '0.875rem' }}>
                            Thao tác
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {section.exercises.map((exercise) => (
                          <TableRow key={exercise.id} hover sx={{ '&:hover': { bgcolor: 'primary.lighter' } }}>
                            <TableCell>
                              <Stack direction='row' alignItems='center' spacing={1}>
                                {editingExerciseId === exercise.id ? (
                                  <TextField
                                    size='small'
                                    value={editingTitle}
                                    onChange={(e) => setEditingTitle(e.target.value)}
                                    onBlur={() => handleSaveTitle(exercise)}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') {
                                        handleSaveTitle(exercise);
                                      }
                                    }}
                                    autoFocus
                                    fullWidth
                                  />
                                ) : (
                                  <Typography variant='body2' fontWeight={500} color='text.primary'>
                                    {exercise.title}
                                  </Typography>
                                )}

                                <Box />
                                {exercise.newAssigments > 0 && (
                                  <Badge
                                    badgeContent={exercise.newAssigments}
                                    color='error'
                                    sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 18, minWidth: 18 } }}
                                  />
                                )}
                              </Stack>
                            </TableCell>
                            <TableCell>{getTypeChip(exercise.type)}</TableCell>
                            <TableCell>
                              {exercise.deadline ? (
                                <Stack direction='row' alignItems='center' spacing={0.5}>
                                  <CalendarTodayOutlined sx={{ fontSize: 16, color: 'text.secondary' }} />
                                  <Typography variant='body2' color='text.secondary'>
                                    {formatDeadline(exercise.deadline)}
                                  </Typography>
                                </Stack>
                              ) : (
                                <Typography variant='body2' color='text.secondary'>
                                  —
                                </Typography>
                              )}
                            </TableCell>
                            <TableCell align='right'>
                              <Stack direction='row' spacing={1} justifyContent='flex-end'>
                                <IconButton
                                  size='small'
                                  sx={{ color: 'text.disabled' }}
                                  onClick={() => handleViewClick(exercise.unitId)}
                                >
                                  <VisibilityOutlined fontSize='small' />
                                </IconButton>
                                <IconButton
                                  size='small'
                                  sx={{ color: 'text.disabled' }}
                                  onClick={() => handleStartEdit(exercise)}
                                >
                                  <EditOutlined fontSize='small' />
                                </IconButton>

                                <IconButton
                                  size='small'
                                  sx={{ color: 'text.disabled' }}
                                  onClick={() => handleEditContentClick(exercise.unitId)}
                                >
                                  <EditNoteOutlined fontSize='small' />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Collapse>
              </Box>
            );
          })}

          {/* Hiển thị loading khi đang tải thêm */}
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={32} />
            </Box>
          )}

          {/* Thông báo hết dữ liệu */}
          {!hasMore && sections.length > 0 && (
            <Typography color='text.secondary' align='center' sx={{ py: 2 }}>
              Đã hiển thị tất cả bài tập.
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
}
