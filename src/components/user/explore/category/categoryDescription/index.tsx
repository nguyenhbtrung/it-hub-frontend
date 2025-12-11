// app/courses/components/CategoryDescription.tsx
import { Paper, Typography, Box } from '@mui/material';

interface CategoryDescriptionProps {
  slug: string;
}

const categoryData: Record<string, { title: string; description: string; courses: number }> = {
  react: {
    title: 'React',
    description:
      'React là thư viện JavaScript phổ biến để xây dựng giao diện người dùng. Nó giúp tạo ứng dụng web nhanh, linh hoạt và dễ bảo trì.',
    courses: 1234,
  },
  vue: {
    title: 'Vue.js',
    description:
      'Vue.js là framework tiến bộ cho việc xây dựng giao diện người dùng. Dễ học, dễ tích hợp và mạnh mẽ cho cả dự án nhỏ và lớn.',
    courses: 987,
  },
  angular: {
    title: 'Angular',
    description:
      'Angular là framework mạnh mẽ của Google để xây dựng ứng dụng web quy mô lớn với kiến trúc rõ ràng và nhiều tính năng tích hợp.',
    courses: 765,
  },
  nodejs: {
    title: 'Node.js',
    description:
      'Node.js là môi trường chạy JavaScript phía server, giúp xây dựng ứng dụng nhanh, mở rộng tốt và xử lý bất đồng bộ hiệu quả.',
    courses: 654,
  },
  algorithms: {
    title: 'Thuật toán',
    description: 'Thuật toán là nền tảng của khoa học máy tính, giúp giải quyết vấn đề một cách tối ưu và hiệu quả.',
    courses: 432,
  },
  'data-structures': {
    title: 'Cấu trúc dữ liệu',
    description: 'Cấu trúc dữ liệu là cách tổ chức và lưu trữ dữ liệu để thao tác nhanh chóng và hiệu quả.',
    courses: 543,
  },
  os: {
    title: 'Hệ điều hành',
    description: 'Hệ điều hành quản lý tài nguyên phần cứng và phần mềm, cung cấp nền tảng cho ứng dụng hoạt động.',
    courses: 321,
  },
};

export default function CategoryDescription({ slug }: CategoryDescriptionProps) {
  const data = categoryData[slug] || {
    title: 'Danh mục',
    description: 'Không tìm thấy dữ liệu cho danh mục này.',
    courses: 0,
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
        mb: 2,
      }}
    >
      <Typography variant='h5' fontWeight={600} gutterBottom>
        {data.title}
      </Typography>

      <Typography variant='body2' color='text.secondary' sx={{ mb: 2 }} paragraph>
        {data.description}
      </Typography>

      <Typography variant='body2' fontWeight={500}>
        <Box component='span' fontWeight={700}>
          {data.courses.toLocaleString()}
        </Box>{' '}
        khóa học
      </Typography>
    </Paper>
  );
}
