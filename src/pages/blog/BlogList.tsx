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
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-8">Blog</h1>
        <ul className="flex flex-col divide-foreground divide-y-2">
          {posts.map(({ slug, title, date, autor, desc }) => (
            <li className="list-none pt-4" key={slug}>
              <button
                className="mb-3 text-left text-3xl font-bold text-neutral-200 hover:underline hover:text-neutral-300"
                title={title}
                name={title}
                onClick={() => navigate(`/blog/${slug}`)}>
                {title}
              </button>
              <p>{desc}</p>
              <div className="flex flex-row gap-2 font-semibold">
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
