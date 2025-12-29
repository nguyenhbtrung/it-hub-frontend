'use client';

import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { getCategories } from '@/services/category.service';
import { createCourse } from '@/services/course.service';
import { useRouter } from 'next/navigation';
import { Category } from '@/types/category';

export default function AddCourse({ onCreated }: { onCreated?: () => void }) {
  const [open, setOpen] = useState(false);

  // form state
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState<string | ''>('');
  const [subCategoryId, setSubCategoryId] = useState<string | ''>('');

  // categories
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // fetch root categories when dialog opens
  useEffect(() => {
    if (!open) return;

    let mounted = true;
    async function fetchRoot() {
      setLoadingCategories(true);
      setError(null);
      const res = await getCategories({ all: true, root: true });
      if (res?.success && res?.data && mounted) {
        setCategories(res.data || []);
      } else {
        setError('Có lỗi xảy ra');
      }
      if (mounted) setLoadingCategories(false);
      //   try {
      //     const res = await fetch('/api/categories?all=true&root=true', {
      //       credentials: 'include',
      //     });
      //     const json = await res.json();
      //     if (!res.ok) throw new Error(json?.message || 'Lỗi khi lấy danh mục');
      //     if (mounted) setCategories(json.data || []);
      //   } catch (err: any) {
      //     setError(err?.message || 'Có lỗi xảy ra');
      //   } finally {
      //     if (mounted) setLoadingCategories(false);
      //   }
    }

    fetchRoot();
    return () => {
      mounted = false;
    };
  }, [open]);

  // fetch subcategories when categoryId changes
  useEffect(() => {
    if (!categoryId) {
      setSubCategories([]);
      setSubCategoryId('');
      return;
    }

    let mounted = true;
    async function fetchChildren() {
      setLoadingSubCategories(true);
      setError(null);

      const res = await getCategories({ all: true, parentId: categoryId, root: false });
      if (res?.success && res?.data && mounted) {
        setSubCategories(res.data || []);
        // reset selected subcategory if not in new list
        if (!res.data?.some((c: Category) => c.id === subCategoryId)) {
          setSubCategoryId('');
        }
      } else {
        setError('Có lỗi xảy ra');
      }
      if (mounted) setLoadingSubCategories(false);
      //   try {
      //     const res = await fetch(`/api/categories?all=true&parentId=${encodeURIComponent(categoryId)}`, {
      //       credentials: 'include',
      //     });
      //     const json = await res.json();
      //     if (!res.ok) throw new Error(json?.message || 'Lỗi khi lấy danh mục con');
      //     if (mounted) {
      //       setSubCategories(json.data || []);
      //       // reset selected subcategory if not in new list
      //       if (!json.data?.some((c: Category) => c.id === subCategoryId)) {
      //         setSubCategoryId('');
      //       }
      //     }
      //   } catch (err: any) {
      //     setError(err?.message || 'Có lỗi xảy ra');
      //   } finally {
      //     if (mounted) setLoadingSubCategories(false);
      //   }
    }

    fetchChildren();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const canSubmit = title.trim().length > 0 && categoryId && subCategoryId;

  async function handleCreate() {
    if (!canSubmit) return;
    const payload = {
      title: title.trim(),
      categoryId,
      subCategoryId,
    };
    const res = await createCourse(payload);
    if (!res.success) {
      console.log(res);
      setError('Thêm khoá học thất bại');
      return;
    }
    setTitle('');
    setCategoryId('');
    setSubCategoryId('');
    setOpen(false);
    router.refresh();

    // try {
    //   // Gọi API tạo khoá học (thay endpoint nếu bạn có API khác)
    //   const payload = {
    //     title: title.trim(),
    //     categoryId,
    //     subCategoryId,
    //   };

    //   const res = await fetch('/api/courses', {
    //     method: 'POST',
    //     credentials: 'include',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   const json = await res.json();
    //   if (!res.ok) {
    //     throw new Error(json?.message || 'Tạo khóa học thất bại');
    //   }

    //   // reset form và đóng dialog
    //   setTitle('');
    //   setCategoryId('');
    //   setSubCategoryId('');
    //   setOpen(false);

    //   if (onCreated) onCreated();
    // } catch (err: any) {
    //   setError(err?.message || 'Có lỗi xảy ra khi tạo khóa học');
    // }
  }

  return (
    <Box>
      <Button
        variant='contained'
        startIcon={<AddCircle />}
        sx={{ height: 40, fontWeight: 700, textTransform: 'none' }}
        onClick={() => setOpen(true)}
      >
        Thêm khóa học mới
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth='sm'>
        <DialogTitle>Thêm khóa học mới</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label='Tiêu đề khóa học'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              autoFocus
            />

            <FormControl fullWidth>
              <InputLabel id='category-label'>Danh mục</InputLabel>
              <Select
                labelId='category-label'
                value={categoryId}
                label='Danh mục'
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
            </FormControl>

            {/* Subcategory: chỉ hiển thị khi đã chọn category */}
            {categoryId ? (
              <FormControl fullWidth>
                <InputLabel id='sub-category-label'>Danh mục con</InputLabel>
                <Select
                  labelId='sub-category-label'
                  value={subCategoryId}
                  label='Danh mục con'
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
              </FormControl>
            ) : null}

            {error ? (
              <Typography color='error' variant='body2'>
                {error}
              </Typography>
            ) : null}
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button variant='contained' onClick={handleCreate} disabled={!canSubmit}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
