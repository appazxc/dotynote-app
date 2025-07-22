import {
  Box,
  Heading,
  HStack,
  RadioCard,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';

import { api } from 'shared/api';
import { Button } from 'shared/components/ui/button';
import { RadioCardItem } from 'shared/components/ui/radio-card';
import { REGIONS, type RegionValue } from 'shared/constants/regions';
import { useBrowserNavigate } from 'shared/hooks/useBrowserNavigate';

export const OnboardingContent = React.memo(() => {
  const [selectedRegion, setSelectedRegion] = useState<RegionValue | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { mutateAsync } = useMutation({
    mutationKey: ['onboarding'],
    mutationFn: (data: { region: string }) => {
      return api.post('/users/onboarding', data);
    },
  });
  const navigate = useBrowserNavigate();

  const handleRegionChange = (value: RegionValue) => {
    setSelectedRegion(value);
    setError(null);
  };

  const handleSubmit = async () => {
    if (!selectedRegion) {
      setError('Please select a region to continue');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await mutateAsync({ region: selectedRegion });
      // Navigate to main app after successful region save
      navigate({ to: '/app' });
    } catch (err) {
      setError('Failed to save region. Please try again.');
      console.error('Failed to update user region:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box 
      maxW="md" 
      mx="auto" 
      p={8}
      minH="100vh"
      display="flex"
      alignItems="center"
    >
      <VStack gap={8} w="full">
        {/* Welcome Section */}
        <VStack textAlign="center">
          <Heading size="lg" fontWeight="semibold">
            Welcome to Dotynote!
          </Heading>
          
          <Text
            color="fg.muted"
            fontSize="md"
            lineHeight="1.6"
          >
            Your smart note-taking companion. 
            Store notes, images, videos, files, and more.
          </Text>
        </VStack>

        {/* Region Selection */}
        <VStack gap={4} w="full">
          <Box>
            <Heading size="md" alignSelf="flex-start">
            Choose your region
            </Heading>
          
            <Text
              color="fg.muted"
              fontSize="sm"
              alignSelf="flex-start"
            >
              Select your region for optimal performance and minimal latency. 
              Choose wisely - region changes will be available in future updates.
            </Text>
          </Box>

          <RadioCard.Root
            value={selectedRegion || ''}
            w="full"
            onValueChange={(details) => handleRegionChange(details.value as RegionValue)}
          >
            <VStack gap={3} w="full">
              {REGIONS.map((region) => (
                <RadioCardItem
                  key={region.value}
                  value={region.value}
                  label={(
                    <HStack>
                      <Text fontSize="lg">{region.flag}</Text>
                      <Text fontWeight="medium">{region.label}</Text>
                    </HStack>
                  )}
                  description={region.description}
                  w="full"
                />
              ))}
            </VStack>
          </RadioCard.Root>
        </VStack>

        {/* Error Message */}
        {error && (
          <Text
            color="red.500"
            fontSize="sm"
            textAlign="center"
          >
            {error}
          </Text>
        )}

        {/* Continue Button */}
        <Button
          loading={isSubmitting}
          loadingText="Saving..."
          disabled={!selectedRegion}
          size="lg"
          w="full"
          colorScheme="blue"
          onClick={handleSubmit}
        >
          Continue
        </Button>
      </VStack>
    </Box>
  );
});
