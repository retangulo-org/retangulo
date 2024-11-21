export default function Radio({ label, value, checked, onChange }) {
  return (
    <label className="flex flex-row gap-4 text-text select-none">
      <input type="radio" value={value} checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
