// CourseContent component - Phiên bản cải tiến
'use client';
import React, { useState } from 'react';
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
import { Section } from '@/types/course';

export default function CourseContent({ sections }: { sections: Section[] }) {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const totalLessons = sections.reduce((acc, section) => acc + section.lessons.length, 0);
  const totalDuration = sections.reduce(
    (acc, section) => acc + section.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0),
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
        <Typography variant='h5' fontWeight={700}>
          Nội dung khóa học
        </Typography>
        <Stack direction='row' spacing={3}>
          <Typography variant='body2' color='text.secondary'>
            {sections.length} chương • {totalLessons} bài học
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {Math.floor(totalDuration / 60)}h {totalDuration % 60}m
          </Typography>
        </Stack>
      </Stack>

      {sections.map((section, index) => (
        <Accordion
          key={section.id}
          expanded={expanded === section.id}
          onChange={handleChange(section.id)}
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
              backgroundColor: expanded === section.id ? 'action.hover' : 'background.paper',
              borderRadius: '12px',
              '&.Mui-expanded': { borderRadius: '12px 12px 0 0' },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
              <Box>
                <Typography variant='subtitle1' fontWeight={600}>
                  {section.title}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {section.lessons.length} bài học •{' '}
                  {Math.floor(section.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0) / 60)}h{' '}
                  {section.lessons.reduce((sum, lesson) => sum + lesson.durationMinutes, 0) % 60}m
                </Typography>
              </Box>
              <Chip label={`Chương ${index + 1}`} size='small' color='primary' variant='outlined' />
            </Box>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0, borderRadius: '0 0 12px 12px' }}>
            <List disablePadding>
              {section.lessons.map((lesson, lessonIndex) => (
                <ListItem
                  key={lesson.id}
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
                        {lesson.durationMinutes} phút
                      </Typography>
                      <IconButton
                        edge='end'
                        size='small'
                        aria-label='preview'
                        color={lesson.isPreview ? 'primary' : 'default'}
                      >
                        {lesson.isPreview ? <PlayCircleOutlineIcon /> : <LockOpenIcon />}
                      </IconButton>
                    </Stack>
                  }
                >
                  <ListItemText
                    primary={
                      <Typography component='span' variant='body1' sx={{ fontWeight: lesson.isPreview ? 600 : 400 }}>
                        {lessonIndex + 1}. {lesson.title}
                        {lesson.isPreview && (
                          <Chip
                            label='Xem trước'
                            size='small'
                            color='primary'
                            variant='filled'
                            sx={{ ml: 1, height: 20, fontSize: '0.7rem' }}
                          />
                        )}
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
