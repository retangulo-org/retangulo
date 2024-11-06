import React from 'react';

export default function Input({ onChange, value, placeholder, autoFocus, type }) {
  return (
    <div className="flex flex-col w-full">
      <input
        className="w-full h-16 border-2 bg-neutral-200 dark:bg-neutral-800 border-black/20 dark:border-white/20 px-4 py-2 text-black dark:text-white focus:outline-none rounded-md text-center font-bold text-2xl hover:ring-2 hover:ring-blue-500"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type ? type : 'number'}
        inputMode="numeric"
        autoFocus={autoFocus}
      />
    </div>
  );
}
