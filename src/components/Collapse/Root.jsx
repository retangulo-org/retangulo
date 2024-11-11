import React, { useState } from 'react';
import PropTypes from 'prop-types';

Root.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Root({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const childrenWithProps = React.Children.map(children, (child) => React.cloneElement(child, { isOpen, setIsOpen }));

  return <div className="w-full bg-foreground rounded-lg">{childrenWithProps}</div>;
}
