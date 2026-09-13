import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function CourseTagsSectionSkeleton() {
  return (
    <Box>
      {/* Title */}
      <Skeleton
        variant='text'
        width={180}
        height={36}
        sx={{
          transform: 'none',
          mb: 1,
        }}
      />

      {/* Tags */}
      <Stack direction='row' flexWrap='wrap' gap={1}>
        <TagSkeleton width={75} />
        <TagSkeleton width={110} />
        <TagSkeleton width={90} />
        <TagSkeleton width={130} />
        <TagSkeleton width={85} />
        <TagSkeleton width={120} />
      </Stack>
    </Box>
  );
}

function TagSkeleton({ width }: { width: number }) {
  return (
    <Skeleton
      variant='rounded'
      width={width}
      height={32}
      sx={{
        transform: 'none',
        borderRadius: 2,
      }}
    />
  );
}
