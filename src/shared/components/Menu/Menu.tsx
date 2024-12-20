import { Box } from '@chakra-ui/react';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  OffsetOptions,
  Placement,
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
import React from 'react';

import { MenuContext } from './MenuContext';

type Props = React.PropsWithChildren<{
  isContextMenu?: boolean,
  contextMousePosition?: boolean,
  placement?: Placement,
  offsetOptions?: OffsetOptions,
  enabled?: boolean,
  inPortal?: boolean,
}>

export const Menu = React.memo((props: Props) => {
  const { 
    enabled = true,
    inPortal = true,
    contextMousePosition = true,
    isContextMenu,
    placement,
    children, 
    offsetOptions = { mainAxis: 5, alignmentAxis: 4 },
  } = props;
  const [menuTrigger, menuList] = React.Children.toArray(children);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const listItemsRef = React.useRef<Array<HTMLButtonElement | null>>([]);
  const listContentRef = React.useRef(
    React.Children.map(children, (child) =>
      React.isValidElement(child) ? child.props.label : null
    ) as Array<string | null>
  );

  const handleOpenChange = React.useCallback((open) => {
    if (!enabled) {
      return;
    }

    setIsOpen(open);
  }, [enabled]);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: handleOpenChange,
    middleware: [
      offset(offsetOptions),
      flip({
        fallbackPlacements: ['right-start', 'left-start'],
      }),
      shift({ padding: 10 }),
    ],
    placement: placement || 'bottom-start',
    strategy: 'absolute' || 'fixed',
    whileElementsMounted: autoUpdate,
  });

  const role = useRole(context, { role: 'menu' });
  const dismiss = useDismiss(context, {
    outsidePressEvent: 'mousedown',
  });
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

  function onContextMenu(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();
    event.stopPropagation();

    if (contextMousePosition) {
      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: event.clientX,
            y: event.clientY,
            top: event.clientY,
            right: event.clientX,
            bottom: event.clientY,
            left: event.clientX,
          };
        },
      });
    }

    handleOpenChange(true);
  }

  const triggerProps = isContextMenu ? {
    ref: refs.setReference,
    ...getReferenceProps({
      onContextMenu,
      onClick: (event) => {
        React.isValidElement(menuTrigger) && menuTrigger.props.onClick?.(event);
      },
      onPointerDown: (event) => {
        if (event.button !== 2 && React.isValidElement(menuTrigger)) {
          menuTrigger.props.onMouseDown?.(event);
        }
      },
    }),
  } : {
    // onClick: () => {
    //   setIsOpen(true);
    // },
    ref: refs.setReference,
    ...getReferenceProps({
      // onPointerDown: () => {
      //   React.isValidElement(menuTrigger) && menuTrigger.props.onPointerDown?.();
      // },
    }),
  };

  const content = isOpen && (
    <FloatingOverlay lockScroll>
      <FloatingFocusManager
        context={context}
        initialFocus={refs.floating}
        returnFocus={false}
      >
        <Box
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          outline="transparent"
        >
          {menuList}
        </Box>
      </FloatingFocusManager>
    </FloatingOverlay>
  );

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
        {inPortal ? (
          <FloatingPortal>
            {content}
          </FloatingPortal>
        ) : content}
      </MenuContext.Provider>

    </>
  );
});
