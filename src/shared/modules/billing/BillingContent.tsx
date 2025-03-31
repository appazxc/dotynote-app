import { Box, Stack, Heading, Text, SimpleGrid, Button, HStack, Badge, Icon, Progress } from '@chakra-ui/react';
import React from 'react';
import { FiCreditCard, FiStar } from 'react-icons/fi';

type Plan = {
  title: string;
  code: string;
  credits: number;
  doty: number;
  price: number;
};

const currentPlan = {
  code: 'starter-monthly',
  credits: {
    total: 1000,
    used: 600,
  },
  doty: 0,
};

const availablePlans: Plan[] = [
  {
    title: 'Standard',
    code: 'standard-monthly',
    credits: 100000,
    doty: 1000,
    price: 10,
  },
  {
    title: 'Custom',
    code: 'custom-2-monthly',
    credits: 200000,
    doty: 1000,
    price: 20,
  },
];

const CurrentPlan = ({ isFreePlan }: { isFreePlan: boolean }) => (
  <Box
    bg="gray.50"
    p={8}
    borderRadius="2xl"
  >
    <Stack gap={6}>
      <HStack justify="space-between" align="flex-start">
        <Stack gap={1}>
          <Heading size="lg">
            {isFreePlan ? 'Starter' : 'Standard'} Plan
          </Heading>
          <Text color="gray.600">
            {isFreePlan ? 'Free tier' : 'Active subscription'}
          </Text>
        </Stack>
        {!isFreePlan && (
          <Badge
            colorScheme="green"
            fontSize="md"
            py={1}
            px={3}
            borderRadius="full"
          >
            Active
          </Badge>
        )}
      </HStack>

      <Stack gap={4}>
        <Box>
          <HStack justify="space-between" mb={2}>
            <Text fontWeight="medium">Credits Usage</Text>
            <Text color="gray.600">
              {currentPlan.credits.used} of {currentPlan.credits.total}
            </Text>
          </HStack>
          <Progress.Root 
            value={(currentPlan.credits.used / currentPlan.credits.total) * 100}
            size="sm"
            colorScheme={isFreePlan ? 'orange' : 'blue'}
          >
            <Progress.Track>
              <Progress.Range />
            </Progress.Track>
          </Progress.Root>
        </Box>
      </Stack>

      {/* Resource usage details */}
      {!isFreePlan && (
        <SimpleGrid columns={[1, 2, 3]} gap={6}>
          <Box
            bg="white"
            p={6}
            borderRadius="xl"
          >
            <Text color="gray.600" mb={2}>Notes</Text>
            <Text fontSize="xl" fontWeight="bold">1,000 credits</Text>
          </Box>
          <Box
            bg="white"
            p={6}
            borderRadius="xl"
          >
            <Text color="gray.600" mb={2}>Images</Text>
            <Text fontSize="xl" fontWeight="bold">20,000 credits</Text>
          </Box>
          <Box
            bg="white"
            p={6}
            borderRadius="xl"
          >
            <Text color="gray.600" mb={2}>Files</Text>
            <Text fontSize="xl" fontWeight="bold">4,000 credits</Text>
          </Box>
        </SimpleGrid>
      )}
    </Stack>
  </Box>
);

const AvailablePlans = () => (
  <Box mt={4}>
    <Text color="gray.600" mb={4}>
      Upgrade to get more credits
    </Text>
    <SimpleGrid columns={[1, null, 2]} gap={6}>
      {availablePlans.map((plan) => (
        <Box 
          key={plan.code}
          bg="white" 
          p={6} 
          borderRadius="xl" 
          borderWidth={1}
          borderColor="gray.200"
        >
          <HStack mb={4}>
            <Icon as={FiStar} color="blue.500" />
            <Heading size="md">{plan.title}</Heading>
            {plan.code === 'standard-monthly' && (
              <Badge colorScheme="blue" fontSize="sm">
                Popular
              </Badge>
            )}
          </HStack>
          
          <Stack gap={3}>
            <Text fontSize="2xl" fontWeight="bold">
              ${plan.price}
              <Text
                as="span"
                fontSize="md"
                color="gray.600"
                fontWeight="normal"
              >
                /month
              </Text>
            </Text>
            
            <Text>• {plan.credits.toLocaleString()} credits</Text>
            <Text>• {plan.doty} doty</Text>
            
            <Button 
              mt={2}
              size="lg"
              w="full"
              colorScheme={plan.code === 'standard-monthly' ? 'blue' : 'gray'}
              variant={plan.code === 'standard-monthly' ? 'solid' : 'outline'}
            >
              <HStack>
                <FiCreditCard />
                <Text>Choose plan</Text>
              </HStack>
            </Button>
          </Stack>
        </Box>
      ))}
    </SimpleGrid>
  </Box>
);

export const BillingContent = React.memo(() => {
  const isFreePlan = currentPlan.code === 'starter-monthly';

  return (
    <Stack
      gap={8}
      maxW="1200px"
      mx="auto"
      px={4}
    >
      <CurrentPlan isFreePlan={isFreePlan} />
      {isFreePlan && <AvailablePlans />}
    </Stack>
  );
});
