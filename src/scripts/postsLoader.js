const modules = import.meta.glob('../pages/blog/posts/*.mdx', { eager: true });

const posts = Object.entries(modules)
  .map(([filePath, module]) => {
    const slug = filePath.split('/').pop().replace('.mdx', '');
    console.log(module);
    return {
      slug,
      component: module.default,
      ...module.frontmatter,
    };
  })
  .sort((a, b) => Date(b.date) - Date(a.date));

export { posts };
