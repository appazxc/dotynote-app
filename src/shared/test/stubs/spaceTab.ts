import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

export const activeUserSpaceTabs: SpaceTabEntity[] = [...Array(5)].map((_, index) => ({
  id: String(index + 1),
  userId: '1',
  spaceId: '1',
  pos: (index + 1) * 1000,
  isPinned: false,
  routes: [],
}));
