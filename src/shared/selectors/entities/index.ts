import { entityNames } from 'shared/constants/entityNames';
import Selector from 'shared/selectors/helpers/Selector';

export const userSelector = new Selector(entityNames.user);
export const spaceSelector = new Selector(entityNames.space);
export const spaceTabSelector = new Selector(entityNames.spaceTab);
export const noteSelector = new Selector(entityNames.note);
export const postsSettingsSelector = new Selector(entityNames.postsSettings);
export const noteSettingsSelector = new Selector(entityNames.noteSettings);
export const postSelector = new Selector(entityNames.post);
export const noteImageSelector = new Selector(entityNames.noteImage);
export const orderBySelector = new Selector(entityNames.orderBy);
export const noteDotSelector = new Selector(entityNames.noteDot);
export const postDotSelector = new Selector(entityNames.postDot);
export const noteAudioSelector = new Selector(entityNames.noteAudio);
export const noteFileSelector = new Selector(entityNames.noteFile);
export const noteVideoSelector = new Selector(entityNames.noteVideo);
