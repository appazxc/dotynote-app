import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectSortedTabs } from 'shared/selectors/tab/selectSortedTabs';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const useSpaceTabs = ({ sorted }: { sorted?: boolean } = {}) => {
  const activeSpace = useAppSelector(selectActiveSpace);

  invariant(activeSpace, 'Missing active space');

  const tabs = useAppSelector((state) => spaceTabSelector.getByIds(state, activeSpace?.tabs));
  const sortedTabs = useAppSelector((state) => selectSortedTabs(state, { ids: activeSpace?.tabs }));

  const tabsData = sorted ? sortedTabs : tabs;

  return tabsData;
};
