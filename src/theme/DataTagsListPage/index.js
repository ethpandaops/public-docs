import React from 'react';
import Link from '@docusaurus/Link';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
  listTagsByLetters,
} from '@docusaurus/theme-common';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import {translate} from '@docusaurus/Translate';

// Custom implementation of TagsListByLetter
function CustomTagsListByLetter({tags, children}) {
  const tagsByLetter = listTagsByLetters(tags);
  return (
    <>
      {Object.keys(tagsByLetter).map((letter) => (
        children({
          letter,
          tags: tagsByLetter[letter],
        })
      ))}
    </>
  );
}

export default function DataTagsListPage({tags}) {
  const title = translate({
    id: 'theme.tags.tagsPageTitle',
    message: 'Data Tags',
    description: 'The title of the tag list page',
  });
  
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.tagList,
        ThemeClassNames.page.blogTagsListPage,
      )}>
      <PageMetadata title={title} />
      <Layout>
        <div className="container margin-vert--lg">
          <div className="row">
            <main className="col col--8 col--offset-2">
              <Heading as="h1" className="margin-bottom--lg">
                {title}
              </Heading>
              <CustomTagsListByLetter tags={tags}>
                {({letter, tags: letterTags}) => (
                  <div key={letter} className="margin-vert--lg">
                    <Heading as="h2" id={`tag-${letter}`}>
                      {letter}
                    </Heading>
                    <ul className="padding--none">
                      {letterTags.map((tag) => (
                        <li key={tag.permalink} className="margin-vert--sm">
                          <Link
                            href={tag.permalink}
                            className="tag-link">
                            {tag.label} ({tag.count})
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CustomTagsListByLetter>
              <div className="margin-vert--lg text--center">
                <Link to="/data" className="button button--primary">
                  Back to Data
                </Link>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    </HtmlClassNameProvider>
  );
} 