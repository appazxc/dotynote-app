import { drawerIds } from 'shared/constants/drawerIds';
import asDrawer, { GetDrawerParams } from 'shared/modules/drawer/asDrawer';
import { DrawerLoader } from 'shared/modules/drawer/DrawerLoader';
import { DrawerProps } from 'shared/types/drawer';

import { Props } from './ConfirmDrawer.content';

const getDrawerParams: GetDrawerParams<DrawerProps<Props>> = (props) => ({
  id: drawerIds.confirm,
  extraId: props.extraId,
});

export default asDrawer<DrawerProps<Props>>({ 
  getDrawerParams, 
  drawerLoader: <DrawerLoader />, 
})(() => import('./ConfirmDrawer.content'));
