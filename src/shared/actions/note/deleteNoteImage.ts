import { deleteNoteAttachmentFactory } from 'shared/actions/note/deleteNoteAttachmentFactory';
import { entityNames } from 'shared/constants/entityNames';

export const deleteNoteImage = deleteNoteAttachmentFactory({
  entityName: entityNames.noteImage,
  attachmentField: 'images',
});