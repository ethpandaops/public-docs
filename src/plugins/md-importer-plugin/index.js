import React, { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import { marked } from 'marked';

// Function to enhance the HTML with better table support
function enhanceHtml(html) {
  if (!html) return '';

  // Replace all tables with a wrapped version for better mobile scrolling
  let enhancedHtml = html.replace(
    /<table>/g, 
    '<div class="table-container table-container-dataset"><table>'
  ).replace(
    /<\/table>/g, 
    '</table></div>'
  );

  // Add IDs to headings for anchor links
  // This finds heading tags (h1-h6) and adds IDs based on their content if they don't already have an ID
  enhancedHtml = enhancedHtml.replace(
    /<(h[1-6])(?![^>]*\bid=)[^>]*>([\s\S]*?)<\/\1>/gi,
    (match, tag, content) => {
      // Strip HTML tags if present and get text content
      const textContent = content.replace(/<[^>]*>/g, '');
      // Generate ID from content: lowercase, replace non-alphanumeric with hyphens
      const id = textContent.trim().toLowerCase().replace(/[^\w]+/g, '-');
      return `<${tag} id="${id}" class="anchor">${content}</${tag}>`;
    }
  );

  // Enhance any checkmarks in table cells with better styling
  // We need special handling for checkmarks because:
  // 1. HTML may render them as text without proper styling
  // 2. Different markdown processors may handle emojis inconsistently
  // 3. We want consistent visual presentation across browsers and systems
  // 4. Special styling helps make checkmarks more visually prominent
  // 5. Some systems may not have emoji support for all checkmark types
  
  // Standard checkmarks
  enhancedHtml = enhancedHtml.replace(
    /<td>\s*✓\s*<\/td>/g,
    '<td class="checkmark-cell"><span class="checkmark-symbol">✓</span></td>'
  );
  
  // Emoji checkmarks
  enhancedHtml = enhancedHtml.replace(
    /<td>\s*✅\s*<\/td>/g,
    '<td class="checkmark-cell"><span class="checkmark-symbol">✅</span></td>'
  );
  
  // Checked boxes
  enhancedHtml = enhancedHtml.replace(
    /<td>\s*☑\s*<\/td>/g,
    '<td class="checkmark-cell"><span class="checkmark-symbol">☑</span></td>'
  );
  
  // Xatu-style green checks
  enhancedHtml = enhancedHtml.replace(
    /<td>\s*\|\s*✓\s*\|\s*<\/td>/g,
    '<td class="checkmark-cell"><span class="checkmark-symbol">✓</span></td>'
  );
  
  // Handle emoji formats from Xatu docs
  enhancedHtml = enhancedHtml.replace(
    /<td>(\s*\|?\s*)🟢(\s*\|?\s*)<\/td>/g,
    '<td class="checkmark-cell"><span class="checkmark-symbol">✓</span></td>'
  );
  
  // Special case for Xatu's ✓ | formats
  enhancedHtml = enhancedHtml.replace(
    /<td>(\s*\|?\s*)✓(\s*\|?\s*)<\/td>/g, 
    '<td class="checkmark-cell"><span class="checkmark-symbol">✓</span></td>'
  );
  
  // Shorten long column headers
  enhancedHtml = enhancedHtml.replace(
    /<th.*?>EthPandaOps Clickhouse<\/th>/g,
    '<th>Clickhouse</th>'
  );
  
  enhancedHtml = enhancedHtml.replace(
    /<th.*?>Public Parquet Files<\/th>/g,
    '<th>Parquet</th>'
  );
  
  // Truncate long text in description column (typically 3rd or later column)
  // This finds long text in td elements and truncates it to the first period
  enhancedHtml = enhancedHtml.replace(
    /<td>([^<.]+\.[^<]*)<\/td>/g,
    (match, text) => {
      // Find first period and trim text to that point
      const periodIndex = text.indexOf('.');
      if (periodIndex > 0) {
        // Get text up to the first period (including the period)
        const truncated = text.substring(0, periodIndex + 1);
        // Return truncated text without tooltips
        return `<td class="truncated-cell"><div class="truncated-content">${truncated}</div></td>`;
      }
      // If no period found, return the original cell
      return match;
    }
  );
  
  return enhancedHtml;
}

// Component to fetch external markdown and render it with marked
function MDImporter({url}) {
  const [content, setContent] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMarkdown() {
      if (!ExecutionEnvironment.canUseDOM) {
        return; // Skip on server-side
      }
      
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown: ${response.status} ${response.statusText}`);
        }
        const text = await response.text();
        
        // Configure marked to work better with table styling
        marked.setOptions({
          headerIds: true,
          gfm: true,
          breaks: false,
          pedantic: false,
          sanitize: false,
          smartLists: true,
          smartypants: true
        });
        
        // Parse markdown to HTML using marked
        const html = marked(text);
        // Enhance HTML with better table support
        const enhancedHtml = enhanceHtml(html);
        setContent(enhancedHtml);
      } catch (err) {
        console.error('Error fetching markdown:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (url) {
      fetchMarkdown();
    }
  }, [url]);

  if (loading) {
    return <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
      <div className="loading-text">Loading external content...</div>
    </div>;
  }

  if (error) {
    return <div className="admonition admonition-danger alert alert--danger">
      <div className="admonition-heading">
        <h5>Error loading external content</h5>
      </div>
      <div className="admonition-content">
        <p>Failed to load content from {url}: {error}</p>
      </div>
    </div>;
  }

  // Return the rendered HTML content
  return (
    <BrowserOnly fallback={<div>Loading content...</div>}>
      {() => (
        <div className="markdown md-importer-content">
          {/* Render the enhanced HTML parsed from markdown */}
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      )}
    </BrowserOnly>
  );
}

export default MDImporter; 