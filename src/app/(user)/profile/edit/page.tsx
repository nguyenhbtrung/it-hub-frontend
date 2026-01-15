import { auth } from '@/auth';
import { defaultUserProfile } from '@/components/user/profile/edit/data';
import EditProfileForm from '@/components/user/profile/edit/editProfileForm';
import { getMyProfile } from '@/services/user.service';
import { Stack } from '@mui/material';
import { Suspense } from 'react';

export default function EditProfilePage() {
  return (
    <Stack spacing={4}>
      <Suspense>
        <EditProfileFormWrapper />
      </Suspense>
    </Stack>
  );
}

async function EditProfileFormWrapper() {
  const res = await getMyProfile();
  const user = res?.data;
  const session = await auth();
  const accessToken = session?.accessToken || '';
  return (
    <>
      <EditProfileForm initialData={user} accessToken={accessToken} />
    </>
  );
}
