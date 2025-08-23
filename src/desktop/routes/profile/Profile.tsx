import { ProfileContent } from 'shared/modules/profile/ProfileContent';

import { SettingsLayout } from 'desktop/components/SettingsLayout';

function Profile() {
  return (
    <SettingsLayout title="Profile">
      <ProfileContent />
    </SettingsLayout>
  );
}

export default Profile;
