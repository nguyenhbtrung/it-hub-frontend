'use client';

import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?: 'primary' | 'error' | 'warning';
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog({
  open,
  title = 'Xác nhận',
  description = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  confirmColor = 'primary',
  onClose,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{cancelText}</Button>
        <Button color={confirmColor} onClick={onConfirm}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
