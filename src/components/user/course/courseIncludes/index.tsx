import { Typography, List, ListItem, Box, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LeaderboardOutlined from '@mui/icons-material/LeaderboardOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { CourseStats } from '@/types/course';

interface CourseIncludesProps {
  courseStats: CourseStats;
}

export default function CourseIncludes({ courseStats }: CourseIncludesProps) {
  const hrs = Math.floor(courseStats.totalDurationMinutes / 60);
  const mins = courseStats.totalDurationMinutes % 60;
  return (
    <>
      <Typography variant='h6'>Khoá học bao gồm</Typography>
      <List>
        <ListItem disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', my: 1 }}>
            <LeaderboardOutlined fontSize='small' color='inherit' />
            <Typography variant='body2' color='inherit' sx={{ ml: 1 }}>
              Cấp độ:
            </Typography>
          </Box>
          <Typography variant='body2'>{courseStats.level}</Typography>
        </ListItem>

        <Divider />

        <ListItem disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', my: 1 }}>
            <AccessTimeIcon fontSize='small' color='inherit' />
            <Typography variant='body2' color='inherit' sx={{ ml: 1 }}>
              Thời lượng:
            </Typography>
          </Box>
          <Typography variant='body2'>
            {hrs} giờ {mins} phút
          </Typography>
        </ListItem>

        <Divider />

        {/* Thời lượng */}
        <ListItem disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', my: 1 }}>
            <MenuBookOutlinedIcon fontSize='small' color='inherit' />
            <Typography variant='body2' color='inherit' sx={{ ml: 1 }}>
              Bài giảng:
            </Typography>
          </Box>
          <Typography variant='body2'>{courseStats.lessons}</Typography>
        </ListItem>

        <Divider />

        {/* Thời lượng */}
        <ListItem disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', my: 1 }}>
            <FolderOutlinedIcon fontSize='small' color='inherit' />
            <Typography variant='body2' color='inherit' sx={{ ml: 1 }}>
              Tài nguyên học tập:
            </Typography>
          </Box>
          <Typography variant='body2'>{courseStats.materials}</Typography>
        </ListItem>
      </List>
    </>
  );
}
