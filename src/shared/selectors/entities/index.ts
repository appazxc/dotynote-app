import { entityNames } from 'shared/constants/entityNames';
import Selector from 'shared/selectors/helpers/Selector';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';
import { PostEntity } from 'shared/types/entities/PostEntity';
import { PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';
import { SpaceEntity } from 'shared/types/entities/SpaceEntity';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { UserEntity } from 'shared/types/entities/UserEntity';

export const userSelector = new Selector<UserEntity>(entityNames.user);
export const spaceSelector = new Selector<SpaceEntity>(entityNames.space);
export const spaceTabSelector = new Selector<SpaceTabEntity>(entityNames.spaceTab);
export const noteSelector = new Selector<NoteEntity>(entityNames.note);
export const postsSettingsSelector = new Selector<PostsSettingsEntity>(entityNames.postsSettings);
export const noteSettingsSelector = new Selector<NoteSettingsEntity>(entityNames.noteSettings);
export const postSelector = new Selector<PostEntity>(entityNames.post);