'use server';

import * as courseService from '../services/course.service';

import {
  AddSectionPayload,
  CreateCoursePayload,
  CreateOrUpdateReviewPayload,
  UpdateCourseDetailPayload,
  UpdateCourseStatusPayload,
} from '../types/course.types';

export async function createCourseAction(payload: CreateCoursePayload) {
  return courseService.createCourse(payload);
}

export async function addSectionAction(courseId: string, payload: AddSectionPayload) {
  return courseService.addSection(courseId, payload);
}

export async function createOrUpdateReviewAction(courseId: string, payload: CreateOrUpdateReviewPayload) {
  return courseService.createOrUpdateReview(courseId, payload);
}

export async function updateCourseTotalDurationAction(courseId: string) {
  return courseService.updateCourseTotalDuration(courseId);
}

export async function updateCourseStatusAction(courseId: string, payload: UpdateCourseStatusPayload) {
  return courseService.updateCourseStatus(courseId, payload);
}

export async function updateCourseDetailAction(courseId: string, payload: UpdateCourseDetailPayload) {
  return courseService.updateCourseDetail(courseId, payload);
}

export async function updateCourseImageAction(courseId: string, imageId: string) {
  return courseService.updateCourseImage(courseId, imageId);
}

export async function updateCoursePromoVideoAction(courseId: string, promoVideoId: string) {
  return courseService.updateCoursePromoVideo(courseId, promoVideoId);
}
