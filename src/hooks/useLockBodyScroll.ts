import { useEffect } from 'react';

const useLockBodyScroll = (lock: boolean) => {
  useEffect(() => {
    if (!lock) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, scrollY);
    };
  }, [lock]);
};

export default useLockBodyScroll;
