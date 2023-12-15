import React, { Suspense } from 'react';

import { SuspenseLoader } from 'shared/components/SuspenseLoader';
import { AppDispatch } from 'shared/store';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { ModalIdentity } from 'shared/types/modal';

import { ModalLoader } from './ModalLoader';
import { isTopModal } from './util/isTopModal';
import { makeModalId } from './util/makeModalId';

export type GetModalParamsType<Props extends object> = 
  (a: Props) => ModalIdentity

type HOCType<Props extends object> = 
  (a: () => Promise<{ default: React.ComponentType<Omit<Props, keyof ModalIdentity>> }>) => React.ComponentType<Props>;

type Loader = (dispatch: AppDispatch) => Promise<void>;

type AsModalParams<Props extends object> = {
  getModalParams: GetModalParamsType<Props>,
  loader?: Loader,
  modalLoader?: JSX.Element | false,
};

export default function asModal<Props extends Partial<ModalIdentity>>({
  getModalParams,
  loader,
  modalLoader,
}: AsModalParams<Props>): HOCType<Props> {
  return function (LazyTarget) {
    const TargetComponent = React.lazy(LazyTarget);

    return React.memo(function Wrapper(props: Props) {
      const dispatch = useAppDispatch();
      const { id, modalKey } = getModalParams(props);
      const modalId = makeModalId(id, modalKey);

      const active = useAppSelector((state) => {
        return isTopModal(state.modals.stack, modalId);
      });

      const promiseLoader = React.useMemo(() => {
        if (!active || !loader) {
          return null;
        }

        return loader(dispatch);
      }, [active, dispatch]);

      const { 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        id: omitIdKey, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        modalKey: omitModalKey, 
        ...rest 
      } = props;

      if (!active) {
        return null;
      }

      const fallbackComponent = modalLoader 
        ? modalLoader 
        : modalLoader === false 
          ? null 
          : <ModalLoader />;

      return (
        <Suspense fallback={fallbackComponent}>
          {/** @ts-ignore-error **/}
          <TargetComponent {...rest} />
          {promiseLoader && <SuspenseLoader loader={promiseLoader} />}
        </Suspense>
      );
    });
  };
}
