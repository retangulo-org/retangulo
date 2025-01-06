import React from 'react';

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
      } h-10 flex flex-row justify-center items-center gap-2 rounded-sm font-semibold hover:shadow-md select-none`}>
      {children}
    </button>
  );
}
