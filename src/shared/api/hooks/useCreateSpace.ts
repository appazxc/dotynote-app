import { useMutation, useQuery } from "@tanstack/react-query";

import { USER_ID } from "shared/constants/queryParams";
import { useAppSelector } from "shared/store/hooks";
import { selectUser } from "shared/store/slices/authSlice";
import { SpaceEntity } from "shared/types/entities/SpaceEntity";

import { entityApi } from "../entityApi";
import { queries } from "../queries";

export const useCreateSpace = () => {
  return useMutation({
    mutationFn: (space: Partial<SpaceEntity>) => {
      return entityApi.space.create(space);
    },
  });
};
