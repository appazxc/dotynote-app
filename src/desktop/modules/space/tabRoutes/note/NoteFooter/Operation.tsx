import React from 'react';

import { Box, Text, Button, IconButton } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { MdClose, MdOutlineDone } from 'react-icons/md';

import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
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
  
  const handleClose = () => {
    dispatch(stopOperation());
    onClose?.();
  };

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      p="2"
      borderRadius="md"
      border="2px solid"
      borderColor="gray.700"
      alignItems="stretch"
      flexDirection="column"
      display="flex"
      my="2"
      position="relative"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          {typeof title === 'string' ? <Text fontWeight="bold" fontSize="sm">{title}</Text>: title}
          <Text fontSize="sm" color="gray.500">{description}</Text>
        </Box>
        <Box
          display="flex"
          gap="2"
        >
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
                    onClick={option.onClick}
                    rightIcon={option.selected ? <MdOutlineDone /> : undefined}
                  >
                    {option.label}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          )}
          
          {onConfirm && (
            <Button
              colorScheme="brand"
              size="sm"
              aria-label=""
              onClick={onConfirm}
              isLoading={isLoading}
            >
              {confirmText || 'Confirm'}
            </Button>
          )}
          
        </Box>
      </Box>
      <IconButton
        icon={<MdClose />}
        onClick={handleClose}
        aria-label=""
        size="xs"
        colorScheme="brand"
        position="absolute"
        right="0"
        top="0"
        borderRadius="full"
        transform="translate(50%, -50%)"
      />
    </Box>
  );
});
