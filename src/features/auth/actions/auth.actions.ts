'use server';

import * as authApi from '../services/auth.service';
import { ChangePasswordPayload, SignUpPayload } from '../types/auth.types';

export async function signUpAction(payload: SignUpPayload) {
  return authApi.signUp(payload);
}

export async function changePasswordAction(payload: ChangePasswordPayload) {
  return authApi.changePassword(payload);
}
