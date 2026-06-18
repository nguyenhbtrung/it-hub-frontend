export * from './services/course.service';

export {
  createCourseAction,
  addSectionAction,
  createOrUpdateReviewAction,
  updateCourseTotalDurationAction,
  updateCourseStatusAction,
  updateCourseDetailAction,
  updateCourseImageAction,
  updateCoursePromoVideoAction,
} from './actions/course.actions';

export { getCourseErrorMessage } from './mappers/course-error.mapper';

export type {
  GetCoursesQuery,
  GetRecommendedCoursesQuery,
  GetStudentsByCourseIdQuery,
  GetRegistrationsByCourseIdQuery,
  GetNavigationByContentIdQuery,
  GetMyCreatedCourseQuery,
  GetCourseReviewsQuery,
  CourseView,
  GetCourseContentBreadcrumbQuery,
  GetCourseExercisesGroupedBySectionQuery,
  CreateCoursePayload,
  AddSectionPayload,
  CreateOrUpdateReviewPayload,
  UpdateCourseStatusPayload,
  UpdateCourseDetailPayload,
  UpdateCourseImagePayload,
  UpdateCoursePromoVideoPayload,
} from './types/course.types';
