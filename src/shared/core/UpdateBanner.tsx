import { Box, Button, Text } from '@chakra-ui/react';
import { motion } from 'motion/react';
import React from 'react';
import { registerSW } from 'virtual:pwa-register';

import { createReactContext } from 'shared/util/createReactContext';

type Props = {};


export const UpdateBanner = React.memo((props: Props) => {
  const [updateAvailable, setUpdateAvailable] = React.useState(false);
  const updateSW = React.useRef(null);
  console.log('here' );
  React.useEffect(() => {
    updateSW.current = registerSW({
      onNeedRefresh() {
        setUpdateAvailable(true);
      },
      onOfflineReady() {
        console.log('Приложение готово к офлайн-работе');
      },
    });
  }, []);

  if (!updateAvailable) return null;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      exit={{ y: 100 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
      }}
    >
      <Box
        bg="blue.500"
        color="white"
        px={4}
        py={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        shadow="md"
      >
        <Text fontSize="sm">Доступно новое обновление!</Text>
        <Button
          size="sm"
          colorScheme="whiteAlpha"
          onClick={() => updateSW.current?.(true)}
        >
          Обновить
        </Button>
      </Box>
    </motion.div>
  );
});
