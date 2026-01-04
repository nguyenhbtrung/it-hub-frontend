import { Typography, List, ListItem, Box, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LeaderboardOutlined from '@mui/icons-material/LeaderboardOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { CourseStats } from '@/types/course';
import { levelLabelsMap } from '@/lib/const/course';
import { formatDuration } from '@/lib/utils/formatDatetime';

interface CourseIncludesProps {
  courseStats: CourseStats;
}

export default function CourseIncludes({ courseStats }: CourseIncludesProps) {
  const hrs = Math.floor(courseStats.totalDuration / 60);
  const mins = courseStats.totalDuration % 60;
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
          <Typography variant='body2'>{levelLabelsMap[courseStats.level]}</Typography>
        </ListItem>

        <Divider />

        <ListItem disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', my: 1 }}>
            <AccessTimeIcon fontSize='small' color='inherit' />
            <Typography variant='body2' color='inherit' sx={{ ml: 1 }}>
              Thời lượng:
            </Typography>
          </Box>
          <Typography variant='body2'>{formatDuration(courseStats.totalDuration)}</Typography>
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
