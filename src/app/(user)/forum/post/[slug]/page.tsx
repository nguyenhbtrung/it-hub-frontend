import ClientCodeBlockConfig from '@/components/common/clientCodeBlockConfig';
import CommentSection from '@/components/user/forum/postDetail/commentSection';
import PostContent from '@/components/user/forum/postDetail/postContent';
import RelatedPosts from '@/components/user/forum/postDetail/relatedPosts';
import { Box, Container, Grid, Paper } from '@mui/material';

// Mock data for the post
const postData = {
  id: '1',
  type: 'question',
  time: '2 giờ trước',
  title: 'Làm thế nào để tối ưu hóa truy vấn SQL trong dự án Spring Boot với dữ liệu lớn?',
  author: {
    name: 'Nguyễn Văn A',
    role: 'student',
    reputation: '1.5k',
    reputationLevel: 'silver',
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCsLwgES4ifj0XawAzyqd-rDfFcm8NhUMKO2CVQJdUKLehJ9-5z5nMyudiFbjqMrXoFlL6oita9JRcWvlF1t857-nlX603J0gBTmq2yQtoLScAljXJ_b_n5zrGsiUOtw8MvKpTzgiNWHEruMuP6A1Jpugq4L1lx1ri1xCPFcrKRdiL1ojimLwxw4JT4QPog3npTYiMGw3_mkbsQiKt9hMsgba03HwedhF1T1C4XsXNQnrfhdX-GzPy93GZVH5SIow67ksR8hHNy0vw',
    isOnline: true,
  },
  content: {
    type: 'doc',
    content: [
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Chào mọi người, em đang làm đồ án tốt nghiệp về hệ thống quản lý thư viện. Em sử dụng Spring Boot và MySQL.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Hiện tại bảng ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'code',
              },
            ],
            text: 'Books',
          },
          {
            type: 'text',
            text: ' của em có khoảng 2 triệu bản ghi. Khi thực hiện chức năng tìm kiếm theo tên sách kết hợp với bộ lọc theo thể loại và năm xuất bản, query chạy rất chậm (khoảng 3-4s).',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Đây là đoạn code Repository của em:',
          },
        ],
      },
      {
        type: 'codeBlock',
        attrs: {
          language: 'java',
        },
        content: [
          {
            type: 'text',
            text: '@Query("SELECT b FROM Book b WHERE b.title LIKE %:keyword% AND b.category = :category AND b.publishYear = :year")\nList<Book> searchBooks(@Param("keyword") String keyword, @Param("category") String category, @Param("year") int year);',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Em đã đánh index cho các cột ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'code',
              },
            ],
            text: 'title',
          },
          {
            type: 'text',
            text: ', ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'code',
              },
            ],
            text: 'category',
          },
          {
            type: 'text',
            text: ' và ',
          },
          {
            type: 'text',
            marks: [
              {
                type: 'code',
              },
            ],
            text: 'publish_year',
          },
          {
            type: 'text',
            text: ' riêng lẻ nhưng tốc độ vẫn không cải thiện nhiều. Có cách nào để tối ưu câu truy vấn này hoặc cấu hình MySQL tốt hơn không ạ?',
          },
        ],
      },
      {
        type: 'callout',
        attrs: {
          type: 'note',
        },
        content: [
          {
            type: 'text',
            marks: [
              {
                type: 'bold',
              },
            ],
            text: 'Ghi chú:',
          },
          {
            type: 'text',
            text: ' Server MySQL em đang chạy trên Docker với cấu hình mặc định 2GB RAM.',
          },
        ],
      },
      {
        type: 'paragraph',
        content: [
          {
            type: 'text',
            text: 'Em có đính kèm file giải thích query plan hiện tại bên dưới, mong mọi người xem giúp ạ.',
          },
        ],
      },
    ],
  },
  attachments: [
    {
      filename: 'Explain_Query_Plan_Log.pdf',
      size: '2.4 MB',
      time: '14:05',
    },
  ],
  tags: ['#SpringBoot', '#MySQL', '#DatabaseOptimization', '#Java'],
  votes: 45,
  comments: 3,
  views: 128,
};

export default function PostDetailPage({ params }: { params: { slug: string } }) {
  return (
    <Box sx={{ bgcolor: 'customBackground.4', py: 10 }}>
      <ClientCodeBlockConfig />
      <Container maxWidth='lg' sx={{ py: 4, px: { xs: 2, md: 4 } }}>
        {/* Main post content */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
          }}
        >
          <PostContent post={postData} />
        </Paper>

        {/* Comment section */}
        <Paper
          elevation={0}
          sx={{
            mb: 3,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
          }}
        >
          <CommentSection />
        </Paper>

        {/* Related posts */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
                height: '100%',
              }}
            >
              <RelatedPosts type='author' />
            </Paper>
          </Grid>
          <Grid size={{ xs: 12, lg: 6 }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                border: 1,
                borderColor: 'divider',
                height: '100%',
              }}
            >
              <RelatedPosts type='related' />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
