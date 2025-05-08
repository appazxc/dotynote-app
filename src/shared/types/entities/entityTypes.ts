import { EntityName, entityNames } from 'shared/constants/entityNames';
import { ApiNoteAudioEntity, NoteAudioEntity } from 'shared/types/entities/NoteAudioEntity';
import { ApiNoteDotEntity, NoteDotEntity } from 'shared/types/entities/NoteDotEntity';
import { ApiNoteEntity, NoteEntity } from 'shared/types/entities/NoteEntity';
import { ApiNoteFileEntity, NoteFileEntity } from 'shared/types/entities/NoteFileEntity';
import { ApiNoteImageEntity, NoteImageEntity } from 'shared/types/entities/NoteImageEntity';
import { ApiNoteSettingsEntity, NoteSettingsEntity } from 'shared/types/entities/NoteSettingsEntity';
import { ApiNoteVideoEntity, NoteVideoEntity } from 'shared/types/entities/NoteVideoEntity';
import { ApiPostDotEntity, PostDotEntity } from 'shared/types/entities/PostDotEntity';
import { ApiPostEntity, PostEntity } from 'shared/types/entities/PostEntity';
import { ApiPostInternalEntity, PostInternalEntity } from 'shared/types/entities/PostInternalEntity';
import { ApiPostsSettingsEntity, PostsSettingsEntity } from 'shared/types/entities/PostsSettingsEntity';
import { ApiSpaceEntity, SpaceEntity } from 'shared/types/entities/SpaceEntity';
import { ApiSpaceTabEntity, SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { ApiSubscriptionEntity, SubscriptionEntity } from 'shared/types/entities/SubscriptionEntity';
import { ApiSubscriptionPlanEntity, SubscriptionPlanEntity } from 'shared/types/entities/SubscriptionPlanEntity';
import { ApiUserBalanceEntity, UserBalanceEntity } from 'shared/types/entities/UserBalanceEntity';
import { ApiUserEntity, UserEntity } from 'shared/types/entities/UserEntity';
import { ApiUserSettingsEntity, UserSettingsEntity } from 'shared/types/entities/UserSettingsEntity';

export type ApiEntityTypes = {
  [entityNames.user]: ApiUserEntity;
  [entityNames.space]: ApiSpaceEntity;
  [entityNames.spaceTab]: ApiSpaceTabEntity;
  [entityNames.note]: ApiNoteEntity;
  [entityNames.post]: ApiPostEntity;
  [entityNames.postsSettings]: ApiPostsSettingsEntity;
  [entityNames.noteSettings]: ApiNoteSettingsEntity;
  [entityNames.userSettings]: ApiUserSettingsEntity;
  [entityNames.postInternal]: ApiPostInternalEntity;
  [entityNames.postDot]: ApiPostDotEntity;
  [entityNames.noteDot]: ApiNoteDotEntity;
  [entityNames.noteImage]: ApiNoteImageEntity;
  [entityNames.noteFile]: ApiNoteFileEntity;
  [entityNames.noteAudio]: ApiNoteAudioEntity;
  [entityNames.noteVideo]: ApiNoteVideoEntity;
  [entityNames.subscriptionPlan]: ApiSubscriptionPlanEntity;
  [entityNames.subscription]: ApiSubscriptionEntity;
  [entityNames.userBalance]: ApiUserBalanceEntity;
}

export type ApiEntity = ApiEntityTypes[EntityName]

export type EntityTypes = {
  [entityNames.user]: UserEntity;
  [entityNames.space]: SpaceEntity;
  [entityNames.spaceTab]: SpaceTabEntity;
  [entityNames.note]: NoteEntity;
  [entityNames.post]: PostEntity;
  [entityNames.postsSettings]: PostsSettingsEntity;
  [entityNames.noteSettings]: NoteSettingsEntity;
  [entityNames.userSettings]: UserSettingsEntity;
  [entityNames.postInternal]: PostInternalEntity;
  [entityNames.postDot]: PostDotEntity;
  [entityNames.noteDot]: NoteDotEntity;
  [entityNames.noteImage]: NoteImageEntity;
  [entityNames.noteFile]: NoteFileEntity;
  [entityNames.noteAudio]: NoteAudioEntity;
  [entityNames.noteVideo]: NoteVideoEntity;
  [entityNames.subscriptionPlan]: SubscriptionPlanEntity;
  [entityNames.subscription]: SubscriptionEntity;
  [entityNames.userBalance]: UserBalanceEntity;
}
