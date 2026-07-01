'use server';

import * as categoryService from '../services/category.service';
import { CreateCategoryPayload } from '../types/category.types';

export async function createCategoryAction(payload: CreateCategoryPayload) {
  return categoryService.createCategory(payload);
}
