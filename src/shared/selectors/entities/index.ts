import { entityNames } from 'shared/constants/entityNames';
import { UserEntity } from 'shared/types/entities/UserEntity';
import { SpaceEntity } from 'shared/types/entities/SpaceEntity';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { NoteEntity } from 'shared/types/entities/NoteEntity';
import { PostEntity } from 'shared/types/entities/PostEntity';

import Selector from '../helpers/Selector';

export const userSelector = new Selector<UserEntity>(entityNames.user);
export const spaceSelector = new Selector<SpaceEntity>(entityNames.space);
export const spaceTabSelector = new Selector<SpaceTabEntity>(entityNames.spaceTab);
export const noteSelector = new Selector<NoteEntity>(entityNames.note);
export const postSelector = new Selector<PostEntity>(entityNames.post);