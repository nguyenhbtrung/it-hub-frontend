// CourseContent component - Phiên bản cải tiến
'use client';
import React, { use, useState } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Box,
  IconButton,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { CourseDetailSection } from '@/types/course';
import { formatDuration } from '@/lib/utils/formatDatetime';
import { notFound } from 'next/navigation';

interface CourseContentProps {
  courseContentOulinePromise: Promise<any>;
}

export default function CourseContent({ courseContentOulinePromise }: CourseContentProps) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const res = use(courseContentOulinePromise);
  if (!res?.success || !res?.data) notFound();
  const courseContent = res?.data;

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const totalLessons = courseContent.sections.reduce(
    (acc: number, section: { units: any[] }) => acc + section.units.filter((u) => u.type === 'lesson').length,
    0
  );
  const totalExercises = courseContent.sections.reduce(
    (acc: number, section: { units: any[] }) => acc + section.units.filter((u) => u.type === 'excercise').length,
    0
  );

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems={{ xs: 'start', sm: 'center' }}
        spacing={2}
        sx={{ mb: 3 }}
      >
        <Typography variant='h5' fontWeight={600}>
          Nội dung khóa học
        </Typography>
        <Stack direction='row' spacing={3}>
          <Typography variant='body2' color='text.secondary'>
            {courseContent?.sections?.length} chương • {totalLessons} bài học • {totalExercises} bài tập
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {formatDuration(courseContent?.totalDuration || 0)}
          </Typography>
        </Stack>
      </Stack>

      {courseContent?.sections?.map((section: any, index: number) => (
        <Accordion
          key={section?.id}
          expanded={expanded === section?.id}
          onChange={handleChange(section?.id)}
          sx={{
            mb: 2,
            borderRadius: '12px !important',
            '&:before': { display: 'none' },
            boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              backgroundColor: expanded === section?.id ? 'action.hover' : 'background.paper',
              borderRadius: '12px',
              '&.Mui-expanded': { borderRadius: '12px 12px 0 0' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
              <Box>
                <Typography variant='subtitle1' fontWeight={600}>
                  {section?.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {section?.units?.filter((u: { type: string }) => u.type === 'lesson')?.length} bài học •{' '}
                  {section?.units?.filter((u: { type: string }) => u.type === 'excercise')?.length} bài tập
                </Typography>
              </Box>
              <Chip label={`Chương ${index + 1}`} size='small' color='primary' variant='outlined' />
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0, borderRadius: '0 0 12px 12px' }}>
            <List disablePadding>
              {section?.units?.map((unit: any, unitIndex: number) => (
                <ListItem
                  key={unit?.id}
                  sx={{
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' },
                    py: 2,
                    px: 3,
                  }}
                  secondaryAction={
                    <Stack direction='row' spacing={1} alignItems='center'>
                      <Typography variant='body2' color='text.secondary' sx={{ minWidth: 60 }}>
                        {formatDuration(unit?.totalDuration || 0)}
                      </Typography>
                      {/* <IconButton
                        edge='end'
                        size='small'
                        aria-label='preview'
                        color={unit.isPreview ? 'primary' : 'default'}
                      >
                        {unit.isPreview ? <PlayCircleOutlineIcon /> : <LockOpenIcon />}
                      </IconButton> */}
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography component='span' variant='body1' sx={{ fontWeight: 400 }}>
                        {unitIndex + 1}. {unit?.title}
                        {/* {unit.isPreview && (
                          <Chip
                            label='Xem trước'
                            size='small'
                            color='primary'
                            variant='filled'
                            sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                          />
                        )} */}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
