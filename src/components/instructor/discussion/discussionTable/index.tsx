'use client';

import { useState } from 'react';
import { Paper, Avatar, Chip, IconButton, Box, Typography } from '@mui/material';
import { Visibility, Reply, Delete } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Discussion, DiscussionStatus } from '../types';
import { useMounted } from '@/hooks/useMounted';

const discussions: Discussion[] = [
  {
    id: 1,
    topic: 'Thắc mắc về bài tập cuối khóa',
    course: 'Lập trình Web Frontend Nâng cao',
    sender: {
      name: 'Nguyễn Văn An',
      avatar: 'https://picsum.photos/200?random=5',
    },
    time: '2 giờ trước',
    status: 'unanswered',
    statusText: 'Chưa trả lời',
  },
  {
    id: 2,
    topic: 'Lỗi cài đặt môi trường Python',
    course: 'Python cho Khoa học Dữ liệu',
    sender: {
      name: 'Trần Thị Bích',
      avatar: 'https://picsum.photos/200?random=4',
    },
    time: 'Hôm qua',
    status: 'answered',
    statusText: 'Đã trả lời',
  },
  {
    id: 3,
    topic: 'Cách chọn font chữ phù hợp?',
    course: 'Thiết kế Giao diện UI/UX Cơ bản',
    sender: {
      name: 'Lê Minh Cường',
      avatar: 'https://picsum.photos/200?random=1',
    },
    time: '3 ngày trước',
    status: 'answered',
    statusText: 'Đã trả lời',
  },
  {
    id: 4,
    topic: 'Góp ý về nội dung khóa học',
    course: 'Quản lý Dự án Phần mềm',
    sender: {
      name: 'Phạm Thị Dung',
      avatar: 'https://picsum.photos/200?random=2',
    },
    time: '5 ngày trước',
    status: 'unanswered',
    statusText: 'Chưa trả lời',
  },
  {
    id: 5,
    topic: 'Không thể truy cập vào tài liệu bài 3',
    course: 'Lập trình Web Frontend Nâng cao',
    sender: {
      name: 'Hoàng Văn Giang',
      avatar: 'https://picsum.photos/200?random=3',
    },
    time: '1 tuần trước',
    status: 'answered',
    statusText: 'Đã trả lời',
  },
];

const getStatusColor = (status: DiscussionStatus) => {
  switch (status) {
    case 'answered':
      return {
        bgColor: 'success.light',
        textColor: 'success.dark',
      };
    case 'unanswered':
      return {
        bgColor: 'error.light',
        textColor: 'error.dark',
      };
    default:
      return {
        bgColor: 'grey.200',
        textColor: 'grey.800',
      };
  }
};

export default function DiscussionDataGrid() {
  const mounted = useMounted();

  const handleView = (id: number) => {
    console.log('View discussion:', id);
    // Add view logic here
  };

  const handleReply = (id: number) => {
    console.log('Reply to discussion:', id);
    // Add reply logic here
  };

  const handleDelete = (id: number) => {
    console.log('Delete discussion:', id);
    // Add delete logic here
  };

  const columns: GridColDef[] = [
    {
      field: 'topic',
      headerName: 'Chủ đề',
      flex: 2,
      minWidth: 250,
      renderHeader: () => (
        <Typography variant='caption' sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase' }}>
          Chủ đề
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Box height='100%' display='flex' alignItems='center'>
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'course',
      headerName: 'Khóa học',
      flex: 2,
      minWidth: 200,
      renderHeader: () => (
        <Typography variant='caption' sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase' }}>
          Khóa học
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Box height='100%' display='flex' alignItems='center'>
          <Typography variant='body2' color='text.secondary'>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'sender',
      headerName: 'Người gửi',
      flex: 1.5,
      minWidth: 180,
      renderHeader: () => (
        <Typography variant='caption' sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase' }}>
          Người gửi
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, height: '100%' }}>
          <Avatar src={params.value.avatar} sx={{ width: 32, height: 32 }} />
          <Typography variant='body2' sx={{ fontWeight: 500 }}>
            {params.value.name}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'time',
      headerName: 'Thời gian',
      flex: 1,
      minWidth: 120,
      renderHeader: () => (
        <Typography variant='caption' sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase' }}>
          Thời gian
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Box height='100%' display='flex' alignItems='center'>
          <Typography variant='body2' color='text.secondary'>
            {params.value}
          </Typography>
        </Box>
      ),
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      flex: 1,
      minWidth: 130,
      renderHeader: () => (
        <Typography variant='caption' sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase' }}>
          Trạng thái
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => {
        const statusColor = getStatusColor(params.row.status);
        return (
          <Chip
            label={params.row.statusText}
            size='small'
            sx={{
              backgroundColor: statusColor.bgColor,
              color: statusColor.textColor,
              fontWeight: 500,
              fontSize: '0.75rem',
              height: 24,
              '& .MuiChip-label': {
                px: 1.5,
                py: 0.25,
              },
            }}
          />
        );
      },
    },
    {
      field: 'actions',
      headerName: 'Hành động',
      flex: 1,
      minWidth: 150,
      sortable: false,
      filterable: false,
      renderHeader: () => (
        <Typography variant='caption' sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'uppercase' }}>
          Hành động
        </Typography>
      ),
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: 'flex', gap: 1, height: '100%' }}>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              handleView(params.row.id);
            }}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'text.primary',
              },
            }}
            title='Xem chi tiết'
          >
            <Visibility fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              handleReply(params.row.id);
            }}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'text.primary',
              },
            }}
            title='Trả lời'
          >
            <Reply fontSize='small' />
          </IconButton>
          <IconButton
            size='small'
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(params.row.id);
            }}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'text.primary',
              },
            }}
            title='Xóa'
          >
            <Delete fontSize='small' />
          </IconButton>
        </Box>
      ),
    },
  ];

  if (!mounted) return;

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        overflow: 'hidden',
        height: 500,
        width: '100%',
      }}
    >
      <DataGrid
        rows={discussions}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          border: 'none',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'grey.50',
            // borderBottom: '1px solid',
            borderColor: 'divider',
          },
          '& .MuiDataGrid-columnHeader': {
            py: 2,
          },
          '& .MuiDataGrid-cell': {
            // py: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
          },
          '& .MuiDataGrid-row': {
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
            '&.Mui-selected': {
              backgroundColor: 'action.selected',
              '&:hover': {
                backgroundColor: 'action.selected',
              },
            },
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: '1px solid',
            borderColor: 'divider',
          },
        }}
      />
    </Paper>
  );
}
