import { Stack } from '@chakra-ui/react';
import React from 'react';
import { z } from 'zod';

import { getDirtyFields, useAppForm } from 'shared/components/Form';
import { Button } from 'shared/components/ui/button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from 'shared/components/ui/dialog';
import { Select } from 'shared/components/ui/select';
import { useIsMobile } from 'shared/hooks/useIsMobile';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { DirectionSelect } from 'shared/modules/noteSettingsTab/DirectionSelect';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteOrderBy } from 'shared/types/common';
import { NoteFiltersEntity } from 'shared/types/entities/NoteFiltersEntity';

type NoteFilters = Omit<NoteFiltersEntity, 'id'>;

export type Props = {
  filters: NoteFilters;
  onSubmit: (values: Partial<NoteFilters>) => Promise<void>;
}

const schema = z.object({
  orderBy: z.enum(['createdAt', 'updatedAt']),
  sort: z.enum(['asc', 'desc']),
  hasVideo: z.boolean().nullable(),
  hasAudio: z.boolean().nullable(),
  hasImage: z.boolean().nullable(),
  hasFile: z.boolean().nullable(),
  hasRecord: z.boolean().nullable(),
});

const NoteFiltersModal = (props: Props) => {
  const { onSubmit, filters } = props;
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();
  
  const orderByOptions = [
    {
      label: 'Date created',
      value: 'createdAt',
    },
    {
      label: 'Date updated',
      value: 'updatedAt',
    },
  ];

  const { Field, AppForm, Subscribe, handleSubmit } = useAppForm({ 
    defaultValues: filters,
    validators: {
      onSubmit: schema,
    },
    onSubmit: async ({ value, formApi }) => {
      const dirtyValues = getDirtyFields(value, formApi);

      await onSubmit(dirtyValues);
      
      dispatch(hideModal());
    },
  });

  return (
    <DialogRoot
      open
      placement="center"
      size={isMobile ? 'full' : 'md'}
      onOpenChange={() => dispatch(hideModal())}
    >
      <DialogContent backdrop>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleSubmit();
          }}
        >
          <AppForm>
            <DialogHeader>
              <DialogTitle>Filters</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <Stack
                direction="row"
                gap="3"
                alignItems="flex-end"
              >
                <Field
                  name="orderBy"
                  children={(field) => {
                    return (
                      <Select
                        size="sm"
                        label="Order by"
                        value={[field.state.value]}
                        w="200px"
                        options={orderByOptions}
                        portalled={false}
                        onChange={([value]) => field.handleChange(value as NoteOrderBy)}
                      />
                    );
                  }}
                />
                <Field
                  name="sort"
                  children={(field) => {
                    return (
                      <DirectionSelect value={field.state.value} onChange={field.handleChange} />
                    );
                  }}
                />
              </Stack>
              
            </DialogBody>
            <DialogFooter>
              <Button variant="subtle" onClick={() => dispatch(hideModal())}>Cancel</Button>

              <Subscribe
                selector={(state) => [state.isSubmitting]}
                children={([isSubmitting]) => {
                  return (
                    <Button
                      type="submit"
                      loading={isSubmitting}
                    >
                      Save
                    </Button>
                  );
                }}
              />
            </DialogFooter>
          </AppForm>
        </form>
      </DialogContent>
    </DialogRoot>
  );
};

export default NoteFiltersModal;