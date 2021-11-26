import { screen } from '@testing-library/react';
import { expect } from 'chai';
import * as React from 'react';
import { Route, Routes } from 'react-router';
import { FetchedDataContext } from '../contexts/fetchedData';
import { renderWithRouter } from '../utils/testUtils';
import BlogPage from './BlogPage';

describe('<BlogPage>', () => {
  it('Redirects to 404 page if the blog does not exist', () => {
    renderWithRouter(<BlogPage />, { route: '/blog/invalid-blog-id' });
    expect(document.body.contains(screen.getByText(/404/i)));
  });

  it('Renders a blog post immediately if it has already been loaded', async () => {
    const testBlog = {
      _id: 'testid',
      title: 'testblog',
      content: 'test test test',
      publishDate: new Date(),
      author: {
        _id: 'authorid',
        username: 'johnny test',
      },
    };

    renderWithRouter(
      <FetchedDataContext.Provider value={{ blogs: [testBlog] }}>
        <Routes>
          <Route path="/blog/:blogid" element={<BlogPage />} />
        </Routes>
      </FetchedDataContext.Provider>,
      { route: '/blog/testid' },
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
