import React from 'react';

export default function InputCalc({
  onChange,
  value,
  placeholder,
  autoFocus = undefined,
  color,
  required,
  type,
  inputMode,
  step
}) {
  return (
    <div className="w-full rounded-md hover:ring-2 hover:ring-neutral-500 hover:shadow-md">
      <input
        className={`w-full h-10 bg-neutral-200 dark:bg-neutral-800 text-neutral-950 dark:text-neutral-100 rounded-t-md text-center font-bold text-xl outline-0`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type ? type : 'number'}
        inputMode={inputMode ? inputMode : 'numeric'}
        autoFocus={autoFocus}
        required={required}
        step={step}
      />
      <div
        className={`
          ${color === 'green' ? 'bg-success' : ''}
          ${color === 'red' ? 'bg-danger' : ''}
          ${color === '' ? 'bg-neutral-500' : ''}
          w-full h-3 rounded-b-md
        `}></div>
    </div>
  );
}
