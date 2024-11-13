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
  const theme = {
    light: 'bg-neutral-800 hover:bg-neutral-900 active:bg-neutral-950',
    dark: 'dark:bg-neutral-200 dark:hover:bg-neutral-300 dark:active:bg-neutral-400',
  };

  const variants = {
    default: `${theme.light} ${theme.dark} text-textAlt`,
    primary: 'text-neutral-100 bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
    success: 'text-neutral-100 bg-green-600 hover:bg-green-700 active:bg-green-800',
    danger: 'text-neutral-100 bg-red-600 hover:bg-red-700 active:bg-red-800',
    warning: 'text-neutral-100 bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800',
    outline:
      'text-neutral-950 dark:text-neutral-100 hover:bg-neutral-200 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700',
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`${className} ${variants[variant]} ${
        size === 'icon' ? 'p-2 w-12' : 'px-4 w-full'
      } h-12 flex flex-row justify-center items-center gap-2 rounded-sm font-semibold select-none`}>
      {children}
    </button>
  );
}
