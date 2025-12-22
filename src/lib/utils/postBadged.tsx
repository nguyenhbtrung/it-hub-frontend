import Verified from '@mui/icons-material/Verified';
import Diamond from '@mui/icons-material/Diamond';
import MilitaryTech from '@mui/icons-material/MilitaryTech';
import HelpIcon from '@mui/icons-material/Help';
import SchoolIcon from '@mui/icons-material/School';
import ForumIcon from '@mui/icons-material/Forum';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ArticleIcon from '@mui/icons-material/Article';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import CampaignIcon from '@mui/icons-material/Campaign';
import { PostContentType } from '@/types/forum';
import { contentTypeLabelsMap } from '../const/post';

export const getReputationIcon = (level: string) => {
  switch (level) {
    case 'silver':
      return <Verified sx={{ fontSize: 12, color: 'badged.lightBlue.text' }} />;
    case 'diamond':
      return <Diamond sx={{ fontSize: 12, color: 'badged.purple.text' }} />;
    case 'bronze':
      return <MilitaryTech sx={{ fontSize: 12, color: 'badged.yellow2.text' }} />;
    default:
      return <Verified sx={{ fontSize: 12 }} />;
  }
};

export const getReputationColor = (level: string) => {
  switch (level) {
    case 'silver':
      return { bgcolor: 'badged.lightBlue.bg', color: 'badged.lightBlue.text', borderColor: 'badged.lightBlue.text' };
    case 'diamond':
      return { bgcolor: 'badged.purple.bg', color: 'badged.purple.text', borderColor: 'badged.purple.text' };
    case 'bronze':
      return { bgcolor: 'badged.yellow2.bg', color: 'badged.yellow2.text', borderColor: 'badged.yellow2.text' };
    default:
      return {};
  }
};

export const getRoleColor = (role: string) => {
  switch (role) {
    case 'instructor':
      return { bgcolor: 'badged.yellow.bg', color: 'badged.yellow.text' };
    case 'student':
      return { bgcolor: 'badged.blue.bg', color: 'badged.blue.text' };
    case 'admin':
      return { bgcolor: 'error.light', color: 'error.main' };
    default:
      return {};
  }
};

export const getContentTypeColor = (type: PostContentType) => {
  switch (type) {
    case 'question':
      return { bgcolor: 'badged.red.bg', color: 'badged.red.text' };
    case 'knowledge':
      return { bgcolor: 'badged.blue.bg', color: 'badged.blue.text' };
    case 'discussion':
      return { bgcolor: 'badged.purple.bg', color: 'badged.purple.text' };
    case 'experience':
      return { bgcolor: 'badged.yellow2.bg', color: 'badged.yellow2.text' };
    case 'news':
      return { bgcolor: 'badged.lightBlue.bg', color: 'badged.lightBlue.text' };
    case 'resource':
      return { bgcolor: 'badged.green.bg', color: 'badged.green.text' };
    case 'announcement':
      return { bgcolor: 'badged.yellow.bg', color: 'badged.yellow.text' };
    default:
      return { bgcolor: '#e5e7eb', color: '#374151' };
  }
};

export const getContentTypeIcon = (type: PostContentType) => {
  switch (type) {
    case 'question':
      return <HelpIcon />;
    case 'knowledge':
      return <SchoolIcon />;
    case 'discussion':
      return <ForumIcon />;
    case 'experience':
      return <WorkHistoryIcon />;
    case 'news':
      return <ArticleIcon />;
    case 'resource':
      return <FolderOpenIcon />;
    case 'announcement':
      return <CampaignIcon />;
    default:
      return <HelpIcon />;
  }
};

export const getPostContentTypeMeta = (type: PostContentType) => ({
  value: type,
  label: contentTypeLabelsMap[type],
  icon: getContentTypeIcon(type),
  color: getContentTypeColor(type),
});

export const postContentTypes = (Object.keys(contentTypeLabelsMap) as PostContentType[]).map((type) =>
  getPostContentTypeMeta(type)
);
