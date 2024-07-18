import { ProfileForm } from 'shared/components/forms/ProfileForm';

import { SettingsLayout } from 'desktop/modules/space/components/SettingsLayout';

export const Profile = () => {
  return (
    <SettingsLayout>
      <ProfileForm />
    </SettingsLayout>
  );
};

export default Profile;