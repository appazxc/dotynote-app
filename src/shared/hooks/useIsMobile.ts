import { useMediaQuery, useQuery } from "@chakra-ui/react";

export const useIsMobile = () => {
  const query = useQuery({ below: 'sm' });
  const [isMobile] = useMediaQuery(query);

  return isMobile;
};