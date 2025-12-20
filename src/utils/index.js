export const getPublicUrl = (path) => {
  const baseUrl = import.meta.env.BASE_URL;
  // Remove leading slash from path if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  // Remove trailing slash from baseUrl if present
  const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  return `${cleanBase}/${cleanPath}`;
};

