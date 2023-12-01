import { createBuildUrl } from 'shared/util/router/createBuildUrl';

import { tabList } from 'shared/modules/space/constants/tabRouteList';

export const buildTabUrl = createBuildUrl(tabList);
