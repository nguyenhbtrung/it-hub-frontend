export interface UserProfile {
  id: string;
  fullname: string;
  role: 'student' | 'instructor';
  school: string;
  specialized: string;
  bio: string;
  githubUrl: string;
  linkedinUrl: string;
  websiteUrl: string;
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
