# ethPandaOps Public Docs

Documentation site for ethPandaOps tools and services.

## Blog Post Guidelines

To create a new blog post:

1. Create a new directory in the `blog` folder with the format `YYYY-MM-DD-slug` (e.g., `2024-05-15-new-feature`)
2. Inside that directory, create an `index.md` file with the following frontmatter:

```md
---
slug: your-post-slug
title: Your Post Title
authors: [author1, author2]
tags: [tag1, tag2]
---

Your post content here...
```

3. To add a featured image, place a `featured.png` file in the same directory as your `index.md` file.

### Example Blog Post Structure

```
blog/
  ├── 2024-05-15-new-feature/
  │   ├── index.md
  │   ├── featured.png
  │   └── other-images.png
  └── authors.yml
```

If a blog post directory doesn't contain a `featured.png` file, the blog post will be displayed without an image.

**Note:** Blog posts will be accessible at URLs that start with `/posts/` (e.g., `https://yourdomain.com/posts/your-post-slug`).

## Data Section Guidelines

To add content to the Data section:

1. Create a new directory in the `data` folder with a descriptive name (e.g., `ethereum-metrics`, `network-statistics`, etc.)
2. Inside that directory, create an `index.md` file with the following frontmatter:

```md
---
slug: your-data-slug
title: Your Data Title
tags: [tag1, tag2]
---

Your data content here...
```

3. To add a featured image, place a `featured.png` file in the same directory as your `index.md` file.

### Example Data Structure

```
data/
  ├── ethereum-metrics/
  │   ├── index.md
  │   ├── featured.png
  │   └── other-images.png
```

**Note:** Data entries will be accessible at URLs that start with `/data/` (e.g., `https://yourdomain.com/data/your-data-slug`).
