import { deleteNoteAttachmentFactory } from 'shared/actions/note/deleteNoteAttachmentFactory';
import { entityNames } from 'shared/constants/entityNames';

export const deleteNoteAudio = deleteNoteAttachmentFactory({
  entityName: entityNames.noteAudio,
  attachmentField: 'audio',
});