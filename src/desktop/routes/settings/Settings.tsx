import { SettingsContent } from 'shared/modules/settings/SettingsContent';

import { SettingsLayout } from 'desktop/components/SettingsLayout';

function Settings() {
  return (
    <SettingsLayout>
      <SettingsContent />
    </SettingsLayout>
  );
}

export { Settings };

export default Settings;
