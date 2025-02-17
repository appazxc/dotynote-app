import { deleteNoteAttachmentFactory } from 'shared/actions/note/deleteNoteAttachmentFactory';
import { entityNames } from 'shared/constants/entityNames';

export const deleteNoteVideo = deleteNoteAttachmentFactory({
  entityName: entityNames.noteVideo,
  attachmentField: 'videos',
});