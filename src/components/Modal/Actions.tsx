export default function Actions({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`flex flex-row justify-center items-center gap-4 ${className}`}>{children}</div>;
}
