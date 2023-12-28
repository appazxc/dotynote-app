import React from 'react';

import { Box, Text, Button, Card, CardBody, CardHeader, Container, SimpleGrid, Heading, Input, CardFooter } from '@chakra-ui/react';
import { BsPersonVideo3 } from "react-icons/bs";
import { GoFile } from "react-icons/go";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoImageOutline } from "react-icons/io5";
import { LuVideo } from "react-icons/lu";
import { LuListTodo } from "react-icons/lu";
import { MdOutlineDraw } from "react-icons/md";
import { MdOndemandVideo } from "react-icons/md";
import { PiFeather } from "react-icons/pi";
import { PiFileAudioFill } from "react-icons/pi";
import { PiMusicNotes } from "react-icons/pi";
import { SlNotebook } from "react-icons/sl";
import { VscRecord } from "react-icons/vsc";
import { CiBoxList } from "react-icons/ci";
import { tabNames } from 'shared/modules/space/constants/tabNames';
import { buildTabUrl } from 'shared/modules/space/util/buildTabUrl';
import { PiVideo } from "react-icons/pi";
import { TabLayout } from 'desktop/modules/space/components/TabLayout';

export const HomeTabContent = () => {
  const cards = [
    {
      icon: <SlNotebook size="35" />,
      title: 'Text',
      to: '/',
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
  ];

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
              {cards.map((card) => {
                return (
                  <Card key={card.title}>
                    <CardHeader>
                      {card.icon}
                    </CardHeader>
                    <CardBody
                      pb="0"
                      display="flex"
                      alignItems="flex-end"
                    >
                      <Text fontWeight="500" fontSize="lg">{card.title}</Text>
                    </CardBody>
                    <CardFooter
                      px="5"
                      pt="0"
                      pb="0"
                      h="6"
                    >
                      <Text fontSize="sm" color="gray.400">
                        {card.description}
                      </Text>
                    </CardFooter>
                  </Card>
                );
              })}
            </SimpleGrid>
          </Box>
        </Box>
      </Container>
    </TabLayout>
  );
};

export default HomeTabContent;