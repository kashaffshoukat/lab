import { useEffect, useState } from 'react';

export type Route =
  | { name: 'home' }
  | { name: 'collections' }
  | { name: 'collection'; slug: string }
  | { name: 'product'; slug: string }
  | { name: 'customiser' }
  | { name: 'faq' }
  | { name: 'reviews' }
  | { name: 'logo-upload' }
  | { name: 'checkout' };

export function parsePath(path: string): Route {
  const p = path.replace(/^#/, '').split('?')[0] || '/';
  if (p === '/' || p === '') return { name: 'home' };
  if (p === '/collections') return { name: 'collections' };
  if (p.startsWith('/collections/')) return { name: 'collection', slug: p.split('/')[2] };
  if (p.startsWith('/products/')) return { name: 'product', slug: p.split('/')[2] };
  if (p === '/customiser' || p === '/products/neon-sign-customiser') return { name: 'customiser' };
  if (p === '/faq') return { name: 'faq' };
  if (p === '/reviews') return { name: 'reviews' };
  if (p === '/logo-upload') return { name: 'logo-upload' };
  if (p === '/checkout') return { name: 'checkout' };
  return { name: 'home' };
}

export function navigate(path: string) {
  window.location.hash = path;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parsePath(window.location.hash));

  useEffect(() => {
    const handler = () => setRoute(parsePath(window.location.hash));
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  return route;
}
