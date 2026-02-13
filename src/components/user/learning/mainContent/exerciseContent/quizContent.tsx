import StepContentRenderer from '@/components/common/richText/renderer/stepContentRenderer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Submission from '../submission';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import {
  ArrowBack,
  ArrowForward,
  ChevronRight,
  AccessTime,
  School,
  Download,
  Code,
  VideoLibrary,
  Image,
  Note,
  List as ListIcon,
  Quiz,
  Terminal,
  InfoOutline,
  History,
  CheckCircle,
} from '@mui/icons-material';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import FolderZipIcon from '@mui/icons-material/FolderZip';
import NextLink from '@/components/common/Link';
import { getMyExerciseSubmission } from '@/services/exercise.service';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import QuizClientWrapper from './quizClientWrapper';

interface QuizContentProps {
  exercise: any;
  nav: any;
  slug: string;
}

export default async function QuizContent({ exercise, nav, slug }: QuizContentProps) {
  const submissionsPromise = getMyExerciseSubmission(exercise?.id || '', { page: 1, limit: 100 });
  return (
    <>
      <QuizClientWrapper exercise={exercise} nav={nav} slug={slug} submissionsPromise={submissionsPromise} />
    </>
  );
}
