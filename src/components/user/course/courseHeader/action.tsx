'use client';

import { createEnrollment, deleteEnrollment } from '@/services/enrollment.service';
import Button from '@mui/material/Button';
import Link from '@/components/common/Link';
import { useState } from 'react';

interface CourseHeaderActionProps {
  course: any;
  enrollmentStatus: any;
  courseId: string;
}

const getLassAccessPath = (lastAccess: any) => {
  if (lastAccess?.stepId) return `/learn/steps/${lastAccess.stepId}`;
  if (lastAccess?.unitId) return `/learn/units/${lastAccess.unitId}`;
  if (lastAccess?.sectionId) return `/learn/sections/${lastAccess.sectionId}`;
  return '';
};

export default function CourseHeaderAction({ course, enrollmentStatus, courseId }: CourseHeaderActionProps) {
  const [status, setStatus] = useState(enrollmentStatus?.status);
  const handleRegisterClick = async () => {
    try {
      const res = await createEnrollment(courseId, { status: 'pending' });
      if (res?.success) {
        setStatus('pending');
      }
    } catch (err) {}
  };

  const handleCancelClick = async () => {
    try {
      const res = await deleteEnrollment(courseId);
      if (res?.success) {
        setStatus(null);
      }
    } catch (err) {}
  };
  return (
    <>
      {!status && (
        <Button variant='contained' onClick={handleRegisterClick} sx={{ width: { xs: '100%', sm: 200 } }}>
          Đăng ký
        </Button>
      )}

      {status === 'pending' && (
        <Button variant='outlined' onClick={handleCancelClick} sx={{ width: { xs: '100%', sm: 200 } }}>
          Huỷ đăng ký
        </Button>
      )}

      {(status === 'active' || status === 'completed') && (
        <Button
          LinkComponent={Link}
          href={`/courses/${course?.slug}${getLassAccessPath(enrollmentStatus?.lastAccess)}`}
          variant='contained'
          sx={{ width: { xs: '100%', sm: 200 } }}
        >
          Tiếp tục học
        </Button>
      )}
    </>
  );
}
