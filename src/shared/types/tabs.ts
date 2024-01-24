import { RouteResolver } from 'shared/types/common/router';

import { TabName } from '../modules/space/constants/tabRouteNames';

export type TabsDictionary = {
  [key in TabName]?: () => Promise<{ default: RouteResolver }>
};
