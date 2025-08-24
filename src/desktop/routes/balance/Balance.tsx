import { useFeatureFlagEnabled } from 'posthog-js/react';

import { BalanceContent } from 'shared/modules/balance/BalanceContent';

import { SettingsLayout } from 'desktop/components/SettingsLayout';

function Balance() {
  const flagEnabled = useFeatureFlagEnabled('balance_credits');

  return (
    <SettingsLayout
      title="Balance"
      description={
        flagEnabled
          ? 'Manage your credits and storage'
          : 'Manage your storage'
      }
    >
      <BalanceContent />
    </SettingsLayout>
  );
}

export default Balance;
