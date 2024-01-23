import { SpaceTabEntity } from "shared/types/entities/SpaceTabEntity";
import { createFakeId } from "shared/util/api/createFakeId";

import Essense from "./Essence";

export class SpaceTabEssence extends Essense<SpaceTabEntity> {
  createFake({ pos, spaceId, routes }): SpaceTabEntity {
    return {
      id: createFakeId(),
      spaceId,
      pos,
      isPinned: false,
      routes,
      isFake: true,
    };
  }
}
