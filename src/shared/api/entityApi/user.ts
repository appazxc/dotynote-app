import { UserEntity } from 'shared/types/entities/UserEntity';

import Essense from './Essence';

export class UserEssence extends Essense<UserEntity> {
  async loadMe() {
    return this.load('me');
  }
}
