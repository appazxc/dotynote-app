import { spaceTabSelector } from 'shared/selectors/entities';
import { useAppSelector } from 'shared/store/hooks';
import { selectActiveSpace, selectSortedSpaceTabEntities } from 'shared/store/slices/appSlice';
import { invariant } from 'shared/util/invariant';

export const useSpaceTabs = ({ sorted }: { sorted?: boolean } = {}) => {
  const activeSpace = useAppSelector(selectActiveSpace);

  invariant(activeSpace, 'Missing active space');

  const tabs = useAppSelector((state) => spaceTabSelector.getByIds(state, activeSpace?.spaceTabs));
  const sortedTabs = useAppSelector((state) => selectSortedSpaceTabEntities(state, { ids: activeSpace?.spaceTabs }));

  const tabsData = sorted ? sortedTabs : tabs;

  return tabsData;
};
