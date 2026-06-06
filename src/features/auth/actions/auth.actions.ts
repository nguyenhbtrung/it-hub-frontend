'use server';

import { ApiError } from '@/lib/errors/ApiError';
import { ActionResult } from '@/shared/types/action-result';

import { authApi } from '../api/auth.api';
import { getAuthErrorMessage } from '../mappers/auth-error.mapper';
import { ChangePasswordPayload, SignUpPayload } from '../types/auth.types';

export async function signUpAction(payload: SignUpPayload): Promise<ActionResult<any>> {
  try {
    const data = await authApi.signUp(payload);

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: {
          code: error.code || 'UNKNOWN_ERROR',
          message: getAuthErrorMessage(error),
        },
      };
    }

    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'Có lỗi xảy ra',
      },
    };
  }
}

export async function changePasswordAction(payload: ChangePasswordPayload): Promise<ActionResult<any>> {
  try {
    const data = await authApi.changePassword(payload);

    return {
      success: true,
      data,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      return {
        success: false,
        error: {
          code: error.code || 'UNKNOWN_ERROR',
          message: getAuthErrorMessage(error),
        },
      };
    }

    return {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'Có lỗi xảy ra',
      },
    };
  }
}
