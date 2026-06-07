'use server';

import { authApi } from '../api/auth.api';
import { ChangePasswordPayload, SignUpPayload } from '../types/auth.types';

export async function signUpAction(payload: SignUpPayload) {
  return authApi.signUp(payload);
}

export async function changePasswordAction(payload: ChangePasswordPayload) {
  return authApi.changePassword(payload);
}
