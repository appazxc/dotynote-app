import { AppRouteName } from '../constants/appRouteNames';
import { RouteResolver } from 'shared/types/common/router';

export type TabsDictionary = {
  [key in AppRouteName]?: () => Promise<{ default: RouteResolver }>
};
