import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Star from '@mui/icons-material/Star';

const categoryData: Record<
  string,
  { title: string; description: string; courses: number; students: number; rating: number }
> = {
  react: {
    title: 'React',
    description:
      'React là thư viện JavaScript phổ biến để xây dựng giao diện người dùng. Nó giúp tạo ứng dụng web nhanh, linh hoạt và dễ bảo trì.',
    courses: 1234,
    students: 45678,
    rating: 4.7,
  },
  vue: {
    title: 'Vue.js',
    description:
      'Vue.js là framework tiến bộ cho việc xây dựng giao diện người dùng. Dễ học, dễ tích hợp và mạnh mẽ cho cả dự án nhỏ và lớn.',
    courses: 987,
    students: 31234,
    rating: 4.6,
  },
  angular: {
    title: 'Angular',
    description:
      'Angular là framework mạnh mẽ của Google để xây dựng ứng dụng web quy mô lớn với kiến trúc rõ ràng và nhiều tính năng tích hợp.',
    courses: 765,
    students: 19876,
    rating: 4.4,
  },
  nodejs: {
    title: 'Node.js',
    description:
      'Node.js là môi trường chạy JavaScript phía server, giúp xây dựng ứng dụng nhanh, mở rộng tốt và xử lý bất đồng bộ hiệu quả.',
    courses: 654,
    students: 22345,
    rating: 4.5,
  },
  algorithms: {
    title: 'Thuật toán',
    description: 'Thuật toán là nền tảng của khoa học máy tính, giúp giải quyết vấn đề một cách tối ưu và hiệu quả.',
    courses: 432,
    students: 15432,
    rating: 4.3,
  },
  'data-structures': {
    title: 'Cấu trúc dữ liệu',
    description: 'Cấu trúc dữ liệu là cách tổ chức và lưu trữ dữ liệu để thao tác nhanh chóng và hiệu quả.',
    courses: 543,
    students: 16789,
    rating: 4.4,
  },
  os: {
    title: 'Hệ điều hành',
    description: 'Hệ điều hành quản lý tài nguyên phần cứng và phần mềm, cung cấp nền tảng cho ứng dụng hoạt động.',
    courses: 321,
    students: 9876,
    rating: 4.2,
  },
};

interface CategoryHeaderProps {
  slugPromise: Promise<string>;
}

export default async function CategoryHeader({ slugPromise }: CategoryHeaderProps) {
  const slug = await slugPromise;
  const data = categoryData[slug] || {
    description: 'Không tìm thấy dữ liệu cho danh mục này.',
    courses: 0,
  };
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
            {data.title ? `Các khoá học về ${data.title}` : 'Các khoá học theo danh mục'}
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: 'text.primary',
              mb: 2,
            }}
          >
            {data.description}
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
                {data.courses.toLocaleString()}
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
                  {data.rating}
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
