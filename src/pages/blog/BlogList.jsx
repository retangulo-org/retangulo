import { Link } from 'react-router-dom';
import { posts } from '../../scripts/postsLoader';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function BlogList() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const currentLang = i18n.language.split('-')[0];

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="mb-8">Blog</h1>
      <ul className="space-y-4">
        {posts.map(({ slug, title, date }) => (
          <li className="list-none" key={slug}>
            <button
              className="mb-3 text-left text-3xl font-bold text-neutral-200 hover:underline hover:text-neutral-300"
              title={title}
              name={title}
              onClick={() => navigate(`/${currentLang}/blog/${slug}`)}>
              {title}
            </button>
            <p>{date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
