import React from "react";

export const InputCalc = ({ onChange, value, className }) => {
  return (
    <input
      className={
        className
          ? className
          : "w-full h-16 border-2 border-gray-400 px-4 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg text-center font-bold"
      }
      value={value}
      onChange={onChange}
      type="number"
      inputMode="numeric"
      autoFocus={true}
    />
  );
};

export const InputSizeCalc = ({ onChange, value, className }) => {
  return (
    <div className="relative mt-4 w-full">
      <input
        // className="w-full h-20 rounded-lg border-4 text-center text-xl"
        className={
          className
            ? className
            : "w-full h-16 border-2 border-gray-400 px-4 py-2 bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg text-center font-bold"
        }
        value={value}
        onChange={onChange}
        type="number"
        inputMode="numeric"
        maxLength={10}
        minLength={1}
        required
      />
      <span className="absolute -top-3 left-4 bg-white dark:bg-black px-1 text-gray-500 dark:text-white border-2 border-gray-400 ring-2 ring-blue-500 text-sm rounded-lg">
        Valor máximo
      </span>
    </div>
  );
};
