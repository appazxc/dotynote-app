import { useQuery } from "@tanstack/react-query";


import { queries } from "../queries";

export const useSpaces = () => {
  return useQuery(queries.spaces.userList());
};
