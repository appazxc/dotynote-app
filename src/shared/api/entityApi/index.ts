import { entityTypes } from 'shared/constants/entityTypes';
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

const user = new Essense<UserEntity>(entityTypes.user, userSelector);
const note = new NoteEssence(entityTypes.note, noteSelector);
const space = new Essense<SpaceEntity>(entityTypes.space, spaceSelector);
const post = new Essense<PostEntity>(entityTypes.post, postSelector);
const spaceTab = new SpaceTabEssence(entityTypes.spaceTab, spaceTabSelector);

export const entityApi = {
  user,
  space,
  spaceTab,
  note,
  post,
};
