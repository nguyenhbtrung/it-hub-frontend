import { UserProfile, FormField } from './types';

export const defaultUserProfile: UserProfile = {
  id: '1',
  fullname: 'Nguyễn Văn A',
  role: 'student',
  school: 'Đại học Bách Khoa HN',
  specialized: 'Kỹ thuật Phần mềm',
  bio: 'Xin chào! Mình là sinh viên năm 3 chuyên ngành Kỹ thuật Phần mềm. Mình có niềm đam mê lớn với lập trình Web Frontend và đang trong quá trình chinh phục ReactJS. Mục tiêu của mình là trở thành một Full-stack Developer trong tương lai.',
  githubUrl: 'github.com/nguyenvana',
  linkedinUrl: 'linkedin.com/in/nguyenvana',
  websiteUrl: 'nguyenvana.dev',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCpPIPcXBFHuLDiDz_oTGId2Jatc4x-RkilM0ncAvP-iacoDfD26uO5u5Mriwni0seDqC4fS72WQyErL4AMD0nfncG-b2cvRb2GAmqs8njDMwt9h-4oumNInnrl5oV6r1d0K6u5PnWkKn_u3mc5GI5ZCsX_LffguL3YaQQQfC1PMQPzET_oBdrwz3mrwMa3MERitHmETUQ1IOwvk_O8rQ6WkSRuwhMJkhjMaP0-B07is55DoUSI3mzM0P-znC3yAj6-Z7n7hLG4rYo',
};

export const formFields: FormField[] = [
  {
    name: 'fullname',
    label: 'Họ và tên',
    type: 'text',
    placeholder: 'Nhập họ tên đầy đủ',
    required: true,
  },
  {
    name: 'role',
    label: 'Vai trò',
    type: 'select',
    placeholder: 'Chọn vai trò',
    required: true,
    disabled: true,
    options: [
      { value: 'student', label: 'Học viên' },
      { value: 'instructor', label: 'Giảng viên' },
    ],
  },
  {
    name: 'school',
    label: 'Trường / Đơn vị công tác',
    type: 'text',
    placeholder: 'Tên trường học hoặc nơi làm việc',
    required: true,
  },
  {
    name: 'specialized',
    label: 'Chuyên ngành / Vị trí',
    type: 'text',
    placeholder: 'Ví dụ: Kỹ thuật Phần mềm',
    required: true,
  },
  {
    name: 'bio',
    label: 'Giới thiệu bản thân (Bio)',
    type: 'textarea',
    placeholder: 'Chia sẻ một chút về bản thân bạn...',
  },
  {
    name: 'githubUrl',
    label: 'GitHub',
    type: 'url',
    placeholder: 'https://github.com/username',
  },
  {
    name: 'linkedinUrl',
    label: 'LinkedIn',
    type: 'url',
    placeholder: 'https://linkedin.com/in/username',
  },
  {
    name: 'websiteUrl',
    label: 'Website',
    type: 'url',
    placeholder: 'https://yourwebsite.com',
  },
];
