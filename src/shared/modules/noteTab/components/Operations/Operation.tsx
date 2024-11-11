import { Box, Button, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdOutlineDone } from 'react-icons/md';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { useColorModeValue } from 'shared/components/ui/color-mode';
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
              <MenuTrigger
                as={IconButton}
                size="sm"
                icon={<BsThreeDotsVertical size="18" />}
                aria-label=""
                variant="unstyled"
                display="inline-flex"
              />
              <MenuList>
                {options.map((option) => (
                  <MenuItem
                    key={option.label}
                    rightIcon={option.selected ? <MdOutlineDone /> : undefined}
                    label={option.label}
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
              isLoading={isLoading}
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
