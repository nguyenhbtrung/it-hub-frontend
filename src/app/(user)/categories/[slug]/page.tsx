import AllCourses from '@/components/user/explore/category/allCourses';
import CategoryHeader from '@/components/user/explore/category/categoryHeader';
import RecommendedCourses from '@/components/user/explore/category/recommendedCourses';

import { getCategoryIdBySlug } from '@/services/category.service';
import { Container, Box } from '@mui/material';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

interface BrowseByCategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrowseByCategoryPage({ params, searchParams }: BrowseByCategoryPageProps) {
  return (
    <Box>
      <Suspense>
        <BrowseByCategoryPageWrapper params={params} searchParams={searchParams} />
      </Suspense>
    </Box>
  );
}

async function BrowseByCategoryPageWrapper({ params, searchParams }: BrowseByCategoryPageProps) {
  const { slug } = await params;
  const res = await getCategoryIdBySlug(slug);
  if (!res?.success) {
    notFound();
  }
  const id = res?.data;
  return (
    <>
      <Suspense>
        <CategoryHeader id={id} />
      </Suspense>
      <Container maxWidth='xl' sx={{ pb: 12, pt: 4 }}>
        <Box sx={{ px: 12 }}>
          <RecommendedCourses id={id} />
          <Suspense>
            <AllCourses id={id} searchParams={searchParams} />
          </Suspense>
        </Box>
      </Container>
    </>
  );
}
