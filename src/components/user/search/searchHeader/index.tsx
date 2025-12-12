import { Box, Typography } from '@mui/material';

interface SearchHeaderProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export default async function SearchHeader({ searchParams }: SearchHeaderProps) {
  const { query } = await searchParams;
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant='h1'
        sx={{
          fontSize: { xs: '2.25rem', md: '2.5rem' },
          fontWeight: 900,
          color: 'text.primary',
          letterSpacing: '-0.033em',
          mb: 1,
        }}
      >
        Tìm kiếm khoá học
      </Typography>

      <Typography variant='body1' color='text.secondary' sx={{ mb: 3 }}>
        Hiển thị các kết quả tìm kiếm cho &quot;{query}&quot;
      </Typography>
    </Box>
  );
}
