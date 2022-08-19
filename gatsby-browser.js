import React from 'react';
import { MainContextProvider } from './src/components/MainContex';
// highlight-start
export const wrapRootElement = ({ element }) => (  
  <MainContextProvider>{element}</MainContextProvider>
);
// highlight-end
