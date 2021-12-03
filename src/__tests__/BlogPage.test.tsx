import { screen } from '@testing-library/react';
import { expect } from 'chai';
import fetchMock from 'fetch-mock/esm/client';
import * as React from 'react';
import { Route, Routes } from 'react-router';
import { DataStoreContext } from '../contexts/dataStore';
import BlogPage from '../pages/BlogPage';
import {
  getBlogAPIEndpoint,
  getBlogCommentsAPIEndpoint,
} from '../utils/routeGetters';
import { renderWithRouter } from '../utils/testUtils';
import { testBlog } from '../__fixtures__/APIData';

function getBlogPageRoute() {
  return (
    <Routes>
      <Route path="blog/:blogid" element={<BlogPage />} />
    </Routes>
  );
}

const nullDataStoreProviderMock = {
  getItem: () => null,
  setItem: () => {},
};

const getRouterPath = (id: string) => `/blog/${id}`;

describe('<BlogPage>', () => {
  it('Renders a 404 error if the blog does not exist', async () => {
    const invalidId = 'invalid-blog-id';
    fetchMock.mock(getBlogAPIEndpoint(invalidId), 404);
    fetchMock.mock(getBlogCommentsAPIEndpoint(invalidId), 404);

    renderWithRouter(
      <DataStoreContext.Provider value={nullDataStoreProviderMock}>
        {getBlogPageRoute()}
      </DataStoreContext.Provider>,
      { route: getRouterPath(invalidId) },
    );

    await fetchMock.flush(true);

    expect(document.body.contains(screen.queryByText(/loading/i))).to.be.false;
    expect(document.body.contains(screen.getByText(/404/i))).to.be.true;
  });

  it('Renders a blog post immediately if it has already been loaded', async () => {
    const dataStoreProviderMock = {
      getItem: () => testBlog,
      setItem: () => {},
    };

    renderWithRouter(
      <DataStoreContext.Provider value={dataStoreProviderMock}>
        {getBlogPageRoute()}
      </DataStoreContext.Provider>,

      { route: '/blog/arbitrary-blog-id' },
    );

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

    renderWithRouter(
      <DataStoreContext.Provider value={nullDataStoreProviderMock}>
        {getBlogPageRoute()}
      </DataStoreContext.Provider>,
      { route: getRouterPath(blogId) },
    );
  });

  // TODO: once I add comments...
  xit('Renders a "no comments" box if there are no comments', () => {});
  xit('Renders a list of comments, if there are comments', () => {});
  xit('Renders a comment form if user is logged in and a blog is loaded', () => {});
});
