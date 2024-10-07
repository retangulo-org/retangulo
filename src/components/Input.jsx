import React from "react";

export const InputCalc = ({ onChange, value, className }) => {
  return (
    <input
      className={
        className
          ? className
          : "w-full h-16 border-2 border-black dark:border-white px-4 py-2 bg-transparent text-black dark:text-white focus:outline-none rounded-md text-center font-bold text-2xl"
      }
      value={value}
      onChange={onChange}
      placeholder="Resultado aqui..."
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
            : "w-full h-16 border-2 border-black dark:border-white px-4 py-2 bg-transparent text-black dark:text-white focus:outline-none rounded-lg text-center font-bold text-2xl"
        }
        value={value}
        onChange={onChange}
        type="number"
        inputMode="numeric"
        placeholder="Valor máximo"
        maxLength={10}
        minLength={1}
        required
      />
      <span className="absolute -top-2 left-5 bg-white dark:bg-black px-1 text-black dark:text-white  text-sm font-bold select-none">
        Valor máximo
      </span>
    </div>
  );
};
