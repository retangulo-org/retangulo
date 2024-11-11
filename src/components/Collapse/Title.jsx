import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'lucide-react';

Title.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

export default function Title({ children, isOpen, setIsOpen }) {
  return (
    <button
      className={`${
        isOpen ? 'bg-neutral-300 dark:bg-neutral-700' : ''
      } w-full h-12 relative flex felx-row justify-between items-center hover:bg-neutral-300 dark:hover:bg-neutral-700 text-text font-semibold rounded-lg`}
      onClick={() => setIsOpen(!isOpen)}>
      <span className="absolute left-4">{isOpen ? <ChevronUp /> : <ChevronDown />}</span>
      <span className="mx-auto">{children}</span>
    </button>
  );
}
