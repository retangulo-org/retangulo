import { useParams } from 'react-router-dom';
import MDXWrapper from '../../components/MDXWrapper';
import { posts } from '../../scripts/postsLoader';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

export default function BlogPost() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <p>Post não encontrado.</p>;

  const Component = post.component;

  return (
    <div className="mx-auto p-4 flex flex-col gap-8">
      <div>
        <Button className="!w-auto" variant="outline" onClick={() => navigate(`/${currentLang}/blog`)}>
          <ArrowLeft /> Voltar
        </Button>
      </div>
      <div>
        <h1>{post.title}</h1>
        <p>{post.date}</p>
      </div>
      <div>
        <MDXWrapper>
          <Component />
        </MDXWrapper>
      </div>
    </div>
  );
}
