import type { MetadataRoute } from 'next';
import { RESTAURANT } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${RESTAURANT.siteUrl}/sitemap.xml`,
  };
}
