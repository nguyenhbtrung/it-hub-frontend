import CourseFilterSidebar from '@/components/user/common/courseFilterSidebar';
import AllCourses from '@/components/user/explore/category/allCourses';
import CategoryHeader from '@/components/user/explore/category/categoryHeader';
import RecommendedCourses from '@/components/user/explore/category/recommendedCourses';
import SearchResults from '@/components/user/search/searchResults';
import { Container, Grid, Box, Typography } from '@mui/material';
import { Suspense } from 'react';

interface BrowseByCategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrowseByCategoryPage({ params, searchParams }: BrowseByCategoryPageProps) {
  const slugPromise = params.then((p) => p.slug);

  return (
    <Box>
      <Suspense>
        <CategoryHeader slugPromise={slugPromise} />
      </Suspense>
      <Container maxWidth='xl' sx={{ pb: 12, pt: 4 }}>
        <Box sx={{ px: 12 }}>
          <RecommendedCourses />
          <Suspense>
            <AllCourses slugPromise={slugPromise} searchParams={searchParams} />
          </Suspense>
        </Box>
      </Container>
    </Box>
  );
}
