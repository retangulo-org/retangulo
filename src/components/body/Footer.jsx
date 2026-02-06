import { ArrowUpRight } from 'lucide-react';
import { LogoTipo } from '../../assets/LogoTipo';

export default function Footer() {
  const links = [
    { id: 1, title: 'Contato', url: 'mailto:contato@retangulo.org' },
    { id: 2, title: 'Preview', url: 'https://dev.retangulo.org/' },
    { id: 3, title: 'Backup', url: 'https://alt.retangulo.org/' },
    { id: 4, title: 'Github', url: 'https://github.com/retangulo-org' },
  ];

  return (
    <footer className="p-4 mb-4">
      <div className="w-full flex flex-col md:gap-0 gap-4 md:flex-row justify-between">
        <LogoTipo className="w-20 h-auto fill-neutral-100" />
        <div className="flex flex-col md:flex-row gap-0 md:gap-4">
          {links.map((link) => (
            <div key={link.id} className="w-full">
              <a
                className="w-full py-2 flex flex-row justify-between items-center hover:underline underline-offset-4 text-text"
                href={link.url}
                target="_blank">
                <h5 className="!text-text">{link.title}</h5>
                <ArrowUpRight className="w-8 h-8 text-text" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
