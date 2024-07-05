import { Link } from '@tanstack/react-router';

import { SettingsLayout } from 'desktop/modules/space/components/SettingsLayout';

export const Profile = () => {
  return (
    <SettingsLayout>
      <div>ProfileContent</div>
      <Link to="/settings/note">настройки заметки</Link>
    </SettingsLayout>
  );
};

export default Profile;