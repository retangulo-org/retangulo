export default function Title({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`mb-4 ${className}`}>{children}</h2>;
}
