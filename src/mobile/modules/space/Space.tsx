import React from 'react';
import {
  RouterProvider,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import {
  fetchUserSpace,
  fetchSpaceTabsRouteNotes,
  selectActiveSpaceActiveTab,
  selectActiveSpaceId,
  updateActiveSpaceId
} from 'shared/store/slices/appSlice';
import { useQuery } from '@tanstack/react-query';

function Space() {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveSpaceActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);


  
}

export { Space };
