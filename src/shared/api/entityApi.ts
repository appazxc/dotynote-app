import { entityNames } from "shared/constants/entityNames";
import { UserEntity } from "shared/types/entities/UserEntity";
import Essense from "./helpers/Essence";
import { spaceSelector, spaceTabSelector, userSelector } from "shared/selectors/entities";
import { SpaceEntity } from "shared/types/entities/SpaceEntity";
import { SpaceTabEntity } from "shared/types/entities/SpaceTabEntity";

const user = new Essense<UserEntity>(entityNames.user, userSelector);
const space = new Essense<SpaceEntity>(entityNames.space, spaceSelector);
const spaceTab = new Essense<SpaceTabEntity>(entityNames.spaceTab, spaceTabSelector);

export const entityApi = {
  user,
  space,
  spaceTab,
};