import { ChevronDown } from 'lucide-react';

export default function Root({ children, value, onChange }) {
  return (
    <div className="w-full relative flex flex-row justify-center items-center hover:shadow-md">
      <ChevronDown className="absolute right-4 text-textAlt pointer-events-none" />
      <select
        className="appearance-none actionDefault w-full h-10 rounded-sm cursor-pointer font-semibold text-center select-none"
        value={value}
        onChange={onChange}>
        {children}
      </select>
    </div>
  );
}
