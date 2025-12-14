import FilterSidebar from '@/components/user/search/filterSidebar';
import SearchHeader from '@/components/user/search/searchHeader';
import SearchResults from '@/components/user/search/searchResults';
import { Container, Box, Typography, Grid } from '@mui/material';
import { Suspense } from 'react';

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  return (
    <Container maxWidth='xl' sx={{ py: 12 }}>
      <Box sx={{ px: 12 }}>
        <Suspense>
          <SearchHeader searchParams={searchParams} />
        </Suspense>

        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 3 }}>
            <FilterSidebar />
          </Grid>

          <Grid size={{ xs: 12, lg: 9 }}>
            <SearchResults />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
