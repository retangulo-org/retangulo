const modules = import.meta.glob('../pages/blog/posts/*.mdx', { eager: true });

const posts = Object.entries(modules).map(([filePath, module]) => {
  const slug = filePath.split('/').pop().replace('.mdx', '');
  return {
    slug,
    component: module.default,
    ...module.frontmatter, // pega o frontmatter exportado
  };
});

export { posts };
