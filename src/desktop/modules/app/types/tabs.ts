import { TabName } from '../constants/tabNames';
import { RouteResolver } from 'shared/types/common/router';

export type TabsDictionary = {
  [key in TabName]?: () => Promise<{ default: RouteResolver }>
};
