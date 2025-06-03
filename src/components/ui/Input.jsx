export default function Input({ onChange, value, placeholder, type, inputMode, id, name }) {
  return (
    <input
      className="w-full h-10 border-2 bg-neutral-150 dark:bg-neutral-800 border-border px-4 py-2 text-black dark:text-white focus:outline-none rounded-md text-center font-bold text-lg hover:ring-2 hover:ring-blue-500 hover:shadow-md"
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type ? type : 'number'}
      inputMode={inputMode ? inputMode : 'numeric'}
    />
  );
}
