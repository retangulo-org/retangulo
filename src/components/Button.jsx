import React from 'react';
import PropTypes from 'prop-types';

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default function Button({ variant = 'default', size = undefined, children, onClick, className = undefined }) {
  const variants = {
    default: 'actionDefault',
    primary: 'actionPrimary',
    success: 'actionSuccess',
    danger: 'actionDanger',
    warning: 'actionWarning',
    outline: 'actionOutline',
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${className} ${variants[variant]} ${
        size === 'icon' ? 'p-2 w-12' : 'px-4 w-full'
      } h-12 flex flex-row justify-center items-center gap-2 rounded-sm font-semibold hover:shadow-md select-none`}>
      {children}
    </button>
  );
}
