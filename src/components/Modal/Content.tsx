export default function Content({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`${className} flex flex-col mb-4`}>{children}</div>;
}
