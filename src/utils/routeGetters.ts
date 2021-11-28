import { SNOWPACK_PUBLIC_API_URL } from './envManager';

export const getLoginEndpoint = () => `${SNOWPACK_PUBLIC_API_URL}/auth/login`;

export function getDiscoverAPIEndpoint() {
  return `${SNOWPACK_PUBLIC_API_URL}/blogs`;
}
export function getUserPostsEndpoint(userId: string) {
  return `${SNOWPACK_PUBLIC_API_URL}/users/${userId}/blogs-all`;
}

export function getPostBlogAPIEndpoint(userId: string) {
  return `${SNOWPACK_PUBLIC_API_URL}/users/${userId}/blogs`;
}

export function getBlogAPIEndpoint(postId: string) {
  return `${SNOWPACK_PUBLIC_API_URL}/blogs/${postId}`;
}
