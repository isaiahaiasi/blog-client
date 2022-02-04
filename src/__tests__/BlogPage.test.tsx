import { screen } from '@testing-library/react';
import { expect } from 'chai';
import fetchMock from 'fetch-mock/esm/client';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router';
import BlogPage from '../pages/BlogPage';
import {
  getBlogAPIEndpoint,
  getBlogCommentsAPIEndpoint,
} from '../utils/routeGetters';
import renderWithRouter from './utils/testUtils';
import { testBlog } from '../__fixtures__/APIData';

function getBlogPageRoute() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <Routes>
        <Route path="blog/:blogid" element={<BlogPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

const getRouterPath = (id: string) => `/blog/${id}`;

// TODO: figure out how I want to test these with react-query
describe('<BlogPage>', () => {
  xit('Renders a 404 error if the blog does not exist', async () => {
    const invalidId = 'invalid-blog-id';
    fetchMock.mock(getBlogAPIEndpoint(invalidId), 404);
    fetchMock.mock(getBlogCommentsAPIEndpoint(invalidId), 404);

    renderWithRouter(getBlogPageRoute(), { route: getRouterPath(invalidId) });

    await fetchMock.flush(true);

    expect(document.body.contains(screen.queryByText(/loading/i))).to.be.false;
    expect(document.body.contains(screen.getByText(/404/i))).to.be.true;
  });

  xit('Renders a blog post immediately if it has already been loaded', async () => {
    renderWithRouter(getBlogPageRoute(), { route: '/blog/arbitrary-blog-id' });

    const title = screen.getByText(testBlog.title);
    const content = screen.getByText(testBlog.content);
    const username = screen.getByText(testBlog.author.username);

    expect(document.body.contains(title));
    expect(document.body.contains(content));
    expect(document.body.contains(username));
  });

  it('Fetches a blog post if it is not already loaded', async () => {
    const blogId = 'valid-unfetched-blog-id';
    fetchMock.mock(getBlogAPIEndpoint(blogId), { body: { content: testBlog } });
    fetchMock.mock(getBlogCommentsAPIEndpoint(blogId), 404);

    renderWithRouter(getBlogPageRoute(), { route: getRouterPath(blogId) });
  });

  // TODO: once I add comments...
  xit('Renders a "no comments" box if there are no comments', () => {});
  xit('Renders a list of comments, if there are comments', () => {});
  xit('Renders a comment form if user is logged in and a blog is loaded', () => {});
});
