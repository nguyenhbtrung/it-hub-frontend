import AdminPanelSettings from '@mui/icons-material/AdminPanelSettings';
import CampaignOutlined from '@mui/icons-material/CampaignOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { AnnouncementPost } from '../../types';

interface AnnouncementCardProps {
  post: AnnouncementPost;
}

export default function AnnouncementCard({ post }: AnnouncementCardProps) {
  return (
    <Card
      key={post.id}
      sx={{
        p: 3,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'warning.light',
        bgcolor: 'customBackground.6',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          p: 2,
          color: 'warning.main',
          opacity: 0.2,
          transform: 'rotate(12deg)',
        }}
      >
        <CampaignOutlined sx={{ fontSize: 100 }} />
      </Box>

      <Box position='relative' zIndex={1}>
        <Stack direction='row' alignItems='center' spacing={1} mb={1}>
          <Chip
            label={'Thông báo'}
            size='small'
            sx={{
              bgcolor: 'warning.main',
              color: 'warning.contrastText',
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          />
          <Typography variant='caption' color='text.secondary'>
            • {post.time}
          </Typography>
        </Stack>

        <Typography variant='h6' fontWeight='bold' gutterBottom sx={{ cursor: 'pointer' }}>
          {post.title}
        </Typography>

        <Typography variant='body2' color='text.secondary' gutterBottom component='p'>
          {post.content}
        </Typography>

        <Stack direction='row' alignItems='center' spacing={2}>
          <Avatar sx={{ width: 24, height: 24, bgcolor: '#5c716b' }}>
            <AdminPanelSettings />
          </Avatar>
          <Typography variant='body2' fontWeight='bold'>
            IT Hub Announcer
          </Typography>
          {/* <Chip
                      icon={<AdminPanelSettingsIcon sx={{ fontSize: 12 }} />}
                      label={'admin'}
                      size='small'
                      sx={{
                        bgcolor: 'error.lighter',
                        color: 'error.main',
                        border: '1px solid',
                        borderColor: 'error.light',
                      }}
                    /> */}
        </Stack>
      </Box>
    </Card>
  );
}
