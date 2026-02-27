import { useParams } from 'react-router-dom';
import { posts } from '../../scripts/postsLoader';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Meta from '../../components/Meta';

const mdxComponents = {
  a: ({ children, ...props }) => (
    <a className="text-primary hover:underline" {...props}>
      {children}
    </a>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-2xl font-bold mt-6 mb-3" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-xl font-bold mt-4 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-4 leading-relaxed" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }) => (
    <ul className="list-disc ml-6 mb-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal ml-6 mb-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="mb-2" {...props}>
      {children}
    </li>
  ),
  strong: ({ children, ...props }) => (
    <strong className="text-neutral-300 font-extrabold" {...props}>
      {children}
    </strong>
  ),
  img: ({ children, ...props }) => (
    <img className="mb-4 rounded-md text-center mx-auto" {...props}>
      {children}
    </img>
  ),
  code: ({ children, ...props }) => (
    <code className="bg-gray-100 px-1 py-0.5 rounded text-sm" {...props}>
      {children}
    </code>
  ),
};

export default function BlogPost() {
  const navigate = useNavigate();

  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) return <p>Post não encontrado.</p>;

  const Component = post.component;

  return (
    <Meta
      title={`${post.title} — Gerador de Cálculos Matemáticos — Retangulo.org`}
      canonical={`https://retangulo.org/blog/${slug}`}
      desc={post.desc}>
      <div className="mx-auto flex flex-col gap-8">
        <div>
          <Button className="!w-auto" variant="outline" onClick={() => navigate('/blog')}>
            <ArrowLeft /> Voltar
          </Button>
        </div>
        <div>
          <h1>{post.title}</h1>
          <div className="flex flex-row gap-2">
            <p>{post.date}</p>
            <p>•</p>
            <p>{post.autor}</p>
          </div>
        </div>
        <div>
          <Component components={mdxComponents} />
        </div>
      </div>
    </Meta>
  );
}
