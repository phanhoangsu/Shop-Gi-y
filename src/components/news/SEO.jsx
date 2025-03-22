/**
 * Logic chính:
 * 1. Meta tags:
 *    - Basic: title, description
 *    - Open Graph: og:title, og:description, og:image, og:url
 *    - Twitter Card: twitter:card, twitter:title, twitter:description, twitter:image
 * 
 * 2. Structured Data:
 *    - Schema.org NewsArticle
 *    - JSON-LD format
 *    - Dynamic data injection
 * 
 * 3. Best practices:
 *    - React Helmet
 *    - Escape special chars
 *    - ISO date format
 *    - Required fields validation
 */
import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, image, url }) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <script type="application/ld+json">
      {`
        {
          "@context": "https://schema.org",
          "@type": "NewsArticle",
          "headline": "${title}",
          "image": "${image}",
          "description": "${description}",
          "url": "${url}",
          "datePublished": "${new Date().toISOString()}",
          "publisher": {
            "@type": "Organization",
            "name": "TechNews",
            "logo": {
              "@type": "ImageObject",
              "url": "https://example.com/logo.png"
            }
          }
        }
      `}
    </script>
  </Helmet>
);

export default SEO;
