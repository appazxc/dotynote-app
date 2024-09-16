import ActionEssense from 'shared/api/entityApi/ActionEssence';
import SharedEssense from 'shared/api/entityApi/SharedEssence';
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

import Essense from './Essence';
import { NoteEssence } from './note';
import { SpaceTabEssence } from './spaceTab';
import { UserEssence } from './user';

const user = new UserEssence(entityTypes.user, userSelector);
const note = new NoteEssence(entityTypes.note, noteSelector);
const space = new Essense<SpaceEntity>(entityTypes.space, spaceSelector);
const post = new Essense<PostEntity>(entityTypes.post, postSelector);
const spaceTab = new SpaceTabEssence(entityTypes.spaceTab, spaceTabSelector);
const stickNote = new ActionEssense('/notes/stick');
const movePost = new ActionEssense('/posts/move');
const shared = new SharedEssense();

export const entityApi = {
  user,
  space,
  spaceTab,
  note,
  post,
  stickNote,
  movePost,
  shared,
};
