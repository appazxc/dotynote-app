import { Box, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { MdOutlineDone } from 'react-icons/md';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Button } from 'shared/components/ui/button';
import { useColorModeValue } from 'shared/components/ui/color-mode';
import { DotsIcon } from 'shared/components/ui/icons';
import { OperationWrapper } from 'shared/modules/noteTab/components/Operations/OperationWrapper';
import { useAppDispatch } from 'shared/store/hooks';
import { stopOperation } from 'shared/store/slices/appSlice';

type Props = {
  title: React.ReactNode,
  description?: string,
  options?: { label: string, onClick: () => void, selected?: boolean }[],
  confirmText?: string,
  isLoading?: boolean,
  onConfirm?: () => void,
  onClose?: () => void,
};

export const Operation = React.memo((props: Props) => {
  const {
    title,
    description,
    options, 
    confirmText,
    isLoading,
    onClose,
    onConfirm,
  } = props;
  const dispatch = useAppDispatch();
  const descriptionColor = useColorModeValue('gray.500', 'gray.400');

  const handleClose = () => {
    dispatch(stopOperation());
    onClose?.();
  };

  return (
    <OperationWrapper onClose={handleClose}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          {typeof title === 'string' ? <Text fontWeight="bold" fontSize="sm">{title}</Text> : title}
          <Text fontSize="sm" color={descriptionColor}>{description}</Text>
        </Box>
        <Box display="flex" gap="2">
          {options && (
            <Menu placement="top-end">
              <MenuTrigger>
                <IconButton
                  size="sm"
                  aria-label=""
                  variant="plain"
                  display="inline-flex"
                  iconSize="auto"
                >
                  <DotsIcon size="18" />
                </IconButton> 
              </MenuTrigger>
              <MenuList>
                {options.map((option) => (
                  <MenuItem
                    key={option.label}
                    label={(
                      <Box display="flex" justifyContent="space-between">
                        {option.label} {option.selected ? <MdOutlineDone /> : undefined}
                      </Box>
                    )}
                    onClick={option.onClick}
                  />
                ))}
              </MenuList>
            </Menu>
          )}
          
          {onConfirm && (
            <Button
              colorScheme="brand"
              size="sm"
              aria-label=""
              loading={isLoading}
              onClick={onConfirm}
            >
              {confirmText || 'Confirm'}
            </Button>
          )}
        </Box>
      </Box>
    </OperationWrapper>
  );
});
