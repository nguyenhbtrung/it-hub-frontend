import CourseHeader from '@/components/instructor/course/edit/header';
import CourseSidebar from '@/components/instructor/course/edit/sidebar';
import { Container, Grid, Box, Paper } from '@mui/material';
import { Suspense } from 'react';

interface EditCourseLayout {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export default function EditCourseLayout({ children, params }: EditCourseLayout) {
  return (
    <Box sx={{ bgcolor: 'customBackground.4', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Suspense>
        <CourseHeader params={params} />
      </Suspense>
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 6 }}>
        <Container maxWidth='xl'>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, lg: 3 }}>
              <Suspense>
                <CourseSidebar />
              </Suspense>
            </Grid>

            <Grid size={{ xs: 12, lg: 9 }}>
              <Paper
                elevation={0}
                sx={{
                  p: 6,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 3,
                  bgcolor: 'background.paper',
                }}
              >
                {children}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
