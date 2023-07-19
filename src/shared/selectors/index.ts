import { entityNames } from 'shared/constants/entityNames';
import { UserEntity } from 'shared/types/entities/UserEntity';
import { AppSessionEntity } from 'shared/types/entities/AppSessionEntity';

import Selector from './helpers/Selector';

export const userSelector = new Selector<UserEntity>(entityNames.user);
export const appSessionSelector = new Selector<AppSessionEntity>(entityNames.appSession);
