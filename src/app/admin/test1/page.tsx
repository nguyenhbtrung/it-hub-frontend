'use client';

import { Box, TextField } from '@mui/material';
import { useState } from 'react';

export default function Test1() {
  const [test, setTest] = useState<string>('');

  return (
    <Box alignItems='center' justifyContent={'center'}>
      <TestTextField test={test} setTest={setTest} />
    </Box>
  );
}

interface TestTextFieldProps {
  test: string;
  setTest: React.Dispatch<React.SetStateAction<string>>;
}

function TestTextField({ test, setTest }: TestTextFieldProps) {
  return (
    <TextField
      size='small'
      label='Giá trị'
      value={test}
      onChange={(e) => setTest(e.target.value)}
      sx={{ flex: 1.2 }}
      slotProps={{ input: { sx: { borderRadius: 0.5 } } }}
    />
  );
}
