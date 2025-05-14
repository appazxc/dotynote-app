import { Heading, IconButton, Stack } from '@chakra-ui/react';
import React from 'react';
import { LuMinus } from 'react-icons/lu';
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

// Reusable card component for image filter
const FilterCard = ({
  title,
  label,
  description,
  checked,
  onCheckedChange,
  onReset,
}: {
  title: string;
  label: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onReset: () => void;
}) => (
  <Stack gap="1">
    <Stack
      gap="3"
      flexDirection="row"
      alignItems="center"
    >
      <Heading
        as="h3"
        size="xs"
        fontWeight="bold"
        color="fg.subtle"
      >
        {title}
      </Heading>
      <IconButton
        aria-label={`Remove ${title.toLowerCase()} filter`}
        variant="subtle"
        size="2xs"
        h="18px"
        tabIndex={0}
        title="Remove filter"
        onClick={onReset}
      >
        <LuMinus />
      </IconButton>
    </Stack>
     
    <SwitchSection
      label={label}
      description={description}
      checked={checked}
      switchSize="lg"
      onCheckedChange={({ checked }) => onCheckedChange(checked)}
    />
  </Stack>
);

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

  const filterFields = React.useMemo(() => [
    {
      name: 'hasImage' as const,
      title: 'Images',
      menuText: 'Add image filter',
      label: 'Show notes with images',
      description: 'Only display notes that contain at least one image.',
    },
    {
      name: 'hasVideo' as const,
      title: 'Videos',
      menuText: 'Add video filter',
      label: 'Show notes with videos',
      description: 'Only display notes that contain at least one video.',
    },
    {
      name: 'hasAudio' as const,
      title: 'Audio',
      menuText: 'Add audio filter',
      label: 'Show notes with audio',
      description: 'Only display notes that contain at least one audio.',
    },
    {
      name: 'hasFile' as const,
      title: 'Files',
      menuText: 'Add file filter',
      label: 'Show notes with files',
      description: 'Only display notes that contain at least one file.',
    },
  ], []);

  const menuSelector = React.useMemo(() => {
    const filters = filterFields.map(filterField => filterField.name);

    return (state: any) => {
      return filters.map(name => state.values[name]);
    };
  }, [filterFields]);

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
                selector={menuSelector}
                children={(fields) => {
                  const showFilterMenu = !!fields.some(field => field === null);

                  return showFilterMenu ? (
                    <Menu inPortal={false} placement="bottom-end">
                      <MenuTrigger>
                        <IconButton
                          size="xs"
                          variant="ghost"
                          iconSize="auto"
                        >
                          <PlusIcon size="24px" />
                        </IconButton>
                      </MenuTrigger>
                      <MenuList>
                        {filterFields.map((field) => {
                          return field !== null ? (
                            <MenuItem
                              key={field.name}
                              label={field.menuText}
                              onClick={() => {
                                setFieldValue(field.name, true);
                              }}
                            />
                          ) : null;
                        })}
                      </MenuList>
                    </Menu>
                  ) : null;
                }}
              />
                
            </DialogHeader>
            <DialogBody>
              <Stack gap="6">
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
                {filterFields.map(filterField => (
                  <Field
                    key={filterField.name}
                    name={filterField.name}
                    children={(field) => {
                      const hasImageFilter = field.state.value !== null;

                      if (!hasImageFilter) return null;

                      return (
                        <FilterCard
                          title={filterField.title}
                          label={filterField.label}
                          description={filterField.description}
                          checked={!!field.state.value}
                          onCheckedChange={field.handleChange}
                          onReset={() => field.handleChange(null)}
                        />
                      );
                    }}
                  />
                ))}
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