import { posts } from '../../scripts/postsLoader';
import { useNavigate } from 'react-router-dom';
import Meta from '../../components/Meta';

export default function BlogList() {
  const navigate = useNavigate();

  return (
    <Meta
      title="Blog — Gerador de Cálculos Matemáticos — Retangulo.org"
      canonical={'https://retangulo.org/blog'}
      desc="Resolva cálculos matemáticos aleatórios & melhore seu cálculo mental.">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="mb-8">Blog</h1>
        <ul className="space-y-4">
          {posts.map(({ slug, title, date, autor }) => (
            <li className="list-none" key={slug}>
              <button
                className="mb-3 text-left text-3xl font-bold text-neutral-200 hover:underline hover:text-neutral-300"
                title={title}
                name={title}
                onClick={() => navigate(`/blog/${slug}`)}>
                {title}
              </button>
              <div className="flex flex-row gap-2">
                <p>{date}</p>
                <p>•</p>
                <p>{autor}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Meta>
  );
}
