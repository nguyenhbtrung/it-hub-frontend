export interface UserProfile {
  id: string;
  fullName: string;
  role: 'student' | 'instructor';
  school: string;
  major: string;
  bio: string;
  github: string;
  linkedin: string;
  website: string;
  avatarUrl: string;
}

export interface FormField {
  name: keyof UserProfile;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'url';
  placeholder: string;
  required?: boolean;
  disabled?: boolean;
  options?: { value: string; label: string }[];
}
