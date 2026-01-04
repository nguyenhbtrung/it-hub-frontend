export const getDiffTime = (before: Date, after: Date): string => {
  const diffMs = after.getTime() - before.getTime();
  const diffMin = Math.floor(diffMs / 60000);

  if (diffMin < 60) {
    return `${diffMin} phút`;
  }

  const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHour < 24) {
    return `${diffHour} giờ`;
  }

  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 14) {
    return `${diffDays} ngày`;
  }

  const diffWeeks = Math.floor(diffDays / 7);
  return `${diffWeeks} tuần`;
};

export const toLocaleDateString = (date: Date): string => {
  const formattedDate = date.toLocaleDateString('vi-VN');
  return formattedDate;
};

export const toShortLocaleDateString = (date: Date) =>
  date.toLocaleDateString('vi-VN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

export const formatDuration = (seconds: number): string => {
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;

  if (seconds >= 2 * week) {
    const weeks = Math.floor(seconds / week);
    return `${weeks} tuần`;
  } else if (seconds >= hour) {
    const hours = Math.floor(seconds / hour);
    const minutes = Math.floor((seconds % hour) / minute);
    return minutes > 0 ? `${hours} giờ ${minutes} phút` : `${hours} giờ`;
  } else {
    const minutes = Math.floor(seconds / minute);
    return `${minutes} phút`;
  }
};
