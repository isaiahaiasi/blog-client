import { SNOWPACK_PUBLIC_API_URL } from './envManager';

export const getLoginEndpoint = () => `${SNOWPACK_PUBLIC_API_URL}/auth/login`;
export const getRegisterEndpoint = () =>
  `${SNOWPACK_PUBLIC_API_URL}/auth/register`;

export function getDiscoverAPIEndpoint() {
  return `${SNOWPACK_PUBLIC_API_URL}/blogs`;
}
export function getUserBlogsAuthorizedEndpoint(userId: string) {
  return `${SNOWPACK_PUBLIC_API_URL}/users/${userId}/blogs-all`;
}

export function getUserBlogsAPIEndpoint(userId: string) {
  return `${SNOWPACK_PUBLIC_API_URL}/users/${userId}/blogs`;
}

export function getUserAPIEndpoint(userId: string) {
  return `${SNOWPACK_PUBLIC_API_URL}/users/${userId}`;
}

export function getBlogAPIEndpoint(postId: string) {
  return `${SNOWPACK_PUBLIC_API_URL}/blogs/${postId}`;
}

export function getBlogCommentsAPIEndpoint(blogId: string) {
  return `${SNOWPACK_PUBLIC_API_URL}/blogs/${blogId}/comments`;
}

// local routes
// TODO: add the rest
export const logoutRoute = '/logout';
export const loginRoute = '/login';
export const profileRoute = '/profile';
export const getUserFeedRoute = (id: string) => `/user/${id}`;
export const getEditUserRoute = (id: string) => `/user/${id}/edit`;
