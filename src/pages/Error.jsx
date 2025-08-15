import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import Meta from '../components/Meta';
import { useTranslation } from 'react-i18next';

export default function ErrorPage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  return (
    <Meta title={t('errorTitle')} desc={t('desc')}>
      <div className="flex justify-center items-center w-full h-dvh">
        <div className="flex flex-col w-full justify-center items-center">
          <h1 className="text-7xl font-bold">{t('error')}</h1>
          <p className="mb-12">{t('tError')}</p>
          <Button variant="primary" size={'default'} onClick={() => navigate(`/${currentLang}`)}>
            {t('bError')}
          </Button>
        </div>
      </div>
    </Meta>
  );
}
