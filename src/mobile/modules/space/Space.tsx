import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { openMainSpaceNote } from 'shared/actions/space/openMainSpaceNote';
import { queries } from 'shared/api/queries';
import { ContentLoader } from 'shared/components/ContentLoader';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter } from 'shared/modules/space/helpers/useTabRouter';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import {
  selectActiveSpaceId,
  selectActiveTab,
} from 'shared/store/slices/appSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { invariant } from 'shared/util/invariant';

import { Error as ErrorPage } from 'mobile/modules/space/components/pages/Error';
import { FakeTabLoading } from 'mobile/modules/space/components/pages/FakeTabLoading';
import { Loading as LoadingPage } from 'mobile/modules/space/components/pages/Loading';
import { SpaceLayout } from 'mobile/modules/space/components/SpaceLayout';
import { Error } from 'mobile/modules/space/tabs/error/Error';
import { Loading } from 'mobile/modules/space/tabs/loading/Loading';
import { NotFound } from 'mobile/modules/space/tabs/notFound/NotFound';
import { tabsDictionary } from 'mobile/modules/space/tabs/tabsDictionary';

function Space() {
  const activeTab = useAppSelector(selectActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);
  const dispatch = useAppDispatch();

  invariant(activeSpaceId, 'activeSpaceId is empty');

  const {
    isError: tabNotesIsError,
    isFetched: tabNotesIsFetched,
  } = useQuery(queries.notes.tabNotes(activeSpaceId));

  React.useEffect(() => {
    if (!activeTab || !activeTab.routes.length) {
      dispatch(openMainSpaceNote());
    }
  }, [dispatch, activeTab]);

  if (tabNotesIsError) {
    return <ErrorPage />;
  }

  if (!tabNotesIsFetched) {
    return <LoadingPage />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return null;
  }

  if (activeTab.isFake) {
    return (
      <FakeTabLoading />
    );
  }

  return (
    <TabProvider tab={activeTab}>
      <SpaceLayout>
        <SpaceTabContent activeTab={activeTab} />
      </SpaceLayout>
    </TabProvider>

  );
}

function SpaceTabContent({ activeTab }: { activeTab: SpaceTabEntity }) {
  const router = useTabRouter(
    activeTab,
    tabsDictionary,
    {
      notFoundPage: <NotFound />,
      errorPage: <Error />,
      loadingPage: <Loading />,
    }
  );

  return (
    <RouterProvider
      key={activeTab.id}
      router={router}
      fallbackElement={<ContentLoader />}
    />
  );
}

export { Space };
