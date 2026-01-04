import { CourseDetail } from '@/types/course';

export async function fetchCourse(slug: string): Promise<CourseDetail> {
  const mock: CourseDetail = {
    id: 'c1',
    slug,
    title: 'Lập trình Web với React & Node.js — Từ cơ bản đến nâng cao',
    shortDescription: 'Tạo ứng dụng web thực tế với React, Node.js và database.',
    description: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Khóa học này dẫn dắt bạn từng bước qua toàn bộ quy trình xây dựng một ứng dụng web hiện đại từ ý tưởng đến triển khai thực tế. Bắt đầu với nền tảng React và các hooks cơ bản, bạn sẽ học cách tổ chức component, quản lý state cục bộ và toàn cục, tối ưu hiệu năng và viết mã có cấu trúc, dễ bảo trì. Tiếp theo, khóa học đưa bạn vào thế giới backend nhẹ gọn với Express: thiết kế REST API, xử lý routing, xác thực và kết nối với cơ sở dữ liệu để lưu trữ và truy vấn dữ liệu an toàn. Cuối cùng, bạn sẽ nắm vững quy trình deploy ứng dụng lên môi trường thực tế, cấu hình môi trường, CI/CD cơ bản và theo dõi ứng dụng sau khi chạy.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Trong suốt khóa học, mỗi khái niệm đều được minh họa bằng ví dụ thực tế và bài tập dự án: từ một SPA đơn giản đến một ứng dụng full‑stack có đăng nhập, quản lý dữ liệu và giao tiếp client‑server. Bạn sẽ thực hành viết API, tạo mô hình dữ liệu, xử lý lỗi, và triển khai một ứng dụng hoàn chỉnh lên nền tảng cloud hoặc dịch vụ hosting phổ biến. Các buổi học chú trọng cả lý thuyết lẫn kỹ năng thực hành: debugging, testing cơ bản, và cách đọc log để tìm và sửa lỗi nhanh.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Sau khi hoàn thành, bạn có thể tự tin xây dựng và triển khai ứng dụng web có tính thực tế: thiết kế UI bằng React, quản lý state hiệu quả, kết nối frontend với backend qua REST API, thao tác với cơ sở dữ liệu và đưa sản phẩm lên môi trường production. Khóa học cũng trang bị cho bạn những thói quen phát triển phần mềm chuyên nghiệp: tổ chức mã nguồn, tách bạch trách nhiệm, và tối ưu trải nghiệm người dùng. Đây là nền tảng vững chắc để tiếp tục học các kỹ thuật nâng cao như GraphQL, microservices hoặc tối ưu hóa hiệu năng ở quy mô lớn.',
            },
          ],
        },
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Khóa học phù hợp cho lập trình viên frontend muốn mở rộng sang full‑stack, hoặc người mới có kiến thức cơ bản về JavaScript muốn xây dựng sản phẩm thực tế. ',
            },
            {
              type: 'text',
              marks: [{ type: 'bold' }],
              text: 'Yêu cầu tối thiểu',
            },
            {
              type: 'text',
              text: ': hiểu biết cơ bản về HTML, CSS và JavaScript; từ đó bạn sẽ được hướng dẫn từng bước để hoàn thiện kỹ năng. Nếu bạn muốn một lộ trình rõ ràng để đi từ prototype đến sản phẩm chạy được trên mạng, khóa học này cung cấp tất cả công cụ và bài tập cần thiết để bạn thực hành và hoàn thiện portfolio.',
            },
          ],
        },
      ],
    },
    category: { id: 'cat1', name: 'Web Development', slug: 'web-dev' },
    subCategory: { id: 'cat2', name: 'React', slug: 'React' },
    tags: [
      { id: '1', name: 'react', slug: 'react' },
      { id: '2', name: 'nodejs', slug: 'nodejs' },
      { id: '3', name: 'express', slug: 'express' },
      { id: '4', name: 'frontend', slug: 'frontend' },
      { id: '5', name: 'backend', slug: 'backend' },
    ],
    avgRating: 4.8,
    reviewCount: 1245,
    students: 23456,
    updatedAt: '2025-10-01',
    level: 'intermediate',
    totalDuration: 165 * 60,
    lessons: 12,
    materials: 10,
    instructor: {
      id: 'i1',
      name: 'ThS. Nguyễn Văn A',
      title: 'Giảng viên Lập trình Web',
      bio: '10 năm kinh nghiệm phát triển web. Từng làm lead frontend tại nhiều startup.',
      avatarUrl: 'https://picsum.photos/200',
      social: { linkedin: '#', twitter: '#', website: '#' },
    },
    sections: [
      {
        id: 's1',
        title: 'Giới thiệu & Thiết lập môi trường',
        order: 1,
        lessons: [
          { id: 'l1', title: 'Giới thiệu khóa học', durationMinutes: 5, isPreview: true },
          { id: 'l2', title: 'Cài đặt môi trường', durationMinutes: 12 },
        ],
      },
      {
        id: 's2',
        title: 'React cơ bản',
        order: 2,
        lessons: [
          { id: 'l3', title: 'JSX & Component', durationMinutes: 18 },
          { id: 'l4', title: 'State & Props', durationMinutes: 20 },
        ],
      },
      {
        id: 's3',
        title: 'Giới thiệu & Thiết lập môi trường',
        order: 1,
        lessons: [
          { id: 'l5', title: 'Giới thiệu khóa học', durationMinutes: 5, isPreview: true },
          { id: 'l6', title: 'Cài đặt môi trường', durationMinutes: 12 },
        ],
      },
      {
        id: 's4',
        title: 'React cơ bản',
        order: 2,
        lessons: [
          { id: 'l7', title: 'JSX & Component', durationMinutes: 18 },
          { id: 'l8', title: 'State & Props', durationMinutes: 20 },
        ],
      },
      {
        id: 's5',
        title: 'Giới thiệu & Thiết lập môi trường',
        order: 1,
        lessons: [
          { id: 'l9', title: 'Giới thiệu khóa học', durationMinutes: 5, isPreview: true },
          { id: 'l10', title: 'Cài đặt môi trường', durationMinutes: 12 },
        ],
      },
      {
        id: 's6',
        title: 'React cơ bản',
        order: 2,
        lessons: [
          { id: 'l11', title: 'JSX & Component', durationMinutes: 18 },
          { id: 'l12', title: 'State & Props', durationMinutes: 20 },
        ],
      },
      // ...more sections
    ],
    keyTakeaways: [
      'Xây dựng SPA với React',
      'Tạo API với Express & Node.js',
      'Kết nối database',
      'Triển khai ứng dụng lên production',
    ],
    requirements: ['Biết HTML/CSS cơ bản', 'Biết JavaScript cơ bản'],
    language: 'Tiếng Việt',
    price: 'Miễn phí',
    promoVideoUrl: null,
  };
  return mock;
}
