import { Avatar, Typography, Stack, Button, Box, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import Link from '@/components/common/Link';
import Section from '@/components/common/section';
import { getCourseInstructor } from '@/services/course.service';

interface InstructorCardProps {
  courseId: string;
}

export default async function InstructorCard({ courseId }: InstructorCardProps) {
  const res = await getCourseInstructor(courseId);
  const instructor = res?.data;

  return (
    <Section id='instructor'>
      <Typography variant='h5' fontWeight={600} gutterBottom>
        Giảng viên
      </Typography>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
        <Avatar
          src={instructor?.avatar?.url || null}
          sx={{
            width: 120,
            height: 120,
            border: '4px solid',
            borderColor: 'primary.light',
          }}
        >
          {instructor?.fullname?.charAt(0)}
        </Avatar>

        <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
          <Link href={`/users/${instructor?.id}`} passHref>
            <Typography variant='h6' fontWeight={700} gutterBottom>
              {instructor?.fullname}
            </Typography>
          </Link>

          {/* Specialized */}
          <Stack direction='row' spacing={1} alignItems='center' sx={{ mt: 2, mb: 1 }}>
            <WorkIcon fontSize='small' color='action' />
            <Typography variant='body1' color='text.secondary' sx={{ lineHeight: 1.6 }}>
              {instructor?.profile?.specialized}
            </Typography>
          </Stack>

          {/* School */}
          <Stack direction='row' spacing={1} alignItems='center' sx={{ mb: 2 }}>
            <SchoolIcon fontSize='small' color='action' />
            <Typography variant='body1' color='text.secondary' sx={{ lineHeight: 1.6 }}>
              {instructor?.profile?.school}
            </Typography>
          </Stack>

          {/* Social Links */}
          <Stack direction='row' spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
            {instructor?.profile?.githubUrl && (
              <IconButton
                href={instructor?.profile?.githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                color='primary'
              >
                <GitHubIcon />
              </IconButton>
            )}
            {instructor?.profile?.linkedinUrl && (
              <IconButton
                href={instructor?.profile?.linkedinUrl}
                target='_blank'
                rel='noopener noreferrer'
                color='primary'
              >
                <LinkedInIcon />
              </IconButton>
            )}
            {instructor?.profile?.websiteUrl && (
              <IconButton
                LinkComponent={Link}
                href={instructor?.profile?.websiteUrl}
                target='_blank'
                rel='noopener noreferrer'
                color='primary'
              >
                <LanguageIcon />
              </IconButton>
            )}
          </Stack>
        </Box>
      </Stack>

      <Box sx={{ textAlign: 'center', mt: 3 }}>
        <Button
          LinkComponent={Link}
          href={`/users/${instructor?.id}`}
          variant='contained'
          size='large'
          sx={{ borderRadius: 2 }}
        >
          Xem toàn bộ hồ sơ giảng viên
        </Button>
      </Box>
    </Section>
  );
}
