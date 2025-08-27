import { Box, Textarea, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { z } from 'zod';

import { api } from 'shared/api';
import { useAppForm } from 'shared/components/Form';
import { handleFormApiErrors } from 'shared/components/Form/util';
import { Button } from 'shared/components/ui/button';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from 'shared/components/ui/dialog';
import { Select } from 'shared/components/ui/select';
import { toaster } from 'shared/components/ui/toaster';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { useAppDispatch } from 'shared/store/hooks';

export type Props = {}

type FeedbackType = 'general' | 'bug' | 'improvement';

const feedbackTypes = [
  {
    value: 'general' as const,
    label: 'General',
  },
  {
    value: 'bug_report' as const,
    label: 'Report bug',
  },
  {
    value: 'feature_request' as const,
    label: 'Feature request',
  },
  {
    value: 'other' as const,
    label: 'Other',
  },
];

const FeedbackModal = (_props: Props) => {
  const dispatch = useAppDispatch();

  const { AppForm, AppField, handleSubmit, Subscribe, FormError } = useAppForm({
    defaultValues: {
      text: '',
      type: 'general',
    },
    validators: {
      onSubmit: z.object({
        text: z.string().min(10, 'Feedback must be at least 10 characters long'),
        type: z.enum(feedbackTypes.map((type) => type.value) as [string, ...string[]]),
      }),
    },
    onSubmit: async ({ value: { text, type }, formApi }) => {
      try {
        await api.post('/users/feedback', { 
          text,
          type,
        });
        toaster.create({
          description: 'Feedback sent successfully',
        });
        dispatch(hideModal());

      } catch (error) {
        handleFormApiErrors(formApi, error);
      }
    },
  });
  
  return (
    <DialogRoot
      defaultOpen
      placement="center"
      size="md"
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogBackdrop />
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <AppForm>
            <DialogHeader>
              <DialogTitle>Share your feedback</DialogTitle>
            </DialogHeader>
            <DialogCloseTrigger />
            <DialogBody>
              <VStack gap={4} align="stretch">
                <Box>
                  <AppField 
                    name="type" 
                    children={(field) => {
                      return (
                        <Select
                          label="Topic"
                          placeholder="Select feedback category"
                          value={[field.state.value]}
                          options={feedbackTypes}
                          size="md"
                          portalled={false}
                          onChange={(value) => field.handleChange(value[0] as FeedbackType)}
                        />
                      );
                    }}
                  />
                </Box>

                {/* Feedback Text */}
                <Box>
                  <AppField
                    name="text"
                    children={(field) => {
                      return (
                        <field.Field>
                          <Textarea
                            placeholder="Your feedback..."
                            rows={4}
                            resize="none"
                            onChange={(e) => field.handleChange(e.target.value)}
                          />
                        </field.Field>
                      );
                    }}
                  />
                </Box>
                <FormError />
              </VStack>
            </DialogBody>
            <DialogFooter>
              <HStack gap={3} w="full">
                <Button
                  variant="ghost"
                  flex={1}
                  onClick={() => dispatch(hideModal())}
                >
                  Cancel
                </Button>
                <Subscribe
                  selector={(state) => [state.isSubmitting]}
                  children={([isSubmitting]) => {
                    return (
                      <Button
                        type="submit"
                        loading={isSubmitting}
                        flex={1}
                        colorScheme="blue"
                      >
                        Send
                      </Button>
                    );
                  }}
                />
              </HStack>
            </DialogFooter>
          </AppForm>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default FeedbackModal;