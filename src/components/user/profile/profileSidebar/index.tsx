import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Person, School, Edit, GitHub, LinkedIn, Public } from '@mui/icons-material';
import { getMyProfile } from '@/services/user.service';
import { notFound } from 'next/navigation';
import { roleLabelsMap } from '@/lib/const/user';

export default async function ProfileSidebar() {
  const res = await getMyProfile();
  if (!res?.success || !res?.data) {
    notFound();
  }
  const user = res.data;
  console.log('>>>me', res?.data);

  const formatUrlDisplay = (url: string) => {
    try {
      const u = new URL(url);
      const host = u.host.replace(/^www\./, ''); // bỏ www.
      return host + u.pathname;
    } catch {
      return url;
    }
  };

  return (
    <Grid size={{ xs: 12, lg: 4, xl: 3 }}>
      <Box
        sx={{
          position: { lg: 'sticky' },
          top: { lg: 96 },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Card
          sx={{
            bgcolor: 'background.paper',
            borderRadius: 1,
            // boxShadow: 1,
            border: 1,
            borderColor: 'divider',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Avatar */}
          <Box sx={{ position: 'relative', mb: 3 }}>
            <Avatar
              src={user?.avatar?.url || null}
              sx={{
                width: 128,
                height: 128,
                border: 4,
                borderColor: 'background.paper',
                boxShadow: 2,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                right: 8,
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: 'success.main',
                border: 2,
                borderColor: 'background.paper',
              }}
              title='Online'
            />
          </Box>

          {/* Tên và vai trò */}
          <Typography variant='h5' fontWeight='bold' gutterBottom>
            {user?.fullname || 'Chưa có tên'}
          </Typography>
          <Typography
            component='span'
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 20,
              bgcolor: 'primary.light',
              color: 'primary.main',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              mb: 3,
              display: 'inline-block',
            }}
          >
            {roleLabelsMap[user?.role]}
          </Typography>

          {/* Thông tin học tập */}
          <Stack spacing={2} sx={{ width: '100%', textAlign: 'left', borderTop: 1, borderColor: 'divider', pt: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <School sx={{ color: 'text.secondary', fontSize: 20, mt: 0.5 }} />
              <Box>
                <Typography variant='caption' color='text.secondary' fontWeight='bold' textTransform='uppercase'>
                  Trường
                </Typography>
                <Typography variant='body2' fontWeight='medium'>
                  {user?.profile?.school}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Person sx={{ color: 'text.secondary', fontSize: 20, mt: 0.5 }} />
              <Box>
                <Typography variant='caption' color='text.secondary' fontWeight='bold' textTransform='uppercase'>
                  Chuyên ngành
                </Typography>
                <Typography variant='body2' fontWeight='medium'>
                  {user?.profile?.specialized}
                </Typography>
              </Box>
            </Box>
          </Stack>

          {/* Liên kết mạng xã hội */}
          <Stack
            spacing={1.5}
            sx={{
              width: '100%',
              textAlign: 'left',
              borderTop: 1,
              borderColor: 'divider',
              pt: 2,
              mt: 2,
            }}
          >
            {user?.profile?.githubUrl && (
              <Box
                component='a'
                href={user?.profile?.githubUrl || null}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <GitHub sx={{ fontSize: 20 }} />
                <Typography variant='body2'>
                  {new URL(user.profile.githubUrl).host + new URL(user.profile.githubUrl).pathname}
                </Typography>
              </Box>
            )}

            {user?.profile?.linkedinUrl && (
              <Box
                component='a'
                href={user?.profile?.linkedinUrl || null}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <LinkedIn sx={{ fontSize: 20 }} />
                <Typography variant='body2'>{formatUrlDisplay(user.profile.linkedinUrl)}</Typography>
              </Box>
            )}

            {user?.profile?.websiteUrl && (
              <Box
                component='a'
                href={user?.profile?.websiteUrl || null}
                sx={{
                  display: 'flex',
                  gap: 2,
                  alignItems: 'center',
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                <Public sx={{ fontSize: 20 }} />
                <Typography variant='body2'>
                  {new URL(user.profile.websiteUrl).host + new URL(user.profile.websiteUrl).pathname}
                </Typography>
              </Box>
            )}
          </Stack>

          {/* Nút chỉnh sửa */}
          <Box sx={{ width: '100%', mt: 3 }}>
            <Button
              fullWidth
              variant='contained'
              startIcon={<Edit />}
              sx={{
                borderRadius: 1,
                py: 1.5,
                boxShadow: 1,
              }}
            >
              Chỉnh sửa hồ sơ
            </Button>
          </Box>
        </Card>
      </Box>
    </Grid>
  );
}
