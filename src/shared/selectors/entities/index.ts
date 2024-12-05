import { entityTypes } from 'shared/constants/entityTypes';
import Selector from 'shared/selectors/helpers/Selector';

export const userSelector = new Selector(entityTypes.user);
export const spaceSelector = new Selector(entityTypes.space);
export const spaceTabSelector = new Selector(entityTypes.spaceTab);
export const noteSelector = new Selector(entityTypes.note);
export const postsSettingsSelector = new Selector(entityTypes.postsSettings);
export const noteSettingsSelector = new Selector(entityTypes.noteSettings);
export const postSelector = new Selector(entityTypes.post);
export const noteImageSelector = new Selector(entityTypes.noteImage);
export const orderBySelector = new Selector(entityTypes.orderBy);
export const noteDotSelector = new Selector(entityTypes.noteDot);
export const postDotSelector = new Selector(entityTypes.postDot);
