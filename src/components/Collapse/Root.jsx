import { useState, createContext } from 'react';

export const RootContext = createContext(undefined);

export default function Root({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RootContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="w-full glass rounded-md text-wrap break-all font-mono">{children}</div>
    </RootContext.Provider>
  );
}
