'use client';

import {
  Box,
  TextField,
  MenuItem,
  IconButton,
  Button,
  Chip,
  Paper,
  Typography,
  Grid,
  Autocomplete,
  CircularProgress,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import RichTextEditor from '@/components/common/richTextEditor';
import debounce from 'lodash/debounce';
import { Tag } from '@/types/tag';
import { getTags } from '@/services/tag.service';
import { CourseDetail } from './types';
import { Category } from '@/types/category';
import { getCategories } from '@/services/category.service';
import { levelLabelsMap } from '@/lib/const/course';
import { CourseLevel } from '@/types/course';

interface EditCourseDetailFormProps {
  courseDetail: CourseDetail | null;
}

export default function EditCourseDetailForm({ courseDetail }: EditCourseDetailFormProps) {
  const [title, setTitle] = useState(courseDetail?.title || '');
  const [shortDescription, setShortDescription] = useState(courseDetail?.shortDescription || '');

  const [categoryId, setCategoryId] = useState(courseDetail?.category.id || '');
  const [subCategoryId, setSubCategoryId] = useState(courseDetail?.subCategory?.id || '');

  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  const [level, setLevel] = useState<CourseLevel>(courseDetail?.level || 'beginner');

  const [requirements, setRequirements] = useState(courseDetail?.requirements || []);
  const [outcomes, setOutcomes] = useState(courseDetail?.keyTakeaway || []);

  const [tags, setTags] = useState(courseDetail?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [value, setValue] = useState(null);
  const [detailedDescription, setDetailedDescription] = useState('');
  const [suggestedTags, setSuggestedTags] = useState<Tag[]>([]);

  useEffect(() => {
    async function fetchRoot() {
      setLoadingCategories(true);
      const res = await getCategories({ all: true, root: true });
      if (res?.success && res?.data) {
        setCategories(res.data || []);
      }
      setLoadingCategories(false);
    }

    fetchRoot();
  }, []);

  useEffect(() => {
    if (!categoryId) {
      setSubCategories([]);
      setSubCategoryId('');
      return;
    }

    async function fetchChildren() {
      setLoadingSubCategories(true);

      const res = await getCategories({ all: true, parentId: categoryId, root: false });
      if (res?.success && res?.data) {
        setSubCategories(res.data || []);
        // reset selected subcategory if not in new list
        if (!res.data?.some((c: Category) => c.id === subCategoryId)) {
          setSubCategoryId('');
        }
      }
      setLoadingSubCategories(false);
    }

    fetchChildren();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const handleSearch = debounce(async (keyword) => {
    const res = await getTags({ page: 1, limit: 10, q: keyword });
    if (res?.success && res?.data) setSuggestedTags(res.data);
  }, 300);

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

  const addTag = (newTag: string) => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
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
          <TextField
            fullWidth
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
            variant='outlined'
            size='small'
          />
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
            defaultValue={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
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
            <Select
              size='small'
              fullWidth
              value={categoryId}
              onChange={(e: SelectChangeEvent) => setCategoryId(e.target.value as string)}
              renderValue={(v) => {
                const found = categories.find((c) => c.id === v);
                return found ? found.name : '';
              }}
            >
              {loadingCategories ? (
                <MenuItem value=''>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={18} />
                    <Typography>Đang tải danh mục...</Typography>
                  </Box>
                </MenuItem>
              ) : (
                categories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))
              )}
            </Select>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant='subtitle2' gutterBottom>
              Danh mục con
            </Typography>
            <Select
              size='small'
              fullWidth
              value={subCategoryId}
              onChange={(e: SelectChangeEvent) => setSubCategoryId(e.target.value as string)}
              renderValue={(v) => {
                const found = subCategories.find((c) => c.id === v);
                return found ? found.name : '';
              }}
            >
              {loadingSubCategories ? (
                <MenuItem value=''>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={18} />
                    <Typography>Đang tải danh mục con...</Typography>
                  </Box>
                </MenuItem>
              ) : subCategories.length > 0 ? (
                subCategories.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value=''>
                  <em>Không có danh mục con</em>
                </MenuItem>
              )}
            </Select>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant='subtitle2' gutterBottom>
              Trình độ
            </Typography>
            <Select
              size='small'
              fullWidth
              value={level}
              onChange={(e: SelectChangeEvent) => setLevel(e.target.value as CourseLevel)}
              renderValue={(v) => levelLabelsMap[level]}
            >
              <MenuItem value='beginner'>Cơ bản</MenuItem>
              <MenuItem value='intermediate'>Trung cấp</MenuItem>
              <MenuItem value='advanced'>Nâng cao</MenuItem>
              <MenuItem value='expert'>Chuyên gia</MenuItem>
            </Select>
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
            <Autocomplete
              freeSolo
              value={value}
              inputValue={newTag}
              onInputChange={(event, newInputValue) => {
                setNewTag(newInputValue);
                handleSearch(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Thêm tag...'
                  variant='standard'
                  size='small'
                  sx={{ flex: 1, minWidth: 240 }}
                />
              )}
              options={suggestedTags}
              getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
              filterOptions={(x) => x}
              onChange={(event, newValue) => {
                if (typeof newValue === 'string') {
                  addTag(newValue);
                } else if (newValue && newValue.name) {
                  const newTag = newValue.name;
                  addTag(newTag);
                }

                setNewTag('');
                setValue(null);
              }}
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
  );
}
