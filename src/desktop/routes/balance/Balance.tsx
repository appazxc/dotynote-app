import { BalanceContent } from 'shared/modules/balance/BalanceContent';

import { SettingsLayout } from 'desktop/components/SettingsLayout';

function Balance() {
  return (
    <SettingsLayout title="Balance" description="Manage your credits and storage">
      <BalanceContent />
    </SettingsLayout>
  );
}

export default Balance;
