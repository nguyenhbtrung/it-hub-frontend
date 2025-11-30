import { Box, Card, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import { CourseDetail } from '@/types/course';
import CourseHeader from '@/components/user/course/courseHeader';
import CourseContent from '@/components/user/course/courseContent';
import InstructorCard from '@/components/user/course/instructorCard';
import CourseReviews from '@/components/user/course/courseReviews';

type Props = { params: Promise<{ slug: string }> };

async function fetchCourse(slug: string): Promise<CourseDetail> {
  const mock: CourseDetail = {
    id: 'c1',
    slug,
    title: 'Lập trình Web với React & Node.js — Từ cơ bản đến nâng cao',
    shortDescription: 'Tạo ứng dụng web thực tế với React, Node.js và database.',
    description:
      'Khóa học này dẫn dắt bạn qua toàn bộ quá trình xây dựng ứng dụng web hiện đại: React, hooks, state management, REST API với Express, cơ sở dữ liệu, deploy.',
    category: 'Web Development',
    tags: ['react', 'nodejs', 'express', 'frontend', 'backend'],
    stats: {
      rating: 4.8,
      ratingCount: 1245,
      students: 23456,
      lastUpdated: '2025-10-01',
      level: 'Trung cấp',
      totalDurationMinutes: 720,
    },
    instructor: {
      id: 'i1',
      name: 'ThS. Nguyễn Văn A',
      title: 'Giảng viên Lập trình Web',
      bio: '10 năm kinh nghiệm phát triển web. Từng làm lead frontend tại nhiều startup.',
      avatarUrl: 'https://picsum.photos/200',
      social: { linkedin: '#', twitter: '#', website: '#' },
    },
    sections: [
      {
        id: 's1',
        title: 'Giới thiệu & Thiết lập môi trường',
        order: 1,
        lessons: [
          { id: 'l1', title: 'Giới thiệu khóa học', durationMinutes: 5, isPreview: true },
          { id: 'l2', title: 'Cài đặt môi trường', durationMinutes: 12 },
        ],
      },
      {
        id: 's2',
        title: 'React cơ bản',
        order: 2,
        lessons: [
          { id: 'l3', title: 'JSX & Component', durationMinutes: 18 },
          { id: 'l4', title: 'State & Props', durationMinutes: 20 },
        ],
      },
      {
        id: 's3',
        title: 'Giới thiệu & Thiết lập môi trường',
        order: 1,
        lessons: [
          { id: 'l5', title: 'Giới thiệu khóa học', durationMinutes: 5, isPreview: true },
          { id: 'l6', title: 'Cài đặt môi trường', durationMinutes: 12 },
        ],
      },
      {
        id: 's4',
        title: 'React cơ bản',
        order: 2,
        lessons: [
          { id: 'l7', title: 'JSX & Component', durationMinutes: 18 },
          { id: 'l8', title: 'State & Props', durationMinutes: 20 },
        ],
      },
      {
        id: 's5',
        title: 'Giới thiệu & Thiết lập môi trường',
        order: 1,
        lessons: [
          { id: 'l9', title: 'Giới thiệu khóa học', durationMinutes: 5, isPreview: true },
          { id: 'l10', title: 'Cài đặt môi trường', durationMinutes: 12 },
        ],
      },
      {
        id: 's6',
        title: 'React cơ bản',
        order: 2,
        lessons: [
          { id: 'l11', title: 'JSX & Component', durationMinutes: 18 },
          { id: 'l12', title: 'State & Props', durationMinutes: 20 },
        ],
      },
      // ...more sections
    ],
    keyTakeaways: [
      'Xây dựng SPA với React',
      'Tạo API với Express & Node.js',
      'Kết nối database',
      'Triển khai ứng dụng lên production',
    ],
    requirements: ['Biết HTML/CSS cơ bản', 'Biết JavaScript cơ bản'],
    language: 'Tiếng Việt',
    price: 'Miễn phí',
    promoVideoUrl: null,
  };
  return mock;
}

export default async function CoursePage({ params }: Props) {
  const slug = (await params).slug;
  const course = await fetchCourse(slug);

  return (
    <Box sx={{ py: { xs: 7, sm: 8 } }}>
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <CourseHeader course={course} />
      </Box>
      <Container
        maxWidth='lg'
        // sx={{ py: { xs: 4, md: 6 } }}
      >
        <Grid container spacing={4}>
          {/* Main Content - Left Side */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Stack spacing={4}>
              {/* Course Highlights Card */}
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Typography variant='h5' fontWeight={700} gutterBottom color='primary'>
                  Tổng quan khóa học
                </Typography>
                <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
                  {course.description}
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant='subtitle1' fontWeight={600} gutterBottom>
                      📚 Bạn sẽ học được
                    </Typography>
                    <Box component='ul' sx={{ pl: 2, color: 'text.secondary' }}>
                      {course.keyTakeaways.map((item, index) => (
                        <li key={index}>
                          <Typography variant='body2' sx={{ py: 0.5 }}>
                            {item}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  </Grid>

                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant='subtitle1' fontWeight={600} gutterBottom>
                      🎯 Yêu cầu
                    </Typography>
                    <Box component='ul' sx={{ pl: 2, color: 'text.secondary' }}>
                      {course.requirements?.map((req, index) => (
                        <li key={index}>
                          <Typography variant='body2' sx={{ py: 0.5 }}>
                            {req}
                          </Typography>
                        </li>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Card>

              {/* Course Content Section */}
              <Card sx={{ borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Box sx={{ p: 3 }}>
                  <CourseContent sections={course.sections} />
                </Box>
              </Card>

              {/* Tags Section */}
              <Card sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <Typography variant='h6' fontWeight={600} gutterBottom>
                  Chủ đề liên quan
                </Typography>
                <Stack direction='row' flexWrap='wrap' gap={1}>
                  {course.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={`#${tag}`}
                      variant='outlined'
                      sx={{
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'primary.light',
                          color: 'white',
                        },
                      }}
                    />
                  ))}
                </Stack>
              </Card>

              {/* Instructor Section */}
              <InstructorCard instructor={course.instructor} />

              <CourseReviews />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
