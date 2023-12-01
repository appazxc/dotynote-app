import { entityNames } from "shared/constants/entityNames";
import Essense from "../helpers/Essence";
import { noteSelector, spaceSelector, spaceTabSelector, userSelector } from "shared/selectors/entities";
import { SpaceEntity } from "shared/types/entities/SpaceEntity";
import { SpaceTabEntity } from "shared/types/entities/SpaceTabEntity";
import { NoteEssence } from "./note";
import { UserEssence } from "./user";

const user = new UserEssence(entityNames.user, userSelector);
const note = new NoteEssence(entityNames.note, noteSelector);
const space = new Essense<SpaceEntity>(entityNames.space, spaceSelector);
const spaceTab = new Essense<SpaceTabEntity>(entityNames.spaceTab, spaceTabSelector);

export const entityApi = {
  user,
  space,
  spaceTab,
  note,
};