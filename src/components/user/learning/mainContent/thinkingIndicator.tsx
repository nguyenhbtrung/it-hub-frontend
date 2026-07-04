import Box from '@mui/material/Box';
import { keyframes } from '@mui/system';

const blink = keyframes`
  0%,80%,100% { opacity: .2; transform: translateY(0); }
  40% { opacity: 1; transform: translateY(-3px); }
`;

export function ThinkingIndicator() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        py: 2,
      }}
    >
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            bgcolor: 'primary.main',
            animation: `${blink} 1.2s infinite`,
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </Box>
  );
}
