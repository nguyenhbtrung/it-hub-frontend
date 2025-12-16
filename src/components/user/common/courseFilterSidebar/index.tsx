'use client';

import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { durationLabelsMap, levelLabelsMap, ratingLabelsMap } from '@/lib/const/course';

interface FilterSidebarProps {
  disableLevelFilter?: boolean;
  disableDurationFilter?: boolean;
  disableRatingFilter?: boolean;
  disableCategoryFilter?: boolean;
}

export default function CourseFilterSidebar({
  disableCategoryFilter = false,
  disableLevelFilter = false,
  disableDurationFilter = false,
  disableRatingFilter = false,
}: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const levels = searchParams.getAll('level');
  const durations = searchParams.getAll('duration');
  const ratings = searchParams.getAll('rating');
  const categories = searchParams.getAll('category');

  const [expanded, setExpanded] = useState<string | false>('level');

  const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const getCurrentFilter = (filter: string) => {
    switch (filter) {
      case 'level':
        return levels;

      case 'duration':
        return durations;

      case 'category':
        return categories;
      default:
        return [];
    }
  };

  const handleCheckBoxChange = (filter: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = getCurrentFilter(filter);

    if (current.includes(value)) {
      params.delete(filter);
      current.filter((f) => f !== value).forEach((f) => params.append(filter, f));
    } else {
      params.append(filter, value);
    }

    router.replace(`?${params.toString()}`);
  };

  const handleRadioGroupChange = (filter: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(filter, value);
    router.replace(`?${params.toString()}`);
  };

  const handleClearAll = () => {
    const params = new URLSearchParams(searchParams.toString());

    ['level', 'duration', 'rating', 'category'].forEach((filter) => {
      params.delete(filter);
    });
    router.replace(`?${params.toString()}`);
  };

  return (
    <Box sx={{ position: 'sticky', top: 96 }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: 'background.paper',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant='h6' fontWeight={600}>
              Bộ lọc
            </Typography>
            <Button
              size='small'
              onClick={handleClearAll}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                '&:hover': {
                  color: 'primary.dark',
                  backgroundColor: 'color-mix(in srgb, var(--mui-palette-primary-main) 10%, transparent)',
                  boxShadow: 'none',
                },
              }}
            >
              Xóa tất cả
            </Button>
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          {/* Trình độ */}
          {!disableLevelFilter && (
            <Accordion
              expanded={expanded === 'level'}
              onChange={handleAccordionChange('level')}
              disableGutters
              elevation={0}
              sx={{
                // borderBottom: '1px solid',
                borderColor: 'divider',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>Trình độ</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {['beginner', 'intermediate', 'advanced', 'expert'].map((level) => (
                    <FormControlLabel
                      key={level}
                      control={
                        <Checkbox
                          size='small'
                          checked={levels.includes(level)}
                          onChange={() => handleCheckBoxChange('level', level)}
                          sx={{ py: 0 }}
                        />
                      }
                      label={
                        <Typography variant='body2' color='text.secondary'>
                          {levelLabelsMap[level]}
                        </Typography>
                      }
                      sx={{ m: 0 }}
                    />
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Thời lượng */}
          {!disableDurationFilter && (
            <Accordion
              expanded={expanded === 'duration'}
              onChange={handleAccordionChange('duration')}
              disableGutters
              elevation={0}
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>Thời lượng</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {['extraShort', 'short', 'medium', 'long', 'extraLong'].map((duration) => (
                    <FormControlLabel
                      key={duration}
                      control={
                        <Checkbox
                          size='small'
                          checked={durations.includes(duration)}
                          onChange={() => handleCheckBoxChange('duration', duration)}
                          sx={{ py: 0 }}
                        />
                      }
                      label={
                        <Typography variant='body2' color='text.secondary'>
                          {durationLabelsMap[duration]}
                        </Typography>
                      }
                      sx={{ m: 0 }}
                    />
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Đánh giá */}
          {!disableRatingFilter && (
            <Accordion
              expanded={expanded === 'rating'}
              onChange={handleAccordionChange('rating')}
              disableGutters
              elevation={0}
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>Đánh giá</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RadioGroup value={ratings} onChange={(e) => handleRadioGroupChange('rating', e.target.value)}>
                  {['4.5', '4.0', '3.5', '3.0'].map((rating) => (
                    <FormControlLabel
                      key={rating}
                      value={rating}
                      control={<Radio size='small' />}
                      label={
                        <Typography variant='body2' color='text.secondary'>
                          {ratingLabelsMap[rating]}
                        </Typography>
                      }
                      sx={{ m: 0 }}
                    />
                  ))}
                </RadioGroup>
              </AccordionDetails>
            </Accordion>
          )}

          {/* Category */}
          {!disableCategoryFilter && (
            <Accordion
              expanded={expanded === 'category'}
              onChange={handleAccordionChange('category')}
              disableGutters
              elevation={0}
              sx={{
                borderTop: '1px solid',
                borderColor: 'divider',
                '&:before': { display: 'none' },
              }}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography sx={{ fontWeight: 500 }}>Danh mục</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {['ReactJS', 'Python', 'UI/UX', 'SEO', 'VueJS'].map((category) => (
                    <Chip
                      key={category}
                      label={category}
                      size='small'
                      onClick={() => handleCheckBoxChange('category', category)}
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 500,
                        backgroundColor: categories.includes(category) ? 'hero.light' : 'action.selected',
                        color: categories.includes(category) ? 'primary.main' : 'text.secondary',
                        '&:hover': {
                          backgroundColor: categories.includes(category) ? 'hero.light' : 'action.hover',
                        },
                      }}
                    />
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
