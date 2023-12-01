import Essense from "../helpers/Essence";
import { UserEntity } from "shared/types/entities/UserEntity";


export class UserEssence extends Essense<UserEntity> {
  async loadMe() {
    return this.load('me');
  }
}
