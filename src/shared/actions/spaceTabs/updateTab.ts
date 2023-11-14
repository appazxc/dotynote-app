import { entityApi } from "shared/api/entityApi";
import { SpaceTabEntity } from "shared/types/entities/SpaceTabEntity";

export const updateTab = ({ id, data }: { id: string, data: Partial<SpaceTabEntity>}) => 
  async (dispatch, getState) => {

    await entityApi.spaceTab.update(id, data);
  };