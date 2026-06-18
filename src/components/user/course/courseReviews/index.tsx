import { getCourseReviews, getCourseReviewStatistics, getUserEnrollmentStatus } from '@/features/course';
import CourseReviewsContent from './content';
import { getMyReviewOfTheCourse } from '@/features/course';

export interface ReviewStats {
  rating: number;
  ratingCount: number;
}

interface CourseReviewsProps {
  courseId: string;
}

export default async function CourseReviews({ courseId }: CourseReviewsProps) {
  const reviewStatsRes = await getCourseReviewStatistics(courseId);

  const reviewStats = reviewStatsRes.success ? reviewStatsRes.data : {};
  const reviewsRes = await getCourseReviews(courseId, { limit: 4 });
  const reviews = reviewsRes.success ? (reviewsRes.data ?? []) : [];

  const enrollmentRes = await getUserEnrollmentStatus(courseId);
  const enrollmentStatus = enrollmentRes.success ? enrollmentRes.data : null;

  const myReviewRes = await getMyReviewOfTheCourse(courseId);
  const myReview = myReviewRes.success ? myReviewRes.data : null;

  return (
    <CourseReviewsContent
      initialReview={reviews}
      reviewStats={reviewStats}
      courseId={courseId}
      enrollmentStatus={enrollmentStatus}
      myReview={myReview}
    />
  );
}
