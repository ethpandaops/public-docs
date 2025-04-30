import React from 'react';
import Link from '@docusaurus/Link';
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from '@docusaurus/theme-common';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import {translate} from '@docusaurus/Translate';

// Custom implementation without using listTagsByLetters
function groupTagsByLetter(tags) {
  const groups = {};
  
  if (!Array.isArray(tags)) {
    console.error('Expected tags to be an array but got:', typeof tags);
    return groups;
  }
  
  tags.forEach((tag) => {
    const firstLetter = tag.label[0].toUpperCase();
    groups[firstLetter] = groups[firstLetter] || [];
    groups[firstLetter].push(tag);
  });
  
  // Sort letters alphabetically
  return Object.keys(groups)
    .sort()
    .reduce((acc, key) => {
      acc[key] = groups[key];
      return acc;
    }, {});
}

function CustomTagsList({tags, children}) {
  const groupedTags = groupTagsByLetter(tags);
  
  return (
    <>
      {Object.keys(groupedTags).map((letter) => {
        return children({
          letter,
          tags: groupedTags[letter] || [],
        });
      })}
    </>
  );
}

export default function DataTagsListPage({tags}) {
  const title = translate({
    id: 'theme.tags.tagsPageTitle',
    message: 'Data Tags',
    description: 'The title of the tag list page',
  });

  if (!Array.isArray(tags)) {
    console.error('DataTagsListPage: Expected tags to be an array but got:', typeof tags);
    return (
      <Layout>
        <div className="container margin-vert--lg">
          <div className="row">
            <main className="col col--8 col--offset-2">
              <Heading as="h1">Error: No tags found</Heading>
              <div className="margin-vert--lg text--center">
                <Link to="/data" className="button button--primary">
                  Back to Data
                </Link>
              </div>
            </main>
          </div>
        </div>
      </Layout>
    );
  }
  
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
              <CustomTagsList tags={tags}>
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
              </CustomTagsList>
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