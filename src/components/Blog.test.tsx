import * as React from 'react';
import { render } from '@testing-library/react';
import { expect } from 'chai';
import Blog from './Blog';

describe('<Blog>', () => {
  it('Renders the title, author, and user of the blog', () => {
    const testBlog: BlogData = {
      _id: 'testid',
      title: 'testblog',
      content: 'test test test',
      publishDate: new Date(),
      author: {
        _id: 'authorid',
        username: 'johnny test',
      },
    };

    const { getByText } = render(<Blog data={testBlog} />);

    const title = getByText('testblog');
    const content = getByText('test test test');
    const author = getByText('johnny test');

    expect(document.body.contains(title));
    expect(document.body.contains(content));
    expect(document.body.contains(author));
  });

  xit("Has a link to the author's page", () => {});
});
