import { entityNames } from 'shared/constants/entityNames';
import {
  noteSelector,
  postSelector,
  spaceSelector,
  spaceTabSelector,
  userSelector,
} from 'shared/selectors/entities';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { SpaceEntity } from 'shared/types/entities/SpaceEntity';
import { UserEntity } from 'shared/types/entities/UserEntity';

import Essense from './Essence';
import { NoteEssence } from './note';
import { SpaceTabEssence } from './spaceTab';

const user = new Essense<UserEntity>(entityNames.user, userSelector);
const note = new NoteEssence(entityNames.note, noteSelector);
const space = new Essense<SpaceEntity>(entityNames.space, spaceSelector);
const post = new Essense<PostEntity>(entityNames.post, postSelector);
const spaceTab = new SpaceTabEssence(entityNames.spaceTab, spaceTabSelector);

export const entityApi = {
  user,
  space,
  spaceTab,
  note,
  post,
};
