import { useState, createContext } from 'react';

export const RootContext = createContext<
  { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>> } | undefined
>(undefined);

export default function Root({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RootContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="w-full bg-foreground rounded-md text-wrap break-all font-mono">{children}</div>
    </RootContext.Provider>
  );
}
