import { Container, Grid, Paper, Typography, Box, Button, Chip } from '@mui/material';

import { FollowingData } from '@/components/user/forum/following/types';
import FollowingUsers from '@/components/user/forum/following/followingUsers';
import FollowingTags from '@/components/user/forum/following/followingTags';
import NotificationsPaused from '@mui/icons-material/NotificationsPausedOutlined';
import ExploreOutlined from '@mui/icons-material/ExploreOutlined';

// Dữ liệu mẫu
const getFollowingData = (): FollowingData => ({
  users: [
    {
      id: '1',
      name: 'Lê Văn Khoa',
      role: 'instructor',
      reputation: 15400,
      reputationLevel: 'diamond',
      status: 'online',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDYOz5tuTkCQmcP_tJ0YL0JLpxQdtSp1KthZLot1MU3JVv6uS7JoLzQSjcAjWrPivW__qBoc-cmnQYba1rAoL4PA-CsIj5qbtFr94dkKtPQOhUFW0qgTcFwednnLs_-GC_P2ovD-eYF_upmcxbzI58OW5Fb9F-zRimP_eJVJmP4HIuVZTBZ60MxVevW29hshUhlY94M_dWwrww7_9lXoIS_Knk82uVRq61Tw026bv-Pd9LaKBxIiySPqEDKlPePARbZJeOZ-vjCeiA',
      isVerified: true,
    },
    {
      id: '2',
      name: 'Phạm Thu Hà',
      role: 'student',
      reputation: 450,
      reputationLevel: 'bronze',
      status: 'offline',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuA_60CUNYpWMDlVgE1HTr_k5ZewuC329ENB3KepmfVsMHjp69XbokDSo9slylkdcuNanFHx8pjeCCE-nrwu1EpKvOU2fbAnRaZPsSzgqIrfM4zZC5-1rV1-MKKl0-sfw_717htyT5sKTmbhuJVhTzrdndl1dzDRdissVZkpsikScTe9Q1BhUxy7OskUA73LtTdGjlC9LQnweSvM_GF1GShkzqIcTKQsuxNPac75YXINZyy2XJ4FPXUXv_gmxjNMGcQ4HzbtW5eF5n4',
    },
    {
      id: '3',
      name: 'Phạm Văn Bách',
      role: 'student',
      reputation: 450,
      reputationLevel: 'bronze',
      status: 'offline',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCLTbd-s68SzWNHbOMRjgTh4syXTW9uqyYlB2i1i_DflgsqPX8Vn1cQBy1-HTNyIyEy6Qg94Fzpq3EL4l8rs42jiyxzkmqPuA3wfcN2jTYhytUuDSm_fXTZqDUEEugpJjE-6p5b7ReB68yl2j6wweHi08IajLV1zZ29f-cHlCBfh1iwXMPdhHPptxzwM0BXaBaoYKYwSyz2boIuKIQE__bGZye3ZCb0Cq2SaTLRawhnzNZC4-dd7QDBuAKNnimxNDlvNElideMRls0',
    },
    {
      id: '4',
      name: 'Trần Minh Hiếu',
      role: 'student',
      reputation: 1240,
      reputationLevel: 'silver',
      status: 'offline',
      avatarUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDQZlbsxnW6c3afm3eCmvvNWmRl48zmOBisR3_2tT59bFS2XPdaeQK_RzRj9S1vh55may6eIQt9d7-Q45Tlkov-nEn9-2ggk7igw9Je_D_CPP3eJ2s1lj_znPDdfsOQTxRxcUDby8u8fIXGpTGm670xUlinnsgwNIxPe0ztHDwvxhW4XtC-G6NhuzhpnANYVUdflmFHEU65zWMk4CGtZ04xsTOawclCitQPqLopwYy8HPrY5bU30TyZ3helYFgSfLTARHrcqvlv7Ls',
    },
  ],
  tags: [
    {
      id: '1',
      name: 'Java',
      description: 'Ngôn ngữ lập trình phổ biến cho backend.',
      newPosts: 24,
      hasNewPosts: true,
    },
    {
      id: '2',
      name: 'ReactJS',
      description: 'Thư viện JavaScript cho xây dựng UI.',
      newPosts: 18,
      hasNewPosts: true,
    },
    {
      id: '3',
      name: 'DevOps',
      description: 'Văn hóa & công cụ phát triển phần mềm.',
      newPosts: 3,
      hasNewPosts: false,
    },
    {
      id: '4',
      name: 'CyberSecurity',
      description: 'An toàn thông tin và bảo mật mạng.',
      newPosts: 0,
      hasNewPosts: false,
    },
  ],
  stats: {
    totalUsers: 48,
    totalTags: 12,
  },
});

export default function FollowingPage() {
  const followingData = getFollowingData();

  return (
    <>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'flex-end' },
            mb: 2,
          }}
        >
          <Box>
            <Typography variant='h4' fontWeight='bold' gutterBottom>
              Đang theo dõi
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              Người dùng và tag bạn đang theo dõi
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1, mt: { xs: 2, sm: 0 } }}>
            <Box
              sx={{
                bgcolor: 'background.paper',
                color: 'text.secondary',
                border: '1px solid',
                borderColor: 'divider',
                fontWeight: 600,
                borderRadius: 0.5,
                p: 1,
              }}
            >
              {followingData.stats.totalUsers} Người dùng
            </Box>
            <Box
              sx={{
                bgcolor: 'background.paper',
                color: 'text.secondary',
                border: '1px solid',
                borderColor: 'divider',
                fontWeight: 600,
                borderRadius: 0.5,
                p: 1,
              }}
            >
              {followingData.stats.totalTags} Tags
            </Box>
          </Box>
        </Box>

        {/* Following Users Section */}
        <FollowingUsers users={followingData.users} totalUsers={followingData.stats.totalUsers} />

        {/* Following Tags Section */}
        <FollowingTags tags={followingData.tags} totalTags={followingData.stats.totalTags} />

        {/* Empty State */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            mt: 3,
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: 'action.hover',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 3,
              color: 'text.disabled',
            }}
          >
            <NotificationsPaused />
          </Box>
          <Typography variant='h6' fontWeight='bold' gutterBottom>
            Chưa theo dõi nội dung nào
          </Typography>
          <Typography variant='body2' color='text.secondary' sx={{ maxWidth: 400, mx: 'auto', mb: 3 }}>
            Bạn chưa theo dõi chủ đề hay người dùng nào. Hãy khám phá để cập nhật những nội dung mới nhất.
          </Typography>
          <Button variant='contained' startIcon={<ExploreOutlined />} sx={{ borderRadius: 1 }}>
            Khám phá ngay
          </Button>
        </Paper>
      </Box>
    </>
  );
}
