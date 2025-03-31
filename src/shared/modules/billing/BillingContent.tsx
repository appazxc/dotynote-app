import { Box, Stack, Heading, Text, SimpleGrid, Button, HStack, Badge, Progress, ButtonGroup } from '@chakra-ui/react';
import React from 'react';

type BillingPeriod = 'yearly' | 'monthly';

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

const BillingPeriodSwitch = ({ 
  period, 
  onChange, 
}: { 
  period: BillingPeriod; 
  onChange: (period: BillingPeriod) => void;
}) => (
  <HStack gap={4}>
    <ButtonGroup
      size="xs"
      bg="gray.100"
      p={1}
      borderRadius="full"
      gap={0}
    >
      <Button
        variant="ghost"
        bg={period === 'yearly' ? 'white' : 'transparent'}
        borderRadius="full"
        px={6}
        onClick={() => onChange('yearly')}
      >
        Yearly
      </Button>
      <Button
        variant="ghost"
        bg={period === 'monthly' ? 'white' : 'transparent'}
        borderRadius="full"
        px={6}
        onClick={() => onChange('monthly')}
      >
        Monthly
      </Button>
    </ButtonGroup>
    <Text color="blue.500">Save 33% on a yearly subscription</Text>
  </HStack>
);

const AvailablePlans = () => {
  const [selectedCredits, setSelectedCredits] = React.useState('100000');
  const [billingPeriod, setBillingPeriod] = React.useState<BillingPeriod>('yearly');

  const getAdjustedPrice = (basePrice: number) => {
    if (billingPeriod === 'yearly') {
      return Math.round(basePrice * 0.67 * 12);
    }
    return basePrice;
  };

  return (
    <Box mt={4}>
      <Stack gap={8}>
        <BillingPeriodSwitch 
          period={billingPeriod} 
          onChange={setBillingPeriod} 
        />

        <SimpleGrid
          columns={[1, null, 2]}
          gap={6}
          w="full"
        >
          {availablePlans.map((plan) => (
            <Box 
              key={plan.code}
              bg="gray.50" 
              p={8} 
              borderRadius="2xl" 
              borderWidth={1}
              borderColor="gray.100"
            >
              <Stack gap={6}>
                <HStack justify="space-between">
                  <Stack gap={4} direction="row">
                    <Heading size="lg">{plan.title}</Heading>
                    {plan.code === 'standard-monthly' && (
                      <Badge
                        colorPalette="blue"
                        size="sm"
                        py={1}
                        px={3}
                        borderRadius="full"
                      >
                      Popular
                      </Badge>
                    )}
                  </Stack>
                </HStack>

                <Stack
                  gap={2}
                  direction="row"
                  alignItems="center"
                >
                  <Text fontSize="4xl" fontWeight="black">
                    ${getAdjustedPrice(plan.price).toLocaleString()}
                  </Text>
                  <Box display="flex" flexDirection="column"> 
                    <Text
                      as="span"
                      fontSize="xs"
                      color="gray.600"
                    >
                      per month
                    </Text>
                    <Text color="gray.600" fontSize="xs">
                      billed {billingPeriod}
                    </Text>
                  </Box>
                </Stack>

                {plan.code === 'custom-2-monthly' ? (
                  <select
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid var(--chakra-colors-gray-200)',
                      padding: '12px',
                      borderRadius: '12px',
                      width: '100%',
                      fontSize: '16px',
                    }}
                    value={selectedCredits}
                    onChange={(e) => setSelectedCredits(e.target.value)}
                  >
                    <option value="100000">100,000 credits</option>
                    <option value="200000">200,000 credits</option>
                    <option value="500000">500,000 credits</option>
                  </select>
                ) : null}

                <Button 
                  size="lg"
                  w="full"
                  h="56px"
                  bg={'black'}
                  color={'white'}
                  borderWidth={1}
                  borderColor={'black'}
                  borderRadius="full"
                  _hover={{
                    bg: 'gray.900',
                  }}
                >
                  Upgrade
                </Button>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

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
