import { Logo } from '../assets/Logo';

export default function Footer() {
  return (
    <footer className="w-full px-6 py-12 flex justify-center items-center text-white">
      <div className="w-full sm:max-w-2xl flex flex-col justify-center items-center gap-8">
        <Logo className="w-48 h-auto fill-neutral-950 dark:fill-neutral-100" />
        <div className="flex flex-row gap-4">
          <span>
            <a
              href="http://github.com/Retangulo-org"
              className="hover:underline text-neutral-950 dark:text-neutral-100"
              target="_blank">
              Github
            </a>
          </span>
          <span>
            <a
              href="mailto:contato@retangulo.org"
              className="hover:underline text-neutral-950 dark:text-neutral-100"
              target="_blank">
              Contato
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
