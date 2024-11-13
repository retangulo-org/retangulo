import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export const RootContext = createContext(undefined);

export default function Root({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <RootContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="w-full bg-foreground rounded-lg">{children}</div>
    </RootContext.Provider>
  );
}
