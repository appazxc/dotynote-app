import { createGetUrl } from 'shared/helpers/router/createGetUrl';

import { appRouteList } from '../constants/appRouteList';

export const getAppUrl = createGetUrl(appRouteList);
