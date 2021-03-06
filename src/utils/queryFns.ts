import type { BlogData, UserData } from 'src/interfaces/APIDataInterfaces';
import type { BlogEditorInputs } from '../components/forms/BlogEditor';
import type { PasswordFormFields } from '../components/forms/PasswordForm';
import type { LoginFormFields } from '../pages/LoginPage';
import fetchData from './fetchData';
import {
  getBlogAPIEndpoint,
  getBlogCommentsAPIEndpoint,
  getDiscoverAPIEndpoint,
  getLoginEndpoint,
  getRegisterEndpoint,
  getUserAPIEndpoint,
  getUserBlogsAPIEndpoint,
  getUserBlogsAuthorizedEndpoint,
} from './routeGetters';

// pattern:
// fetch{VERB}{Target?}{Resource}(target data, formdata)

async function fetchPostUserBlog(user: UserData, formData: BlogEditorInputs) {
  return fetchData(getUserBlogsAPIEndpoint(user._id), {
    credentials: 'include',
    method: 'POST',
    body: formData,
  });
}

async function fetchPutBlog(blog: BlogData, formData: BlogEditorInputs) {
  return fetchData(getBlogAPIEndpoint(blog._id), {
    credentials: 'include',
    method: 'PUT',
    body: formData,
  });
}

async function fetchDeleteBlog(blog: BlogData) {
  return fetchData(getBlogAPIEndpoint(blog._id), {
    credentials: 'include',
    method: 'DELETE',
  });
}

async function fetchPatchUser(
  user: UserData | null,
  formData: { username: string } | PasswordFormFields,
) {
  return fetchData(getUserAPIEndpoint(user?._id ?? 'undefined'), {
    credentials: 'include',
    method: 'PATCH',
    body: formData,
  });
}

async function fetchDeleteUser(
  user: UserData | null,
  formData: { password: string },
) {
  return fetchData(getUserAPIEndpoint(user?._id ?? 'undefined'), {
    credentials: 'include',
    method: 'DELETE',
    body: { username: user?.username ?? null, ...formData },
  });
}

async function fetchLogin(formData: LoginFormFields) {
  return fetchData(getLoginEndpoint(), {
    credentials: 'include',
    method: 'POST',
    body: formData,
  });
}

async function fetchRegister(formData: any) {
  return fetchData(getRegisterEndpoint(), {
    method: 'POST',
    body: formData,
  });
}

async function fetchGetBlog(blogid: string) {
  return fetchData(blogid ? getBlogAPIEndpoint(blogid) : 'undefined');
}

async function fetchGetBlogComments(blogid: string | undefined) {
  return fetchData(blogid ? getBlogCommentsAPIEndpoint(blogid) : 'undefined');
}

async function fetchGetUserAllBlogs(user: UserData) {
  return fetchData(getUserBlogsAuthorizedEndpoint(user._id), {
    credentials: 'include',
  });
}

async function fetchGetDiscover() {
  return fetchData(getDiscoverAPIEndpoint());
}

async function fetchGetUserBlogs(userid: string) {
  return fetchData(getUserBlogsAPIEndpoint(userid));
}

async function fetchPostComment(blogid: string, formData: { content: string }) {
  return fetchData(getBlogCommentsAPIEndpoint(blogid), {
    credentials: 'include',
    method: 'POST',
    body: formData,
  });
}

export {
  fetchGetDiscover,
  fetchGetUserBlogs,
  fetchGetBlog,
  fetchGetBlogComments,
  fetchGetUserAllBlogs,
  fetchPostUserBlog,
  fetchPutBlog,
  fetchDeleteBlog,
  fetchPatchUser,
  fetchDeleteUser,
  fetchLogin,
  fetchRegister,
  fetchPostComment,
};
