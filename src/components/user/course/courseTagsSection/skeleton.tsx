import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export function CourseTagsSectionSkeleton() {
  const tags = [{ width: 75 }, { width: 110 }, { width: 90 }, { width: 130 }, { width: 85 }, { width: 120 }];

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
        {tags.map((tag, index) => (
          <TagSkeleton key={index} width={tag.width} />
        ))}
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
