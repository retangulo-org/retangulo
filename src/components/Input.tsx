type Props = {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  placeholder?: string;
  type?: 'text' | 'number';
  inputMode?: 'text' | 'numeric' | 'decimal';
  id?: string;
  name?: string;
};

export default function Input({ onChange, value, placeholder, type, inputMode, id, name }: Props) {
  return (
    <input
      className="w-full h-10 border-2 bg-foreground border-border px-4 py-2 text-text focus:outline-none rounded-md text-center font-bold text-lg hover:ring-2 hover:ring-blue-500 hover:shadow-md"
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
