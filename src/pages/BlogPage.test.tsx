import { screen } from '@testing-library/react';
import { expect } from 'chai';
import * as React from 'react';
import { Route, Routes } from 'react-router';
import { renderWithRouter } from '../utils/testUtils';
import BlogPage from './BlogPage';
import fetchMock from 'fetch-mock/esm/client';
import { SNOWPACK_PUBLIC_API_URL } from '../utils/envManager';

describe('<BlogPage>', () => {
  xit('Redirects to 404 page if the blog does not exist', () => {
    const invalidId = '/invalid-blog-id';
    const invalidRoute = SNOWPACK_PUBLIC_API_URL + '/blogs' + invalidId;

    fetchMock.mock(invalidRoute, 404);

    renderWithRouter(<BlogPage />, { route: '/blog' + invalidId });

    expect(document.body.contains(screen.getByText(/404/i)));
  });

  xit('Renders a blog post immediately if it has already been loaded', async () => {
    // TODO: mock DataStore component
    renderWithRouter(
      <Routes>
        <Route path="/blog/:blogid" element={<BlogPage />} />
      </Routes>,
      { route: '/blog/arbitrary-blog-id' },
    );

    const title = screen.getByText(/testblog/i);
    const content = screen.getByText('test test test');
    const username = screen.getByText('johnny test');

    expect(document.body.contains(title));
    expect(document.body.contains(content));
    expect(document.body.contains(username));
  });

  xit('Renders a list of comments, if there are comments', () => {});
  xit('Renders a comment form if user is logged in and a blog is loaded', () => {});
  xit('Renders a "no comments" box if there are no comments', () => {});
  xit('Fetches a blog post if it is not already loaded', () => {});
});
