import { expect } from 'chai';
import * as React from 'react';
import BlogFeed from '../components/BlogFeed';
import renderWithRouter from './utils/testUtils';

describe('<BlogFeed>', () => {
  it('Renders error if no data & not loading', () => {
    const invalidResponse = null as unknown as BlogData[];
    const { getByText } = renderWithRouter(
      <BlogFeed isLoading={false} error={false} blogs={invalidResponse} />,
    );

    expect(getByText(/404/i));
  });
});
