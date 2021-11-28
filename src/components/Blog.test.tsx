import { expect } from 'chai';
import * as React from 'react';
import { renderWithRouter } from '../utils/testUtils';
import { testBlog } from '../__fixtures__/APIData';
import Blog from './Blog';

describe('<Blog>', () => {
  it('Renders the title, author, and user of the blog', () => {
    const { getByText } = renderWithRouter(<Blog data={testBlog} />);

    const title = getByText(testBlog.title);
    const content = getByText(testBlog.content);
    const author = getByText(testBlog.author.username);

    expect(document.body.contains(title));
    expect(document.body.contains(content));
    expect(document.body.contains(author));
  });

  it("Has a link to the author's page", () => {
    const { author } = testBlog;
    const expectedUrl = `/user/${author._id}`;

    const { getByText } = renderWithRouter(<Blog data={testBlog} />, {
      route: '/',
    });

    const userLink = getByText(author.username).closest('a');

    expect(userLink?.pathname).to.equal(expectedUrl);
  });

  it('Links to the BlogPage for that blog', () => {
    const { _id, title } = testBlog;
    const expectedUrl = `/blog/${_id}`;

    const { getByText } = renderWithRouter(<Blog data={testBlog} />, {
      route: '/',
    });

    const blogLink = getByText(title).closest('a');

    expect(blogLink?.pathname).to.equal(expectedUrl);
  });
});
