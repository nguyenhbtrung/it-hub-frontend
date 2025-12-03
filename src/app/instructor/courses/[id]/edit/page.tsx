import EditCourseForm from '@/components/instructor/course/edit/editCourseForm';
import CourseHeader from '@/components/instructor/course/edit/header';
import CourseSidebar from '@/components/instructor/course/edit/sidebar';
import { Container, Grid, Box } from '@mui/material';

export default function EditCoursePage() {
  return (
    <Box sx={{ bgcolor: 'customBackground.4', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CourseHeader />

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 6 }}>
        <Container maxWidth='xl'>
          <Grid container spacing={6}>
            <Grid size={{ xs: 12, lg: 3 }}>
              <CourseSidebar />
            </Grid>

            <Grid size={{ xs: 12, lg: 9 }}>
              <EditCourseForm />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
