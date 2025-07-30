import type { ReactNode } from 'react';

export interface Options {
  typescript: boolean;
  tailwind: boolean;
  eslint: boolean;
  prettier: boolean;
  husky: boolean;
  reduxToolkitQuery: boolean;
  featureSlicedDesign: boolean;
}

export interface Option {
  id: keyof Options;
  name: string;
  description: string;
  icon: ReactNode;
  disabled?: boolean;
}
