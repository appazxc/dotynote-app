import { createGetUrl } from 'shared/helpers/router/createGetUrl';

import { tabList } from '../constants/appRouteList';

export const getTabUrl = createGetUrl(tabList);
