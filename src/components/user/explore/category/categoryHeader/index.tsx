import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Star from '@mui/icons-material/Star';
import { notFound } from 'next/navigation';
import { categoryApi } from '@/features/category';

interface CategoryHeaderProps {
  id: string;
}

export default async function CategoryHeader({ id }: CategoryHeaderProps) {
  const res = await categoryApi.getCategorySummary(id);
  if (!res.success || !res?.data) {
    notFound();
  }
  const data = res.data;
  return (
    <Box sx={{ pt: 8, bgcolor: 'customBackground.4' }}>
      <Container maxWidth='xl'>
        <Box sx={{ px: 12, py: 4 }}>
          <Typography
            variant='h2'
            sx={{
              color: 'text.primary',
              mb: 2,
            }}
          >
            {data.name ? `Các khoá học về ${data.name}` : 'Các khoá học theo danh mục'}
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: 'text.primary',
              mb: 2,
            }}
          >
            {data?.description}
          </Typography>
          <Stack direction='row' spacing={2}>
            <Stack
              direction='column'
              spacing={0}
              sx={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                variant='caption'
                sx={{
                  color: 'text.primary',
                }}
              >
                Số khoá học
              </Typography>
              <Typography
                variant='body1'
                fontWeight={700}
                sx={{
                  color: 'text.primary',
                }}
              >
                {(data?._count?.courses + data?._count?.subCategoryCourses).toLocaleString()}
              </Typography>
            </Stack>

            <Divider orientation='vertical' flexItem />

            <Stack
              direction='column'
              spacing={0}
              sx={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                variant='caption'
                sx={{
                  color: 'text.primary',
                }}
              >
                Số học viên
              </Typography>
              <Typography
                variant='body1'
                fontWeight={700}
                sx={{
                  color: 'text.primary',
                }}
              >
                {data.students.toLocaleString()}
              </Typography>
            </Stack>

            <Divider orientation='vertical' flexItem />

            <Stack
              direction='column'
              spacing={0}
              sx={{
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
            >
              <Typography
                variant='caption'
                sx={{
                  color: 'text.primary',
                }}
              >
                Đánh giá trung bình
              </Typography>
              <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
                <Typography
                  variant='body1'
                  fontWeight={700}
                  sx={{
                    color: 'text.primary',
                  }}
                >
                  {(data?.avgRating || 0).toFixed(1)}
                </Typography>
                <Star sx={{ color: 'warning.main' }} />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
