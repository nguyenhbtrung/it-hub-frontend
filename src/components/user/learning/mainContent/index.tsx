import { Box, Typography, Button, Breadcrumbs, Link, Paper, List, ListItem, Divider } from '@mui/material';
import { ArrowBack, ArrowForward, ChevronRight } from '@mui/icons-material';

export default function MainContent() {
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, overflowY: 'auto' }}>
        <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 3, md: 6 } }}>
          {/* Breadcrumb */}
          <Breadcrumbs separator={<ChevronRight fontSize='small' />} sx={{ mb: 3 }}>
            <Link
              href='#'
              color='text.secondary'
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Chương 2: Kiến thức cơ bản
            </Link>
            <Link
              href='#'
              color='text.secondary'
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                textDecoration: 'none',
                '&:hover': { color: 'primary.main' },
              }}
            >
              Bài 2.1: Cài đặt môi trường
            </Link>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              Bước 2: Cấu hình
            </Typography>
          </Breadcrumbs>

          {/* Title */}
          <Box sx={{ mb: 6 }}>
            <Typography
              variant='h1'
              sx={{
                fontSize: { xs: '2rem', md: '2.5rem' },
                fontWeight: 700,
                mb: 1,
              }}
            >
              Hướng dẫn cài đặt trên Windows
            </Typography>
            <Typography
              variant='h6'
              sx={{
                color: 'text.secondary',
                fontSize: '1.125rem',
                fontWeight: 400,
              }}
            >
              Cùng nhau thiết lập môi trường phát triển để sẵn sàng cho khóa học.
            </Typography>
          </Box>

          {/* Content */}
          <Box sx={{ '& p': { color: 'text.secondary', mb: 2 } }}>
            <Typography>
              Trong bài học này, chúng ta sẽ đi qua từng bước để cài đặt và cấu hình phần mềm cần thiết trên hệ điều
              hành Windows. Hãy đảm bảo bạn đã xem video hướng dẫn và làm theo các bước bên dưới.
            </Typography>

            {/* Video Placeholder */}
            <Paper
              sx={{
                aspectRatio: '16/9',
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'grey.200',
                my: 4,
              }}
            >
              <Box
                component='img'
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuC3NJ6pve7O3xXBNfXZ02aeoyjtRqK19THpoO-saTRYN1auXqJ6ubfXl-xf5Y7cAfFVYYCpooKFW43fsLJRi_U8JBAe931VVn_HRZsJZbVtN4ahHm6DFwwk1mPa_po9bEEFd8MVIhEiNtWbM5EJtaJ4G6Dsthly0bZ2NPwhj3kxuQviL7yPGcvz13082mKzIswRHQ0p1dIGbehwAK2WXPqwhR2gL3kSvc94jdWWvbe6QiFJJc8k5ss3TIMCsbgsiAmHF_OPIHYS0W8'
                alt='Video placeholder showing code on a screen'
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </Paper>

            <Typography variant='h2' sx={{ fontSize: '1.5rem', fontWeight: 600, mb: 2, mt: 4 }}>
              Các bước thực hiện
            </Typography>

            <List sx={{ listStyleType: 'decimal', pl: 4, mb: 4 }}>
              <ListItem sx={{ display: 'list-item', pl: 1, mb: 1 }}>
                <Typography>
                  Tải xuống tệp cài đặt từ trang web chính thức. Chúng tôi đã cung cấp liên kết trực tiếp để bạn tiện
                  theo dõi.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item', pl: 1, mb: 1 }}>
                <Typography>
                  Chạy tệp .exe vừa tải về và làm theo các hướng dẫn trên màn hình. Lưu ý chọn đúng đường dẫn cài đặt.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item', pl: 1, mb: 1 }}>
                <Typography>
                  Sau khi cài đặt xong, mở ứng dụng lên và tiến hành cấu hình ban đầu như thiết lập ngôn ngữ, giao diện.
                </Typography>
              </ListItem>
              <ListItem sx={{ display: 'list-item', pl: 1 }}>
                <Typography>
                  Kiểm tra lại phiên bản đã cài đặt để chắc chắn rằng mọi thứ đã hoạt động chính xác.
                </Typography>
              </ListItem>
            </List>

            {/* Note Box */}
            <Paper
              sx={{
                borderLeft: '4px solid',
                borderColor: 'primary.main',
                backgroundColor: 'grey.100',
                p: 3,
                mb: 4,
                borderRadius: '0 8px 8px 0',
              }}
            >
              <Typography variant='h6' sx={{ fontWeight: 600, mb: 1 }}>
                Lưu ý quan trọng
              </Typography>
              <Typography>
                Hãy chắc chắn rằng bạn đã khởi động lại máy tính sau khi quá trình cài đặt hoàn tất để áp dụng tất cả
                các thay đổi về biến môi trường.
              </Typography>
            </Paper>

            {/* Screenshot */}
            <Paper
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'grey.200',
                mb: 4,
              }}
            >
              <Box
                component='img'
                src='https://lh3.googleusercontent.com/aida-public/AB6AXuCqOvXrmog41hF3X4IrNUV3OGtSBcA4XDzGt56vwKk9DnvJ1iWCrQJH0LgNtyo2BM6OFr05rN1ay8JKQj1dTHbe-QhOHj47a4jt_BLoTJedFMcaBMjVVbKoxXhp-xo_92mzAmdpt2F26hadPD9XNE7KMGDnEEKOqsBk8GIyU5_FkRTZCkXLjEm1_0Is3Rz521jN6mVK75qsbYpxyABkquLMQeod1z4KUkHPygsYTRz-VLvW4DBbzj0pefQs9GQ-tVRZuVyO1vyyNH4'
                alt='Screenshot of the software interface after installation'
                sx={{ width: '100%', display: 'block' }}
              />
            </Paper>
          </Box>

          {/* Navigation Buttons */}
          <Divider sx={{ my: 6 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant='outlined'
              startIcon={<ArrowBack />}
              sx={{
                borderColor: 'grey.300',
                color: 'text.secondary',
                '&:hover': {
                  borderColor: 'grey.400',
                  backgroundColor: 'grey.100',
                },
              }}
            >
              Bước trước
            </Button>
            <Button
              variant='contained'
              endIcon={<ArrowForward />}
              sx={{
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' },
              }}
            >
              Hoàn thành và tiếp tục
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
