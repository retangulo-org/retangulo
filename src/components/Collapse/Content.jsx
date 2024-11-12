import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RootContext } from './Root';

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default function Content({ children, className }) {
  const { isOpen } = useContext(RootContext);
  return <>{isOpen && <div className={`${className} p-4`}>{children}</div>}</>;
}
