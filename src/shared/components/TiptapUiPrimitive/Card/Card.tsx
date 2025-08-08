'use client';

import * as React from 'react';

import { cn } from 'shared/lib/tiptap-utils';
import 'shared/components/TiptapUiPrimitive/Card/Card.scss';

const Card = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('tiptap-card', className)}
        {...props}
      />
    );
  }
);

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('tiptap-card-header', className)}
      {...props}
    />
  );
});

const CardBody = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('tiptap-card-body', className)}
        {...props}
      />
    );
  }
);

const CardItemGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'> & {
    orientation?: 'horizontal' | 'vertical'
  }
>(({ className, orientation = 'vertical', ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-orientation={orientation}
      className={cn('tiptap-card-item-group', className)}
      {...props}
    />
  );
});

const CardGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('tiptap-card-group-label', className)}
      {...props}
    />
  );
});

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<'div'>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('tiptap-card-footer', className)}
      {...props}
    />
  );
});

export { Card, CardHeader, CardFooter, CardBody, CardItemGroup, CardGroupLabel };
