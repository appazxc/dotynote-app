import React, { Suspense } from 'react';

// need 18.3 react version
// import { SuspenseLoader } from 'shared/components/SuspenseLoader';
import { useAppSelector } from 'shared/store/hooks';
import { DrawerIdentity } from 'shared/types/drawer';
import { AppDispatch } from 'shared/types/store';

import { DrawerLoader } from './DrawerLoader';
import { isTopDrawer } from './helpers/isTopDrawer';
import { makeDrawerId } from './helpers/makeDrawerId';

export type GetDrawerParams<Props extends object> = 
  (a: Props) => DrawerIdentity

type HOCType<Props extends object> = 
  (a: () => Promise<{ default: React.ComponentType<Omit<Props, keyof DrawerIdentity>> }>) => React.ComponentType<Props>;

type Loader = (dispatch: AppDispatch) => Promise<void>;

type AsDrawerParams<Props extends object> = {
  getDrawerParams: GetDrawerParams<Props>,
  loader?: Loader,
  drawerLoader?: JSX.Element | false,
};

export default function asDrawer<Props extends Partial<DrawerIdentity>>({
  getDrawerParams,
  // loader,
  drawerLoader,
}: AsDrawerParams<Props>): HOCType<Props> {
  return function (LazyTarget) {
    const TargetComponent = React.lazy(LazyTarget);

    return React.memo(function Wrapper(props: Props) {
      // const dispatch = useAppDispatch();
      const { id, extraId } = getDrawerParams(props);
      const drawerId = makeDrawerId(id, extraId);

      const active = useAppSelector((state) => {
        return isTopDrawer(state.drawers.stack, drawerId);
      });

      // const promiseLoader = React.useMemo(() => {
      //   if (!active || !loader) {
      //     return null;
      //   }

      //   return loader(dispatch);
      // }, [active, dispatch]);

      const { 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id: omitIdKey, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        extraId: omitextraId, 
        ...rest 
      } = props;

      if (!active) {
        return null;
      }

      const fallbackComponent = drawerLoader 
        ? drawerLoader 
        : drawerLoader === false 
          ? null 
          : <DrawerLoader />;

      return (
        <Suspense fallback={fallbackComponent}>
          {/** @ts-ignore-error **/}
          <TargetComponent {...rest} />
          {/* {promiseLoader && <SuspenseLoader loader={promiseLoader} />} */}
        </Suspense>
      );
    });
  };
}
