import { createGetUrl } from 'shared/helpers/router/createGetUrl';

import { tabList } from '../constants/tabRouteList';

export const getTabUrl = createGetUrl(tabList);
