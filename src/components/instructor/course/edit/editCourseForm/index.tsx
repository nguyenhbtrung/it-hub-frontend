'use client';

import { Box, TextField, MenuItem, IconButton, Button, Chip, Paper, Typography, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import RichTextEditor from '@/components/admin/common/richTextEditor';

export default function EditCourseForm() {
  const [requirements, setRequirements] = useState([
    'Kiến thức HTML, CSS, Javascript cơ bản',
    'Máy tính cá nhân có kết nối internet',
  ]);

  const [outcomes, setOutcomes] = useState([
    'Xây dựng được ứng dụng web hiện đại với ReactJS',
    'Nắm vững TypeScript để viết code an toàn và dễ bảo trì',
  ]);

  const [tags, setTags] = useState(['ReactJS', 'Next.js', 'TypeScript']);
  const [newTag, setNewTag] = useState('');
  const [detailedDescription, setDetailedDescription] = useState('');

  const addRequirement = () => {
    setRequirements([...requirements, '']);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const updateRequirement = (index: number, value: string) => {
    const newRequirements = [...requirements];
    newRequirements[index] = value;
    setRequirements(newRequirements);
  };

  const addOutcome = () => {
    setOutcomes([...outcomes, '']);
  };

  const removeOutcome = (index: number) => {
    setOutcomes(outcomes.filter((_, i) => i !== index));
  };

  const updateOutcome = (index: number, value: string) => {
    const newOutcomes = [...outcomes];
    newOutcomes[index] = value;
    setOutcomes(newOutcomes);
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 6,
        border: 1,
        borderColor: 'divider',
        borderRadius: 3,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <Box>
          <Typography variant='h5' fontWeight='bold' gutterBottom>
            Thông tin tổng quan khóa học
          </Typography>
          <Typography variant='body1' color='text.secondary'>
            Chỉnh sửa thông tin cơ bản, mô tả, media và các yêu cầu cho khóa học của bạn.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Tiêu đề khóa học */}
          <Box>
            <Typography variant='subtitle2' gutterBottom>
              Tiêu đề khóa học
            </Typography>
            <TextField fullWidth defaultValue='Lập trình Web Frontend Nâng cao' variant='outlined' size='small' />
          </Box>

          {/* Mô tả ngắn */}
          <Box>
            <Typography variant='subtitle2' gutterBottom>
              Mô tả ngắn
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              defaultValue='Khóa học này cung cấp kiến thức sâu về ReactJS, Next.js và TypeScript, giúp học viên xây dựng các ứng dụng web hiện đại và hiệu suất cao.'
              variant='outlined'
              size='small'
            />
          </Box>

          {/* Mô tả chi tiết */}
          <Box>
            <Typography variant='subtitle2' gutterBottom>
              Mô tả chi tiết
            </Typography>
            <RichTextEditor value={detailedDescription} onChange={setDetailedDescription} />
          </Box>

          {/* Danh mục, trình độ */}
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant='subtitle2' gutterBottom>
                Danh mục
              </Typography>
              <TextField select fullWidth defaultValue='Lập trình Web' size='small'>
                <MenuItem value='Lập trình Web'>Lập trình Web</MenuItem>
                <MenuItem value='Phát triển Di động'>Phát triển Di động</MenuItem>
                <MenuItem value='Khoa học Dữ liệu'>Khoa học Dữ liệu</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant='subtitle2' gutterBottom>
                Danh mục con
              </Typography>
              <TextField select fullWidth defaultValue='Frontend' size='small'>
                <MenuItem value='Frontend'>Frontend</MenuItem>
                <MenuItem value='Backend'>Backend</MenuItem>
                <MenuItem value='Fullstack'>Fullstack</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant='subtitle2' gutterBottom>
                Trình độ
              </Typography>
              <TextField select fullWidth defaultValue='Nâng cao' size='small'>
                <MenuItem value='Cơ bản'>Cơ bản</MenuItem>
                <MenuItem value='Trung cấp'>Trung cấp</MenuItem>
                <MenuItem value='Nâng cao'>Nâng cao</MenuItem>
                <MenuItem value='Chuyên gia'>Chuyên gia</MenuItem>
              </TextField>
            </Grid>
          </Grid>

          {/* Yêu cầu khóa học */}
          <Box>
            <Typography variant='subtitle2' gutterBottom>
              Yêu cầu khóa học
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {requirements.map((req, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    value={req}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    size='small'
                  />
                  <IconButton onClick={() => removeRequirement(index)} size='small'>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant='outlined'
                startIcon={<AddIcon />}
                onClick={addRequirement}
                sx={{
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  color: 'text.secondary',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                Thêm yêu cầu
              </Button>
            </Box>
          </Box>

          {/* Kết quả học tập */}
          <Box>
            <Typography variant='subtitle2' gutterBottom>
              Kết quả học tập (Key takeaways)
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {outcomes.map((outcome, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 1 }}>
                  <TextField
                    fullWidth
                    value={outcome}
                    onChange={(e) => updateOutcome(index, e.target.value)}
                    size='small'
                  />
                  <IconButton onClick={() => removeOutcome(index)} size='small'>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              ))}
              <Button
                variant='outlined'
                startIcon={<AddIcon />}
                onClick={addOutcome}
                sx={{
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  color: 'text.secondary',
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                Thêm kết quả
              </Button>
            </Box>
          </Box>

          {/* Tags */}
          <Box>
            <Typography variant='subtitle2' gutterBottom>
              Tags
            </Typography>
            <Paper
              variant='outlined'
              sx={{
                p: 2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                alignItems: 'center',
              }}
            >
              {tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => removeTag(tag)}
                  deleteIcon={<CloseIcon />}
                  sx={{
                    bgcolor: 'action.selected',
                    '& .MuiChip-deleteIcon': { fontSize: 16 },
                  }}
                />
              ))}
              <TextField
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder='Thêm tag...'
                variant='standard'
                size='small'
                sx={{ flex: 1, minWidth: 120 }}
                InputProps={{ disableUnderline: true }}
              />
            </Paper>
          </Box>

          {/* Ảnh bìa và Video */}
          <Grid container spacing={4}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant='subtitle2' gutterBottom>
                Ảnh bìa khóa học
              </Typography>
              <Paper
                variant='outlined'
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'center',
                  borderStyle: 'dashed',
                  borderWidth: 2,
                }}
              >
                <Box
                  component='img'
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuDNhF2Qs5J-NTY_OoDBq0VvvuDVgjMZqYDO4RK1KtzNq3np6M4kx8auktG5pNncK7c04sD5inPvVqmZV083iyFfWa-C_Ujd1EXPp_J7SRDqiONChTsEOQ7Zlww0yHt8F9euaM4gG7P7MkaKYgM1XMztjG07N9SecOKMdPcgW3RDL2Rwb2iYESO5C1JG-RTUO2wWxyY8aOnUUjkXc8KWt7yQmmDXpa-qEN5K2EfL1prih64b1l7rCn9dBwGEa9Fc0WMW9Ra8uk7rBSI'
                  alt='Ảnh bìa khóa học hiện tại'
                  sx={{
                    width: '100%',
                    height: 128,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mb: 2,
                  }}
                />
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <UploadFileIcon color='action' />
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  Kéo thả hoặc{' '}
                  <Button variant='text' size='small'>
                    tải lên
                  </Button>
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  PNG, JPG, GIF (tối đa 5MB)
                </Typography>
              </Paper>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant='subtitle2' gutterBottom>
                Video quảng cáo
              </Typography>
              <Paper
                variant='outlined'
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  height: '100%',
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    bgcolor: 'action.hover',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  <VideocamIcon color='action' />
                </Box>
                <Typography variant='body2' color='text.secondary'>
                  Kéo thả hoặc{' '}
                  <Button variant='text' size='small'>
                    tải lên video
                  </Button>
                </Typography>
                <Typography variant='caption' color='text.secondary'>
                  MP4, MOV (tối đa 500MB)
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Paper>
  );
}
