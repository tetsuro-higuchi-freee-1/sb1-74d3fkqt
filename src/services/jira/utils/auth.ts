/**
 * Safely encode strings for Basic Authentication
 * Handles UTF-8 characters properly
 */
export function encodeBasicAuth(username: string, token: string): string {
  // Convert to UTF-8 then Base64
  const str = `${username}:${token}`;
  return btoa(unescape(encodeURIComponent(str)));
}