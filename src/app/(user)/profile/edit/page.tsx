import { defaultUserProfile } from '@/components/user/profile/edit/data';
import EditProfileForm from '@/components/user/profile/edit/editProfileForm';
import { Stack } from '@mui/material';

export default function EditProfilePage() {
  return (
    <Stack spacing={4}>
      <EditProfileForm initialData={defaultUserProfile} />
    </Stack>
  );
}
