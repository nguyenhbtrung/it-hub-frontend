'use client';

import { useState } from 'react';
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
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { updateCourseTotalDuration } from '@/services/course.service';
import { updateExercise } from '@/services/exercise.service';
import { uploadFile } from '@/services/client/file.service';
import { addMaterial } from '@/services/unit.service';
import { useNotification } from '@/contexts/notificationContext';
import { deleteFile } from '@/services/file.service';

interface ExerciseEditorProps {
  exercise: any;
  courseId: string;
  accessToken: string;
}

interface Attachment {
  id: string;
  fileId: string;
  name: string;
  size: number;
  type: string;
  mimeType: string;
  url: string;
}

export default function AssignmentEditor({ exercise, courseId, accessToken }: ExerciseEditorProps) {
  const { notify } = useNotification();

  // --- Khởi tạo State từ dữ liệu Backend ---
  const [description, setDescription] = useState(exercise?.description || '');
  const [content, setContent] = useState<JSONContent>(
    exercise?.content || { type: 'doc', content: [{ type: 'paragraph' }] }
  );
  const [hasDeadline, setHasDeadline] = useState(!!exercise?.deadline);
  const [deadline, setDeadline] = useState(
    exercise?.deadline ? new Date(exercise.deadline).toISOString().slice(0, 16) : ''
  );
  const [passingScore, setPassingScore] = useState<number>(exercise?.passingScore || 5);

  // --- Khởi tạo attachments theo dữ liệu JSON cung cấp ---
  const [attachments, setAttachments] = useState<Attachment[]>(() => {
    if (exercise?.unit?.materials && Array.isArray(exercise.unit.materials)) {
      return exercise.unit.materials.map((item: any) => ({
        id: item.id,
        fileId: item.file.id,
        name: item.file.name,
        size: Number(item.file.size),
        type: item.file.type,
        mimeType: item.file.mimeType,
        url: item.file.url,
      }));
    }
    return [];
  });

  const [uploading, setUploading] = useState(false);

  // --- Xử lý Lưu nội dung ---
  const handleSaveContent = async () => {
    try {
      if (!exercise?.unitId) {
        notify('error', 'Không tìm thấy thông tin bài tập');
        return;
      }

      const payload = {
        content: JSON.stringify(content),
        description,
        deadline: hasDeadline && deadline ? new Date(deadline).toISOString() : null,
        passingScore: Number(passingScore),
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

  // --- Xử lý Upload File ---
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        // 1. Upload lên storage
        const fileRes = await uploadFile(file, true, accessToken);
        if (!fileRes?.success) throw new Error(`Lỗi tải lên: ${file.name}`);

        // 2. Liên kết file với Unit bài tập
        const materialRes = await addMaterial(exercise.unitId, { fileId: fileRes.data.id });
        if (!materialRes?.success) throw new Error(`Lỗi lưu tài nguyên: ${file.name}`);

        // 3. Cập nhật UI list
        const newAttachment: Attachment = {
          id: materialRes.data.id,
          fileId: fileRes.data.id,
          name: file.name,
          size: file.size,
          type: 'OTHER',
          mimeType: file.type,
          url: fileRes.data.url,
        };
        setAttachments((prev) => [...prev, newAttachment]);
      }
      notify('success', 'Đã tải lên tài nguyên thành công');
    } catch (error: any) {
      notify('error', error.message || 'Có lỗi xảy ra khi tải file');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleRemoveAttachment = async (id: string, fileId: string, name: string) => {
    try {
      const res = await deleteFile(fileId);
      if (!res?.success) throw new Error(`Lỗi khi xoá file: ${name}`);
      setAttachments((prev) => prev.filter((item) => item.id !== id));
    } catch (error: any) {
      notify('error', error.message || 'Có lỗi xảy ra khi tải file');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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

              {/* <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
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

                <Box sx={{ display: 'flex', flex: 2, alignItems: 'center' }}>
                  <FormControlLabel
                    control={<Checkbox checked={hasDeadline} onChange={(e) => setHasDeadline(e.target.checked)} />}
                    label='Có hạn chót nộp bài'
                  />
                  {hasDeadline && (
                    <TextField
                      // fullWidth
                      type='datetime-local'
                      size='small'
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      sx={{ mt: 1 }}
                      InputLabelProps={{ shrink: true }}
                    />
                  )}
                </Box>
              </Box> */}
            </Paper>

            <Paper sx={{ p: 3 }}>
              <Typography variant='subtitle2' sx={{ mb: 2, fontWeight: 600 }}>
                Tài nguyên đính kèm
              </Typography>

              <Box
                sx={{
                  border: '2px dashed',
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 3,
                  textAlign: 'center',
                  bgcolor: 'background.default',
                  mb: 2,
                }}
              >
                <input
                  accept='*/*'
                  style={{ display: 'none' }}
                  id='upload-file-exercise'
                  multiple
                  type='file'
                  onChange={handleFileUpload}
                />
                <label htmlFor='upload-file-exercise'>
                  <Button
                    variant='outlined'
                    component='span'
                    startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
                    disabled={uploading}
                  >
                    {uploading ? 'Đang tải lên...' : 'Thêm tài nguyên'}
                  </Button>
                </label>
              </Box>

              <List dense>
                {attachments.map((file) => (
                  <ListItem
                    key={file.id}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 1,
                      '&:hover': { bgcolor: 'action.hover' },
                    }}
                  >
                    <InsertDriveFileIcon sx={{ mr: 2, color: 'action.active' }} />
                    <ListItemText
                      primary={
                        <Typography
                          variant='body2'
                          component='a'
                          href={file.url}
                          target='_blank'
                          sx={{ textDecoration: 'none', color: 'primary.main', fontWeight: 500 }}
                        >
                          {file.name}
                        </Typography>
                      }
                      secondary={`${formatFileSize(file.size)} • ${file.mimeType}`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton edge='end' onClick={() => handleRemoveAttachment(file.id, file.fileId, file.name)}>
                        <DeleteIcon fontSize='small' color='error' />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Paper>

            {/* Trình soạn thảo nội dung chi tiết */}
            <Box>
              <Typography variant='subtitle2' sx={{ mb: 1, fontWeight: 600 }}>
                Nội dung chi tiết bài tập
              </Typography>
              <EditorBase
                value={content}
                onChange={setContent}
                borderRadius={0}
                height={500}
                placeholder='Nhập hướng dẫn chi tiết các bước thực hiện...'
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}
