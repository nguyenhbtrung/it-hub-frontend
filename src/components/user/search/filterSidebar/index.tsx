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

export default function FilterSidebar() {
  const [expanded, setExpanded] = useState<string | false>('level');
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedDuration, setSelectedDuration] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['ReactJS']);

  const handleAccordionChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels((prev) => (prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]));
  };

  const handleDurationChange = (duration: string) => {
    setSelectedDuration((prev) => (prev.includes(duration) ? prev.filter((d) => d !== duration) : [...prev, duration]));
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]));
  };

  const handleClearAll = () => {
    setSelectedLevels([]);
    setSelectedDuration([]);
    setSelectedRating('');
    setSelectedTags(['ReactJS']);
  };

  const tags = ['ReactJS', 'Python', 'UI/UX', 'SEO', 'VueJS'];

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
            <Button size='small' onClick={handleClearAll} sx={{ textTransform: 'none', fontWeight: 500 }}>
              Xóa tất cả
            </Button>
          </Box>
        </Box>

        <Box sx={{ p: 1 }}>
          {/* Trình độ */}
          <Accordion
            expanded={expanded === 'level'}
            onChange={handleAccordionChange('level')}
            disableGutters
            elevation={0}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 500 }}>Trình độ</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Cơ bản', 'Trung bình', 'Nâng cao'].map((level) => (
                  <FormControlLabel
                    key={level}
                    control={
                      <Checkbox
                        size='small'
                        checked={selectedLevels.includes(level)}
                        onChange={() => handleLevelChange(level)}
                        sx={{ py: 0 }}
                      />
                    }
                    label={
                      <Typography variant='body2' color='text.secondary'>
                        {level}
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Thời lượng */}
          <Accordion
            expanded={expanded === 'duration'}
            onChange={handleAccordionChange('duration')}
            disableGutters
            elevation={0}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 500 }}>Thời lượng</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Dưới 2 giờ', '2 - 5 giờ', '5 - 10 giờ', 'Trên 10 giờ'].map((duration) => (
                  <FormControlLabel
                    key={duration}
                    control={
                      <Checkbox
                        size='small'
                        checked={selectedDuration.includes(duration)}
                        onChange={() => handleDurationChange(duration)}
                        sx={{ py: 0 }}
                      />
                    }
                    label={
                      <Typography variant='body2' color='text.secondary'>
                        {duration}
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>

          {/* Đánh giá */}
          <Accordion
            expanded={expanded === 'rating'}
            onChange={handleAccordionChange('rating')}
            disableGutters
            elevation={0}
            sx={{
              borderBottom: '1px solid',
              borderColor: 'divider',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 500 }}>Đánh giá</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <RadioGroup value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
                {[
                  { label: '4.5 sao trở lên', value: '4.5' },
                  { label: '4.0 sao trở lên', value: '4.0' },
                  { label: '3.5 sao trở lên', value: '3.5' },
                ].map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio size='small' />}
                    label={
                      <Typography variant='body2' color='text.secondary'>
                        {option.label}
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                ))}
              </RadioGroup>
            </AccordionDetails>
          </Accordion>

          {/* Tags */}
          <Accordion
            expanded={expanded === 'tags'}
            onChange={handleAccordionChange('tags')}
            disableGutters
            elevation={0}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography sx={{ fontWeight: 500 }}>Tags</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size='small'
                    onClick={() => handleTagToggle(tag)}
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      backgroundColor: selectedTags.includes(tag) ? 'primary.light' : 'action.selected',
                      color: selectedTags.includes(tag) ? 'primary.main' : 'text.secondary',
                      '&:hover': {
                        backgroundColor: selectedTags.includes(tag) ? 'primary.light' : 'action.hover',
                      },
                    }}
                  />
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Paper>
    </Box>
  );
}
