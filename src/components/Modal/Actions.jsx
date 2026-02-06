export default function Actions({ children, className }) {
  return <div className={`flex flex-row justify-center items-center gap-4 ${className}`}>{children}</div>;
}
