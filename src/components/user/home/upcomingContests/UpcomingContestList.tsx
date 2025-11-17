import { Box, Grid } from '@mui/material';
import { ContestCard, ContestCardSkeleton } from '../../common/ContestCard';

const contests = [
  {
    id: 1,
    title: 'Hackathon Web Development 2025',
    category: 'Hackathon',
    status: 'Đang diễn ra',
    participants: 245,
    startTime: new Date('2025-11-20T09:00:00'),
    endTime: new Date('2025-11-20T17:00:00'),
    image: 'https://img-c.udemycdn.com/course/480x270/4015622_2fee_4.jpg',
  },
  {
    id: 2,
    title: 'Cuộc thi Thuật toán ACM',
    category: 'Lập trình',
    status: 'Đang diễn ra',
    participants: 189,
    startTime: new Date('2025-11-25T08:00:00'),
    endTime: new Date('2025-11-25T18:00:00'),
    image: 'https://img-c.udemycdn.com/course/480x270/6271693_8b53_3.jpg',
  },
  {
    id: 3,
    title: 'AI Challenge - Computer Vision',
    category: 'AI/ML',
    status: 'Đang diễn ra',
    participants: 156,
    startTime: new Date('2025-12-01T09:00:00'),
    endTime: new Date('2025-12-01T17:00:00'),
    image: 'https://img-c.udemycdn.com/course/480x270/1533864_a443.jpg',
  },
];

const getUpcomingContests = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return contests;
};

export async function UpcomingContestList() {
  const contests = await getUpcomingContests();

  return (
    <>
      {/* Mobile: horizontal scroll */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          overflowX: 'auto',
          gap: 2,
          pb: 2,
          px: 2,
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '32px',
        }}
      >
        {contests.map((contest) => (
          <Box
            key={contest.id}
            sx={{
              // width: { xs: '75%', sm: 'auto' },
              // minWidth: { xs: '75%', sm: '50%' },
              width: 300,
              flexShrink: 0,
              scrollSnapAlign: 'start',
            }}
          >
            <ContestCard contest={contest} />
          </Box>
        ))}
      </Box>

      {/* Desktop: grid */}
      <Grid container spacing={2} px={0} sx={{ display: { xs: 'none', md: 'flex' } }}>
        {contests.map((contest) => (
          <Grid size={{ xs: 12, md: 4 }} key={contest.id}>
            <ContestCard contest={contest} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export async function UpcomingContestListSkeleton() {
  return (
    <>
      {/* Mobile: horizontal scroll */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          overflowX: 'hidden',
          gap: 2,
          pb: 2,
          px: 2,
          scrollSnapType: 'x mandatory',
          scrollPaddingLeft: '32px',
        }}
      >
        {Array.from(new Array(3)).map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 300,
              flexShrink: 0,
              scrollSnapAlign: 'start',
            }}
          >
            <ContestCardSkeleton />
          </Box>
        ))}
      </Box>

      {/* Desktop: grid */}
      <Grid container spacing={2} px={0} sx={{ display: { xs: 'none', md: 'flex' } }}>
        {Array.from(new Array(3)).map((_, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <ContestCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
