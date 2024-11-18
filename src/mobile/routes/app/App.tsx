import React from 'react';

import { selectActiveTab } from 'shared/selectors/tab/selectActiveTab';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

import Space from 'mobile/modules/space';

export const App = () => {
  const activeTab = useAppSelector(selectActiveTab);

  invariant(activeTab, 'activeTab is missings');

  return (
    <Space tab={activeTab} isLoading={activeTab._isFake} />
  );
};

export default App;