import { Box } from '@mui/material';
import ReactPlayer from 'react-player';
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
      {/* <Image
        src='https://picsum.photos/310/200'
        alt='Video thumbnail'
        fill // tự động fill toàn bộ Box
        style={{ objectFit: 'cover' }}
      /> */}

      {/* Overlay icon play */}
      {/* <PlayCircleOutlineIcon
        sx={{
          fontSize: 56,
          color: 'primary.main',
          position: 'absolute',
        }}
      /> */}
      {/* <video
        src={`http://localhost:8080/uploads/permanent/cf4221a5-dab1-4ff2-9c25-772814cc7ae4.mp4`}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        poster='http://localhost:8080/uploads/permanent/dba2d160-b82a-46e7-b0bb-7b73e4448837.png'
        controls
      /> */}
      <ReactPlayer
        src='http://localhost:8080/uploads/permanent/8a2ee5c8-5d09-43d2-b37b-289c467573dd.mp4'
        width='100%'
        height='100%'
        style={{ objectFit: 'cover' }}
        controls
        autoPlay
        light='http://localhost:8080/uploads/thumbnails/thumb_8a2ee5c8-5d09-43d2-b37b-289c467573dd_0.jpg' // ảnh thumbnail
      />
    </Box>
  );
}
