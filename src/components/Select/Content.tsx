export default function Content({ value, option }: { value: string; option: string }) {
  return <option value={value}>{option}</option>;
}
