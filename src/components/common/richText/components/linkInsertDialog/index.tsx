// components/common/richText/components/linkInsertDialog.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useState } from 'react';

interface LinkInsertDialogProps {
  open: boolean;
  onClose: () => void;
  editor: any;
}

export function LinkInsertDialog({ open, onClose, editor }: LinkInsertDialogProps) {
  const previousUrl = editor.getAttributes('link')?.href || '';
  const [url, setUrl] = useState(previousUrl);

  const handleSave = () => {
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
    } else {
      try {
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
      } catch (e: any) {
        alert(e.message);
      }
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Thêm liên kết</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          label='URL'
          type='url'
          fullWidth
          variant='outlined'
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button onClick={handleSave} variant='contained' color='primary'>
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
}
