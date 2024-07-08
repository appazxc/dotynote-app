import { Link } from 'react-router-dom';

import { SettingsLayout } from 'desktop/modules/space/components/SettingsLayout';

export const ProfileContent = () => {
  return (
    <SettingsLayout>
      <div>ProfileContent</div>
      <Link to="/settings/note">настройки заметки</Link>
    </SettingsLayout>
  );
};