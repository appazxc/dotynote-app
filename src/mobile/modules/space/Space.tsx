import { useQuery } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';

import { options } from 'shared/api/options';
import { ContentLoader } from 'shared/components/ContentLoader';
import { TabProvider } from 'shared/modules/space/components/TabProvider';
import { useTabRouter } from 'shared/modules/space/helpers/useTabRouter';
import { useAppSelector } from 'shared/store/hooks';
import {
  selectActiveSpaceId,
  selectActiveTab,
} from 'shared/store/slices/appSlice';
import { SpaceTabEntity } from 'shared/types/entities/SpaceTabEntity';
import { invariant } from 'shared/util/invariant';

import { Error as ErrorPage } from 'mobile/modules/space/components/pages/Error';
import { FakeTabLoading } from 'mobile/modules/space/components/pages/FakeTabLoading';
import { Loading as LoadingPage } from 'mobile/modules/space/components/pages/Loading';
import { NonActiveTab } from 'mobile/modules/space/components/pages/NonActiveTab';
import { SpaceLayout } from 'mobile/modules/space/components/SpaceLayout';
import { Error } from 'mobile/modules/space/tabs/error/Error';
import { Loading } from 'mobile/modules/space/tabs/loading/Loading';
import { NotFound } from 'mobile/modules/space/tabs/notFound/NotFound';
import { tabsDictionary } from 'mobile/modules/space/tabs/tabsDictionary';

function Space() {
  const activeTab = useAppSelector(selectActiveTab);
  const activeSpaceId = useAppSelector(selectActiveSpaceId);

  invariant(activeSpaceId, 'activeSpaceId is empty');

  const {
    isError: tabNotesIsError,
    isFetched: tabNotesIsFetched,
  } = useQuery(options.notes.tabNotes(activeSpaceId));

  if (tabNotesIsError) {
    return <ErrorPage />;
  }

  if (!tabNotesIsFetched) {
    return <LoadingPage />;
  }

  if (!activeTab || !activeTab.routes.length) {
    return <NonActiveTab />;
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
