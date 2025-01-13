import { deleteNoteAttachmentFactory } from 'shared/actions/note/deleteNoteAttachmentFactory';
import { entityNames } from 'shared/constants/entityNames';

export const deleteNoteFile = deleteNoteAttachmentFactory({
  entityName: entityNames.noteFile,
  attachmentField: 'files',
});