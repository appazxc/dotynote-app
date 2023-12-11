import { SpaceTabEntity } from "shared/types/entities/SpaceTabEntity";
import { createFakeId } from "shared/util/getFakeId";

import Essense from "../helpers/Essence";

export class SpaceTabEssence extends Essense<SpaceTabEntity> {
  createFake({ pos, spaceId, routes }): SpaceTabEntity {
    return {
      id: createFakeId(),
      userId: this.userId,
      spaceId,
      pos,
      isPinned: false,
      routes,
      isFake: true,
    };
  }

  async loadPrepared() {
    return this.api.get<string[]>(`${this.path}/prepared`);
  }
  async createPrepared() {
    return this.api.post<string>(`${this.path}/prepared`, {});
  }
}
