'use client';

import * as React from 'react';
import { Box, TextField, MenuItem, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { operatorLabelsMap } from '@/lib/const/filter';
import { FieldType, FilterItem } from '@/types/filter';
import { useGridApiContext } from '@mui/x-data-grid';
import { getDefaultFilter, getOperatorsForField } from '@/lib/utils/filter';

declare module '@mui/x-data-grid' {
  interface FilterPanelPropsOverrides {
    schema: Record<string, FieldType>;
    fieldsMap: Record<string, string>;
    filters: FilterItem[];
    setFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>;
  }
}

interface CustomFilterPanelProps<T> {
  schema: Record<keyof T, FieldType>;
  fieldsMap: Record<keyof T, string>;
  filters: FilterItem[];
  setFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>;
}

export default function CustomFilterPanel<T>({ schema, fieldsMap, filters, setFilters }: CustomFilterPanelProps<T>) {
  const apiRef = useGridApiContext();
  const fields = Object.keys(schema);

  const handleAddFilter = () => {
    const defaultFilter = getDefaultFilter<T>(schema);
    setFilters((prev) => [...prev, defaultFilter]);
  };

  const handleDeleteFilter = (index: number) => {
    setFilters((prev) => {
      const next = prev.filter((_, i) => i !== index);
      if (next.length === 0) {
        apiRef.current.hideFilterPanel();
        return prev;
      }
      return next;
    });
  };

  const handleDeleteAllFilters = () => {
    const defaultFilter = getDefaultFilter<T>(schema);
    setFilters([defaultFilter]);
  };

  const handleChange = (index: number, key: keyof FilterItem, value: string) => {
    setFilters((prev) => prev.map((f, i) => (i === index ? { ...f, [key]: value } : f)));
  };

  if (filters.length === 0) {
    handleAddFilter();
    return;
  }

  return (
    <Box sx={{ width: 600 }}>
      <Box
        sx={{
          maxHeight: 300, // giới hạn chiều cao
          overflowY: 'auto', // thêm thanh cuộn dọc
          p: 1,
        }}
      >
        {filters.map((filter, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              gap: 1,
              m: 1,
              py: 0.5,
              // p: 1,
            }}
          >
            <IconButton onClick={() => handleDeleteFilter(index)}>
              <CloseIcon />
            </IconButton>
            <TextField
              size='small'
              select
              label='Cột'
              value={filter.field}
              onChange={(e) => handleChange(index, 'field', e.target.value)}
              sx={{ flex: 1 }}
              slotProps={{
                input: { sx: { borderRadius: 0.5 } },
              }}
            >
              {fields.map((f) => (
                <MenuItem key={f} value={f}>
                  {fieldsMap[f as keyof T]}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              size='small'
              select
              label='Toán tử'
              value={filter.operator}
              onChange={(e) => handleChange(index, 'operator', e.target.value)}
              sx={{ flex: 1 }}
              slotProps={{
                input: { sx: { borderRadius: 0.5 } },
              }}
            >
              {getOperatorsForField<T>(filter.field, schema).map((op) => (
                <MenuItem key={op} value={op}>
                  {operatorLabelsMap[op]}
                </MenuItem>
              ))}
            </TextField>
            {filter.operator === 'between' ? (
              <>
                <TextField
                  size='small'
                  label='Từ'
                  value={filter.value.split(',')[0] ?? ''}
                  onChange={(e) => {
                    const [_, end] = filter.value.split(',');
                    handleChange(index, 'value', `${e.target.value},${end ?? ''}`);
                  }}
                  sx={{ flex: 0.6 }}
                  slotProps={{ input: { sx: { borderRadius: 0.5 } } }}
                />
                <TextField
                  size='small'
                  label='Đến'
                  value={filter.value.split(',')[1] ?? ''}
                  onChange={(e) => {
                    const [start] = filter.value.split(',');
                    handleChange(index, 'value', `${start ?? ''},${e.target.value}`);
                  }}
                  sx={{ flex: 0.6 }}
                  slotProps={{ input: { sx: { borderRadius: 0.5 } } }}
                />
              </>
            ) : (
              <TextField
                size='small'
                label='Giá trị'
                value={filter.value}
                onChange={(e) => handleChange(index, 'value', e.target.value)}
                sx={{ flex: 1.2 }}
                slotProps={{ input: { sx: { borderRadius: 0.5 } } }}
              />
            )}
          </Box>
        ))}
      </Box>
      <Box
        display='flex'
        flexDirection='row'
        justifyContent='space-between'
        borderTop={1}
        borderColor='divider'
        py={1}
        px={2}
      >
        <Button variant='text' startIcon={<AddIcon />} onClick={handleAddFilter} sx={{ px: '8px', py: '6px' }}>
          Thêm bộ lọc
        </Button>
        <Button
          variant='text'
          startIcon={<DeleteIcon />}
          onClick={handleDeleteAllFilters}
          sx={{ px: '8px', py: '6px' }}
        >
          Xoá tất cả
        </Button>
      </Box>
    </Box>
  );
}
