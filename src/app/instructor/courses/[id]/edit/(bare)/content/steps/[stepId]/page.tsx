import LectureEditor from '@/components/common/richText/editor/lectureEditor';
import EditStepHeader from '@/components/instructor/course/edit/content/editStep/header';

import { Container, Grid, Box, Paper } from '@mui/material';

export default function EditStepPage() {
  return (
    <Box sx={{ bgcolor: 'customBackground.4', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <EditStepHeader />

      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 6 }}>
        <Container maxWidth='lg'>
          <LectureEditor />
        </Container>
      </Box>
    </Box>
  );
}
