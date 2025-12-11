// app/courses/components/CourseList.tsx
import { Grid } from '@mui/material';
import CourseCard from '../courseCard';

// Đây có thể là dữ liệu từ API
const courses = [
  {
    id: 1,
    title: 'The Complete 2024 Web Development Bootcamp',
    instructor: 'Dr. Angela Yu',
    rating: 4.7,
    reviewCount: 351380,
    price: '1.499.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC_y_99bAgNGZwpk2wQFy1HlaamPNIwRgYDFbkc5bOertbRvQX9VJ1yz4aRPj6Aoo07QCb9THYLvN5q3S_NPW9NZ6y5oDbdCMAHhD_8R7b9DR7rtkvwQSU9oCFMyGg2yxNm-aGwc3hkrHdGFKvYxloDDV6g2XTpP16jfd44dPgnEmoHCs9sm4-5xwcZPaPRx7F_3trbfeuJrNrI7e7yfxV1rkPaIarC0UiDNvWdcNUuTdJgedm1mH4L8wEI_YqivUvotZQbmCAE3PM',
  },
  {
    id: 2,
    title: 'JavaScript Algorithms and Data Structures Masterclass',
    instructor: 'Colt Steele',
    rating: 4.8,
    reviewCount: 112890,
    price: '999.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCIphat1lneWGk2Vm72Vp4umafwuD1qG9Wl3FbpY0gqskDU-X6sA_4qspl6OjhL4V-8OgrHuQqyOYzvx2__K2dRAmj8xMoW_RPdg42EH9JJl_AkuoPtnaVDum4gPF3v7e3eoIrUyvulhUUWSz4fxwmPyw96rZ_6YSfWy36oHcZzivdpBqSOs8_vTX-Bqcf1IXtIluKkQu3oci5uG7FtTCO9VLl62tV1DobBdm4UzC--YZGcWYfkt0Umf5k4eB54Bb3iml4WNAN_nWE',
  },
  {
    id: 3,
    title: 'React - The Complete Guide (incl Hooks, React Router, Redux)',
    instructor: 'Maximilian Schwarzmüller',
    rating: 4.6,
    reviewCount: 198450,
    price: '1.299.000₫',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDalnp0QQZF-xEWUJJfmxwdIxDgne0MoA1bPdp964KrT-L-i6LhTMy1FXI8crumkeboSe3FTarrJbrgJmberDm197s_GMytrbgqIGWjsqRU60fa5VxjANcu0YJYJgzxOPQxUJkJXym2kgw7IzqLHlg6OAnsoQyZIWg7dB2xTRIILeQidpLadeq29jOtVclL-8zJI-RnpYLD9hVSU1XAVsugwvQxQquYgCYjzGQ2qgJTgBkkmDrIRpOPmSkHlzNo6UjKbal3Yozh5mc',
  },
  {
    id: 4,
    title: 'Node.js, Express, MongoDB & More: The Complete Bootcamp',
    instructor: 'Jonas Schmedtmann',
    rating: 4.9,
    reviewCount: 98211,
    price: 'Miễn phí',
    isFree: true,
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDQWHGFY3Fg_tQU8SpJwue2zIs5ZydnH5f8BTz_sfP6hlLsz_kCyDgJTvX6iy8C1G9JqPKoE3JBvgGXEHyxqPRu4KuOoerHmBZ41AW0IRwW_eWVjg3ETZfk9LMPLoD18ovqRW5ZYTKLWr2dT-5cw56crRMTRD7Y3frFKvt6nO0DcOqCFZAm9xrFVse8NTARTLUZ6nYWeOpQSdzlvXcUsQinGlGGrgiyVimoZACuiZ0Jy9GnqwmtzznxNk-Z5ZXCuMBUzlrnp7Sz87E',
  },
];

export default function CourseList() {
  return (
    <Grid container spacing={3}>
      {courses.map((course) => (
        <Grid size={{ xs: 12, sm: 6 }} key={course.id}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
}
