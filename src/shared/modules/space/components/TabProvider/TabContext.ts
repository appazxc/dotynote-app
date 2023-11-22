import React from 'react';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';

export const TabContext = React.createContext<SpaceTabEntity | undefined>(undefined);
