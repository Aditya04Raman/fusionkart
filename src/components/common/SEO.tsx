import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  jsonLd?: Record<string, any> | Record<string, any>[];
}

const ensureTag = (selector: string, tagName: string) => {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement(tagName);
    document.head.appendChild(el);
  }
  return el as HTMLElement;
};

export const SEO = ({ title, description, canonical, jsonLd }: SEOProps) => {
  useEffect(() => {
    if (title) document.title = title;

    if (description) {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);
    }

    if (canonical) {
      const link = ensureTag('link[rel="canonical"]', 'link') as HTMLLinkElement;
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', canonical);
    }

    // JSON-LD structured data
    const scriptId = 'seo-structured-data';
    const old = document.getElementById(scriptId);
    if (old) old.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [title, description, canonical, jsonLd]);

  return null;
};

export default SEO;
