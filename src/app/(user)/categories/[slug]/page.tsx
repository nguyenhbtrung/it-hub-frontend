// app/courses/page.tsx

import CategoryDescription from '@/components/user/explore/category/categoryDescription';
import CourseFilter from '@/components/user/explore/category/courseFilter';
import CourseList from '@/components/user/explore/courseList';
import Pagination from '@/components/user/explore/pagination';
import { Container, Grid, Box, Typography } from '@mui/material';

interface BrowseByCategoryPageProps {
  params: Promise<{ slug: string }>;
}

const pageTitles: Record<string, string> = {
  react: 'Các khóa học về React',
  vue: 'Các khóa học về Vue.js',
  angular: 'Các khóa học về Angular',
  nodejs: 'Các khóa học về Node.js',
  algorithms: 'Các khóa học về Thuật toán',
  'data-structures': 'Các khóa học về Cấu trúc dữ liệu',
  os: 'Các khóa học về Hệ điều hành',
};

export default async function BrowseByCategoryPage({ params }: BrowseByCategoryPageProps) {
  const { slug } = await params;

  const title = pageTitles[slug] || 'Các khóa học theo danh mục';

  return (
    <Container maxWidth='xl' sx={{ py: 12 }}>
      <Typography
        variant='h1'
        sx={{
          fontSize: { xs: '1.875rem', md: '2.25rem' },
          fontWeight: 700,
          color: 'text.primary',
          mb: 4,
        }}
      >
        {title}
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 3 }}>
          <CourseFilter />
        </Grid>

        <Grid size={{ xs: 12, lg: 9 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <CategoryDescription slug={slug} />
            <CourseList />
            <Pagination />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
