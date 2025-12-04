import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Paper,
  List,
  ListItem,
  Divider,
  Chip,
  CircularProgress,
} from '@mui/material';
import {
  ArrowBack,
  ArrowForward,
  ChevronRight,
  AccessTime,
  School,
  Download,
  Code,
  VideoLibrary,
  Image,
  Note,
  List as ListIcon,
  Quiz,
  Terminal,
} from '@mui/icons-material';
import { ContentBlock } from '@/types/content';
import { JSX } from 'react';
import { stepApi } from '@/lib/mockApi/leanring';
import RteViewer from '@/components/common/richTextEditor/rteViewer';
import MarkdownViewer from '@/components/common/markdownViewer';
import CodeViewer from '@/components/common/codeViewer';

// Helper component để render các loại block khác nhau
const BlockRenderer = ({ block }: { block: ContentBlock }) => {
  switch (block.type) {
    case 'text':
      return <RteViewer content={block.content} />;
    case 'markdown':
      return <MarkdownViewer content={block.content} />;
    case 'code':
      return <CodeViewer code={block.code} />;
    case 'heading':
      const HeadingComponent = `h${block.level}` as keyof JSX.IntrinsicElements;
      return (
        <Typography
          component={HeadingComponent}
          sx={{
            fontSize:
              block.level === 1
                ? { xs: '2rem', md: '2.5rem' }
                : block.level === 2
                  ? '1.5rem'
                  : block.level === 3
                    ? '1.25rem'
                    : '1rem',
            fontWeight: block.level <= 2 ? 600 : 500,
            mb: block.level <= 2 ? 2 : 1,
            mt: block.level === 1 ? 0 : 4,
            color: 'text.primary',
          }}
        >
          {block.text}
        </Typography>
      );

    case 'paragraph':
      return (
        <Typography
          sx={{
            color: 'text.secondary',
            mb: 2,
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
          }}
        >
          {block.content}
        </Typography>
      );

    case 'video':
      return (
        <Paper
          sx={{
            aspectRatio: '16/9',
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'grey.200',
            my: 4,
            position: 'relative',
          }}
        >
          <Box
            component='iframe'
            src={block.url}
            sx={{
              width: '100%',
              height: '100%',
              border: 'none',
            }}
            title={block.title || 'Video bài giảng'}
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
          />
          {block.title && (
            <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
              <Typography variant='subtitle1' fontWeight={500}>
                {block.title}
              </Typography>
              {block.description && (
                <Typography variant='body2' color='text.secondary'>
                  {block.description}
                </Typography>
              )}
            </Box>
          )}
        </Paper>
      );

    case 'image':
      return (
        <Paper
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'grey.200',
            mb: 4,
            mt: 2,
          }}
        >
          <Box
            component='img'
            src={block.url}
            alt={block.alt}
            sx={{
              width: '100%',
              height: 'auto',
              display: 'block',
            }}
          />
          {block.caption && (
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant='body2' color='text.secondary'>
                {block.caption}
              </Typography>
            </Box>
          )}
        </Paper>
      );

    case 'note':
      const variantColors = {
        info: { bg: 'info.light', border: 'info.main' },
        warning: { bg: 'warning.light', border: 'warning.main' },
        danger: { bg: 'error.light', border: 'error.main' },
        success: { bg: 'success.light', border: 'success.main' },
        tip: { bg: 'primary.light', border: 'primary.main' },
      };

      const colors = variantColors[block.variant || 'info'];

      return (
        <Paper
          sx={{
            borderLeft: '4px solid',
            borderColor: colors.border,
            backgroundColor: colors.bg,
            p: 3,
            mb: 4,
            borderRadius: '0 8px 8px 0',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Note fontSize='small' sx={{ color: '#000000' }} />
            <Typography color='#000000' variant='h6' sx={{ fontWeight: 600 }}>
              {block.title || 'Lưu ý'}
            </Typography>
          </Box>
          <Typography color='#000000'>{block.content}</Typography>
        </Paper>
      );

    case 'list':
      return (
        <Box sx={{ mb: 4 }}>
          {block.ordered ? (
            <List sx={{ listStyleType: 'decimal', pl: 4 }}>
              {block.items.map((item, index) => (
                <ListItem key={index} sx={{ display: 'list-item', pl: 1, mb: 1 }}>
                  <Typography>{item}</Typography>
                </ListItem>
              ))}
            </List>
          ) : (
            <List sx={{ listStyleType: 'disc', pl: 4 }}>
              {block.items.map((item, index) => (
                <ListItem key={index} sx={{ display: 'list-item', pl: 1, mb: 1 }}>
                  <Typography>{item}</Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      );

    case 'quiz':
      return (
        <Paper
          sx={{
            border: '2px solid',
            borderColor: 'grey.200',
            borderRadius: 2,
            p: 3,
            mb: 4,
            mt: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Quiz />
            <Typography variant='h6' sx={{ fontWeight: 600 }}>
              Kiểm tra kiến thức
            </Typography>
            {block.points && <Chip label={`${block.points} điểm`} size='small' color='primary' />}
          </Box>

          <Typography variant='body1' sx={{ mb: 3 }}>
            {block.question}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {block.options.map((option) => (
              <Button
                key={option.id}
                variant='outlined'
                sx={{
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                  py: 1.5,
                  px: 2,
                }}
              >
                {option.text}
              </Button>
            ))}
          </Box>

          <Button variant='contained' sx={{ mt: 2 }}>
            Gửi câu trả lời
          </Button>
        </Paper>
      );

    case 'file':
      return (
        <Paper
          sx={{
            border: '1px dashed',
            borderColor: 'grey.300',
            borderRadius: 2,
            p: 2,
            mb: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Typography variant='subtitle1' fontWeight={500}>
              {block.filename}
            </Typography>
            {block.description && (
              <Typography variant='body2' color='text.secondary'>
                {block.description}
              </Typography>
            )}
            {block.size && (
              <Typography variant='caption' color='text.secondary'>
                {(block.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            )}
          </Box>
          <Button variant='outlined' startIcon={<Download />} href={block.url} download>
            Tải xuống
          </Button>
        </Paper>
      );

    case 'terminal':
      return (
        <Paper
          sx={{
            bgcolor: 'grey.900',
            color: 'grey.100',
            borderRadius: 2,
            overflow: 'hidden',
            mb: 4,
            mt: 2,
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: 'grey.800',
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Terminal />
            <Typography variant='subtitle2'>Terminal</Typography>
          </Box>

          <Box sx={{ p: 2 }}>
            {block.commands.map((cmd, index) => (
              <Box key={index} sx={{ mb: 3 }}>
                {cmd.description && (
                  <Typography variant='caption' color='grey.400' sx={{ display: 'block', mb: 0.5 }}>
                    {cmd.description}
                  </Typography>
                )}
                <Typography
                  component='div'
                  sx={{
                    color: 'success.light',
                    mb: 0.5,
                    fontFamily: 'monospace',
                  }}
                >
                  $ {cmd.command}
                </Typography>
                <Typography
                  component='div'
                  sx={{
                    color: 'grey.300',
                    fontFamily: 'monospace',
                    whiteSpace: 'pre-wrap',
                  }}
                >
                  {cmd.output}
                </Typography>
              </Box>
            ))}

            {block.interactive && (
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <Button variant='contained' size='small' sx={{ bgcolor: 'primary.main' }}>
                  Chạy lệnh
                </Button>
                <Button variant='outlined' size='small' sx={{ borderColor: 'grey.700', color: 'grey.300' }}>
                  Xem giải thích
                </Button>
              </Box>
            )}
          </Box>
        </Paper>
      );

    default:
      return null;
  }
};

// Main Component
export default async function MainContent({ stepId }: { stepId: string }) {
  // Fetch step details từ API
  const stepDetails = await stepApi.getStepDetails(stepId);

  if (!stepDetails) {
    return (
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography>Không tìm thấy nội dung bài học</Typography>
      </Box>
    );
  }

  const { step, lesson, section, content } = stepDetails;

  // Sort blocks theo order
  const sortedBlocks = content.blocks.sort((a, b) => a.order - b.order);

  // Tính thời gian ước tính
  const totalEstimatedTime =
    content.blocks.reduce((total, block) => {
      if (block.type === 'video' && block.duration) {
        return total + block.duration;
      }
      return total;
    }, 0) / 60; // Chuyển sang phút

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
              Phần {section.order}: {section.title}
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
              Bài {section.order}.{lesson.order}: {lesson.title}
            </Link>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'text.primary',
              }}
            >
              Bước {step.order}: {step.title}
            </Typography>
          </Breadcrumbs>

          {/* Header với thông tin chi tiết */}
          <Box sx={{ mb: 6 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box>
                <Typography
                  variant='h1'
                  sx={{
                    fontSize: { xs: '2rem', md: '2.5rem' },
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  {content.title}
                </Typography>
                <Typography
                  variant='h6'
                  sx={{
                    color: 'text.secondary',
                    fontSize: '1.125rem',
                    fontWeight: 400,
                    mb: 2,
                  }}
                >
                  {content.description}
                </Typography>
              </Box>

              {/* Metadata */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {content.difficulty && (
                  <Chip
                    label={
                      content.difficulty === 'beginner'
                        ? 'Cơ bản'
                        : content.difficulty === 'intermediate'
                          ? 'Trung cấp'
                          : 'Nâng cao'
                    }
                    size='small'
                    color={
                      content.difficulty === 'beginner'
                        ? 'success'
                        : content.difficulty === 'intermediate'
                          ? 'warning'
                          : 'error'
                    }
                  />
                )}
                {content.estimatedTime && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <AccessTime fontSize='small' />
                    <Typography color='text.primary' variant='caption'>
                      ~{content.estimatedTime} phút
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Mục tiêu học tập */}
            {content.objectives && content.objectives.length > 0 && (
              <Paper sx={{ p: 2, bgcolor: 'customBackground.2', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <School fontSize='small' />
                  <Typography variant='subtitle1' fontWeight={500}>
                    Mục tiêu học tập
                  </Typography>
                </Box>
                <List sx={{ pl: 2 }}>
                  {content.objectives.map((objective, index) => (
                    <ListItem key={index} sx={{ display: 'list-item', p: 0, mb: 0.5 }}>
                      <Typography variant='body2'>{objective}</Typography>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            )}
          </Box>

          {/* Content Blocks */}
          <Box>
            {sortedBlocks.map((block) => (
              <BlockRenderer key={block.id} block={block} />
            ))}
          </Box>

          {/* Thông tin tác giả */}
          {content.author && (
            <Paper sx={{ p: 3, mt: 6, bgcolor: 'customBackground.3' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {content.author.avatar && (
                  <Box
                    component='img'
                    src={content.author.avatar}
                    alt={content.author.name}
                    sx={{ width: 50, height: 50, borderRadius: '50%' }}
                  />
                )}
                <Box>
                  <Typography variant='subtitle1' fontWeight={500}>
                    {content.author.name}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Giảng viên
                  </Typography>
                  <Typography variant='caption' color='text.secondary'>
                    Cập nhật lần cuối: {new Date(content.updatedAt).toLocaleDateString('vi-VN')}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          )}

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
