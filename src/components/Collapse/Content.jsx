import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { RootContext } from './Root';

Content.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default function Content({ children, className }) {
  const { isOpen } = useContext(RootContext);
  return ( 
    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? 'block opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0'}`}>
      <div className={`${className} p-4`}>
        {children}
      </div>
    </div>
  )
}
