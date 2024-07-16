import { spaceTabSelector } from 'shared/selectors/entities';
import { selectActiveSpace } from 'shared/selectors/space/selectActiveSpace';
import { selectSortedSpaceTabs } from 'shared/selectors/tab/selectSortedSpaceTabs';
import { useAppSelector } from 'shared/store/hooks';
import { invariant } from 'shared/util/invariant';

export const useSpaceTabs = ({ sorted }: { sorted?: boolean } = {}) => {
  const activeSpace = useAppSelector(selectActiveSpace);

  invariant(activeSpace, 'Missing active space');

  const tabs = useAppSelector((state) => spaceTabSelector.getByIds(state, activeSpace?.spaceTabs));
  const sortedTabs = useAppSelector((state) => selectSortedSpaceTabs(state, { ids: activeSpace?.spaceTabs }));

  const tabsData = sorted ? sortedTabs : tabs;

  return tabsData;
};
