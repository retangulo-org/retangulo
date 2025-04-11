import React, { createContext } from 'react';

export const RootContext = createContext(undefined);

export default function Root({ children }) {
  return (
    <RootContext.Provider>
      <div className="w-full bg-foreground rounded-md">{children}</div>
    </RootContext.Provider>
  );
}
