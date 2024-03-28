import React from 'react';

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useRole,
  useTypeahead,
} from '@floating-ui/react';

import { MenuContext } from './MenuContext';

type Props = React.PropsWithChildren<{
  isContextMenu?: boolean,
}>

export const Menu = ({ isContextMenu, children }: Props) => {
  const [menuTrigger, menuList] = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const listItemsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
  const listContentRef = React.useRef(
    React.Children.map(children, (child) =>
      React.isValidElement(child) ? child.props.label : null
    ) as Array<string | null>
  );

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset({ mainAxis: 5, alignmentAxis: 4 }),
      flip({
        fallbackPlacements: ['left-start'],
      }),
      shift({ padding: 10 }),
    ],
    placement: 'bottom-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
  });

  const role = useRole(context, { role: 'menu' });
  const dismiss = useDismiss(context);
  const listNavigation = useListNavigation(context, {
    listRef: listItemsRef,
    onNavigate: setActiveIndex,
    activeIndex,
  });
  const typeahead = useTypeahead(context, {
    enabled: isOpen,
    listRef: listContentRef,
    onMatch: setActiveIndex,
    activeIndex,
  });
  const click = useClick(context);

  const interactions = React.useMemo(() => {
    const result = [role,
      dismiss,
      listNavigation,
      typeahead];

    if (!isContextMenu) {
      result.push(click);
    }

    return result;
  }, [
    isContextMenu,
    role,
    dismiss,
    listNavigation,
    typeahead,
    click,
  ]);

  const close = () => setIsOpen(false);

  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions(interactions);

  function onContextMenu(e: MouseEvent) {
    e.preventDefault();

    refs.setPositionReference({
      getBoundingClientRect() {
        return {
          width: 0,
          height: 0,
          x: e.clientX,
          y: e.clientY,
          top: e.clientY,
          right: e.clientX,
          bottom: e.clientY,
          left: e.clientX,
        };
      },
    });

    setIsOpen(true);
  }
  
  const triggerProps = isContextMenu ? {
    onContextMenu,
  } : {
    // onClick: () => {
    //   setIsOpen(true);
    // },
    ref: refs.setReference,
    ...getReferenceProps(),
  };

  return (
    <>
      {React.isValidElement(menuTrigger) && 
        React.cloneElement(
          menuTrigger,
          triggerProps
        )
      }
      <MenuContext.Provider
        value={{
          getItemProps,
          isOpen,
          close,
        }}
      >
        <FloatingPortal>
          {isOpen && (
            <FloatingOverlay lockScroll>
              <FloatingFocusManager context={context} initialFocus={refs.floating}>
                <div
                  ref={refs.setFloating}
                  style={floatingStyles}
                  {...getFloatingProps()}
                >
                  {menuList}
                </div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </FloatingPortal>
      </MenuContext.Provider>

    </>
  );
};
