import { Box, Typography, Paper } from '@mui/material';

const GrowthChart = () => (
  <Paper
    elevation={0}
    sx={{
      p: 4,
      borderRadius: 3,
      border: '1px solid',
      borderColor: 'divider',
      backgroundColor: 'background.paper',
      gridColumn: { xs: '1', lg: 'span 2' },
    }}
  >
    <Typography variant='h6' sx={{ mb: 2, fontWeight: 500 }}>
      Tăng trưởng học viên
    </Typography>

    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
      <Typography variant='h4' sx={{ fontWeight: 700 }}>
        1,280
      </Typography>
      <Typography variant='body2' sx={{ color: 'success.main', fontWeight: 500 }}>
        +12.5%
      </Typography>
    </Box>

    <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
      30 ngày qua
    </Typography>

    {/* Chart SVG */}
    <Box sx={{ height: 200, py: 2 }}>
      <svg
        fill='none'
        height='100%'
        preserveAspectRatio='none'
        viewBox='0 0 478 150'
        width='100%'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z'
          fill='url(#paint0_linear_chart)'
        />
        <path
          d='M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25'
          stroke='#137fec'
          strokeLinecap='round'
          strokeWidth='3'
        />
        <defs>
          <linearGradient gradientUnits='userSpaceOnUse' id='paint0_linear_chart' x1='236' x2='236' y1='1' y2='149'>
            <stop stopColor='#137fec' stopOpacity='0.2' />
            <stop offset='1' stopColor='#137fec' stopOpacity='0' />
          </linearGradient>
        </defs>
      </svg>
    </Box>

    {/* Week Labels */}
    <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
      {['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4'].map((week, index) => (
        <Typography
          key={index}
          variant='caption'
          sx={{
            color: 'text.secondary',
            fontWeight: 700,
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {week}
        </Typography>
      ))}
    </Box>
  </Paper>
);

export default GrowthChart;
