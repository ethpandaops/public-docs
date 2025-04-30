import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import DefaultImage from '@site/src/components/DefaultImage';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  usePluralForm,
} from '@docusaurus/theme-common';
import {FaArrowLeft, FaTag} from 'react-icons/fa';
import {translate} from '@docusaurus/Translate';

export default function DataTagsPostsPage(props) {
  const {tag, items, sidebar, listMetadata} = props;
  const {allTagsPath, name, count} = tag;
  const title = translate(
    {
      id: 'theme.tag.tagsPageTitle',
      message: '{nPosts} tagged with "{tagName}"',
      description:
        'The title of the page for a tag',
    },
    {nPosts: count, tagName: name},
  );

  const dataItems = items.map((item) => item.content);

  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.tagPostsPages,
        ThemeClassNames.page.blogTagPostListPage,
      )}>
      <PageMetadata title={title} />
      <Layout>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--9">
              <div className="d-flex align-items-center mb-4">
                <Link className="me-3 data-tag-return-link" to={allTagsPath}>
                  <FaArrowLeft /> Back to all tags
                </Link>
                <Heading as="h1">
                  <FaTag className="margin-right--sm" />
                  {name}: {count} items
                </Heading>
              </div>

              {dataItems.map((item) => (
                <div key={item.metadata.permalink} className="data-tag-post-card margin-bottom--lg">
                  <div className="card">
                    <div className="card__image">
                      {/* <DefaultImage 
                        dirName={item.metadata.frontMatter.slug ? `data/${item.metadata.frontMatter.slug}` : null}
                        metadata={{
                          frontMatter: item.metadata.frontMatter,
                          title: item.metadata.title
                        }}
                        className="data-tag-post-image" 
                      /> */}
                    </div>
                    <div className="card__body">
                      <Link to={item.metadata.permalink}>
                        <Heading as="h2">{item.metadata.title}</Heading>
                      </Link>
                      {item.metadata.description && (
                        <p className="margin-vert--md">{item.metadata.description}</p>
                      )}
                      <div>
                        {item.metadata.tags.map((tagItem) => (
                          <Link
                            key={tagItem.permalink}
                            to={tagItem.permalink}
                            className="tag-badge">
                            #{tagItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
} 