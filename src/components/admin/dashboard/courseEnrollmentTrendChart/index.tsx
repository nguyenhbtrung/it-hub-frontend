'use client';

import { useEffect, useState } from 'react';
import { getCourseRegistrationGrowthOfAdmin } from '@/services/dashboard.service';
import { Box, Typography, Paper } from '@mui/material';

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const monthLabels = [
  'Tháng 1',
  'Tháng 2',
  'Tháng 3',
  'Tháng 4',
  'Tháng 5',
  'Tháng 6',
  'Tháng 7',
  'Tháng 8',
  'Tháng 9',
  'Tháng 10',
  'Tháng 11',
  'Tháng 12',
];

export default function CourseEnrollmentTrendChart() {
  const [data, setData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getCourseRegistrationGrowthOfAdmin();
      const registrationGrowth = res?.data ?? [];

      const formatted = registrationGrowth.map((item: any) => ({
        month: monthLabels[item.month - 1],
        enrollments: item.enrollments,
      }));

      setData(formatted);

      const sum = formatted.reduce((acc: any, cur: any) => acc + cur.enrollments, 0);
      setTotal(sum);
    };

    fetchData();
  }, []);

  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant='h6' sx={{ mb: 2, fontWeight: 500 }}>
        Xu hướng đăng ký khoá học
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1, mb: 1 }}>
        <Typography variant='h4' sx={{ fontWeight: 700 }}>
          {total}
        </Typography>
      </Box>

      <Typography variant='body2' color='text.secondary' sx={{ mb: 3 }}>
        12 tháng gần nhất
      </Typography>

      <Box sx={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient id='enrollmentGradient' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#137fec' stopOpacity={0.3} />
                <stop offset='95%' stopColor='#137fec' stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray='3 3' vertical={false} />

            <XAxis dataKey='month' tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />

            <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />

            <Tooltip />

            <Area
              type='monotone'
              dataKey='enrollments'
              stroke='#137fec'
              strokeWidth={3}
              fill='url(#enrollmentGradient)'
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}
