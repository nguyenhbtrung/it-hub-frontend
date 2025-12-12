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
