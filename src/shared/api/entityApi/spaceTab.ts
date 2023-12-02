import Essense from "../helpers/Essence";
import { SpaceTabEntity } from "shared/types/entities/SpaceTabEntity";


export class SpaceTabEssence extends Essense<SpaceTabEntity> {
  async loadPrepared() {
    return this.api.get<string[]>(`${this.path}/prepared`);
  }
  async createPrepared() {
    return this.api.post<string>(`${this.path}/prepared`, {});
  }
}
