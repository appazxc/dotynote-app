import { createGetUrl } from 'shared/util/router/createGetUrl';

import { tabList } from 'shared/modules/space/constants/tabRouteList';

export const getTabUrl = createGetUrl(tabList);
