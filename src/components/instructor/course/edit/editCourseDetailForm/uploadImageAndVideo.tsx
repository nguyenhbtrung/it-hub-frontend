'use client';

import { useState, useRef, useEffect } from 'react';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { uploadFile } from '@/services/client/file.service';
import { useSession } from 'next-auth/react';
import { updateCourseImage, updateCoursePromoVideo } from '@/services/course.service';
import { deleteFile } from '@/services/file.service';

// Styled component cho upload area
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const handleUpload = async (file: File, accessToken: string, onProgress: (progress: number) => void): Promise<any> => {
  const estimatedUploadSpeed = 1024 * 1024; // 1MB per second
  const estimatedTime = Math.max(1, Math.min(30, file.size / estimatedUploadSpeed)); // Limit 1-30 second

  let progressInterval: NodeJS.Timeout | undefined;
  let currentProgress = 0;

  try {
    progressInterval = setInterval(() => {
      const increment = 100 / (estimatedTime * 10); // 10 updates per second
      currentProgress = Math.min(90, currentProgress + increment); // stop in 90% wait for respose
      onProgress(currentProgress);
    }, 100);

    // Gọi API thực tế
    const res = await uploadFile(file, true, accessToken);

    clearInterval(progressInterval);
    onProgress(100);

    if (!res.success) {
      throw new Error(res.error.message || `Upload failed`);
    }

    return res?.data;
  } catch (error) {
    if (progressInterval) clearInterval(progressInterval);
    onProgress(0);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Upload failed due to network or server error');
  }
};

interface UploadAreaProps {
  type: 'image' | 'video';
  title: string;
  accept: string;
  maxSizeMB: number;
  currentMedia?: string;
  currentId?: string;
  onUploadComplete?: (url: string) => void;
  onDeleteFile?: () => void;
}

const UploadArea = ({
  type,
  title,
  accept,
  maxSizeMB,
  currentMedia,
  currentId,
  onUploadComplete,
  onDeleteFile,
}: UploadAreaProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(currentMedia || null);
  const [uploadedId, setUploadedId] = useState<string | null>(currentId || null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data: session } = useSession();
  const accessToken = session?.accessToken || '';

  // Cleanup object URLs khi component unmount
  useEffect(() => {
    return () => {
      if (uploadedUrl && uploadedUrl.startsWith('blob:')) {
        URL.revokeObjectURL(uploadedUrl);
      }
    };
  }, [uploadedUrl]);

  const handleDeleteFile = async () => {
    if (!uploadedId) return;
    await deleteFile(uploadedId);
    setUploadedId('');
  };

  const handleFileSelect = (file: File) => {
    // Validate file size
    const maxSize = maxSizeMB * 1024 * 1024;
    if (file.size > maxSize) {
      setError(`File quá lớn. Kích thước tối đa: ${maxSizeMB}MB`);
      return;
    }

    // Validate file type
    const isValidType = accept.split(',').some((pattern) => {
      const trimmedPattern = pattern.trim();
      if (trimmedPattern.includes('*')) {
        const typePrefix = trimmedPattern.split('/')[0];
        return file.type.startsWith(typePrefix);
      }
      return file.type === trimmedPattern;
    });

    if (!isValidType) {
      setError(`Định dạng file không hợp lệ. Chấp nhận: ${accept}`);
      return;
    }

    setError(null);
    uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const fileInfo = await handleUpload(file, accessToken, (progress) => {
        setUploadProgress(progress);
      });

      setUploadedUrl(fileInfo?.url || '');
      setUploadedId(fileInfo?.id || '');
      onUploadComplete?.(fileInfo);
    } catch (err) {
      setError('Upload thất bại. Vui lòng thử lại.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input để có thể chọn lại file cùng tên
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemoveFile = async () => {
    await handleDeleteFile();
    if (uploadedUrl && uploadedUrl.startsWith('blob:')) {
      URL.revokeObjectURL(uploadedUrl);
    }
    setUploadedUrl(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleContainerClick = () => {
    if (!isUploading && !uploadedUrl) {
      fileInputRef.current?.click();
    }
  };

  return (
    <Box>
      <Typography variant='subtitle2' gutterBottom>
        {title}
      </Typography>
      <Paper
        variant='outlined'
        sx={{
          p: 4,
          height: '100%',
          textAlign: 'center',
          borderStyle: isDragging ? 'solid' : 'dashed',
          borderWidth: 2,
          borderColor: isDragging ? 'primary.main' : 'divider',
          backgroundColor: isDragging ? 'action.hover' : 'background.paper',
          cursor: !isUploading && !uploadedUrl ? 'pointer' : 'default',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: !isUploading && !uploadedUrl ? 'action.hover' : 'background.paper',
          },
        }}
        onClick={handleContainerClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Input file ẩn */}
        <VisuallyHiddenInput ref={fileInputRef} type='file' accept={accept} onChange={handleFileInputChange} />

        {/* Hiển thị media đã upload */}
        {uploadedUrl && !isUploading && (
          <>
            <Box sx={{ position: 'relative', mb: 2 }}>
              {type === 'image' ? (
                <Box
                  component='img'
                  src={uploadedUrl}
                  alt={title}
                  sx={{
                    width: '100%',
                    height: 128,
                    objectFit: 'cover',
                    borderRadius: 1,
                  }}
                />
              ) : (
                <Box
                  component='video'
                  src={uploadedUrl}
                  controls
                  sx={{
                    width: '100%',
                    height: 128,
                    borderRadius: 1,
                    backgroundColor: 'black',
                  }}
                />
              )}
              <IconButton
                size='small'
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveFile();
                }}
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  backgroundColor: 'background.paper',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ClearIcon fontSize='small' />
              </IconButton>
            </Box>
            <Typography variant='caption' color='text.secondary'>
              Nhấn để thay đổi file
            </Typography>
          </>
        )}

        {/* Hiển thị khi đang upload */}
        {isUploading && (
          <Box sx={{ width: '100%', mb: 2 }}>
            <CloudUploadIcon
              sx={{
                fontSize: 48,
                color: 'primary.main',
                mb: 2,
              }}
            />
            <Typography variant='body2' color='text.secondary' gutterBottom>
              Đang upload...
            </Typography>
            <LinearProgress variant='determinate' value={uploadProgress} sx={{ height: 8, borderRadius: 4 }} />
            <Typography variant='caption' color='text.secondary' sx={{ mt: 1 }}>
              {uploadProgress.toFixed(0)}%
            </Typography>
          </Box>
        )}

        {/* Hiển thị khi chưa có file */}
        {!uploadedUrl && !isUploading && (
          <>
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
              {type === 'image' ? <UploadFileIcon color='action' /> : <VideocamIcon color='action' />}
            </Box>
            <Typography variant='body2' color='text.secondary'>
              Kéo thả hoặc{' '}
              <Button
                variant='text'
                size='small'
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
              >
                tải lên
              </Button>
            </Typography>
            <Typography variant='caption' color='text.secondary'>
              {accept.split(',').join(', ')} (tối đa {maxSizeMB}MB)
            </Typography>
            {isDragging && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'primary.main',
                  opacity: 0.1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant='body1' color='primary'>
                  Thả file để upload
                </Typography>
              </Box>
            )}
          </>
        )}

        {/* Hiển thị lỗi */}
        {error && (
          <Typography
            variant='caption'
            color='error'
            sx={{
              display: 'block',
              mt: 1,
            }}
          >
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

interface uploadImageAndVideoProps {
  courseId: string;
  img: { id: string; url: string } | null;
  promoVideo: { id: string; url: string } | null;
}

export default function UploadImageAndVideo({ courseId, img, promoVideo }: uploadImageAndVideoProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Giả sử có URL ảnh hiện tại
  const currentImageUrl =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDNhF2Qs5J-NTY_OoDBq0VvvuDVgjMZqYDO4RK1KtzNq3np6M4kx8auktG5pNncK7c04sD5inPvVqmZV083iyFfWa-C_Ujd1EXPp_J7SRDqiONChTsEOQ7Zlww0yHt8F9euaM4gG7P7MkaKYgM1XMztjG07N9SecOKMdPcgW3RDL2Rwb2iYESO5C1JG-RTUO2wWxyY8aOnUUjkXc8KWt7yQmmDXpa-qEN5K2EfL1prih64b1l7rCn9dBwGEa9Fc0WMW9Ra8uk7rBSI';

  const handleImageUploadComplete = async (file: any) => {
    setImageUrl(file?.url);
    console.log('Image uploaded:', file);
    await updateCourseImage(courseId, file?.id || '');
    // Gọi API thực tế ở đây
  };

  const handleVideoUploadComplete = async (file: any) => {
    setVideoUrl(file?.url);
    console.log('Video uploaded:', file);
    await updateCoursePromoVideo(courseId, file?.id || '');
    // Gọi API thực tế ở đây
  };

  return (
    <Grid container spacing={4}>
      <Grid size={{ xs: 12, md: 6 }}>
        <UploadArea
          type='image'
          title='Ảnh bìa khóa học'
          accept='image/*'
          maxSizeMB={5}
          currentMedia={img?.url}
          currentId={img?.id}
          onUploadComplete={handleImageUploadComplete}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <UploadArea
          type='video'
          title='Video quảng cáo'
          accept='video/mp4,video/quicktime,video/x-msvideo'
          maxSizeMB={500}
          currentMedia={promoVideo?.url}
          currentId={promoVideo?.id}
          onUploadComplete={handleVideoUploadComplete}
        />
      </Grid>
    </Grid>
  );
}
