import { AppRouteName } from '../constants/appRouteNames';
import { RouteResolver } from 'shared/types/common/router';

export type AppRouteDictionary = {
  [key in AppRouteName]?: RouteResolver
};
