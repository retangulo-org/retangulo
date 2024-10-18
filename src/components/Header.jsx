import { LogoTipo } from '../assets/LogoTipo';

export default function Header() {
  return (
    <header className="h-16 p-4 flex justify-center items-center text-white font-bold text-3xl">
      <LogoTipo className="w-20 h-auto fill-neutral-950 dark:fill-neutral-100" />
    </header>
  );
}
