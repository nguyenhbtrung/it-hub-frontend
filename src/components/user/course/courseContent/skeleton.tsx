import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function CourseContentSkeleton() {
  const sections = [
    { titleWidth: '75%', countWidth: 105 },
    { titleWidth: '60%', countWidth: 115 },
  ];

  return (
    <Box>
      {/* =========================
          Header
      ========================= */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        {/* Title */}
        <Skeleton
          variant='text'
          width={210}
          height={36}
          sx={{
            transform: 'none',
          }}
        />

        {/* Statistics */}
        <Stack direction='row' spacing={3} alignItems='center'>
          <Skeleton
            variant='text'
            width={190}
            height={24}
            sx={{
              transform: 'none',
            }}
          />

          <Skeleton
            variant='text'
            width={65}
            height={24}
            sx={{
              transform: 'none',
            }}
          />
        </Stack>
      </Stack>

      {/* =========================
          Sections
      ========================= */}
      <Stack spacing={2}>
        {sections.map((section, index) => (
          <CourseSectionSkeleton
            key={index}
            titleWidth={section.titleWidth}
            lessonCountWidth={section.countWidth}
            chipWidth={72}
          />
        ))}
      </Stack>
    </Box>
  );
}

/* =================================
   Course section skeleton
================================= */

interface CourseSectionSkeletonProps {
  titleWidth?: string | number;
  lessonCountWidth?: string | number;
  chipWidth?: string | number;
}

function CourseSectionSkeleton({
  titleWidth = '70%',
  lessonCountWidth = 105,
  chipWidth = 72,
}: CourseSectionSkeletonProps) {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        bgcolor: 'background.paper',
      }}
    >
      {/* Accordion Summary */}
      <Box
        sx={{
          minHeight: 72,
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {/* Section content */}
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Skeleton
            variant='text'
            width={titleWidth}
            height={26}
            sx={{
              transform: 'none',
              maxWidth: '500px',
            }}
          />

          <Skeleton
            variant='text'
            width={lessonCountWidth}
            height={22}
            sx={{
              transform: 'none',
            }}
          />
        </Box>

        {/* Chapter chip */}
        <Skeleton
          variant='rounded'
          width={chipWidth}
          height={24}
          sx={{
            transform: 'none',
            borderRadius: 2,
            mr: 2,
          }}
        />

        {/* Expand icon */}
        <ExpandMoreIcon
          sx={{
            opacity: 0.2,
          }}
        />
      </Box>
    </Box>
  );
}
