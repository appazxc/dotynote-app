import { render, RenderOptions } from '@testing-library/react';
import React from 'react';

import { Provider } from 'shared/components/ui/provider';

const AllProviders = ({ children }: { children?: React.ReactNode }) => (
  <Provider>{children}</Provider>
);

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export { customRender as render };
