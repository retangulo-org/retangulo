import React, { useContext } from 'react';
import { RootContext } from './Root';
import { ChevronUp } from 'lucide-react';

export default function Toggle({ children }) {
  const { isOpen, setIsOpen } = useContext(RootContext);
  
  return (
    <button
      className={`${
        isOpen && 'bg-neutral-300 dark:bg-neutral-700'
      } w-full h-10 relative flex felx-row justify-between items-center text-text font-semibold rounded-md`}
      onClick={() => setIsOpen(!isOpen)}>
      <span className={`${isOpen ? 'rotate-0' : 'rotate-180'} transition-all duration-300 absolute left-4`}>
        <ChevronUp />
      </span>
      <span className="mx-auto select-none">{children}</span>
    </button>
  );
}
