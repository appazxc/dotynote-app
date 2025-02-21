import { HStack, IconButton, NumberInput } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { LuMinus, LuPlus } from 'react-icons/lu';

export interface StepperInputProps extends NumberInput.RootProps {
  label?: React.ReactNode;
}

export const StepperInput = forwardRef<HTMLDivElement, StepperInputProps>(
  function StepperInput(props, ref) {
    const { label, ...rest } = props;
    return (
      <NumberInput.Root
        {...rest}
        ref={ref}
        unstyled
      >
        {label && <NumberInput.Label>{label}</NumberInput.Label>}
        <HStack gap="2">
          <DecrementTrigger />
          <NumberInput.ValueText
            textAlign="center"
            fontSize="lg"
            minW="3ch"
          />
          <IncrementTrigger />
        </HStack>
      </NumberInput.Root>
    );
  }
);

const DecrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInput.DecrementTriggerProps
>(function DecrementTrigger(props, ref) {
  return (
    <NumberInput.DecrementTrigger
      {...props}
      ref={ref}
      asChild
    >
      <IconButton variant="outline" size="sm">
        <LuMinus />
      </IconButton>
    </NumberInput.DecrementTrigger>
  );
});

const IncrementTrigger = forwardRef<
  HTMLButtonElement,
  NumberInput.IncrementTriggerProps
>(function IncrementTrigger(props, ref) {
  return (
    <NumberInput.IncrementTrigger
      {...props}
      ref={ref}
      asChild
    >
      <IconButton variant="outline" size="sm">
        <LuPlus />
      </IconButton>
    </NumberInput.IncrementTrigger>
  );
});
