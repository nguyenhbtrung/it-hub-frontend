'use client';

import { Box, Button, Stack } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { NormalPost } from '@/types/forum';
import Header from '../header';
import PostCard from '../../feed/postCard';

const posts: NormalPost[] = [
  {
    id: 2,
    type: 'question',
    time: '2 giờ trước',
    title: 'Lỗi NullPointerException trong Java Spring Boot khi autowire service',
    content:
      'Mình đang gặp lỗi này khi khởi chạy ứng dụng Spring Boot, mặc dù đã thêm annotation @Service cho class service và @Autowired trong controller nhưng vẫn bị báo null. Có ai từng gặp...',
    author: {
      name: 'Trần Minh Hiếu',
      role: 'student',
      reputation: '1,240',
      reputationLevel: 'silver',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDQZlbsxnW6c3afm3eCmvvNWmRl48zmOBisR3_2tT59bFS2XPdaeQK_RzRj9S1vh55may6eIQt9d7-Q45Tlkov-nEn9-2ggk7igw9Je_D_CPP3eJ2s1lj_znPDdfsOQTxRxcUDby8u8fIXGpTGm670xUlinnsgwNIxPe0ztHDwvxhW4XtC-G6NhuzhpnANYVUdflmFHEU65zWMk4CGtZ04xsTOawclCitQPqLopwYy8HPrY5bU30TyZ3helYFgSfLTARHrcqvlv7Ls',
    },
    votes: 24,
    comments: 5,
    views: 128,
    tags: ['#Java', '#SpringBoot', '#Backend'],
    saved: true,
  },
  {
    id: 3,
    type: 'knowledge',
    time: '5 giờ trước',
    title: 'Tổng hợp tài liệu học Docker từ cơ bản đến nâng cao',
    content:
      'Chào mọi người, sau một thời gian tìm hiểu về DevOps, mình đã tổng hợp được một số nguồn tài liệu Docker rất hay. Bài viết này sẽ chia sẻ chi tiết lộ trình và các link tài nguyên...',
    author: {
      name: 'Lê Văn Khoa',
      role: 'instructor',
      reputation: '15,420',
      reputationLevel: 'diamond',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOz5tuTkCQmcP_tJ0YL0JLpxQdtSp1KthZLot1MU3JVv6uS7JoLzQSjcAjWrPivW__qBoc-cmnQYba1rAoL4PA-CsIj5qbtFr94dkKtPQOhUFW0qgTcFWednnLs_-GC_P2ovD-eYF_upmcxbzI58OW5Fb9F-zRimP_eJVJmP4HIuVZTBZ60MxVevW29hshUhlY94M_dWwrww7_9lXoIS_Knk82uVRq61Tw026bv-Pd9LaKBxIiySPqEDKlPePARbZJeOZ-vjCeiA',
    },
    votes: 156,
    comments: 32,
    views: 2400,
    tags: ['#DevOps', '#Docker', '#Tutorial'],
    saved: true,
  },
  {
    id: 4,
    type: 'discussion',
    time: '1 ngày trước',
    title: 'Nên học ReactJS hay VueJS cho người mới bắt đầu?',
    content:
      'Em mới học xong HTML/CSS/JS cơ bản và muốn học thêm framework. Em thấy ReactJS phổ biến hơn nhưng VueJS lại được đánh giá là dễ tiếp cận hơn. Mọi người cho em xin lời khuyên với ạ?',
    author: {
      name: 'Phạm Thu Hà',
      role: 'student',
      reputation: '450',
      reputationLevel: 'bronze',
      avatar:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA_60CUNYpWMDlVgE1HTr_k5ZewuC329ENB3KepmfVsMHjp69XbokDSo9slylkdcuNanFHx8pjeCCE-nrwu1EpKvOU2fbAnRaZPsSzgqIrfM4zZC5-1rV1-MKKl0-sfw_717htyT5sKTmbhuJVhTzrdndl1dzDRdissVZkpsikScTe9Q1BhUxy7OskUA73LtTdGjlC9LQnweSvM_GF1GShkzqIcTKQsuxNPac75YXINZyy2XJ4FPXUXv_gmxjNMGcQ4HzbtW5eF5n4',
    },
    votes: 8,
    comments: 45,
    views: 540,
    tags: ['#Frontend', '#ReactJS', '#VueJS'],
    saved: true,
  },
];

export default function TagPageMainContent() {
  return (
    <Box>
      {/* Header */}
      <Header />

      {/* Posts */}
      <Stack spacing={2}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}

        {/* Load more button */}
        <Box display='flex' justifyContent='center' py={2}>
          <Button endIcon={<ExpandMoreIcon />} sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            Xem thêm bài viết
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
