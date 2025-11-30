import {
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Stack,
  Rating,
  Button,
  TextField,
  Divider,
  Chip,
  IconButton,
} from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import SortIcon from '@mui/icons-material/Sort';
import { CourseStats, Review } from '@/types/course';
import CourseReviewsContent from './content';

export interface CourseReviewsProps {
  reviews: Review[];
  courseStats: CourseStats;
}

export interface ReviewStats {
  rating: number;
  ratingCount: number;
}

const fetchCourseReviews = async () => {
  const reviews: Review[] = [
    {
      id: 'r1',
      user: {
        name: 'Trần Văn B',
        avatar: 'https://picsum.photos/200?random=1',
        title: 'Frontend Developer',
      },
      rating: 5,
      comment:
        'Khóa học rất chi tiết và dễ hiểu. Giảng viên giải thích các khái niệm phức tạp một cách đơn giản. Mình đã apply được ngay vào công việc.',
      date: '2024-12-15',
      likes: 24,
      isVerified: true,
    },
    {
      id: 'r2',
      user: {
        name: 'Lê Thị C',
        avatar: 'https://picsum.photos/200?random=2',
        title: 'Sinh viên CNTT',
      },
      rating: 4.5,
      comment: 'Nội dung tốt, bài tập thực hành phong phú. Tuy nhiên mình mong có thêm ví dụ thực tế hơn nữa.',
      date: '2024-12-10',
      likes: 18,
      isVerified: true,
    },
    {
      id: 'r3',
      user: {
        name: 'Phạm Văn D',
        avatar: 'https://picsum.photos/200?random=3',
        title: 'Backend Developer',
      },
      rating: 5,
      comment:
        'Perfect! Từ một người chỉ biết backend, mình đã tự tin làm cả frontend sau khóa học này. Cảm ơn giảng viên!',
      date: '2024-12-08',
      likes: 32,
      isVerified: true,
    },
    {
      id: 'r4',
      user: {
        name: 'Nguyễn Thị E',
        avatar: 'https://picsum.photos/200?random=4',
        title: 'Freelancer',
      },
      rating: 4,
      comment: 'Khóa học giúp mình có đủ kiến thức để nhận dự án freelance đầu tiên. Support rất nhiệt tình.',
      date: '2024-12-05',
      likes: 15,
      isVerified: true,
    },
  ];

  const reviewStats: ReviewStats = {
    rating: 4.8,
    ratingCount: 1245,
  };

  return { reviews, reviewStats };
};

export default async function CourseReviews() {
  const { reviews, reviewStats } = await fetchCourseReviews();

  return <CourseReviewsContent reviews={reviews} reviewStats={reviewStats} />;
}
