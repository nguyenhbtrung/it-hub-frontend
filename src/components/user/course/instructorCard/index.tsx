// InstructorCard component - Phiên bản cải tiến
import React from 'react';
import { Card, CardContent, Avatar, Typography, Stack, Button, Box, Chip, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import LanguageIcon from '@mui/icons-material/Language';
import { Instructor } from '@/types/course';
import Link from 'next/link';

export default function InstructorCard({ instructor }: { instructor: Instructor }) {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <CardContent sx={{ p: 4 }}>
        <Typography variant='h5' fontWeight={700} gutterBottom color='primary'>
          Giảng viên
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
          <Avatar
            src={instructor.avatarUrl || undefined}
            sx={{
              width: 120,
              height: 120,
              border: '4px solid',
              borderColor: 'primary.light',
            }}
          >
            {instructor.name.charAt(0)}
          </Avatar>

          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Link href={`/users/${instructor.id}`} passHref>
              <Typography variant='h5' fontWeight={700} gutterBottom>
                {instructor.name}
              </Typography>
            </Link>
            <Chip label={instructor.title} color='primary' variant='outlined' sx={{ mb: 2 }} />
            <Typography variant='body1' color='text.secondary' sx={{ lineHeight: 1.6, mb: 2 }}>
              {instructor.bio}
            </Typography>

            {/* Social Links */}
            <Stack direction='row' spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              {instructor.social?.linkedin && (
                // <Button
                //   variant='outlined'
                //   size='small'
                //   startIcon={<LinkedInIcon />}
                //   href={instructor.social.linkedin}
                //   target='_blank'
                // >
                //   LinkedIn
                // </Button>
                <IconButton color='primary'>
                  <LinkedInIcon />
                </IconButton>
              )}
              {instructor.social?.twitter && (
                // <Button
                //   variant='outlined'
                //   size='small'
                //   startIcon={<TwitterIcon />}
                //   href={instructor.social.twitter}
                //   target='_blank'
                // >
                //   Twitter
                // </Button>
                <IconButton color='primary'>
                  <TwitterIcon />
                </IconButton>
              )}
              {instructor.social?.website && (
                // <Button
                //   variant='outlined'
                //   size='small'
                //   startIcon={<LanguageIcon />}
                //   href={instructor.social.website}
                //   target='_blank'
                // >
                //   Website
                // </Button>
                <IconButton color='primary'>
                  <LanguageIcon />
                </IconButton>
              )}
            </Stack>
          </Box>
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Button variant='contained' size='large' sx={{ borderRadius: 2 }}>
            Xem toàn bộ hồ sơ giảng viên
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
