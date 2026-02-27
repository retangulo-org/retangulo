import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const links = [
    { id: 1, title: 'Contato', url: 'mailto:contato@retangulo.org' },
    { id: 2, title: 'Preview', url: 'https://dev.retangulo.org/' },
    { id: 3, title: 'Backup', url: 'https://alt.retangulo.org/' },
    { id: 4, title: 'Github', url: 'https://github.com/retangulo-org' },
    { id: 5, title: 'Roadmap', url: 'https://github.com/orgs/retangulo-org/projects/1/views/1' },
  ];

  return (
    <footer className="mb-4">
      <div className="w-full flex flex-col gap-0 justify-between">
        <div className="flex flex-col divide-y-2 divide-foreground">
          {links.map((link) => (
            <div key={link.id} className="w-full ">
              <a
                className="w-full py-4 flex flex-row justify-between items-center hover:underline rounded-sm underline-offset-4 text-text"
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
