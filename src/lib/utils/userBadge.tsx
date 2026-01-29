export const getRoleColor = (role: string) => {
  switch (role) {
    case 'instructor':
      return { bgcolor: 'badged.yellow.bg', color: 'badged.yellow.text' };
    case 'student':
      return { bgcolor: 'badged.blue.bg', color: 'badged.blue.text' };
    case 'admin':
      return { bgcolor: 'error.light', color: 'error.main' };
    default:
      return {};
  }
};
