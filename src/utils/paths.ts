export const getAssetPath = (path: string): string => {
  const isVercel = process.env.VERCEL === '1';
  const basePath = (process.env.NODE_ENV === 'production' && !isVercel) ? '/Portfolio' : '';
  // Ensure the path starts with a slash if it doesn't already, but remove duplicate slashes
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
};
