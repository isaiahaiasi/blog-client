import React from 'react';
import NotFound from '../pages/NotFound';
import Blog from './Blog';
import ErrorDialog from './ErrorDialog';
import Loading from './Loading';

interface BlogFeedProps {
  blogs: BlogData[];
  isLoading: boolean;
  error: unknown;
}

export default function BlogFeed({ blogs, isLoading, error }: BlogFeedProps) {
  if (!isLoading && !error && !Array.isArray(blogs)) {
    return <NotFound />;
  } else {
    return (
      <div>
        {isLoading && <Loading />}
        {error && <ErrorDialog message={(error as any).message} />}
        {blogs &&
          Array.isArray(blogs) &&
          blogs.map((blog: BlogData) => <Blog data={blog} key={blog._id} />)}
      </div>
    );
  }
}