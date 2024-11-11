import React from 'react';

export default function InputCalc({ onChange, value, placeholder, autoFocus = undefined, color, required }) {
  return (
    <div className="w-full">
      <input
        className={`w-full h-16 border-b-[12px] bg-neutral-200 dark:bg-neutral-800 px-4 py-2 text-neutral-950 dark:text-neutral-100 rounded-md text-center font-bold text-2xl hover:ring-2 hover:ring-neutral-500 outline-0
          ${color === 'green' ? 'border-b-green-500' : ''}
          ${color === 'red' ? 'border-b-red-500' : ''}
          ${color === '' ? 'border-b-neutral-500' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type="number"
        inputMode="numeric"
        autoFocus={autoFocus}
        required={required}
      />
    </div>
  );
}
