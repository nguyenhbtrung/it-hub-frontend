import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const competitions = [
  { name: 'AI Innovation Challenge', date: '12/12/2025' },
  { name: 'Web Development Hackathon', date: '05/01/2026' },
];

export default function OngoingCompetitions() {
  return (
    <Box mt={8}>
      <Typography variant='h5' fontWeight={600} mb={2}>
        Cuộc thi đang diễn ra
      </Typography>
      <List>
        {competitions.map((c, i) => (
          <ListItem key={i} divider secondaryAction={<Button>Xem chi tiết</Button>}>
            <ListItemText primary={c.name} secondary={`Hạn đăng ký: ${c.date}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
