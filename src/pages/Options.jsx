import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowUpRight, Trash2 } from 'lucide-react';
import { Select } from '../components/Select';
import Button from '../components/ui/Button';
import Meta from '../components/Meta';
import { useTranslation } from 'react-i18next';

export default function Options() {
  const [keyType, setKeyType] = useState(() => {
    return localStorage.getItem('keyType') || 'number';
  });

  useEffect(() => {
    localStorage.setItem('keyType', keyType);
  }, [keyType]);

  const navigate = useNavigate();
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language.split('-')[0];

  const changeLanguage = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);

    const parts = location.pathname.split('/').slice(2);
    const newPath = `/${newLang}/${parts.join('/')}`;
    navigate(newPath, { replace: true });
  };

  const links = [
    { id: 1, title: t('linkContact'), url: 'mailto:contato@retangulo.org' },
    { id: 2, title: 'Preview', url: 'https://dev.retangulo.org/' },
    { id: 3, title: 'Github', url: 'https://github.com/retangulo-org' },
  ];

  return (
    <Meta title={t('titleOptions')} canonical="https://retangulo.org/options" desc={t('desc')}>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full divide-foreground dark:divide-neutral-800 divide-y-2">
          <div className="w-full py-2 flex flex-col ">
            <div className="w-full pb-1 flex flex-row justify-between items-center">
              <h3 className="!mb-0 !text-text">{t('tLang')}</h3>
              <Select.Root
                value={currentLang}
                className="!w-auto"
                childrenClassName="!text-left !pl-4 !w-36"
                onChange={changeLanguage}>
                {[
                  ['Português', 'pt'],
                  ['English', 'en'],
                ].map(([lang_title, language]) => (
                  <Select.Content value={language} option={lang_title} />
                ))}
              </Select.Root>
            </div>
          </div>
          <div className="w-full py-2 flex flex-col ">
            <div className="w-full pb-1 flex flex-row justify-between items-center">
              <div className="mb-0 flex flex-col">
                <h3 className="!text-text">
                  {t('tKeyboard')} <span className="text-sm">({t('tKeyboardAlt')})</span>
                </h3>
                <h6>{t('tKeyboardDesc')}</h6>
              </div>
              <Select.Root
                value={keyType}
                className="!w-auto"
                childrenClassName="!text-left !pl-4 !w-36"
                onChange={(event) => {
                  setKeyType(event.target.value);
                }}>
                {[
                  [t('bNormal'), 'text'],
                  [t('bNumeric'), 'number'],
                ].map(([key_title, key]) => (
                  <Select.Content value={key} option={key_title} />
                ))}
              </Select.Root>
            </div>
          </div>
          <div className="w-full py-2 flex flex-row justify-between items-center">
            <h3 className="mb-0 !text-text">{t('tCache')}</h3>
            <Button
              size="icon"
              variant="danger"
              name="Limpar cache"
              onClick={() => {
                localStorage.clear();
                window.location.href = window.location.href;
              }}>
              <Trash2 />
            </Button>
          </div>
        </div>
        <h2 className="mt-8">Links</h2>
        <div className="w-full divide-foreground divide-y-2">
          {links.map((link) => (
            <div key={link.id} className="w-full flex flex-row justify-between items-center">
              <a
                className="w-full py-2 flex flex-row justify-between items-center hover:underline underline-offset-4 text-text"
                href={link.url}
                target="_blank">
                <h3 className="!text-text">{link.title}</h3>
                <ArrowUpRight className="w-8 h-8 text-text" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </Meta>
  );
}
