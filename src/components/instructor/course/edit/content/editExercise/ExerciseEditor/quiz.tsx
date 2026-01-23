'use client';

import { useState, useEffect, useCallback } from 'react';
import type { JSONContent } from '@tiptap/react';
import EditorBase from '@/components/common/richText/editor/editorBase';
import EditExerciseHeader from '../header';
import {
  Box,
  Container,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
  Alert,
  Grid,
  Collapse,
  Chip,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import AddIcon from '@mui/icons-material/Add';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import ReorderIcon from '@mui/icons-material/Reorder';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import UnfoldLessIcon from '@mui/icons-material/UnfoldLess';

import { updateCourseTotalDuration } from '@/services/course.service';
import { updateExercise } from '@/services/exercise.service';
import { uploadFile } from '@/services/client/file.service';
import { addMaterial } from '@/services/unit.service';
import { useNotification } from '@/contexts/notificationContext';
import { deleteFile } from '@/services/file.service';

// DnD Kit imports
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ExerciseEditorProps {
  exercise: any;
  courseId: string;
  accessToken: string;
}

interface QuizOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  id: string;
  question: JSONContent;
  options: QuizOption[];
  explanation: JSONContent;
  isExpanded?: boolean; // Thêm trạng thái đóng/mở
}

// Sortable component for each question
function SortableQuestionItem({
  question,
  index,
  onUpdate,
  onRemove,
  onToggleExpand,
}: {
  question: QuizQuestion;
  index: number;
  onUpdate: (id: string, updatedQuestion: QuizQuestion) => void;
  onRemove: (id: string) => void;
  onToggleExpand: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: question.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move' as const,
  };

  // Initialize JSONContent for question and explanation if not present
  const [questionContent, setQuestionContent] = useState<JSONContent>(
    question.question || { type: 'doc', content: [{ type: 'paragraph' }] }
  );
  const [explanationContent, setExplanationContent] = useState<JSONContent>(
    question.explanation || { type: 'doc', content: [{ type: 'paragraph' }] }
  );

  // Handle option changes
  const handleOptionChange = (optionId: string, field: keyof QuizOption, value: any) => {
    const updatedOptions = question.options.map((opt) => (opt.id === optionId ? { ...opt, [field]: value } : opt));
    onUpdate(question.id, { ...question, options: updatedOptions });
  };

  const addOption = () => {
    if (question.options.length < 6) {
      const newOption: QuizOption = {
        id: `opt-${Date.now()}-${Math.random()}`,
        text: '',
        isCorrect: false,
      };
      onUpdate(question.id, {
        ...question,
        options: [...question.options, newOption],
      });
    }
  };

  const removeOption = (optionId: string) => {
    if (question.options.length > 2) {
      const updatedOptions = question.options.filter((opt) => opt.id !== optionId);
      onUpdate(question.id, { ...question, options: updatedOptions });
    }
  };

  // Update question content when editor changes
  useEffect(() => {
    onUpdate(question.id, { ...question, question: questionContent });
  }, [questionContent]);

  // Update explanation content when editor changes
  useEffect(() => {
    onUpdate(question.id, { ...question, explanation: explanationContent });
  }, [explanationContent]);

  // Helper function to extract text from JSONContent
  const getQuestionPreview = (content: JSONContent): string => {
    if (!content.content) return 'Chưa có nội dung';

    let text = '';
    const extractText = (node: JSONContent) => {
      if (node.type === 'text' && node.text) {
        text += node.text + ' ';
      }
      if (node.content) {
        node.content.forEach(extractText);
      }
    };

    content.content.forEach(extractText);
    return text.trim().substring(0, 100) + (text.length > 100 ? '...' : '');
  };

  // Count correct answers
  const correctAnswersCount = question.options.filter((opt) => opt.isCorrect).length;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      sx={{
        mb: 2,
        border: '1px solid #e0e0e0',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#f5f5f5',
          px: 2,
          py: 1,
          borderBottom: '1px solid #e0e0e0',
          cursor: 'pointer',
        }}
        onClick={() => onToggleExpand(question.id)}
      >
        <IconButton
          size='small'
          {...attributes}
          {...listeners}
          sx={{ mr: 1, cursor: 'grab' }}
          onClick={(e) => e.stopPropagation()}
        >
          <DragHandleIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant='subtitle1' sx={{ fontWeight: 600, minWidth: 100 }}>
            Câu {index + 1}
          </Typography>

          <Chip label={`${question.options.length} lựa chọn`} size='small' variant='outlined' color='primary' />

          <Chip
            label={`${correctAnswersCount} đáp án đúng`}
            size='small'
            variant='outlined'
            color={correctAnswersCount > 0 ? 'success' : 'error'}
          />

          <Typography
            variant='body2'
            color='text.secondary'
            sx={{
              flexGrow: 1,
              fontStyle: question.question?.content ? 'normal' : 'italic',
            }}
          >
            {getQuestionPreview(question.question)}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              onToggleExpand(question.id);
            }}
          >
            {question.isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>

          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              onRemove(question.id);
            }}
            color='error'
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <Collapse in={question.isExpanded}>
        <CardContent>
          {/* Question Editor */}
          <Box sx={{ mb: 3 }}>
            <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
              Nội dung câu hỏi
            </Typography>
            <EditorBase
              value={questionContent}
              onChange={setQuestionContent}
              borderRadius={1}
              height={120}
              placeholder='Nhập nội dung câu hỏi...'
            />
          </Box>

          {/* Options */}
          <Box sx={{ mb: 3 }}>
            <Typography variant='subtitle2' sx={{ mb: 2, fontWeight: 600 }}>
              Lựa chọn đáp án ({question.options.length}/6)
            </Typography>

            {question.options.map((option, optIndex) => (
              <Box
                key={option.id}
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  mb: 2,
                  p: 1,
                  border: '1px solid #e0e0e0',
                  borderRadius: 1,
                  bgcolor: option.isCorrect ? '#e8f5e9' : 'transparent',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.isCorrect}
                      onChange={(e) => handleOptionChange(option.id, 'isCorrect', e.target.checked)}
                      color='success'
                    />
                  }
                  label={`Đáp án đúng`}
                  sx={{ mr: 2, minWidth: 140 }}
                />

                <TextField
                  fullWidth
                  value={option.text}
                  onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
                  placeholder={`Nhập nội dung lựa chọn ${optIndex + 1}...`}
                  size='small'
                  multiline
                  maxRows={3}
                />

                {question.options.length > 2 && (
                  <IconButton size='small' onClick={() => removeOption(option.id)} color='error' sx={{ ml: 1 }}>
                    <DeleteIcon fontSize='small' />
                  </IconButton>
                )}
              </Box>
            ))}

            {question.options.length < 6 && (
              <Button startIcon={<AddIcon />} onClick={addOption} variant='outlined' size='small' sx={{ mt: 1 }}>
                Thêm lựa chọn
              </Button>
            )}

            <Alert severity='info' sx={{ mt: 2 }}>
              Cần ít nhất 2 lựa chọn. Đánh dấu ít nhất một đáp án đúng.
            </Alert>
          </Box>

          {/* Explanation Editor */}
          <Box>
            <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
              Giải thích đáp án (tùy chọn)
            </Typography>
            <EditorBase
              value={explanationContent}
              onChange={setExplanationContent}
              borderRadius={1}
              height={100}
              placeholder='Nhập giải thích cho đáp án...'
            />
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default function QuizEditor({ exercise, courseId, accessToken }: ExerciseEditorProps) {
  const { notify } = useNotification();

  // Parse quizzes from exercise data
  const parseQuizzesFromExercise = useCallback(() => {
    if (!exercise?.quizzes) return [];

    try {
      let parsedQuizzes: any[] = [];

      if (typeof exercise.quizzes === 'string') {
        parsedQuizzes = JSON.parse(exercise.quizzes);
      } else {
        parsedQuizzes = exercise.quizzes;
      }

      return Array.isArray(parsedQuizzes)
        ? parsedQuizzes.map((q: any, index: number) => ({
            id: q.id || `quiz-${Date.now()}-${index}`,
            question: q.question || { type: 'doc', content: [{ type: 'paragraph' }] },
            options: q.options || [
              { id: `opt-${Date.now()}-1`, text: '', isCorrect: false },
              { id: `opt-${Date.now()}-2`, text: '', isCorrect: false },
              { id: `opt-${Date.now()}-3`, text: '', isCorrect: false },
              { id: `opt-${Date.now()}-4`, text: '', isCorrect: false },
            ],
            explanation: q.explanation || { type: 'doc', content: [{ type: 'paragraph' }] },
            isExpanded: true, // Mặc định mở tất cả
          }))
        : [];
    } catch (error) {
      console.error('Error parsing quizzes:', error);
      return [];
    }
  }, [exercise]);

  // --- Khởi tạo State từ dữ liệu Backend ---
  const [description, setDescription] = useState(exercise?.description || '');
  const [duration, setDuration] = useState(exercise?.duration || 1800);
  const [passingScore, setPassingScore] = useState<number>(exercise?.passingScore || 5);
  const [quizzes, setQuizzes] = useState<QuizQuestion[]>(parseQuizzesFromExercise);
  const [allExpanded, setAllExpanded] = useState(true); // Trạng thái cho nút mở/đóng tất cả

  // Initialize with default question if empty
  useEffect(() => {
    if (quizzes.length === 0) {
      addNewQuestion();
    }
  }, []);

  // DnD Sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setQuizzes((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Add new question
  const addNewQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: crypto.randomUUID(),
      question: { type: 'doc', content: [{ type: 'paragraph' }] },
      options: [
        { id: `opt-${Date.now()}-1`, text: '', isCorrect: false },
        { id: `opt-${Date.now()}-2`, text: '', isCorrect: false },
        { id: `opt-${Date.now()}-3`, text: '', isCorrect: false },
        { id: `opt-${Date.now()}-4`, text: '', isCorrect: false },
      ],
      explanation: { type: 'doc', content: [{ type: 'paragraph' }] },
      isExpanded: true,
    };
    setQuizzes([...quizzes, newQuestion]);
  };

  // Update question
  const updateQuestion = (id: string, updatedQuestion: QuizQuestion) => {
    setQuizzes((prev) => prev.map((q) => (q.id === id ? updatedQuestion : q)));
  };

  // Remove question
  const removeQuestion = (id: string) => {
    if (quizzes.length > 1) {
      setQuizzes((prev) => prev.filter((q) => q.id !== id));
    } else {
      notify('warning', 'Cần ít nhất một câu hỏi');
    }
  };

  // Toggle expand/collapse for a single question
  const toggleQuestionExpand = (id: string) => {
    setQuizzes((prev) => prev.map((q) => (q.id === id ? { ...q, isExpanded: !q.isExpanded } : q)));
  };

  // Toggle expand/collapse all questions
  const toggleAllExpand = () => {
    const newExpandedState = !allExpanded;
    setAllExpanded(newExpandedState);
    setQuizzes((prev) => prev.map((q) => ({ ...q, isExpanded: newExpandedState })));
  };

  // Validate quizzes before save
  const validateQuizzes = (): boolean => {
    for (const quiz of quizzes) {
      // Check if question has content
      const questionHasContent = quiz.question?.content?.some((node: any) =>
        node.content?.some((textNode: any) => textNode.text?.trim())
      );

      if (!questionHasContent) {
        notify('error', 'Vui lòng nhập nội dung cho tất cả câu hỏi');
        return false;
      }

      // Check options
      const validOptions = quiz.options.filter((opt) => opt.text.trim() !== '');
      if (validOptions.length < 2) {
        notify('error', 'Mỗi câu hỏi cần ít nhất 2 lựa chọn có nội dung');
        return false;
      }

      // Check if at least one correct answer
      const hasCorrectAnswer = quiz.options.some((opt) => opt.isCorrect);
      if (!hasCorrectAnswer) {
        notify('error', 'Mỗi câu hỏi cần ít nhất một đáp án đúng');
        return false;
      }
    }
    return true;
  };

  // --- Xử lý Lưu nội dung ---
  const handleSaveContent = async () => {
    try {
      if (!exercise?.unitId) {
        notify('error', 'Không tìm thấy thông tin bài tập');
        return;
      }

      // Validate quizzes
      if (!validateQuizzes()) {
        return;
      }

      const payload = {
        description,
        duration: Number(duration),
        passingScore: Number(passingScore),
        quizzes: JSON.stringify(quizzes.map(({ isExpanded, ...rest }) => rest)),
      };

      const res = await updateExercise(exercise.unitId, payload);

      if (res?.success) {
        notify('success', 'Lưu nội dung thành công');
        await updateCourseTotalDuration(courseId);
      } else {
        throw new Error();
      }
    } catch (error) {
      notify('error', 'Lưu thất bại, vui lòng thử lại');
    }
  };

  return (
    <>
      <EditExerciseHeader title={exercise?.unit?.title || 'Chỉnh sửa bài tập'} onSave={handleSaveContent} />

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 4, bgcolor: '#f9fafb' }}>
        <Container maxWidth='lg'>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Cấu hình chung */}
            <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
                  Mô tả ngắn gọn
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder='Nhập mô tả cho học viên...'
                  size='small'
                />
              </Box>

              <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
                    Điểm đạt (0-10)
                  </Typography>
                  <TextField
                    type='number'
                    size='small'
                    value={passingScore}
                    onChange={(e) => setPassingScore(Number(e.target.value))}
                    inputProps={{ min: 0, max: 10, step: 0.5 }}
                    fullWidth
                  />
                </Box>

                <Box sx={{ flex: 1 }}>
                  <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
                    Thời lượng (phút)
                  </Typography>
                  <TextField
                    type='number'
                    size='small'
                    value={Math.floor(duration / 60)}
                    onChange={(e) => {
                      const minutes = Number(e.target.value);
                      setDuration(minutes * 60);
                    }}
                    inputProps={{ min: 1, step: 1 }}
                    fullWidth
                  />
                </Box>
              </Box>
            </Paper>

            {/* Quiz Questions Section */}
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant='h6' sx={{ fontWeight: 600, mb: 0.5 }}>
                    Câu hỏi trắc nghiệm
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {quizzes.length} câu hỏi • Kéo thả để sắp xếp thứ tự
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    startIcon={allExpanded ? <UnfoldLessIcon /> : <UnfoldMoreIcon />}
                    variant='outlined'
                    onClick={toggleAllExpand}
                  >
                    {allExpanded ? 'Đóng tất cả' : 'Mở tất cả'}
                  </Button>

                  <Button startIcon={<AddIcon />} variant='contained' onClick={addNewQuestion}>
                    Thêm câu hỏi
                  </Button>
                </Box>
              </Box>

              {quizzes.length > 0 ? (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={quizzes.map((item) => item.id)} strategy={verticalListSortingStrategy}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      {quizzes.map((question, index) => (
                        <SortableQuestionItem
                          key={question.id}
                          question={question}
                          index={index}
                          onUpdate={updateQuestion}
                          onRemove={removeQuestion}
                          onToggleExpand={toggleQuestionExpand}
                        />
                      ))}
                    </Box>
                  </SortableContext>
                </DndContext>
              ) : (
                <Alert severity='info' sx={{ mt: 2 }}>
                  Chưa có câu hỏi nào. Hãy thêm câu hỏi đầu tiên.
                </Alert>
              )}

              {/* Nút thêm câu hỏi ở dưới cùng */}
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button
                  startIcon={<AddIcon />}
                  variant='contained'
                  size='large'
                  onClick={addNewQuestion}
                  sx={{ px: 4, py: 1.5 }}
                >
                  Thêm câu hỏi mới
                </Button>
              </Box>

              <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #e0e0e0' }}>
                <Typography variant='body2' color='text.secondary'>
                  <strong>Lưu ý:</strong> Mỗi câu hỏi cần có ít nhất 2 lựa chọn và tối đa 6 lựa chọn. Đánh dấu ít nhất
                  một đáp án đúng cho mỗi câu hỏi. Nhấn vào tiêu đề câu hỏi để đóng/mở chi tiết.
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </>
  );
}
