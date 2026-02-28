import { Description, Image, FolderZip, InsertDriveFile } from '@mui/icons-material';
import { Box } from '@mui/material';

interface FileIconProps {
  fileType?: string;
  mimeType?: string;
  size?: 'small' | 'medium' | 'large';
}

export default function FileIcon({ fileType, mimeType, size = 'medium' }: FileIconProps) {
  const getIcon = () => {
    // Dựa vào mimeType hoặc fileType
    if (mimeType?.startsWith('image/')) return <Image />;
    if (mimeType?.includes('pdf') || mimeType?.includes('document') || fileType === 'DOCUMENT') return <Description />;
    if (
      mimeType?.includes('zip') ||
      mimeType?.includes('rar') ||
      mimeType?.includes('tar') ||
      fileType === 'COMPRESSED'
    )
      return <FolderZip />;
    return <InsertDriveFile />;
  };

  const sizeMap = {
    small: { fontSize: 20 },
    medium: { fontSize: 24 },
    large: { fontSize: 32 },
  };

  return <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center', ...sizeMap[size] }}>{getIcon()}</Box>;
}
