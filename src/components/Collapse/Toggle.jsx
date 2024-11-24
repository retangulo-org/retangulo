import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RootContext } from './Root';
import { ChevronDown, ChevronUp } from 'lucide-react';

Toggle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Toggle({ children }) {
  const { isOpen, setIsOpen } = useContext(RootContext);
  return (
    <button
      className={`${
        isOpen ? 'bg-neutral-300 dark:bg-neutral-700' : ''
      } w-full h-12 relative flex felx-row justify-between items-center text-text font-semibold rounded-lg`}
      onClick={() => setIsOpen(!isOpen)}>
      <span className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition-all duration-300 absolute left-4`}><ChevronUp /></span>
      <span className="mx-auto">{children}</span>
    </button>
  );
}
