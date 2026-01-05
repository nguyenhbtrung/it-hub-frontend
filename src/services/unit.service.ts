'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { apiFetch } from '@/lib/fetcher/apiFetch';

export async function getUnitById(unitId: string): Promise<any> {
  try {
    return await apiFetch(`/api/units/${unitId}`, {
      auth: true,
      credentials: 'include',
      method: 'GET',
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
    }
    throw err;
  }
}

export interface UpdateUnitPayload {
  title: string;
  description: string;
}

export async function updateUnit(unitId: string, payload: UpdateUnitPayload): Promise<any> {
  try {
    return await apiFetch(`/api/units/${unitId}`, {
      auth: true,
      credentials: 'include',
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
    }
    throw err;
  }
}

export async function deleteUnit(unitId: string): Promise<any> {
  try {
    return await apiFetch(`/api/units/${unitId}`, {
      auth: true,
      credentials: 'include',
      method: 'DELETE',
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
    }
    throw err;
  }
}

interface AddStepPayload {
  title: string;
}

export async function addStep(unitId: string, payload: AddStepPayload): Promise<any> {
  try {
    return await apiFetch(`/api/units/${unitId}/step`, {
      auth: true,
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (err) {
    if (err instanceof ApiError) {
      return {
        success: false,
        error: {
          message: 'Có lỗi xảy ra',
          code: err.code,
        },
      };
    }
    throw err;
  }
}
