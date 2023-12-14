import React, { Suspense } from 'react';

import { SuspenseLoader } from 'shared/components/SuspenseLoader';
import { AppDispatch } from 'shared/store';
import { useAppDispatch, useAppSelector } from 'shared/store/hooks';
import { ModalIdentity } from 'shared/types/modal';

import { isTopModal } from './util/isTopModal';
import { makeModalId } from './util/makeModalId';

export type GetModalParamsType<Props extends Partial<ModalIdentity>> = 
  (a: Props, dispatch: AppDispatch) => ModalIdentity & { loader?: () => Promise<void> };

type HOCType<Props extends object> = 
  (a: React.ComponentType<Omit<Props, keyof ModalIdentity>>) => React.ComponentType<Props>;

export default function asModal<Props extends Partial<ModalIdentity>>(
  getModalParams: GetModalParamsType<Props>,
  Loader?: JSX.Element
): HOCType<Props> {
  return function (TargetComponent) {
    return React.memo(function Wrapper(props: Props) {
      const dispatch = useAppDispatch();
      const { id, modalKey, loader } = getModalParams(props, dispatch);
      const modalId = makeModalId(id, modalKey);

      const active = useAppSelector((state) => {
        return isTopModal(state.modals.stack, modalId);
      });

      const promiseLoader = React.useMemo(() => {
        if (!active) {
          return null;
        }

        if (loader) {
          return loader();
        }

        return null;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [modalId, active]);

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

      const fallbackComponent = Loader ? Loader : null;

      return (
        <Suspense fallback={fallbackComponent}>
          <TargetComponent {...rest} />
          {promiseLoader && <SuspenseLoader loader={promiseLoader} />}
        </Suspense>
      );
    });
  };
}
