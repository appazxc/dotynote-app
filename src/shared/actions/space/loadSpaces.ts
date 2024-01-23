import { queries } from "shared/api/queries";
import { queryClient } from "shared/api/queryClient";
import { hour } from "shared/constants/time";
import { ThunkAction } from "shared/store";

export const loadSpaces = (): ThunkAction => async () => {
  await queryClient.fetchQuery({
    ...queries.spaces.userList(),
    staleTime: hour,
  });
};
