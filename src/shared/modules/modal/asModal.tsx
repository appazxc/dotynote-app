import React, { Suspense } from 'react';

import { SuspenseLoader } from 'shared/components/SuspenseLoader';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { ModalIdentity } from 'shared/types/modal';
import { AppDispatch } from 'shared/types/store';

import { ModalLoader } from './ModalLoader';
import { makeModalId } from './util/makeModalId';

export type GetModalParamsType<Props extends object> = 
  (a: Props) => ModalIdentity

type HOCType<Props extends object> = 
  (a: () => Promise<{ default: React.ComponentType<Omit<Props, 'extraId'>> }>) => React.ComponentType<Props>;

type Loader<T> = (props: T, dispatch: AppDispatch) => Promise<void>;

type AsModalParams<Props extends object> = {
  getModalParams: GetModalParamsType<Props>;
  loader?: Loader<Props>;
  modalLoader?: React.ReactElement | false;
};

export default function asModal<Props extends {}>({
  getModalParams,
  loader,
  modalLoader,
}: AsModalParams<Props>): HOCType<Props> {
  return function (LazyTarget) {
    const TargetComponent = React.lazy(LazyTarget);

    return React.memo(function Wrapper(props: Props) {
      const dispatch = useAppDispatch();
      const { id, extraId } = getModalParams(props);
      const modalId = makeModalId(id, extraId);
      const modalsStack = useAppSelector((state) => state.modals.stack);
      const active = modalsStack.includes(modalId);
      const hidden = active && modalsStack[modalsStack.length - 1] !== modalId;

      const promiseLoader = React.useMemo(() => {
        if (!active || !loader) {
          return null;
        }

        return loader(props, dispatch);
      }, [active, dispatch, props]);

      if (!active) {
        return null;
      }

      const fallbackComponent = modalLoader 
        ? modalLoader 
        : modalLoader === false 
          ? null 
          : <ModalLoader />;

      const targetProps = {
        ...props,
        isOpen: !hidden,
      };

      return (
        <Suspense fallback={fallbackComponent}>
          {promiseLoader && <SuspenseLoader loader={promiseLoader} />}
          <TargetComponent {...targetProps} />
        </Suspense>
      );
    });
  };
}
