import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Vui lòng nhập mật khẩu hiện tại'),
    newPassword: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất 1 chữ hoa')
      .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất 1 chữ thường')
      .regex(/[^A-Za-z0-9]/, 'Mật khẩu phải chứa ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().min(1, 'Vui lòng xác nhận mật khẩu'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Utility function để đánh giá độ mạnh mật khẩu
export const evaluatePasswordStrength = (
  password: string
): {
  score: number;
  strength: 'weak' | 'medium' | 'strong';
  label: string;
  percentage: number;
  checks: {
    minLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasSpecialChar: boolean;
  };
} => {
  const checks = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(Boolean).length;

  let strength: 'weak' | 'medium' | 'strong' = 'weak';
  let label = 'Yếu';
  let percentage = 0;

  if (score <= 1) {
    strength = 'weak';
    label = 'Yếu';
    percentage = 33;
  } else if (score === 2) {
    strength = 'medium';
    label = 'Trung bình';
    percentage = 66;
  } else if (score >= 3) {
    strength = 'strong';
    label = 'Mạnh';
    percentage = 100;
  }

  return {
    score,
    strength,
    label,
    percentage,
    checks,
  };
};
