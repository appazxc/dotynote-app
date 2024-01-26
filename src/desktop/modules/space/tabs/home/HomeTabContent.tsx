import React from 'react';

import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Container,
  Heading,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { GoFile } from "react-icons/go";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoImageOutline } from "react-icons/io5";
import { PiFeather, PiFileAudioFill, PiMusicNotes, PiVideo } from "react-icons/pi";
import { SlNotebook } from "react-icons/sl";
import { VscRecord } from "react-icons/vsc";
import { useNavigate } from 'react-router';

import { modalIds } from 'shared/constants/modalIds';
import { CreateNoteModal } from 'shared/containers/modals/CreateNoteModal';
import { showModal } from 'shared/modules/modal/modalSlice';
import { tabRouteNames } from 'shared/modules/space/constants/tabRouteNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { useAppDispatch } from 'shared/store/hooks';

import { TabLayout } from 'desktop/modules/space/components/TabLayout';

export const HomeTabContent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateNote = React.useCallback((id: string) => {
    navigate(buildTabUrl({
      routeName: tabRouteNames.note,
      pathParams: {
        noteId: id,
      },
    }));
  }, [navigate]);

  const cards = React.useMemo(() => [
    {
      icon: <SlNotebook size="35" />,
      title: 'Text',
      onClick: () => {
        dispatch(showModal({ id: modalIds.createNote }));
      },
    },
    {
      icon: <IoImageOutline size="35" />,
      title: 'Image',
      to: '/',
      description: 'Under construction',
    },
    {
      icon: <GoFile size="35" />,
      title: 'File',
      to: '/',
      description: 'Under construction',
    },
    {
      icon: <PiFeather size="35" />,
      title: 'Excalidraw',
      to: '/',
      description: 'Under construction',
    },
    {
      icon: <HiOutlineVideoCamera size="35" />,
      title: 'Video',
      to: '/',
      description: 'Under construction',
    },
    {
      icon: <PiVideo size="35" />,
      title: 'Stream',
      to: '/',
      description: 'Under construction',
    },
    {
      icon: <PiMusicNotes size="35" />,
      title: 'Music',
      to: '/',
      description: 'Under construction',
    },
    {
      icon: <PiFileAudioFill size="35" />,
      title: 'Audio',
      to: '/',
      description: 'Under construction',
    },
    {
      icon: <VscRecord size="35" />,
      title: 'Record',
      to: '/',
      description: 'Under construction',
    },
  ], [dispatch]);

  return (
    <TabLayout>
      <Container>
        <Box py="10">
          <Box textAlign="center" mb="5">
          private / public
          </Box>
          <Input placeholder="Search" />
          <Box mt="10">
            <Heading size="lg" mb="6">
            Create note with:
            </Heading>
            <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
              {cards.map(({ title, icon, description, ...restProps }) => {
                return (
                  <Card
                    key={title}
                    {...restProps}
                    cursor="pointer"
                  >
                    <CardHeader>
                      {icon}
                    </CardHeader>
                    <CardBody
                      pb="0"
                      display="flex"
                      alignItems="flex-end"
                    >
                      <Text fontWeight="500" fontSize="lg">{title}</Text>
                    </CardBody>
                    <CardFooter
                      px="5"
                      pt="0"
                      pb="0"
                      h="6"
                    >
                      <Text fontSize="sm" color="gray.400">
                        {description}
                      </Text>
                    </CardFooter>
                  </Card>
                );
              })}
            </SimpleGrid>
          </Box>
        </Box>
      </Container>
      <CreateNoteModal onCreate={handleCreateNote} />
    </TabLayout>
  );
};

export default HomeTabContent;