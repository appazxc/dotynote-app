import ActionEssense from 'shared/api/entityApi/ActionEssence';
import { entityNames } from 'shared/constants/entityNames';
import { 
  noteSelector,
  noteSettingsSelector,
  postSelector,
  spaceSelector,
  spaceTabSelector,
  userSelector, 
} from 'shared/selectors/entities';
import { NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { SpaceEntity } from 'shared/types/entities/SpaceEntity';

import Essense from './Essence';
import { NoteEssence } from './note';
import { SpaceTabEssence } from './spaceTab';
import { UserEssence } from './user';

const user = new UserEssence(entityNames.user, userSelector);
const note = new NoteEssence(entityNames.note, noteSelector);
const space = new Essense<SpaceEntity>(entityNames.space, spaceSelector);
const post = new Essense<PostEntity>(entityNames.post, postSelector);
const spaceTab = new SpaceTabEssence(entityNames.spaceTab, spaceTabSelector);
const stickNote = new ActionEssense('/notes/stick');
const movePost = new ActionEssense('/posts/move');

export const entityApi = {
  user,
  space,
  spaceTab,
  note,
  post,
  stickNote,
  movePost,
};
