import { MDXProvider } from '@mdx-js/react';

// components/mdx.js
const components = {
  a: ({ children }) => <a className="text-green-500 underline">{children}</a>,
};

export default function MDXWrapper({ children }) {
  return <MDXProvider components={{ h2: <h6 /> }}>{children}</MDXProvider>;
}
