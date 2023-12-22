import { drawerIds } from 'shared/constants/drawerIds';
import asDrawer, { GetDrawerParams } from 'shared/modules/drawer/asDrawer';
import { DrawerLoader } from 'shared/modules/drawer/DrawerLoader';
import { DrawerProps } from 'shared/types/drawer';

import { Props } from './DotNoteMenuDrawer.content';

const getDrawerParams: GetDrawerParams<DrawerProps<Props>> = () => ({
  id: drawerIds.dotNoteMenu,
});

export default asDrawer<DrawerProps<Props>>({ 
  getDrawerParams, 
  drawerLoader: <DrawerLoader />, 
})(() => import('./DotNoteMenuDrawer.content'));
