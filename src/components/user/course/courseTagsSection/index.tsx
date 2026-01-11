import { getCourseDetail } from '@/services/course.service';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Link from '@/components/common/Link';

interface CourseTagsSectionProps {
  courseId: string;
}

export default async function CourseTagsSection({ courseId }: CourseTagsSectionProps) {
  const res = await getCourseDetail(courseId, 'student');
  const tags = res?.data?.tags || [];
  return (
    <Box>
      <Typography variant='h5' fontWeight={600} gutterBottom>
        Chủ đề liên quan
      </Typography>
      <Stack direction='row' flexWrap='wrap' gap={1}>
        {tags.map((tag: any) => (
          <Chip
            component={Link}
            href={`/tags/${tag.slug}/courses`}
            key={tag.id}
            label={`${tag.name}`}
            variant='outlined'
            sx={{
              borderRadius: 2,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'primary.light',
                color: 'white',
              },
            }}
          />
        ))}
      </Stack>
    </Box>
  );
}
