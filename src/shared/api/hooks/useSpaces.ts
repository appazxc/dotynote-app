
import { useQuery } from "@tanstack/react-query";

import { USER_ID } from "shared/constants/queryParams";
import { useAppSelector } from "shared/store/hooks";
import { selectUser } from "shared/store/slices/authSlice";

import { queries } from "../queries";

export const useSpaces = () => {
  const user = useAppSelector(selectUser);
  return useQuery(queries.spaces.list({ [USER_ID]: user?.id }));
};
