import Section from '@/components/common/section';
import { Box, Card, Divider, Grid, List, ListItem, ListItemIcon, Skeleton, Stack } from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LeaderboardOutlined from '@mui/icons-material/LeaderboardOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';

export function CourseOverviewSkeleton() {
  return (
    <Section id='overview'>
      {/* =========================
          Course description
      ========================= */}
      <Box sx={{ position: 'relative', my: 3 }}>
        <Stack spacing={0.5}>
          <Skeleton variant='text' width='100%' height={24} sx={{ transform: 'none' }} />

          <Skeleton variant='text' width='95%' height={24} sx={{ transform: 'none' }} />

          <Skeleton variant='text' width='80%' height={24} sx={{ transform: 'none' }} />

          <Skeleton variant='text' width='65%' height={24} sx={{ transform: 'none' }} />
        </Stack>

        {/* Xem thêm */}
        <Skeleton
          variant='text'
          width={80}
          height={32}
          sx={{
            transform: 'none',
            mt: 1,
          }}
        />
      </Box>

      {/* =========================
          Course includes - mobile
      ========================= */}
      <Box
        display={{
          xs: 'flex',
          lg: 'none',
        }}
        flexDirection='row'
        alignItems='center'
        justifyContent='center'
      >
        <Card
          sx={{
            maxWidth: 600,
            flex: 1,
            mb: 4,
          }}
        >
          <CourseIncludesSkeleton />
        </Card>
      </Box>

      {/* =========================
          Learning outcomes
          + Requirements
      ========================= */}
      <Grid container spacing={3}>
        {/* =====================
            Bạn sẽ học được
        ===================== */}
        <Grid size={12}>
          <Skeleton
            variant='text'
            width={180}
            height={36}
            sx={{
              transform: 'none',
              mb: 1,
            }}
          />

          <List sx={{ color: 'text.secondary' }}>
            <OverviewListItem width='90%' />
            <OverviewListItem width='82%' />
            <OverviewListItem width='95%' />
            <OverviewListItem width='76%' />
          </List>
        </Grid>

        {/* =====================
            Yêu cầu
        ===================== */}
        <Grid size={12}>
          <Skeleton
            variant='text'
            width={100}
            height={36}
            sx={{
              transform: 'none',
              mb: 1,
            }}
          />

          <List sx={{ color: 'text.secondary' }}>
            <OverviewListItem width='80%' />
            <OverviewListItem width='92%' />
            <OverviewListItem width='70%' />
          </List>
        </Grid>
      </Grid>
    </Section>
  );
}

/* =================================
   Overview list item skeleton
================================= */

interface OverviewListItemProps {
  width?: string | number;
}

function OverviewListItem({ width = '90%' }: OverviewListItemProps) {
  return (
    <ListItem
      disableGutters
      sx={{
        py: 0.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 32,
        }}
      >
        <Skeleton
          variant='circular'
          width={20}
          height={20}
          sx={{
            transform: 'none',
          }}
        />
      </ListItemIcon>

      <Skeleton
        variant='text'
        width={width}
        height={24}
        sx={{
          transform: 'none',
        }}
      />
    </ListItem>
  );
}

/* =================================
   Course includes skeleton
================================= */

function CourseIncludesSkeleton() {
  return (
    <Box sx={{ p: 2 }}>
      {/* Title */}
      <Skeleton
        variant='text'
        width={170}
        height={32}
        sx={{
          transform: 'none',
          mb: 1,
        }}
      />

      <Stack spacing={0}>
        <CourseIncludeItem icon={<LeaderboardOutlined fontSize='small' />} labelWidth={75} valueWidth={70} />

        <Divider />

        <CourseIncludeItem icon={<AccessTimeIcon fontSize='small' />} labelWidth={85} valueWidth={60} />

        <Divider />

        <CourseIncludeItem icon={<MenuBookOutlinedIcon fontSize='small' />} labelWidth={75} valueWidth={30} />

        <Divider />

        <CourseIncludeItem icon={<FolderOutlinedIcon fontSize='small' />} labelWidth={125} valueWidth={30} />
      </Stack>
    </Box>
  );
}

/* =================================
   Course include item
================================= */

interface CourseIncludeItemProps {
  icon: React.ReactNode;
  labelWidth: number;
  valueWidth: number;
}

function CourseIncludeItem({ icon, labelWidth, valueWidth }: CourseIncludeItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        py: 1.5,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          color: 'text.secondary',
          my: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            opacity: 0.35,
          }}
        >
          {icon}
        </Box>

        <Skeleton
          variant='text'
          width={labelWidth}
          height={22}
          sx={{
            transform: 'none',
            ml: 1,
          }}
        />
      </Box>

      <Skeleton
        variant='text'
        width={valueWidth}
        height={22}
        sx={{
          transform: 'none',
        }}
      />
    </Box>
  );
}
