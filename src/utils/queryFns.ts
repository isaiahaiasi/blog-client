import type { QueryFunctionContext } from 'react-query';
import type { BlogEditorInputs } from '../components/forms/BlogEditor';
import type { DeleteUserFormFields } from '../components/forms/DeleteUser';
import type { PasswordFormFields } from '../components/forms/PasswordForm';
import type { UsernameFormFields } from '../components/forms/UsernameForm';
import type { LoginFormFields } from '../pages/LoginPage';
import type { RegisterFormFields } from '../pages/Register';
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
  return await fetchData(getUserBlogsAPIEndpoint(user._id), {
    credentials: 'include',
    method: 'POST',
    body: formData,
  });
}

async function fetchPutBlog(blog: BlogData, formData: BlogEditorInputs) {
  return await fetchData(getBlogAPIEndpoint(blog._id), {
    credentials: 'include',
    method: 'PUT',
    body: formData,
  });
}

async function fetchDeleteBlog(blog: BlogData) {
  return await fetchData(getBlogAPIEndpoint(blog._id), {
    credentials: 'include',
    method: 'DELETE',
  });
}

async function fetchPatchUser(
  user: UserData | null,
  formData: PasswordFormFields | UsernameFormFields,
) {
  return await fetchData(getUserAPIEndpoint(user?._id ?? 'undefined'), {
    credentials: 'include',
    method: 'PATCH',
    body: formData,
  });
}

async function fetchDeleteUser(
  user: UserData | null,
  formData: DeleteUserFormFields,
) {
  return await fetchData(getUserAPIEndpoint(user?._id ?? 'undefined'), {
    credentials: 'include',
    method: 'DELETE',
    body: { username: user?.username ?? null, ...formData },
  });
}

async function fetchLogin(formData: LoginFormFields) {
  return await fetchData(getLoginEndpoint(), {
    credentials: 'include',
    method: 'POST',
    body: formData,
  });
}

async function fetchRegister(formData: RegisterFormFields) {
  return await fetchData(getRegisterEndpoint(), {
    method: 'POST',
    body: formData,
  });
}

async function fetchGetBlog(blogid: string) {
  return await fetchData(blogid ? getBlogAPIEndpoint(blogid) : 'undefined');
}

async function fetchGetBlogComments(blogid: string | undefined) {
  return await fetchData(
    blogid ? getBlogCommentsAPIEndpoint(blogid) : 'undefined',
  );
}

async function fetchGetUserAllBlogs(user: UserData) {
  return fetchData(getUserBlogsAuthorizedEndpoint(user._id), {
    credentials: 'include',
  });
}

async function fetchGetDiscover() {
  return await fetchData(getDiscoverAPIEndpoint());
}

async function fetchGetUserBlogs(userid: string) {
  return await fetchData(getUserBlogsAPIEndpoint(userid));
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
};