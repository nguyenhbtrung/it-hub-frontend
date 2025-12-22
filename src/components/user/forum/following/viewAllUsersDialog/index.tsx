'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment,
  Box,
  Typography,
  Avatar,
  Chip,
  IconButton,
} from '@mui/material';
import { useState } from 'react';

interface ViewAllUsersDialogProps {
  open: boolean;
  onClose: () => void;
  totalUsers: number;
}

// Dữ liệu mẫu cho tất cả người dùng
const allUsers = Array.from({ length: 48 }, (_, i) => ({
  id: `user-${i}`,
  name: `Người dùng ${i + 1}`,
  role: i % 3 === 0 ? 'Giảng viên' : i % 3 === 1 ? 'Sinh viên' : 'Quản trị viên',
  reputation: Math.floor(Math.random() * 20000),
  status: i % 4 === 0 ? 'online' : i % 4 === 1 ? 'special' : 'offline',
  isVerified: i % 5 === 0,
  isAdmin: i % 10 === 0,
}));

export default function ViewAllUsersDialog({ open, onClose, totalUsers }: ViewAllUsersDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='md'
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <DialogTitle>
        <Typography variant='h6' fontWeight='bold'>
          Tất cả người dùng ({totalUsers})
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Danh sách đầy đủ các người dùng bạn đang theo dõi
        </Typography>
      </DialogTitle>

      <DialogContent>
        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder='Tìm kiếm người dùng...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <span className='material-symbols-outlined'>search</span>
              </InputAdornment>
            ),
          }}
        />

        {/* Users List */}
        <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
          {filteredUsers.map((user) => (
            <Box
              key={user.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 2,
                mb: 1,
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Avatar sx={{ width: 40, height: 40, mr: 2 }} src={`https://i.pravatar.cc/150?img=${user.id}`} />
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant='body2' fontWeight='bold'>
                    {user.name}
                  </Typography>
                  {user.isVerified && (
                    <span className='material-symbols-outlined' style={{ fontSize: 14, color: 'primary.main' }}>
                      verified
                    </span>
                  )}
                </Box>
                <Typography variant='caption' color='text.secondary'>
                  {user.role} • {user.reputation.toLocaleString()} điểm
                </Typography>
              </Box>
              <Button size='small' variant='outlined' sx={{ minWidth: 120 }}>
                Đang theo dõi
              </Button>
            </Box>
          ))}
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button onClick={onClose} color='inherit'>
          Đóng
        </Button>
        <Button
          variant='contained'
          onClick={onClose}
          startIcon={<span className='material-symbols-outlined'>check</span>}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
}
