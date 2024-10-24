import { Logo } from '../assets/Logo';
import Button from '../components/Play/Button';

export default function Footer() {
  return (
    <footer className="w-full px-6 py-12 flex justify-center items-center text-white">
      <div className="w-full sm:max-w-2xl flex flex-col justify-center items-center gap-8">
        <Logo className="w-48 h-auto fill-neutral-950 dark:fill-neutral-100" />
        <div className="flex flex-row justify-center flex-wrap gap-4">
          <span>
            <a href="https://github.com/retangulo-org" target="_blank">
              Github
            </a>
          </span>
          <span>
            <a href="mailto:contato@retangulo.org" target="_blank">
              Contato
            </a>
          </span>
          <span>
            <a href="https://dev.retangulo.org" target="_blank">
              Preview
            </a>
          </span>
          <span>
            <a href="https://github.com/orgs/Retangulo-org/projects/1/views/1" target="_blank">
              To-do
            </a>
          </span>
          <span>
            <a href="https://mysaas.crom.live/saas/19" target="_blank">
              MySaas
            </a>
          </span>
        </div>
        <Button
          onClick={() => {
            localStorage.clear();
            window.location.href = window.location.href;
          }}
          text="Limpar cache"
        />
      </div>
    </footer>
  );
}
