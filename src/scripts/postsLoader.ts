const modules = import.meta.glob('../pages/blog/posts/*.mdx', { eager: true });

const posts = Object.entries(modules)
  .map(([filePath, module]: [string, any]) => {
    const slug = filePath.split('/').pop()?.replace('.mdx', '') || '';
    return {
      slug,
      component: module.default,
      ...module.frontmatter,
    };
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export { posts };
