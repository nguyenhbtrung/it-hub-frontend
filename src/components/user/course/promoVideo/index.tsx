import { Box } from '@mui/material';
import Image from 'next/image';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function PromoVideo() {
  return (
    <Box
      sx={{
        height: { xs: 'auto', lg: 200 },
        aspectRatio: { xs: 2, lg: 'auto' },
        background: '#00000010',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative', // cần để overlay icon
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      {/* Ảnh thumbnail từ picsum */}
      <Image
        src='https://picsum.photos/310/200'
        alt='Video thumbnail'
        fill // tự động fill toàn bộ Box
        style={{ objectFit: 'cover' }}
      />

      {/* Overlay icon play */}
      <PlayCircleOutlineIcon
        sx={{
          fontSize: 56,
          color: 'primary.main',
          position: 'absolute',
        }}
      />
    </Box>
  );
}
