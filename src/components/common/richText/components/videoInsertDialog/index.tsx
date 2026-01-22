/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNotification } from '@/contexts/notificationContext';

type VideoInsertDialogProps = {
  open: boolean;
  onClose: () => void;
  editor: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  uploadVideo?: (file: File) => Promise<{ fileId: string; url: string; metadata?: any }>;
};

export function VideoInsertDialog({ open, onClose, editor, uploadVideo }: VideoInsertDialogProps) {
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { notify } = useNotification();

  useEffect(() => {
    if (!file) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUrl('');
      setFile(null);
      setPreview(null);
      setLoading(false);
    }
  }, [open]);

  const onDropFile = useCallback((f: File | null) => {
    if (!f) return;
    setFile(f);
    setUrl(''); // prefer file preview over URL
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) onDropFile(f);
  };

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData('text');
    if (text && (text.startsWith('http://') || text.startsWith('https://'))) {
      setUrl(text);
      setFile(null);
    }
  }, []);

  const insertVideo = useCallback(async () => {
    let fileId = null;
    let src = url.trim();
    let poster = null;

    try {
      setLoading(true);
      if (file) {
        if (uploadVideo) {
          const result = await uploadVideo(file);
          fileId = result.fileId;
          src = result.url;
          poster = result?.metadata?.thumbnails?.[0];
        } else {
          // fallback to object URL
          src = preview || '';
        }
      }

      if (!src) {
        // nothing to insert
        setLoading(false);
        return;
      }

      editor
        .chain()
        .focus()
        .setVideo({
          src,
          fileId: fileId || undefined,
          poster,
        })
        .run();

      onClose();
    } catch (err: any) {
      console.error('Insert video failed', err);
      notify('error', err.message || 'Có lỗi xảy ra, vui lòng thử lại', { vertical: 'top', horizontal: 'center' });
      setLoading(false);
    }
  }, [url, file, preview, editor, uploadVideo, onClose, notify]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogTitle>
        Chèn video
        <IconButton aria-label='close' onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }} size='large'>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box display='flex' flexDirection='column' gap={2}>
          <TextField
            label='Dán URL video'
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setFile(null);
            }}
            onPaste={handlePaste}
            fullWidth
            placeholder='https://...'
          />

          <Box textAlign='center'>
            <Typography variant='body2' color='textSecondary'>
              — Hoặc —
            </Typography>
          </Box>

          <Box
            sx={{
              border: '2px dashed',
              borderColor: 'divider',
              borderRadius: 1,
              p: 2,
              textAlign: 'center',
              cursor: 'pointer',
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const f = e.dataTransfer.files && e.dataTransfer.files[0];
              if (f) onDropFile(f);
            }}
          >
            <input
              id='video-file-input'
              type='file'
              accept='video/*'
              style={{ display: 'none' }}
              onChange={handleFileInput}
            />
            <label htmlFor='video-file-input' style={{ cursor: 'pointer' }}>
              <Typography variant='body2' color='textSecondary'>
                Kéo thả video vào đây hoặc <strong>chọn file</strong>
              </Typography>
            </label>

            {preview && (
              <Box mt={2}>
                <video src={preview} controls style={{ maxWidth: '100%', maxHeight: 240 }} onError={() => {}} />
              </Box>
            )}

            {!preview && url && (
              <Box mt={2}>
                <video src={url} controls style={{ maxWidth: '100%', maxHeight: 240 }} onError={() => {}} />
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Huỷ
        </Button>
        <Button onClick={insertVideo} variant='contained' disabled={loading || (!url && !file)}>
          {loading ? 'Đang chèn...' : 'Chèn video'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
