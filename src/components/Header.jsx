import { useState, useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { LogoTipo } from '../assets/LogoTipo';
import { AlignJustify, X, House, Settings, BookText } from 'lucide-react';
import { Desktop, Mobile } from './ui/Responsive';
import Button from './ui/Button';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  const Link = ({ link, children }) => {
    return (
      <NavLink
        to={link}
        end
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={({ isActive }) =>
          // TODO: Concertar as cores
          `${
            isActive ? '!actionDefault hover:text-neutral-950 cursor-default' : '!text-neutral-100 hover:bg-background'
          } w-full py-2 px-4 rounded-sm hover:no-underline flex flex-row gap-2 font-semibold`
        }>
        {children}
      </NavLink>
    );
  };

  function Links() {
    return (
      <>
        <Link link={`/${currentLang}`}>
          <House />
          {t('bHome')}
        </Link>
        <Link link={`/${currentLang}/blog`}>
          <BookText />
          Blog
        </Link>
        <Link link={`/${currentLang}/options`}>
          <Settings />
          {t('bOptions')}
        </Link>
      </>
    );
  }

  function MobileMenu() {
    return (
      <div className="w-full flex flex-wrap items-center justify-between mx-auto">
        <button onClick={() => navigate(`/${currentLang}`)} className="flex items-center rtl:space-x-reverse">
          <span className="sr-only">Logo do site</span>
          <LogoTipo className="w-20 h-auto fill-neutral-100" />
        </button>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className={`${isMenuOpen && 'bg-background'} inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg hover:bg-background text-neutral-100`}>
          <span className="sr-only">Abrir menu</span>
          {isMenuOpen ? <X className="w-12 h-12" /> : <AlignJustify className="w-12 h-12" />}
        </button>
        {isMenuOpen && (
          <div className="overflow-hidden w-full">
            <div className="font-medium mt-4 w-full flex items-center flex-col space-y-4 select-none">
              <Links />
            </div>
          </div>
        )}
      </div>
    );
  }

  function PcMenu() {
    return (
      <div className="w-full flex flex-wrap items-center justify-between mx-auto">
        <button onClick={() => navigate(`/${currentLang}`)} className="flex items-center rtl:space-x-reverse">
          <span className="sr-only">Logo do site</span>
          <LogoTipo className="w-20 h-auto fill-neutral-100" />
        </button>
        <div className="w-auto">
          <div className="font-medium w-full flex flex-row items-center justify-between gap-4 select-none">
            <Links />
          </div>
        </div>
      </div>
    );
  }

  function SwitchToBrowserLang() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const { lang } = useParams();
    const [visible, setVisible] = useState(() => localStorage.getItem('switchLangVisible') !== 'false');

    const SUPPORTED_LANGS = ['pt', 'en', 'es'];

    const languageSwitchMessages = {
      pt: 'Mudar o idioma para {suggestedLang}?',
      en: 'Switch language to {suggestedLang}?',
      es: '¿Cambiar idioma a {suggestedLang}?',
    };

    // nomes completos dos idiomas
    const LANG_FULL_NAMES = {
      pt: { pt: 'Português', en: 'Portuguese', es: 'Portugués' },
      en: { pt: 'Inglês', en: 'English', es: 'Inglés' },
      es: { pt: 'Espanhol', en: 'Spanish', es: 'Español' },
    };

    useEffect(() => {
      localStorage.setItem('switchLangVisible', visible);
    }, [visible]);

    const navLangRaw = navigator.language.split('-')[0];
    const browserLang = SUPPORTED_LANGS.includes(navLangRaw) ? navLangRaw : 'en';

    if (!visible || lang === browserLang) return null;

    const handleClick = () => {
      i18n.changeLanguage(browserLang).catch(() => {});
      navigate(`/${browserLang}`, { replace: true });
      setVisible(false);
    };

    // define mensagem no idioma que vai ser mudado
    const messageTemplate = languageSwitchMessages[browserLang] || languageSwitchMessages.pt;
    const message = messageTemplate
      .replace('{lang}', LANG_FULL_NAMES[navLangRaw]?.[browserLang] || navLangRaw)
      .replace('{suggestedLang}', LANG_FULL_NAMES[browserLang][browserLang]);

    return (
      <div className="flex mb-4">
        <button
          className="w-full flex flex-row justify-start items-center gap-2 py-2 px-4 bg-primary text-text rounded-l-md"
          onClick={handleClick}>
          {message}
        </button>
        <Button className="rounded-l-none" variant="default" size="icon" name="close" onClick={() => setVisible(false)}>
          <X />
        </Button>
      </div>
    );
  }

  return (
    <header className="bg-foreground p-4">
      <SwitchToBrowserLang />
      <Desktop>
        <PcMenu />
      </Desktop>
      <Mobile>
        <MobileMenu />
      </Mobile>
    </header>
  );
}
