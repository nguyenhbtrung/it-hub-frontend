'use client';

import { useEffect } from 'react';

interface ScrollToCoursesProps {
  triggerData: any[];
}

export default function ScrollToCourses({ triggerData }: ScrollToCoursesProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#course-list') {
      const element = document.getElementById('course-list');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [triggerData]);

  return null;
}
