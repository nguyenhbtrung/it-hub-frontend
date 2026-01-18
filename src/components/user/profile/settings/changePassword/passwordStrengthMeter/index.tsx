'use client';

import { Box, Typography, LinearProgress, Stack, useTheme } from '@mui/material';
import { CheckCircle, RadioButtonUnchecked } from '@mui/icons-material';
import { evaluatePasswordStrength } from '../schemas';

interface PasswordStrengthMeterProps {
  password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const theme = useTheme();
  const { label, percentage, checks } = evaluatePasswordStrength(password);

  const getStrengthColor = () => {
    if (percentage <= 33) return theme.palette.error.main;
    if (percentage <= 66) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const getStrengthLabelColor = () => {
    if (percentage <= 33) return theme.palette.error.main;
    if (percentage <= 66) return theme.palette.warning.main;
    return theme.palette.success.main;
  };

  const checkItems = [
    { key: 'minLength', label: 'Ít nhất 8 ký tự', checked: checks.minLength },
    {
      key: 'hasUppercase',
      label: 'Bao gồm chữ hoa và chữ thường',
      checked: checks.hasUppercase && checks.hasLowercase,
    },
    { key: 'Securepass123', label: 'Ít nhất 1 chữ số', checked: checks.hasNumber },
  ];

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Typography variant='caption' color='text.secondary'>
          Độ mạnh mật khẩu
        </Typography>
        <Typography variant='caption' fontWeight='medium' sx={{ color: getStrengthLabelColor() }}>
          {label}
        </Typography>
      </Stack>

      <LinearProgress
        variant='determinate'
        value={percentage}
        sx={{
          height: 6,
          borderRadius: 3,
          bgcolor: 'grey.200',
          '& .MuiLinearProgress-bar': {
            bgcolor: getStrengthColor(),
            borderRadius: 3,
            transition: 'all 0.3s ease',
          },
        }}
      />

      <Stack spacing={1} sx={{ mt: 2 }}>
        {checkItems.map((item) => (
          <Stack key={item.key} direction='row' alignItems='center' spacing={1}>
            {item.checked ? (
              <CheckCircle sx={{ fontSize: 16, color: 'success.main' }} />
            ) : (
              <RadioButtonUnchecked sx={{ fontSize: 16, color: 'text.disabled' }} />
            )}
            <Typography
              variant='caption'
              sx={{
                color: item.checked ? 'success.main' : 'text.disabled',
              }}
            >
              {item.label}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
