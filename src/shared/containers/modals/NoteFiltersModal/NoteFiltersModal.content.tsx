import { IconButton, Stack } from '@chakra-ui/react';
import { z } from 'zod';

import { getDirtyFields, useAppForm } from 'shared/components/Form';
import { Menu, MenuItem, MenuList, MenuTrigger } from 'shared/components/Menu';
import { Button } from 'shared/components/ui/button';
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from 'shared/components/ui/dialog';
import { PlusIcon } from 'shared/components/ui/icons';
import { Select } from 'shared/components/ui/select';
import { SwitchSection } from 'shared/components/ui/switch-section';
import { useIsMobile } from 'shared/hooks/useIsMobile';
import { hideModal } from 'shared/modules/modal/modalSlice';
import { DirectionSelect } from 'shared/modules/noteSettingsTab/DirectionSelect';
import { useAppDispatch } from 'shared/store/hooks';
import { NoteOrderBy } from 'shared/types/common';
import { ApiNoteFiltersEntity } from 'shared/types/entities/NoteFiltersEntity';

type NoteFilters = Omit<ApiNoteFiltersEntity, 'id'>;

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

  const { 
    Field,
    AppForm,
    Subscribe,
    handleSubmit,
    setFieldValue,
  } = useAppForm({ 
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
            <DialogHeader
              alignItems="center"
              justifyContent="space-between"
              gap="2"
            >
              <DialogTitle>Filters</DialogTitle>
              <Subscribe
                selector={(state) => [state.values.hasImage, state.values.hasVideo]}
                children={(fields) => {
                  const hasImageFilter = fields[0] !== null;
                  const hasVideoFilter = fields[1] !== null;
                  const showFilterMenu = !hasImageFilter || !hasVideoFilter;

                  return showFilterMenu ? (
                    <Menu inPortal={false} placement="bottom-end">
                      <MenuTrigger>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          iconSize="auto"
                        >
                          <PlusIcon size="20px" />
                        </IconButton>
                      </MenuTrigger>
                      <MenuList>
                        {!hasImageFilter && (
                          <MenuItem
                            label="Add image filter"
                            onClick={() => {
                              setFieldValue('hasImage', true);
                            }}
                          />
                        )}
                        {!hasVideoFilter && (
                          <MenuItem
                            label="Add video filter"
                            onClick={() => {
                              setFieldValue('hasVideo', true);
                            }}
                          />
                        )}
                      </MenuList>
                    </Menu>
                  ) : null;
                }}
              />
                
            </DialogHeader>
            <DialogBody>
              <Stack gap="5">
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
                <Field
                  name="hasImage"
                  children={(field) => {
                    const hasImageFilter = field.state.value !== null;

                    return hasImageFilter ? (
                      <SwitchSection
                        label="Has image"
                        checked={!!field.state.value}
                        switchSize="md"
                        flexDirection="row-reverse"
                        w="fit-content"
                        onCheckedChange={({ checked }) => field.handleChange(checked)}
                      />
                    ) : null;
                  }}
                />
                <Field
                  name="hasVideo"
                  children={(field) => {
                    const hasVideoFilter = field.state.value !== null;

                    return hasVideoFilter ? (
                      <SwitchSection
                        label="Has video"
                        checked={!!field.state.value}
                        switchSize="md"
                        flexDirection="row-reverse"
                        w="fit-content"
                        onCheckedChange={({ checked }) => field.handleChange(checked)}
                      />
                    ) : null;
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