import React from 'react';
import PropTypes from 'prop-types';

Content.propTypes = {
  children: PropTypes.node.isRequired,
  isOpen: PropTypes.bool,
  className: PropTypes.string,
};

export default function Content({ children, isOpen, className }) {
  return <>{isOpen && <div className={`${className} p-4`}>{children}</div>}</>;
}
