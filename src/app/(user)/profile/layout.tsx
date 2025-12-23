import { Box, Container, Grid, Typography, Avatar, Stack, Button, Card } from '@mui/material';
import { Person, School, Code, BusinessCenter, Language, Edit, GitHub, LinkedIn, Public } from '@mui/icons-material';
import { ReactNode } from 'react';
import ProfileTabs from '@/components/user/profile/profileTabs';

interface ProfileLayoutProps {
  children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <Container maxWidth='xl' sx={{ py: { xs: 2, md: 12 }, px: { xs: 2, md: 12 }, bgcolor: 'customBackground.4' }}>
      <Grid container spacing={3}>
        {/* Cột bên trái - Thông tin cá nhân */}
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
                  src='https://lh3.googleusercontent.com/aida-public/AB6AXuCpPIPcXBFHuLDiDz_oTGId2Jatc4x-RkilM0ncAvP-iacoDfD26uO5u5Mriwni0seDqC4fS72WQyErL4AMD0nfncG-b2cvRb2GAmqs8njDMwt9h-4oumNInnrl5oV6r1d0K6u5PnWkKn_u3mc5GI5ZCsX_LffguL3YaQQQfC1PMQPzET_oBdrwz3mrwMa3MERitHmETUQ1IOwvk_O8rQ6WkSRuwhMJkhjMaP0-B07is55DoUSI3mzM0P-znC3yAj6-Z7n7hLG4rYo'
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
                Nguyễn Văn A
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
                Học viên
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
                      Đại học Kiến trúc Hà Nội
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
                      Kỹ thuật Phần mềm
                    </Typography>
                  </Box>
                </Box>
              </Stack>

              {/* Liên kết mạng xã hội */}
              <Stack
                spacing={1.5}
                sx={{ width: '100%', textAlign: 'left', borderTop: 1, borderColor: 'divider', pt: 2, mt: 2 }}
              >
                <Box
                  component='a'
                  href='https://github.com/nguyenvana'
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
                  <Typography variant='body2'>github.com/nguyenvana</Typography>
                </Box>
                <Box
                  component='a'
                  href='https://linkedin.com/in/nguyenvana'
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
                  <Typography variant='body2'>linkedin.com/in/nguyenvana</Typography>
                </Box>
                <Box
                  component='a'
                  href='https://nguyenvana.dev'
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
                  <Typography variant='body2'>nguyenvana.dev</Typography>
                </Box>
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

        {/* Cột bên phải - Nội dung chính */}
        <Grid size={{ xs: 12, lg: 8, xl: 9 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Tabs - Client Component */}
            <ProfileTabs />

            {/* Nội dung trang con */}
            {children}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
