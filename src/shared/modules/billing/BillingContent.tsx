import { Badge, Box, Button, ButtonGroup, Heading, HStack, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FaArrowUpRightDots } from 'react-icons/fa6';
import { TbChartDots2 } from 'react-icons/tb';

import { useStripeCheckout } from 'shared/api/hooks/useStripeCheckout';
import { useStripePortal } from 'shared/api/hooks/useStripePortal';
import { DoneIcon } from 'shared/components/ui/icons';
import { Select } from 'shared/components/ui/select';
import { InfoTip } from 'shared/components/ui/toggle-tip';
import { SubscriptionEntity } from 'shared/types/entities/SubscriptionEntity';
import { BillingPeriod, SubscriptionPlanEntity } from 'shared/types/entities/SubscriptionPlanEntity';
import { formatNumber } from 'shared/util/formatNumber';
import { invariant } from 'shared/util/invariant';

const creditsTipText = 'Credits are refreshed monthly and used to store and manage your notes.';

const getPlanPrefix = (plan: SubscriptionPlanEntity) => {
  return plan.code.split('-')[0];
};

const getIsStandardPlan = (plan: SubscriptionPlanEntity) => {
  return getPlanPrefix(plan) === 'standard';
};

const getIsFlexiblePlan = (plan: SubscriptionPlanEntity) => {
  return getPlanPrefix(plan) === 'flexible';
};

const getAdjustedPrice = (plan: SubscriptionPlanEntity) => {
  if (plan.interval === 'yearly') {
    return (plan.price / 12 / 100).toFixed(2);
  }
  return plan.price / 100;
};

type CurrentPlanProps = {
  isFreePlan: boolean;
  subscription: SubscriptionEntity;
}

const CurrentPlan = ({ subscription, isFreePlan }: CurrentPlanProps) => {
  const { mutateAsync } = useStripePortal();
  const plan = subscription.plan;
  invariant(plan, 'No plan found');
  
  const isPastDue = subscription.status === 'past_due';
  const description = isFreePlan 
    ? 'Active' 
    : isPastDue ? 'Payment failed. Limits changed to free plan' : 'Active subscription';
  
  const isStripePlan = !!plan.stripeProductId;

  const handleManageSubscription = React.useCallback(async () => {
    const { url } = await mutateAsync();
    window.location.href = url;
  }, [mutateAsync]);

  return (
    <Box
      bg="gray.50"
      p={8}
      borderRadius="2xl"
    >
      <Stack gap={6}>
        <HStack justify="space-between" align="flex-start">
          <Stack gap={1}>
            <Heading size="lg">
              {plan.name} Plan
            </Heading>
            <Text color="gray.600">
              {description}
            </Text>
          </Stack>
          {!isFreePlan && isStripePlan && (
            <Button variant="subtle" onClick={handleManageSubscription}>
              Manage subscription
            </Button>
          )}
        </HStack>

        {/* <Stack gap={4}>
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
      </Stack> */}
      </Stack>
    </Box>
  );
};

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
    <Text as="span" color="blue.500">Save 16% <Text as="span" color="gray.600">on a yearly subscription</Text></Text>
  </HStack>
);

const AvailablePlans = ({ freePlan, plans }: { freePlan: SubscriptionPlanEntity, plans: SubscriptionPlanEntity[] }) => {
  const [billingPeriod, setBillingPeriod] = React.useState<BillingPeriod>('yearly');
  const { mutateAsync: checkout, isPending } = useStripeCheckout();

  const standardPlan = React.useMemo(() => {
    return plans.find((plan) => plan.interval === billingPeriod && getIsStandardPlan(plan));
  }, [plans, billingPeriod]);

  const flexiblePlans = React.useMemo(() => {
    return plans.filter((plan) => plan.interval === billingPeriod && getIsFlexiblePlan(plan));
  }, [plans, billingPeriod]);

  const [currentFlexiblePlanId, setCurrentFlexiblePlanId] = 
    React.useState<string | null>(flexiblePlans[0]?.id ?? null);  

  const currentFlexiblePlan = React.useMemo(() => {
    return flexiblePlans.find((plan) => plan.id === currentFlexiblePlanId);
  }, [flexiblePlans, currentFlexiblePlanId]);

  const handleBillingPeriodChange = React.useCallback((period: BillingPeriod) => {
    const flexiblePlan = plans.find((plan) => plan.interval === period && getIsFlexiblePlan(plan));
    setBillingPeriod(period);
    setCurrentFlexiblePlanId(flexiblePlan?.id ?? null);
  }, [setBillingPeriod, plans]);

  const handleSubmit = React.useCallback((planId: string) => async () => {
    const { url } = await checkout({ planId, cancelUrl: window.location.href, successUrl: window.location.href });
    window.location.href = url;
  }, [checkout]);

  return (
    <Box mt={4}>
      <Stack gap={8}>
        <BillingPeriodSwitch 
          period={billingPeriod} 
          onChange={handleBillingPeriodChange} 
        />

        <SimpleGrid
          columns={{ base: 1, lg: 2 }}
          gap={6}
          w="full"
        >
          {standardPlan && (
            <Box 
              bg="gray.50" 
              p={8} 
              borderRadius="2xl" 
              borderWidth={1}
              borderColor="gray.100"
            >
              <Stack gap={6}>
                <HStack justify="space-between">
                  <Stack
                    gap={2}
                    direction="row"
                    alignItems="center"
                  >
                    <TbChartDots2 size="22px" />
                    <Heading size="2xl">{standardPlan.name}</Heading>
                    <Box display="flex" alignItems="center">
                      <Badge
                        colorPalette="blue"
                        variant="solid"
                        size="sm"
                        borderRadius="full"
                      >
                        Popular
                      </Badge>
                    </Box>
                  </Stack>
                </HStack>

                <Stack
                  gap={2}
                  direction="row"
                  alignItems="center"
                >
                  <Text fontSize="4xl" fontWeight="black">
                    ${getAdjustedPrice(standardPlan)}
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

                <Button 
                  size="lg"
                  w="full"
                  h="44px"
                  bg={'black'}
                  color={'white'}
                  borderWidth={1}
                  borderColor={'black'}
                  borderRadius="full"
                  _hover={{
                    bg: 'gray.900',
                  }}
                  loading={isPending}
                  onClick={handleSubmit(standardPlan.id)}
                >
                  Upgrade
                </Button>
                 
                <Stack>
                  <Stack
                    direction="row"
                    gap="2"
                    alignItems="center"
                  >
                    <DoneIcon /><Text color="gray.fg" fontSize="sm">Everything in {freePlan.name}, plus:</Text>
                  </Stack>
                  <Stack
                    direction="row"
                    gap="2"
                    alignItems="center"
                  >
                    <DoneIcon />
                    <Text color="gray.fg" fontSize="sm">{formatNumber(standardPlan.credits)} credits</Text>
                    <InfoTip content={creditsTipText} contentWidth="200px" />
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          )}

          {currentFlexiblePlan && (
            <Box 
              bg="gray.50" 
              p={8} 
              borderRadius="2xl" 
              borderWidth={1}
              borderColor="gray.100"
            >
              <Stack gap={6}>
                <HStack justify="space-between">
                  <Stack
                    gap={2}
                    direction="row"
                    alignItems="center"
                  >
                    <FaArrowUpRightDots size="22px" />
                    <Heading size="2xl">{currentFlexiblePlan.name}</Heading>
                  </Stack>
                </HStack>

                <Stack
                  gap={2}
                  direction="row"
                  alignItems="center"
                >
                  <Text fontSize="4xl" fontWeight="black">
                    ${getAdjustedPrice(currentFlexiblePlan)}
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

                <Button 
                  size="lg"
                  w="full"
                  h="44px"
                  bg={'black'}
                  color={'white'}
                  borderWidth={1}
                  borderColor={'black'}
                  borderRadius="full"
                  _hover={{
                    bg: 'gray.900',
                  }}
                  loading={isPending}
                  onClick={handleSubmit(currentFlexiblePlan.id)}
                >
                  Upgrade
                </Button>

                <Stack>
                  <Stack
                    direction="row"
                    gap="2"
                    alignItems="center"
                  >
                    <DoneIcon /><Text color="gray.fg" fontSize="sm">Everything in {freePlan.name}, plus:</Text>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    gap="0"
                  >
                    <Stack
                      direction="row"
                      gap="2"
                      alignItems="center"
                    >
                      <DoneIcon />
                      <Select
                        variant="plain"
                        contentWidth="180px"
                        value={[currentFlexiblePlanId]}
                        options={flexiblePlans.map((plan) => ({
                          label: `${formatNumber(plan.credits)} credits`,
                          value: plan.id,
                        }))}
                        onChange={([planId]) => setCurrentFlexiblePlanId(String(planId))}
                      />
                    </Stack>
                    <InfoTip content={creditsTipText} contentWidth="200px" />
                  </Stack>

                </Stack>
              </Stack>
            </Box>
          )}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

type Props = {
  currentSubscription: SubscriptionEntity | null;
  plans: SubscriptionPlanEntity[];
}

export const BillingContent = React.memo(({ currentSubscription, plans }: Props) => {
  const freePlan = plans.find((plan) => plan.price === 0);
  
  invariant(currentSubscription?.plan, 'No current subscription found');
  invariant(freePlan, 'No free plan found');

  const isFreePlan = currentSubscription.plan.price === 0;

  return (
    <Stack
      gap={8}
      maxW="1200px"
      mx="auto"
      px={4}
    >
      <CurrentPlan
        subscription={currentSubscription}
        isFreePlan={isFreePlan}
      />
      {isFreePlan && <AvailablePlans freePlan={freePlan} plans={plans} />}
    </Stack>
  );
});
