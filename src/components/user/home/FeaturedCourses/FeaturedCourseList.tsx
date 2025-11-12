import { Grid } from '@mui/material';
import { CourseCard, CourseCardSkeleton } from '../../common/CourseCard';

const courses = [
  {
    id: 1,
    title: 'Lập trình Web với React & Node.js',
    category: 'Web Development',
    level: 'Trung cấp',
    students: 2345,
    rating: 4.8,
    duration: '12 tuần',
    price: 'Miễn phí',
    image: '🌐',
  },
  {
    id: 2,
    title: 'Thuật toán và Cấu trúc Dữ liệu',
    category: 'Computer Science',
    level: 'Cơ bản',
    students: 3421,
    rating: 4.9,
    duration: '10 tuần',
    price: 'Miễn phí',
    image: '📊',
  },
  {
    id: 3,
    title: 'Machine Learning cơ bản',
    category: 'AI & ML',
    level: 'Nâng cao',
    students: 1876,
    rating: 4.7,
    duration: '16 tuần',
    price: 'Miễn phí',
    image: '🤖',
  },
  {
    id: 4,
    title: 'Python cho Data Science',
    category: 'Data Science',
    level: 'Trung cấp',
    students: 2901,
    rating: 4.8,
    duration: '14 tuần',
    price: 'Miễn phí',
    image: '🐍',
  },
];

const getFeaturedCourses = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return courses;
};

export async function FeaturedCourseList() {
  const courses = await getFeaturedCourses();

  return (
    <Grid container spacing={2} px={{ xs: 3, md: 8 }}>
      {courses.map((course) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={course.id}>
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
}

export async function FeaturedCourseListSkeleton() {
  return (
    <Grid container spacing={2} px={{ xs: 3, md: 8 }}>
      {Array.from(new Array(4)).map((_, index) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
          <CourseCardSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
